<template>
  <v-container>
    <v-row class="flex-column">
      <v-col cols="12">
        <h1 class="text-center mb-6">People Who Matched with You</h1>
      </v-col>

      <v-col v-for="user in matchedUsers" :key="user.id" cols="12" class="mb-4">
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
            <div class="text-h6">{{ user.name }}, {{ user.age }}</div>
            <div class="text-body-2 text-grey">{{ user.city }}</div>
          </div>

          <!-- Bio (wrapped) -->
          <v-card-text class="text-body-2 text-center">
            {{ user.aboutMe }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" v-if="matchedUsers.length === 0" class="text-center">
        <p>"Good things take time — stay tuned!"</p>
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
      matchedUsers: [],
    }
  },
  created() {
    this.toast = useToast()
  },
  mounted() {
    this.fetchMatches()
  },
  methods: {
    async fetchMatches() {
      try {
        const res = await get('matches')

        if (res) {
          this.matchedUsers = res
          // update image url
          this.matchedUsers = this.updatedImages(this.matchedUsers)
        } else {
          this.toast.error('No liked users found.')
        }
      } catch (error) {
        console.error('Error fetching liked users:', error)
        this.toast.error('Failed to fetch received likes. Please try again.')
      }
    },
    goToProfile(userId) {
      this.$router.push({ name: 'UserProfile', params: { id: userId, page: 'match' } })
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
