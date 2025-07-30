<script setup>
// Tidak ada logic khusus
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api'

const authStore = useAuthStore()

const open = ref(false)
const isLogin = ref(JSON.parse(localStorage.getItem('user')) ? true : false)
const userProfile = ref(JSON.parse(localStorage.getItem('user')))

const openContact = () => {
  window.location.href = 'mailto:support@pixovault.com'
}

const signOut = async () => {
  console.log('Signing out...')
  try {
    // Kirim permintaan logout ke server
    const response = await api.post('/logout', {}, { skipAuthErrorHandler: true })

    // Bersihkan data autentikasi dari localStorage
    if (response.status === 200) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')

      window.location.href = '/'
    }

    // Redirect ke halaman beranda
    // window.location.href = '/';
  } catch (error) {
    console.error(error.response?.data || error.message)
  }
}
</script>

<template>
  <header class="bg-white sticky top-0 shadow-sm z-200">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            />
          </svg> -->

          <img src="/pixovault.png" alt="PixoVault Logo" class="h-12 w-12 mr-2" />
          <router-link to="/" class="text-gray-800 text-lg font-semibold">
            <span class="text-xl font-bold text-blue-500">PixoVault</span>
          </router-link>
        </div>
        <div class="hidden md:flex space-x-8">
          <router-link to="/" class="font-medium text-gray-600 hover:text-blue-500 transition"
            >Home</router-link
          >
          <router-link to="/" class="font-medium text-gray-600 hover:text-blue-500 transition"
            >Features</router-link
          >
          <router-link
            to="/pricing"
            class="font-medium text-gray-600 hover:text-blue-500 transition"
            >Pricing</router-link
          >
          <!-- <router-link to="" class="font-medium text-gray-600 hover:text-blue-500 transition"
            >Blog</router-link
          > -->
          <button
            @click="openContact"
            class="font-medium text-gray-600 hover:text-blue-500 transition cursor-pointer"
          >
            Contact
          </button>
        </div>

        <!-- User Section  -->
        <div v-if="isLogin" class="flex items-center space-x-4">
          <router-link
            :to="{
              name: 'profile',
              params: { userId: userProfile?.id || 1 },
              query: { activeTab: 'upload' },
            }"
            class="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition hidden md:block"
          >
            Upload
          </router-link>
          <div class="relative" x-data="{ open: false }">
            <button @click="open = !open" class="flex items-center space-x-2 focus:outline-none">
              <div
                class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold"
              >
                {{ userProfile?.firstName ?? 'JD' }}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              v-show="open"
              @click.away="open = false"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <router-link
                :to="{
                  name: 'profile',
                  params: { userId: userProfile?.id ?? 1 },
                  query: { activeTab: 'albums' },
                }"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-100 font-medium"
                >Profile</router-link
              >
              <router-link
                :to="{
                  name: 'profile',
                  params: { userId: userProfile?.id ?? 1 },
                  query: { activeTab: 'settings' },
                }"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-100 font-medium"
                >Settings</router-link
              >
              <router-link
                to=""
                class="md:hidden block px-4 py-2 text-gray-700 hover:bg-blue-100 font-medium"
                >Pricing</router-link
              >
              <router-link
                :to="{
                  name: 'profile',
                  params: { userId: userProfile?.id ?? 1 },
                  query: { activeTab: 'albums' },
                }"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-100 font-medium"
                >My Albums</router-link
              >
              <hr class="my-1 border-gray-200" />
              <button
                @click="signOut"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-100 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <!-- User Section Login  -->
        <div v-else class="flex items-center space-x-2">
          <router-link
            to="/login"
            class="text-blue-600 px-4 py-2 rounded-full font-medium transition"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition"
          >
            Sign up
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>
