<template>
  <v-card class="profile-card mx-auto" max-width="450" elevation="10" rounded="0">
    <!-- First Image -->
    <v-img
      v-if="updatedImages?.length"
      :src="updatedImages[0]"
      height="300"
      class="rounded-t-2xl"
      cover
    ></v-img>

    <!-- Profile Info -->
    <v-card-text class="py-4">
      <v-sheet class="pa-0 mb-4" color="transparent">
        <!-- Name and Age -->
        <div class="d-flex align-center mb-2">
          <h2 class="text-h5 font-weight-bold mb-0">
            {{ user.name }},
            <span class="text-body-2 grey--text ml-2">{{ user.age }} yrs</span>
          </h2>
        </div>

        <!-- Location -->
        <div class="d-flex align-center text-body-2 grey--text mb-1" v-if="user.city || user.state">
          <v-icon size="18" class="mr-2 grey--text">mdi-map-marker</v-icon>
          <span class="ml-1">{{ user.city ? user.city + ',' : '' }} {{ user.state }}</span>
        </div>

        <!-- Designation -->
        <div
          class="d-flex align-center text-body-2 grey--text"
          v-if="user.designation && user.company"
        >
          <v-icon size="18" class="mr-2 grey--text">mdi-briefcase</v-icon>
          <!-- changed mr-1 to mr-2 -->
          <span class="ml-1">
            {{ user.designation }} {{ user.company ? 'at' : '' }} {{ user.company }}
          </span>
        </div>
      </v-sheet>

      <!-- About Me Card -->
      <v-card class="mb-4" elevation="2" rounded="lg">
        <v-card-text>
          <div class="section-title">
            <v-icon small class="mr-2">mdi-account-circle</v-icon> About Me
          </div>
          <div class="grey--text text-subtitle-2 mt-2">
            {{ user.aboutMe || 'No description available.' }}
          </div>
        </v-card-text>
      </v-card>

      <!-- second image -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="updatedImages?.length > 1">
        <v-img :src="updatedImages[1]" height="300" class="rounded-t-2xl" cover></v-img>
      </v-card>

      <!-- Basic Details Card -->
      <v-card class="mb-4" elevation="2" rounded="lg">
        <v-card-text>
          <div class="section-title">
            <v-icon small class="mr-2">mdi-information-outline</v-icon> Details
          </div>

          <v-row dense class="mt-2">
            <v-col cols="6" v-if="user.gender">
              <div class="detail-item">
                <v-icon
                  small
                  class="mr-1"
                  :icon="user.gender === 'Male' ? 'mdi-gender-male' : 'mdi-gender-female'"
                ></v-icon>
                {{ user.gender }}
              </div>
            </v-col>

            <v-col cols="6" v-if="user.height">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-ruler</v-icon> {{ user.height }} cm
              </div>
            </v-col>

            <v-col cols="6" v-if="user.drink">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-glass-cocktail</v-icon>{{ user.drink }}
              </div>
            </v-col>

            <v-col cols="6" v-if="user.smoke">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-smoking</v-icon> {{ user.smoke }}
              </div>
            </v-col>

            <v-col cols="6" v-if="user.education">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-school</v-icon> {{ user.education }}
              </div>
            </v-col>

            <v-col cols="6" v-if="user.relationshipStatus">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-account-heart</v-icon> {{ user.relationshipStatus }}
              </div>
            </v-col>

            <v-col cols="6" v-if="user.politicalViews">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-account-tie</v-icon> {{ user.politicalViews }}
              </div>
            </v-col>
            <v-col cols="6" v-if="user.religiousViews">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-hand-peace</v-icon> {{ user.religiousViews }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- third image -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="updatedImages?.length > 2">
        <v-img :src="updatedImages[2]" height="300" class="rounded-t-2xl" cover></v-img>
      </v-card>

      <!-- Looking For Card -->
      <v-card class="mb-4" elevation="2" rounded="lg">
        <v-card-text>
          <div class="section-title mb-2">
            <v-icon small class="mr-2">mdi-account-search</v-icon> Looking For
          </div>

          <div>
            <v-chip
              v-for="(item, index) in user.lookingFor"
              :key="'lookingFor-' + index"
              color="primary"
              class="ma-1"
              label
              small
            >
              {{ item }}
            </v-chip>
            <span v-if="!user.lookingFor.length" class="grey--text text-subtitle-2">
              Not specified
            </span>
          </div>

          <!-- Divider -->
          <v-divider class="my-4"></v-divider>

          <!-- Qualities Section -->
          <div v-if="user.qualities && user.qualities.length">
            <!-- <div class="section-title mb-2">
              <v-icon small class="mr-2">mdi-star</v-icon> Qualities
            </div> -->
            <div>
              <v-chip
                v-for="(quality, index) in user.qualities"
                :key="'quality-' + index"
                color="secondary"
                class="ma-1"
                label
                small
              >
                {{ quality }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- fourth image -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="updatedImages?.length > 3">
        <v-img :src="updatedImages[3]" height="300" class="rounded-t-2xl" cover></v-img>
      </v-card>

      <!-- Hobbies Card -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="user?.hobbies.length">
        <v-card-text>
          <div class="section-title mb-2">
            <v-icon small class="mr-2">mdi-heart</v-icon> Hobbies
          </div>
          <div>
            <v-chip
              v-for="(hobby, index) in user?.hobbies"
              :key="index"
              color="pink lighten-3"
              class="ma-1"
              label
              small
            >
              {{ hobby }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <!-- fifth image -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="updatedImages?.length > 4">
        <v-img :src="updatedImages[4]" height="300" class="rounded-t-2xl" cover></v-img>
      </v-card>

      <!-- Languages Spoken Card -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="user.languagesSpoken.length">
        <v-card-text>
          <div class="section-title mb-2">
            <v-icon small class="mr-2">mdi-translate</v-icon> Languages Spoken
          </div>
          <div>
            <v-chip
              v-for="(language, index) in user.languagesSpoken"
              :key="index"
              color="blue lighten-3"
              class="ma-1"
              label
              small
            >
              {{ language }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <!-- sixth image -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="updatedImages?.length > 5">
        <v-img :src="updatedImages[5]" height="300" class="rounded-t-2xl" cover></v-img>
      </v-card>

      <!-- Like / Dislike Buttons -->
      <div v-if="!isMatchPage" class="d-flex justify-center mt-6">
        <v-btn class="mx-2 like-button" @click="likeProfile" elevation="8">
          <v-icon left>mdi-thumb-up</v-icon> &nbsp; Like back
        </v-btn>
        <v-btn class="mx-2 dislike-button" @click="unlikeProfile" elevation="8">
          <!-- <v-icon left>mdi-thumb-down</v-icon> -->
          Remove
        </v-btn>
      </div>
      <div v-else class="d-flex justify-center mt-6">
        <v-btn class="mx-2 like-button" elevation="8" @click="goToChat(userId)">
          <v-icon left>mdi-chat</v-icon> &nbsp; Chat with them
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import { get, post } from '@/utils/api'
import { useToast } from 'vue-toastification'

export default {
  name: 'UserProfile',
  data() {
    return {
      toast: null,
      userId: this.$route.params.id,
      user: {
        name: '',
        email: '',
        gender: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        searchingFor: '',
        interestedGender: '',
        lookingFor: [],
        height: '',
        hobbies: [],
        drink: '',
        smoke: '',
        images: [],
        createdAt: '',
        mandatoryProfileSetupDone: null,
        photosUploaded: null,
        politicalViews: '',
        designation: '',
        company: '',
        qualities: [],
        religiousViews: '',
        aboutMe: '',
        dateOfBirth: '',
        languagesSpoken: [],
        relationshipStatus: '',
      },
    }
  },
  created() {
    this.fetchUserProfile()
  },
  methods: {
    async fetchUserProfile() {
      try {
        const res = await get(`users/${this.userId}`)

        if (res) {
          this.user = res
        } else {
          this.$toast.error('User not found.')
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        this.$toast.error('Failed to fetch user profile. Please try again.')
      }
    },
    async likeProfile() {
      // Implement your like logic here
      try {
        const res = await post(`users/like`, {
          toUserId: this.userId,
        })

        this.toast.success(res.message || 'Its a Match')
        this.$router.push('/') // later change it to go to match list page
      } catch (error) {
        console.error('Failed to like profile', error)
        this.toast.error('Failed to like profile. Please try again.')
      }
    },
    async unlikeProfile() {
      // Implement your unlike logic here
      try {
        const res = await post(`users/unlike`, {
          toUserId: this.userId,
        })

        this.toast.success(res.message || 'Like removed.')
        this.$router.push('/')
      } catch (error) {
        console.error('Failed to unlike profile', error)
        this.toast.error('Failed to unlike profile. Please try again.')
      }
    },
    goToChat(userId) {
      this.$router.push({ name: 'ChatRoom', params: { chatId: userId } })
      // this.$router.push({ name: 'ChatRoom', params: { chatId: res._id } })
    },
  },
  computed: {
    updatedImages() {
      return this.user?.images.map((img) => {
        if (img.startsWith('/uploads/')) {
          const serverURL = import.meta.env.VITE_BACKEND_URL
          return `${serverURL}${img}`
        }
        return img
      })
    },
    isMatchPage() {
      return this.$route.params.page === 'match'
    },
  },
  mounted() {
    this.toast = useToast()
  },
}
</script>
<style scoped>
.profile-card {
  background-color: #fff5f8;
  /* border-radius: 24px; */
}

.section-title {
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.detail-item {
  font-size: 14px;
  color: #616161;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.wrap-text {
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}
.like-button {
  background: linear-gradient(45deg, #4caf50, #81c784);
  color: white;
  transition: all 0.3s ease;
  border-radius: 12px;
}
.like-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(76, 175, 80, 0.6);
}

.dislike-button {
  background: linear-gradient(45deg, #ffa000, #ffca28);
  /* background: linear-gradient(45deg, #ff9800, #ffc107); */

  color: white;
  transition: all 0.3s ease;
  border-radius: 12px;
}
.dislike-button:hover {
  transform: scale(1.1);
  /* box-shadow: 0 8px 16px rgba(229, 57, 53, 0.6); */
  box-shadow: 0 8px 16px rgba(255, 193, 7, 0.6);
  /* box-shadow: 0 8px 16px rgba(255, 193, 7, 0.4); */
}

.recommendation-page {
  padding: 20px;
}
.user-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
}
.loading,
.end-message {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}
</style>
