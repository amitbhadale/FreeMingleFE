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
      console.log('Setting user data:', data)
      this.userData = data
    },
    setToken(token) {
      console.log('Setting token:', token)

      this.token = token
      localStorage.setItem('authToken', token)
    },
    setUserImages(images) {
      this.userData.images = images
    },
    async fetchUser() {
      console.log('Fetching user data...')

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
        console.log('response', response)
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
        console.log('catch in commonstore fetchUser', error)

        this.logout()
      }
    },
    logout() {
      console.log('Logging out...')

      this.token = null
      this.user = null
      this.setUserData({})
      localStorage.removeItem('authToken')
      router.push('/login')
    },
  },
})
