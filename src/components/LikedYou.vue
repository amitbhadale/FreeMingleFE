<template>
  <v-container style="background-color: #fff5f8; min-height: 100vh">
    <v-row class="flex-column">
      <!-- Header -->
      <v-col cols="12">
        <div class="mb-6">
          <h2 class="text-subtitle-3 font-weight-medium mb-1">Interested in You</h2>
          <div style="height: 3px; width: 40px; background: #1976d2; border-radius: 4px"></div>
        </div>
      </v-col>

      <!-- Card list -->
      <v-col v-for="user in likedUsers" :key="user.id" cols="12" class="mb-4">
        <v-card
          class="pa-4 d-flex flex-column align-center"
          outlined
          @click="goToProfile(user.id)"
          hover
        >
          <!-- Avatar -->
          <v-avatar size="80" class="mb-3">
            <v-img :src="user.images" alt="User avatar"></v-img>
          </v-avatar>

          <!-- Name + Age -->
          <div class="text-center mb-2">
            <div class="text-h6 font-weight-medium">{{ user.name }}, {{ user.age }}</div>
            <div class="text-body-2 text-grey">{{ user.city }}</div>
          </div>

          <!-- Bio (wrapped) -->
          <v-card-text class="text-body-2 text-center text-grey-darken-2">
            {{ user.aboutMe }}
          </v-card-text>
        </v-card>
      </v-col>

      <!-- No data message -->
      <v-col cols="12" v-if="likedUsers.length === 0" class="text-center">
        <v-sheet
          class="pa-6 d-flex flex-column align-center justify-center"
          color="#f9f9f9"
          rounded
          elevation="1"
        >
          <v-icon size="40" color="deep-purple-accent-4">mdi-emoticon-happy-outline</v-icon>
          <div class="text-subtitle-2 font-weight-medium mt-2">No likes just yet</div>
          <div class="text-body-2 text-grey-darken-1 mt-1">
            Patience pays — someone special might like you soon!
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { get } from '@/utils/api'
import { useToast } from 'vue-toastification'
export default {
  name: 'LikedYouPage',
  data() {
    return {
      toast: null,
      likedUsers: [],
    }
  },
  created() {
    this.toast = useToast()
  },
  mounted() {
    // Fetch liked users from API or store if needed
    this.fetchLikedUsers()
  },
  methods: {
    async fetchLikedUsers() {
      try {
        const res = await get('users/likes/received')
        console.log('Fetched liked users:', res)

        if (res) {
          this.likedUsers = res
          // update image url
          this.likedUsers = this.updatedImages(this.likedUsers)
        } else {
          this.toast.error('No liked users found.')
        }
      } catch (error) {
        console.error('Error fetching liked users:', error)
        this.toast.error('Failed to fetch received likes. Please try again.')
      }
    },
    goToProfile(userId) {
      console.log('Navigating to user profile with ID:', userId)

      this.$router.push({ name: 'UserProfile', params: { id: userId, page: 'like' } })
    },
    updatedImages(userArr) {
      const serverURL = import.meta.env.VITE_BACKEND_URL
      return userArr.map((user) => ({
        ...user,
        images: user.images ? `${serverURL}${user.images}` : '',
      }))
    },
  },
}
</script>

<style scoped>
.v-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.v-card:hover {
  transform: scale(1.02);
  background-color: #f9f9f9;
}
</style>
