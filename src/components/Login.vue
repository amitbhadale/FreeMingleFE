<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 100vh; background-color: #fff5f8"
  >
    <v-card class="pa-6" width="400">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-subtitle>Please login to enter.</v-card-subtitle>
      <v-divider class="my-3"></v-divider>

      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          label="Email"
          v-model="form.email"
          required
          outlined
          @input="form.email = form.email.toLowerCase()"
          prepend-icon="mdi-email"
        ></v-text-field>

        <v-text-field
          label="Password"
          v-model="form.password"
          required
          outlined
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>

        <!-- Buttons Section -->
        <v-card-actions class="d-flex justify-space-between">
          <!-- Sign Up Button at Left Bottom -->
          <v-btn color="blue darken-1" text @click="redirectToSignUp">
            <!-- <v-icon left>mdi-account-plus</v-icon>  -->
            Sign Up
          </v-btn>

          <div>
            <v-btn color="grey" @click="handleCancel">Cancel</v-btn>
            <v-btn type="submit" color="primary" elevation="2">Login</v-btn>
          </div>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { get, post } from '@/utils/api'
import { useCommonStore } from '@/stores/commonStore'
import { useToast } from 'vue-toastification'

export default {
  data() {
    return {
      toast: null,
      form: {
        email: '',
        password: '',
      },
      commonStore: null,
    }
  },
  created() {
    this.commonStore = useCommonStore()
    this.toast = useToast()
  },
  methods: {
    async handleSubmit() {
      console.log('Form submitted:', this.form)
      try {
        const data = await post('users/login', {
          email: this.form.email,
          password: this.form.password,
        })

        console.log('Login successful:', data)
        this.toast.success('Login successful')
        this.commonStore.setToken(data.token)
        this.commonStore.setUserData(data.user)

        // check mandatoryProfileSetupDone
        if (!data.user.mandatoryProfileSetupDone) {
          this.$router.push('/profile-setup')
          return
        } else if (!data.user.photosUploaded) {
          this.$router.push('/photo-setup')
          return
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Login failed:', error)
        this.toast.error(error?.message || 'Login failed')
      }
    },
    handleCancel() {
      this.form.email = ''
      this.form.password = ''
    },
    redirectToSignUp() {
      this.$router.push('/register') // Adjust route as needed
    },
  },
}
</script>
