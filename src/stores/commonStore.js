import { defineStore } from 'pinia'
import { get } from '@/utils/api'
import router from '@/router'

export const useCommonStore = defineStore('common', {
  state: () => ({
    token: localStorage.getItem('authToken') || null,
    userData: null,
  }),

  actions: {
    setUserData(data) {
      this.userData = data
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('authToken', token)
    },
    setUserImages(images) {
      this.userData.images = images
    },
    async fetchUser() {
      if (!this.token) {
        console.error('No token found, session expired')
        this.logout() // Logout user if token is missing
        return
      }

      try {
        const response = await get('users/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.token, // No "Bearer" prefix since your backend expects only the token
          },
        })

        response.dateOfBirth = response.dateOfBirth ? response.dateOfBirth.split('T')[0] : null
        this.setUserData(response)

        // check mandatoryProfileSetupDone
        // if (!response.mandatoryProfileSetupDone) {
        //   router.push('/profile-setup')
        //   return
        // } else if (!response.photosUploaded) {
        //   router.push('/photo-setup')
        //   return
        // } else {
        //   router.push('/')
        // }
      } catch (error) {
        this.logout()
      }
    },
    logout() {
      this.token = null
      this.user = null
      this.setUserData({})
      localStorage.removeItem('authToken')
      router.push('/login')
    },
  },
})
