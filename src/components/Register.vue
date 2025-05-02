<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="min-height: 100vh; background-color: #fff5f8"
  >
    <v-card class="pa-6" width="400">
      <!-- Logo Image -->
      <v-card-title class="text-center">
        <v-img src="../../public/logo-main.png" contain height="100"></v-img>
      </v-card-title>

      <v-card-subtitle class="text-center">Please register to enter.</v-card-subtitle>
      <v-divider class="my-4"></v-divider>

      <v-form ref="register" @submit.prevent="handleSubmit">
        <!-- Email Field with Icon -->
        <v-text-field
          label="Email"
          v-model="form.email"
          :rules="[rules.required, rules.email]"
          prepend-inner-icon="mdi-email"
          outlined
          dense
        ></v-text-field>

        <!-- Password Field with Icon -->
        <v-text-field
          label="Password"
          v-model="form.password"
          type="password"
          :rules="[rules.required, rules.password]"
          prepend-inner-icon="mdi-lock"
          outlined
          dense
        ></v-text-field>

        <!-- Repeat Password Field with Icon -->
        <v-text-field
          label="Repeat Password"
          v-model="form.repeatPassword"
          type="password"
          :rules="[rules.required, rules.matchPassword]"
          prepend-inner-icon="mdi-lock-check"
          outlined
          dense
        ></v-text-field>

        <!-- Buttons -->
        <v-card-actions class="justify-space-between">
          <v-btn text @click="redirectToLogin">
            <!-- <v-icon left>mdi-login</v-icon>  -->
            Login
          </v-btn>
          <div>
            <!-- <v-btn color="grey darken-2" @click="handleCancel">
              <v-icon left>mdi-close</v-icon>
              Cancel
            </v-btn> -->
            <v-btn type="submit" elevation="2">
              <!-- <v-icon left>mdi-account-plus</v-icon>  -->
              Sign Up
            </v-btn>
          </div>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { post } from '@/utils/api'
import { useCommonStore } from '@/stores/commonStore'
import { useToast } from 'vue-toastification'

export default {
  data() {
    return {
      toast: null,
      form: {
        email: '',
        password: '',
        repeatPassword: '',
      },
      rules: {
        required: (value) => !!value || 'This field is required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
        password: (value) => value.length >= 6 || 'Password must be at least 6 characters.',
        matchPassword: (value) => value === this.form.password || 'Passwords do not match.',
      },
      commonStore: null,
    }
  },
  mounted() {
    this.commonStore = useCommonStore()
  },
  created() {
    this.toast = useToast()
    // Check if user is already logged in
    const token = localStorage.getItem('authToken')
    if (token) {
      this.$router.push('/profile-setup') // Redirect to dashboard/profile
    }
  },
  computed: {
    userData() {
      return this.commonStore?.userData
    },
  },
  // watch: {
  //   'commonStore.userData'() {
  //     console.log('in watch of register', this.commonStore.userData)
  //   },
  // },
  methods: {
    async handleSubmit() {
      if (this.$refs.register.validate()) {
        // Here you would typically send the form data to your backend
        try {
          const data = await post('users/register', {
            email: this.form.email,
            password: this.form.password,
          })

          // after successfull registration automatically login user
          // Store JWT in localStorage
          localStorage.setItem('authToken', data.token)
          this.commonStore.setUserData(data.user)

          this.toast.success('Registration successful! Redirecting...')
          setTimeout(() => {
            this.$router.push('/profile-setup') // Redirect to dashboard/profile
          }, 2000)
        } catch (error) {
          console.error('Registration failed:', error)
          this.toast.error(error?.message || 'Login failed')
        }
      }
    },
    handleCancel() {
      this.$refs.form.reset()
    },
    redirectToLogin() {
      this.$router.push('/login') // Change route accordingly
    },
  },
}
</script>
