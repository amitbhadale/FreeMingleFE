<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 100vh">
    <v-card class="pa-6 elevation-1" width="800" style="background-color: #fff5f8">
      <v-card-title class="text-h4 font-weight-bold text-center">Profile Setup</v-card-title>
      <v-card-subtitle class="text-center text-subtitle-1">
        Complete your profile to get better matches
      </v-card-subtitle>
      <v-divider class="my-4"></v-divider>

      <v-stepper
        v-model="step"
        :items="['Basic Info', 'Preferences', 'Work & Location']"
        show-actions
        :key="stepperKey"
      >
        <!-- Step 1 -->
        <template v-slot:item.1>
          <v-form ref="form1">
            <v-text-field
              label="First Name"
              v-model="form.name"
              :rules="[rules.required]"
              outlined
              dense
              counter="30"
              maxlength="30"
            ></v-text-field>

            <v-text-field
              v-if="!form.mandatoryProfileSetupDone"
              label="Date of Birth"
              v-model="form.dateOfBirth"
              :rules="[rules.required]"
              outlined
              dense
              type="date"
              @input="updateDate($event.target.value)"
            ></v-text-field>

            <v-select
              label="Gender"
              v-model="form.gender"
              :items="['Male', 'Female', 'Other']"
              :rules="[rules.required]"
              outlined
              dense
            ></v-select>

            <v-textarea
              label="About Me"
              v-model="form.aboutMe"
              outlined
              dense
              rows="3"
              auto-grow
              counter="250"
              maxlength="250"
            ></v-textarea>

            <v-select
              label="Relationship Status"
              v-model="form.relationshipStatus"
              :items="['Single', 'Divorced', 'Widowed', 'Separated']"
              outlined
              dense
            ></v-select>

            <v-radio-group
              v-model="form.searchingFor"
              label="What are you searching for?"
              :rules="[rules.required]"
            >
              <v-row>
                <v-col cols="6">
                  <v-radio label="Date" value="Date"></v-radio>
                </v-col>
                <v-col cols="6">
                  <v-radio label="Friendship" value="Friendship"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>

            <v-radio-group
              v-model="form.interestedGender"
              label="Interested in?"
              :rules="[rules.required]"
            >
              <v-row>
                <v-col cols="4">
                  <v-radio label="Male" value="Male"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Female" value="Female"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="All" value="All"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-form>
        </template>

        <!-- Step 2 -->
        <template v-slot:item.2>
          <v-form ref="form2">
            <v-label>What are you looking for?</v-label>
            <v-row dense>
              <v-col
                cols="6"
                v-for="option in ['Long-term', 'Marriage', 'Casual dates', 'Not Sure']"
                :key="option"
              >
                <v-checkbox
                  :label="option"
                  :value="option"
                  v-model="form.lookingFor"
                  dense
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-text-field
              label="Height(cm)"
              v-model="form.height"
              required
              outlined
              dense
              type="number"
              min="0"
              max="300"
            ></v-text-field>

            <v-select
              label="Hobbies"
              v-model="form.hobbies"
              :items="[
                'Travel',
                'Reading',
                'Gym',
                'Cooking',
                'Movies & TV',
                'Gaming',
                'Dancing',
                'Singing',
                'Clubbing',
                'Cycling',
                'Swimming',
                'Photography',
                'Hiking',
                'Yoga',
                'Meditation',
                'Writing',
                'Drawing',
                'Painting',
                'Board Games',
                'DIY Projects',
                'Gardening',
                'Riding',
                'Volunteering',
                'Blogging',
                'Collecting',
              ]"
              multiple
              chips
              outlined
              dense
            ></v-select>

            <v-select
              label="Qualities You Are Looking For"
              v-model="form.qualities"
              :items="[
                'Confidence',
                'Empathy',
                'Honesty',
                'Kindness',
                'Ambition',
                'Humor',
                'Patience',
                'Creativity',
                'Gratitude',
                'Optimism',
                'Resilience',
                'Curiosity',
                'Forgiveness',
                'Generosity',
                'Respect',
              ]"
              multiple
              chips
              outlined
              dense
            ></v-select>
            <v-radio-group v-model="form.drink" label="Do you drink alcohol?">
              <v-radio label="Yes" value="Yes"></v-radio>
              <v-radio label="No" value="No"></v-radio>
            </v-radio-group>

            <v-radio-group v-model="form.smoke" label="Do you smoke?">
              <v-radio label="Yes" value="Yes"></v-radio>
              <v-radio label="No" value="No"></v-radio>
            </v-radio-group>

            <v-radio-group v-model="form.religiousViews" label="Religious Views" dense>
              <v-row>
                <v-col cols="4">
                  <v-radio label="Jain" value="Jain"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Hindu" value="Hindu"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Muslim" value="Muslim"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Christian" value="Christian"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Sikh" value="Sikh"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Other" value="Other"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>

            <v-radio-group v-model="form.politicalViews" label="Political Views" dense>
              <v-row>
                <v-col cols="4">
                  <v-radio label="Conservative" value="Conservative"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Right" value="Right"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Left" value="Left"></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio label="Apolitical" value="Apolitical"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-form>
        </template>

        <!-- Step 3 -->
        <template v-slot:item.3>
          <v-form ref="form3">
            <v-text-field label="City" v-model="form.city" required outlined dense></v-text-field>
            <v-text-field label="State" v-model="form.state" required outlined dense></v-text-field>
            <v-text-field
              label="Zip"
              v-model="form.zip"
              :rules="[rules.required]"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Country"
              v-model="form.country"
              required
              outlined
              dense
            ></v-text-field>

            <v-select
              label="Languages Spoken"
              v-model="form.languagesSpoken"
              :items="languageOptions"
              multiple
              chips
              outlined
              dense
            ></v-select>

            <v-radio-group v-model="form.education" label="Education">
              <v-radio label="High School" value="High School"></v-radio>
              <v-radio label="Bachelors" value="Bachelors"></v-radio>
              <v-radio label="Masters" value="Masters"></v-radio>
              <v-radio label="PhD" value="PhD"></v-radio>
            </v-radio-group>

            <v-text-field
              label="Designation"
              v-model="form.designation"
              outlined
              dense
            ></v-text-field>
            <v-text-field label="Company" v-model="form.company" outlined dense></v-text-field>
          </v-form>
        </template>
      </v-stepper>

      <v-card-actions class="justify-end mt-4">
        <!-- <v-btn v-if="step > 0" @click="step--">Back</v-btn> -->
        <!-- <v-btn v-if="step < 2" @click="step++" color="primary">Next</v-btn> -->
        <v-btn color="grey darken-2" @click="handleCancel">Cancel</v-btn>
        <v-btn v-if="step === 3" @click="handleSubmit" elevation="2">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { put } from '@/utils/api'
import { useCommonStore } from '@/stores/commonStore'
import { useToast } from 'vue-toastification'

export default {
  data() {
    return {
      toast: null,
      step: 0,
      stepperKey: 0,
      form: {
        name: '',
        email: '',
        gender: '',
        city: '',
        dateOfBirth: null,
        state: '',
        zip: '',
        country: '',
        interestedGender: '',
        searchingFor: '',
        lookingFor: [],
        height: '',
        hobbies: [],
        qualities: [],
        drink: '',
        smoke: '',
        religiousViews: '',
        politicalViews: '',
        education: '',
        designation: '',
        company: '',
        aboutMe: '',
        relationshipStatus: '',
        languagesSpoken: [],
        isVerified: true,
      },
      rules: {
        required: (v) => !!v || 'Required.',
      },
      languageOptions: [
        'English',
        'Hindi',
        'Marathi',
        'Punjabi',
        'Gujarati',
        'Bengali',
        'Tamil',
        'Telugu',
        'Malayalam',
        'Kannada',
        'Urdu',
        'Arabic',
        'Other',
      ],
      commonStore: null,
      rules: {
        required: (value) => !!value || 'This field is required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
    }
  },
  created() {
    this.toast = useToast()
  },
  mounted() {
    this.commonStore = useCommonStore()
    this.form.email = this.commonStore?.userData?.email
  },
  computed: {
    userData() {
      this.form.email = this.commonStore?.userData?.email
      this.form.id = this.commonStore?.userData?.id
      this.form = {
        ...this.form,
        ...this.commonStore?.userData,
      }
      // if (this.commonStore?.userData?.mandatoryProfileSetupDone) {
      //   this.$router.push('/photo-setup')
      //   return
      // }
      return this.commonStore?.userData
    },
  },
  watch: {
    userData: {
      handler(newValue) {
        this.form = {
          ...this.form,
          ...newValue,
        }
      },
      immediate: true,
    },
  },

  methods: {
    async handleSubmit() {
      const form1 = this.$refs.form1
      const form2 = this.$refs.form2
      const form3 = this.$refs.form3
      if (form1 && form2 && form3) {
        const { valid: valid1 } = await form1.validate()
        const { valid: valid2 } = await form2.validate()
        const { valid: valid3 } = await form3.validate()
        if (valid1 && valid2 && valid3) {
          // this.stepperKey += 1
          // this.step += 1
          if (valid1 && valid2 && valid3) {
            // if dateOfBirth is null then delete that from form
            if (!this.form.dateOfBirth) {
              delete this.form.dateOfBirth
            }
            if (!this.form.email) {
              delete this.form.email
            }

            try {
              const data = await put('users/me', this.form)
              // data.dateOfBirth = data.dateOfBirth ? data.dateOfBirth.split('T')[0] : null
              this.toast.success('Profile updated successfully')

              if (data.mandatoryProfileSetupDone) {
                this.$router.push('/photo-setup')
              }

              this.commonStore.setUserData({
                ...this.commonStore.userData,
                ...data,
              })
            } catch (e) {
              console.log('Error:', e)
              this.toast.error(e?.message || 'Error updating profile')
            }
          } else {
            this.toast.error('Form is invalid. Please fill in all required fields.')
          }
        } else {
          this.toast.error('Form is invalid. Please fill in all required fields.')
        }
      } else {
        this.toast.error('Form references are not available.')
      }
    },
    handleCancel() {
      this.$refs.form1?.reset()
      this.$refs.form2?.reset()
      this.$refs.form3?.reset()
      this.$router.push('/')
    },
    updateDate(newDate) {
      this.form.dateOfBirth = newDate // Save the newly selected date
    },
  },
}
</script>
<style scoped>
.v-stepper__step--active .v-stepper__step__step {
  background-color: #1976d2;
  color: white;
}
</style>
