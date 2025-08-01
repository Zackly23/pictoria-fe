<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const user = computed(() => authStore.user)
const featuredImages = ref([
  {
    albumId: null,
    image: {
      id: null,
      src: '',
      title: '',
    },
  },
])

const goToUpload = () => {
  if (user) {
    router
      .push({
        name: 'profile',
        params: { userId: user.id },
        query: { activeTab: 'upload' },
      })
      .catch((error) => {
        console.error('Navigation error:', error)
      })
  } else {
    window.location.href = '/login'
  }
}

const getPopularImages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/images/popular`)
    const featuredImagesData = response.data.images // Assuming the API returns an array of images

    featuredImages.value = featuredImagesData.map((img) => ({
      albumId: img.album_id,
      image: {
        id: img.image_id,
        src: img.image_url,
        title: img.description || 'Untitled',
      },
    }))

    console.log('Popular images fetched successfully:', featuredImages.value)
  } catch (error) {
    console.error('Error fetching popular images:', error)
  }
}

onMounted(() => {
  getPopularImages()
})
</script>

<template>
  <section class="container mx-auto px-4 py-8 mb-6">
    <h2 class="text-3xl font-bold text-center mb-8">Popular Images</h2>
    <p class="text-center text-gray-600 mb-10">Discover what others are sharing on PixelVault</p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 image-grid">
      <div
        v-for="(img, index) in featuredImages"
        :key="index"
        class="overflow-hidden rounded-lg bg-white shadow-sm p-2"
        :class="{ 'md:col-span-2': index === 4 }"
      >
        <router-link :to="`/album/${img.albumId}/details`" class="block">
          <img
            :src="img.image.src"
            alt="Featured image"
            class="w-full h-48 object-cover rounded mb-2"
          />
        </router-link>

        <!-- <div class="text-xs text-gray-500 mb-1 truncate">{{ img.src }}</div> -->
      </div>
    </div>

    <div class="text-center mt-8">
      <router-link
        v-if="user"
        :to="{
          name: 'profile',
          params: { userId: user.id },
          query: { activeTab: 'upload' },
        }"
        class="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center cursor-pointer"
      >
        Upload Your Own Albums
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>

      <router-link
        v-else
        to="/login"
        class="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center cursor-pointer"
      >
        Upload Your Own Albums
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>
    </div>
  </section>
</template>
