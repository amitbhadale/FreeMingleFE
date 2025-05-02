<template>
  <v-card
    class="pa-6"
    width="600"
    elevation="1"
    style="background-color: #fff5f8; min-height: 100vh"
  >
    <v-card-title class="text-h5 font-weight-bold">Upload Your Photos</v-card-title>
    <v-divider class="mb-6"></v-divider>

    <!-- File Input -->
    <v-file-input
      ref="fileInput"
      v-model="selectedFiles"
      label="Select Photos"
      accept="image/*"
      multiple
      show-size
      clearable
      prepend-icon="mdi-camera"
      @change="previewImages"
      :rules="[requiredRule, maxFilesRule]"
      outlined
      :disabled="uploadedImages.length >= 6"
      dense
    ></v-file-input>

    <!-- Preview Selected Images -->
    <v-row v-if="imagePreviews.length" class="mt-4" dense>
      <v-col v-for="(image, index) in imagePreviews" :key="'preview-' + index" cols="4">
        <v-img :src="image" aspect-ratio="1" contain class="rounded-lg elevation-2"></v-img>
      </v-col>
    </v-row>

    <!-- Uploaded Photos Section -->
    <v-card-subtitle v-if="hasUploadedImages" class="mt-4 mb-4 text-subtitle-1 font-weight-bold">
      Uploaded Photos
    </v-card-subtitle>

    <v-row v-if="hasUploadedImages" dense>
      <v-col
        v-for="(image, index) in uploadedImages"
        :key="'uploaded-' + index"
        cols="4"
        class="position-relative"
      >
        <v-img :src="image" aspect-ratio="1" contain class="rounded-lg elevation-2">
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-btn
          v-if="uploadedImages.length > 1"
          color="red"
          x-small
          class="ma-1"
          style="
            position: absolute;
            top: 2px;
            right: 2px;
            width: 24px;
            height: 24px;
            min-width: 24px;
            padding: 0;
            border-radius: 50%;
          "
          @click="confirmDelete(index)"
        >
          <v-icon x-small>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-else type="info" class="mt-4" dense> No photos uploaded yet. </v-alert>

    <!-- Buttons Section -->
    <v-card-actions class="mt-6 d-flex justify-space-between">
      <v-btn color="grey darken-1" text @click="redirectToHome" v-if="hasUploadedImages">
        <v-icon left>mdi-home</v-icon> Home
      </v-btn>

      <v-btn
        color="primary"
        :disabled="!selectedFiles.length || isUploading"
        @click="validateAndUpload"
        :loading="isUploading"
      >
        <v-icon left>mdi-upload</v-icon> Upload
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>Are you sure you want to delete this photo?</v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text color="grey" @click="deleteDialog = false"> Cancel </v-btn>
        <v-btn color="error" @click="deletePhoto"> Yes, Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useCommonStore } from '@/stores/commonStore'
import { useToast } from 'vue-toastification'
import { post, del } from '@/utils/api'

export default {
  data() {
    return {
      deleteDialog: false,
      imageToDeleteIndex: null, // which image to delete
      toast: null,
      selectedFiles: [],
      imagePreviews: [],
      uploadedImages: [],
      isUploading: false,
      commonStore: null,
    }
  },
  created() {
    this.toast = useToast()
  },
  mounted() {
    this.commonStore = useCommonStore()
    this.setUploadedImages()
  },
  watch: {
    'commonStore.userData': {
      immediate: true,
      handler() {
        this.setUploadedImages()
      },
    },
  },
  methods: {
    confirmDelete(index) {
      this.imageToDeleteIndex = index
      this.deleteDialog = true
    },
    async deletePhoto() {
      if (this.imageToDeleteIndex !== null) {
        try {
          const imageUrl = this.uploadedImages[this.imageToDeleteIndex]
          // Call your API to delete the image from the backend
          const res = await del('users/delete-photos', {
            data: { imageUrl },
          })
          this.commonStore.setUserData(res.user)
          // After successful API call, remove from frontend list
          this.uploadedImages.splice(this.imageToDeleteIndex, 1)

          this.toast.success('Image deleted successfully!')
        } catch (error) {
          console.error('Failed to delete image:', error)
          this.toast.error('Failed to delete image. Please try again.')
        }
      }
      this.deleteDialog = false
    },

    previewImages() {
      this.imagePreviews = []
      if (this.selectedFiles?.length) {
        this.selectedFiles.forEach((file) => {
          const reader = new FileReader()
          reader.onload = (e) => this.imagePreviews.push(e.target.result)
          reader.readAsDataURL(file)
        })
      }
    },

    async validateAndUpload() {
      const isValid = await this.$refs.fileInput.validate()
      if (isValid.length) {
        for (const err of isValid) {
          this.toast.error(err)
        }
        return
      }

      if (!isValid.length) {
        this.uploadPhotos()
      }
    },

    async uploadPhotos() {
      const formData = new FormData()

      this.selectedFiles.forEach((file) => {
        formData.append('photos', file)
      })

      this.isUploading = true
      try {
        const token = localStorage.getItem('authToken')
        const response = await post('users/upload-images', formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        })

        const updatedImages = this.getFullImageURL(response.images)
        this.commonStore.setUserImages(response.images)

        // Update local UI
        this.uploadedImages = updatedImages
        this.selectedFiles = []
        this.imagePreviews = []

        this.toast.success('Photos uploaded successfully!')
      } catch (error) {
        this.toast.error(error.response?.data?.message || 'Upload failed')
        console.error(error)
      } finally {
        this.isUploading = false
      }
    },

    redirectToHome() {
      this.$router.push('/')
    },

    setUploadedImages() {
      const images = this.commonStore?.userData?.images || []
      this.uploadedImages = this.getFullImageURL(images)
    },
  },
  computed: {
    requiredRule() {
      return (files) => (files && files.length > 0) || 'At least one photo is required'
    },
    maxFilesRule() {
      return (files) => !files || files.length <= 6 || 'You can select a maximum of 6 photos'
    },
    hasUploadedImages() {
      return this.uploadedImages.length > 0
    },
    getFullImageURL() {
      return (imageArray) => {
        return imageArray.map((image) => {
          if (image.startsWith('/uploads/')) {
            const serverURL = import.meta.env.VITE_BACKEND_URL
            return `${serverURL}${image}`
          }
          return image
        })
      }
    },
  },
}
</script>

<style scoped>
.v-card-title {
  justify-content: center;
}
.v-card-subtitle {
  text-align: center;
}
</style>
