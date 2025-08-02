<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(true)
const errorMessage = ref('')
const userProfile = ref({
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  profile_picture: '',
  user_name: '',
  address: '',
  phone: '',
  deactivate_until: '',
  is_two_factor_enabled: '',
  maximum_media_size: '',
})

const getUserProfile = async (userDataID) => {
  try {
    // Simulate an API call to fetch user profile
    const response = await api.get(`/users/${userDataID}`)

    console.log('User Profile: ', response.data)

    const users = response.data.user

    userProfile.value.id = users.id
    userProfile.value.first_name = users.first_name
    userProfile.value.last_name = users.last_name
    userProfile.value.user_name = users.user_name
    userProfile.value.email = users.email
    userProfile.value.phone = users.phone
    userProfile.value.address = users.address
    userProfile.value.deactivate_until = users.deactivate_until
    userProfile.value.is_two_factor_enabled = users.is_two_factor_enabled
    userProfile.value.maximum_media_size = users.maximum_media_size

    if (response.status === 200) {
      authStore.setUser(userProfile.value)

      return true
    }
  } catch (error) {
    console.error('Error Fetching User Profile:', error)
    errorMessage.value = 'Failed to fetch user profile. Please try again.'
    return false
  }
}

onMounted(async () => {
  const access_token = route.query.access_token
  const refresh_token = route.query.refresh_token
  const user_id = route.query.user_id

  if (access_token && refresh_token && user_id) {
    try {
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      const success = await getUserProfile(user_id)

      if (success) {
        const last_visit = localStorage.getItem('last_visited_page')

        // Cegah redirect ke halaman ini sendiri (misal: "/auth/callback")
        const thisPagePath = route.fullPath

        if (
          last_visit &&
          last_visit !== '/login' &&
          last_visit !== '/signup' &&
          last_visit !== thisPagePath
        ) {
          console.log('Redirecting to last visited page... : ', last_visit)
        //   localStorage.removeItem('last_visited_page') // clear to avoid loop
          router.push(last_visit)
        } else {
          console.log('Redirecting to home page...')

          router.push({
            name: 'profile',
            params: {
              userId: userProfile.value.id,
            },
            query: { activeTab: 'albums' },
          })
        }
      } else {
        console.error('Login failed. Redirecting to login page...')
        router.push('/login')
      }
      
    } catch (error) {
      console.error('Login Error:', error)
      errorMessage.value = 'Login failed. Please try again.'
      router.push('/login')
    }
  } else {
    errorMessage.value = 'Invalid login attempt. Please try again.'
    router.push('/login')
  }

  loading.value = false
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div v-if="loading" class="flex flex-col items-center">
        <svg class="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
        </svg>
        <p class="mt-2 text-gray-600">Processing login...</p>
      </div>
      <div v-else-if="errorMessage" class="text-red-600">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
