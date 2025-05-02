<template>
  <v-container style="background-color: #fff5f8; min-height: 100vh">
    <!-- Heading -->
    <v-row>
      <v-col cols="12">
        <div class="mb-6">
          <h2 class="text-subtitle-3 font-weight-medium mb-1">Your Matches</h2>
          <div style="height: 3px; width: 40px; background: #1976d2; border-radius: 4px"></div>
        </div>
      </v-col>

      <!-- Loader -->
      <v-col cols="12" v-if="loading" class="text-center">
        <v-progress-circular indeterminate color="pink" size="40" width="4" />
      </v-col>

      <!-- No Matches -->
      <v-col cols="12" v-else-if="matches.length === 0" class="text-center">
        <v-sheet
          class="pa-6 d-flex flex-column align-center justify-center"
          color="#f9f9f9"
          rounded
          elevation="1"
        >
          <v-icon size="40" color="amber darken-2">mdi-party-popper</v-icon>
          <div class="text-subtitle-2 font-weight-medium mt-2">No matches yet</div>
          <div class="text-body-2 text-grey-darken-1 mt-1">
            Good things take time — your perfect match might be just a click away!
          </div>
        </v-sheet>
      </v-col>

      <!-- Matches -->
      <v-col v-else v-for="match in matches" :key="match.id" cols="12">
        <v-card class="pa-4" elevation="2" rounded>
          <v-card-title class="d-flex justify-space-between align-center">
            <div @click="goToProfile(match.id)" class="cursor-pointer">
              <div class="text-subtitle-1 font-weight-bold">{{ match.name }}</div>
              <div class="text-body-2 text-grey-darken-1">{{ match.city }}</div>
            </div>
            <v-btn color="pink darken-1" @click="startChat(match.id)" elevation="1" rounded>
              Chat
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { get, post } from '@/utils/api'

export default {
  data() {
    return {
      matches: [],
      loading: true,
    }
  },
  async created() {
    try {
      const res = await get('matches')

      this.matches = res
    } catch (err) {
      console.error('Failed to load matches', err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async startChat(otherUserId) {
      try {
        const res = await post('/chats', { userId: otherUserId })
        this.$router.push({ name: 'ChatRoom', params: { chatId: res._id } })
      } catch (err) {
        console.error('Failed to start chat', err)
      }
    },
    goToProfile(userId) {
      this.$router.push({ name: 'UserProfile', params: { id: userId, page: 'match' } })
    },
  },
}
</script>
