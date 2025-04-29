<template>
  <v-card class="profile-card mx-auto" max-width="450" elevation="10" rounded="0">
    <!-- Profile Images Carousel -->
    <v-carousel
      v-if="updatedImages.length"
      hide-delimiter-background
      height="300"
      class="rounded-t-2xl"
    >
      <v-carousel-item v-for="(img, index) in updatedImages" :key="index">
        <v-img :src="img" cover></v-img>
      </v-carousel-item>
    </v-carousel>

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
                <v-icon small class="mr-1">mdi-glass-cocktail</v-icon> Drinks: {{ user.drink }}
              </div>
            </v-col>

            <v-col cols="6" v-if="user.smoke">
              <div class="detail-item">
                <v-icon small class="mr-1">mdi-smoking</v-icon> Smokes: {{ user.smoke }}
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

      <!-- Here For Card -->
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

      <!-- Hobbies Card -->
      <v-card class="mb-4" elevation="2" rounded="lg" v-if="user.hobbies.length">
        <v-card-text>
          <div class="section-title mb-2">
            <v-icon small class="mr-2">mdi-heart</v-icon> Hobbies
          </div>
          <div>
            <v-chip
              v-for="(hobby, index) in user.hobbies"
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

      <!-- Edit Profile Button -->
      <v-btn block color="primary" class="mt-6" @click="editProfile">
        <v-icon left>mdi-pencil</v-icon>&nbsp; Edit Profile
      </v-btn>
      <v-btn block color="info" class="mt-2" @click="editPhoto">
        <v-icon left>mdi-camera</v-icon>&nbsp; Edit Photo
      </v-btn>

      <v-btn block color="red" class="mt-2" @click="logout">
        <v-icon left>mdi-logout</v-icon>&nbsp; Logout
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { useCommonStore } from '@/stores/commonStore'

export default {
  name: 'ProfileCard',
  data() {
    return {
      commonStore: null,
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
  mounted() {
    this.commonStore = useCommonStore()
  },
  computed: {
    userData() {
      return this.commonStore?.userData
    },
    updatedImages() {
      return this.user.images.map((img) => {
        if (img.startsWith('/uploads/')) {
          const serverURL = import.meta.env.VITE_BACKEND_URL
          return `${serverURL}${img}`
        }
        return img
      })
    },
  },
  watch: {
    userData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.user = { ...this.user, ...newVal }
        }
      },
    },
  },
  methods: {
    editProfile() {
      // You can navigate to edit page or emit event
      this.$router.push('/profile-setup')
    },
    editPhoto() {
      // You can navigate to edit photo page or emit event
      this.$router.push('/photo-setup')
    },
    logout() {
      // Implement logout logic here
      this.commonStore.logout()
      this.$router.push('/login')
    },
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
</style>
