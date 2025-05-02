<template>
  <!-- <v-container> -->
  <v-card class="mx-auto" width="400px" style="min-height: 100%">
    <v-toolbar color="surface" density="compact" height="0">
      <template v-slot:extension>
        <v-tabs v-model="tab" color="pink" grow fixed-tabs class="sticky-tabs">
          <v-tab :value="'recommendations'" :to="{ name: 'recommendations' }">
            <v-icon>mdi-account-group</v-icon>
          </v-tab>
          <v-tab :value="'liked'" :to="{ name: 'liked' }">
            <v-icon>mdi-heart</v-icon>
          </v-tab>
          <v-tab :value="'chat'" :to="{ name: 'chat' }">
            <v-icon>mdi-chat</v-icon>
          </v-tab>
          <v-tab :value="'profile'" :to="{ name: 'profile' }">
            <v-icon>mdi-account-box</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <router-view />
    <v-footer>
      <v-row class="d-flex justify-center align-center" no-gutters>
        <v-col cols="12" class="text-center">
          <span>&copy; {{ new Date().getFullYear() }} FreeMingle</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-card>

  <!-- </v-container> -->
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      tab: this.$route.name,
    }
  },
  watch: {
    '$route.name'(newVal) {
      this.tab = newVal
    },
  },
}
</script>

<style scoped>
.sticky-tabs {
  position: sticky;
  top: 0;
  z-index: 1000; /* Ensures the tabs stay above content */
  background-color: white; /* To prevent content bleeding through */
}
.v-tab:hover {
  background-color: #ffe6ee !important;
}
</style>
