<script setup>
import URLCopyComponent from '@/components/AlbumDetailComponent/URLCopyComponent.vue'
import { ref, computed, onMounted } from 'vue'

const isLoading = ref(true)
const viewMode = ref(1)
const images = ref([
  // sample images
  {
    id: 1,
    src: 'image1.jpg',
    title: 'Image 1',
    likes: 10,
    date: '2024-04-25',
    tags: ['tag1', 'tag2'],
  },
])

const toggleLike = (index) => {
  images.value[index].likes++
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div class="bg-gray-100 text-gray-800 font-sans">
    <section class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-start space-x-3 mb-4 md:mb-0">
          <div class="bg-blue-500 text-white p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold">Summer Memories 2025</h1>
            <div class="flex items-center mt-1">
              <span class="text-gray-600">• By Anonim</span>
              <span class="mx-2 text-gray-400">•</span>
              <span class="text-gray-600">1 photos</span>
            </div>
          </div>
        </div>
        <div class="mb-8 mt-8">
          <!-- Loaded Images -->
          <div>
            <div v-if="viewMode === 1" class="grid grid-cols-1 gap-6">
              <div
                v-for="(image, index) in images"
                :key="image.id"
                class="relative-div bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  :src="image.src"
                  :alt="image.title"
                  class="w-full min-h-100 h-auto object-cover"
                />

                <div class="p-3">
                  <div class="flex justify-between items-center">
                    <h3 class="font-medium">{{ image.title }}</h3>
                    <div class="flex items-center space-x-1">
                      <button
                        @click="() => toggleLike(index)"
                        class="text-gray-500 hover:text-red-500 transition cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      <span>{{ image.likes }}</span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-500">{{ image.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <URLCopyComponent />
    </section>
  </div>
</template>
