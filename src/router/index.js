import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import ProfileSetup from '@/components/ProfileSetup.vue'
import PhotoSetup from '@/components/PhotoSetup.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/app/recommendations',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/profile-setup',
      name: 'profileSetup',
      component: ProfileSetup,
    },
    {
      path: '/photo-setup',
      name: 'photoSetup',
      component: PhotoSetup,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // {
    //   path: '/user/:page/:id',
    //   name: 'UserProfile',
    //   component: () => import('@/views/UserProfile.vue'),
    // },
    {
      path: '/chats/:chatId',
      name: 'ChatRoom',
      component: () => import('@/components/ChatRoom.vue'),
      props: true,
    },

    // Tabbed layout routes
    {
      path: '/app',
      component: MainLayout,
      children: [
        {
          path: 'recommendations',
          name: 'recommendations',
          component: () => import('@/views/Recomendations.vue'),
        },
        {
          path: 'liked',
          name: 'liked',
          component: () => import('@/components/LikedYou.vue'),
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/components/ChatList.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/AboutView.vue'),
          children: [],
        },
        {
          path: '/user/:page/:id',
          name: 'UserProfile',
          component: () => import('@/views/UserProfile.vue'),
        },
        {
          path: '/chats/:chatId',
          name: 'ChatRoom',
          component: () => import('@/components/ChatRoom.vue'),
          props: true,
        },
      ],
    },
  ],
})

export default router
