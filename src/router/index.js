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
        },

        {
          path: '/album/:albumId/details',
          name: 'albumDetails',
          component: AlbumDetailView,
        },
        {
          path: '/profile/:userId',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: '/album/:albumId/edit',
          name: 'album-edit',
          component: UploadSectionView,
        },
        {
          path: '/image/:id/temp',
          name: 'temp-image',
          component: ImageDetailView,
        },
        {
          path: '/albums',
          name: 'albums',
          component: AlbumsView,
        },
        {
          path: '/pricing',
          name: 'pricing',
          component: PricingView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: AuthView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ForgotPasswordView
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
