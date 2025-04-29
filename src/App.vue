<script>
import Ads from '@/components/Ads.vue'
import { useCommonStore } from './stores/commonStore'

export default {
  name: 'App',
  components: {
    Ads,
  },
  data() {
    return {
      hideLayoutRoutes: ['/login', '/register', '/profile-setup', '/photo-setup'],
    }
  },
  computed: {
    showLayout() {
      return !this.hideLayoutRoutes.includes(this.$route.path)
    },
  },
  created() {
    const commonStore = useCommonStore()
    commonStore.fetchUser()
  },
  watch: {
    $route() {
      // Just triggers reactivity for `showLayout` when route changes
    },
  },
}
</script>

<template>
  <div class="main-container">
    <template v-if="showLayout">
      <div class="left">
        <Ads />
      </div>

      <div class="mid">
        <RouterView />
      </div>

      <div class="right">
        <Ads />
      </div>
    </template>

    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  /* padding: 20px; */
}

.left,
.right {
  width: 150px;
}

.mid {
  flex: 1;
  max-width: 500px;
  min-height: 100vh;
}
</style>
