import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthView from '@/views/AuthView.vue'
import AlbumDetailView from '@/views/AlbumDetailView.vue'
import ImageDetailView from '@/views/ImageDetailView.vue'
import ProfileView from '@/views/ProfileView.vue'
import UploadSectionView from '@/views/UploadSectionView.vue'
import AlbumsView from '@/views/AlbumsView.vue'
// import AlbumVideoTest from '@/views/AlbumVideoTest.vue'
import NotFound from '@/views/NotFound.vue'
import Forbidden from '@/views/Forbidden.vue'
import PricingView from '@/views/PricingView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import AuthCallbackSSOView from '@/views/AuthCallbackSSOView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            title: 'Home - PixoVault',
          },
        },

        {
          path: '/albums/:albumId/details',
          name: 'albumDetails',
          component: AlbumDetailView,
          meta: {
            title: 'Album Details - PixoVault',
          },
        },
        {
          path: '/profile/:userId',
          name: 'profile',
          component: ProfileView,
          meta: {
            title: 'Profile - PixoVault',
          },
        },
        {
          path: '/album/:albumId/edit',
          name: 'album-edit',
          component: UploadSectionView,
          meta: {
            title: 'Edit Album - PixoVault',
          },
        },
        {
          path: '/image/:id/temp',
          name: 'temp-image',
          component: ImageDetailView,
          meta: {
            title: 'Image Details - PixoVault',
          },
        },
        {
          path: '/albums',
          name: 'albums',
          component: AlbumsView,
          meta: {
            title: 'Albums - PixoVault',
          },
        },
        {
          path: '/auth/callback',
          name: 'auth-callback',
          component: AuthCallbackSSOView,
          meta: { title: 'SSO Login' },
        },
        {
          path: '/pricing',
          name: 'pricing',
          component: PricingView,
          meta: {
            title: 'Pricing - PixoVault',
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: {
        title: 'Login - PixoVault',
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: AuthView,
      meta: {
        title: 'Sign Up - PixoVault',
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ForgotPasswordView,
      meta: {
        title: 'Reset Password - PixoVault',
      },
    },
    // {
    //   path: '/album/test/:albumId',
    //   name: 'test-album',
    //   component: AlbumVideoTest,
    // },

    {
      path: '/403',
      name: 'Forbidden',
      component: Forbidden,
      meta: {
        title: 'Forbidden - PixoVault',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: 'Page Not Found - PixoVault',
      },
    },
  ],
})

// Update title berdasarkan meta title setiap kali route berubah
router.afterEach((to) => {
  document.title = to.meta.title || 'PixoVault - Your Photo Album Platform'
})

export default router
