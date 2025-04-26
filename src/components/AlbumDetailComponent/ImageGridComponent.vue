<script setup>
import { ref, computed, onMounted } from 'vue'

const isLoading = ref(true)
const viewMode = ref(3)
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
  { id: 2, src: 'image2.jpg', title: 'Image 2', likes: 20, date: '2024-04-24', tags: ['tag2'] },
  { id: 3, src: 'image3.jpg', title: 'Image 3', likes: 5, date: '2024-04-23', tags: ['tag3'] },
])

const filteredImages = computed(() => images.value)

const openLightbox = (index) => {
  console.log('Open lightbox for index', index)
}

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
  <div class="mb-8">
    <!-- Loaded Images -->
    <div>
      <div v-if="viewMode === 1" class="grid grid-cols-1 gap-6">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="relative-div bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <img :src="image.src" :alt="image.title" class="w-full h-auto object-cover" />
          <div class="absolute-div p-2 rounded-full shadow">
            <button @click="() => openLightbox(index)" class="p-2 rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button>
          </div>
          <div class="p-3">
            <div class="flex justify-between items-center">
              <h3 class="font-medium">{{ image.title }}</h3>
              <div class="flex items-center space-x-1">
                <button
                  @click="() => toggleLike(index)"
                  class="text-gray-500 hover:text-red-500 transition"
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
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in image.tags"
                :key="tag"
                class="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600"
                >{{ tag }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div v-if="viewMode === 3" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="relative-div bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <img :src="image.src" :alt="image.title" class="w-full h-48 object-cover" />
          <div class="absolute-div p-2 rounded-full shadow">
            <button @click="() => openLightbox(index)" class="p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button>
          </div>
          <div class="p-3">
            <div class="flex justify-between items-center">
              <h3 class="font-medium">{{ image.title }}</h3>
              <div class="flex items-center space-x-1">
                <button
                  @click="() => toggleLike(index)"
                  class="text-gray-500 hover:text-red-500 transition"
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

      <div v-if="viewMode === 6" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="relative-div bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <img :src="image.src" :alt="image.title" class="w-full h-32 object-cover" />
          <div class="absolute-div p-2 rounded-full shadow">
            <button @click="() => openLightbox(index)" class="p-2 rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button>
          </div>
          <div class="p-2">
            <h3 class="text-sm font-medium truncate">{{ image.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Image Button -->
  <div class="flex justify-center">
    <button
      class="bg-white border-2 border-dashed border-gray-300 rounded-full p-3 hover:bg-gray-50 transition focus:outline-none cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>

  <!-- Sharing Section -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-lg font-semibold">Share to</h2>
    <div class="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fill-rule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="font-medium">1.2k</span>
    </div>
  </div>
</template>

<style scoped>
.relative-div {
  position: relative;
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease,
    filter 0.3s ease;
}

.relative-div:hover {
  background-color: rgba(128, 128, 128, 0.3); /* Warna abu-abu */
  filter: grayscale(50%);
  opacity: 0.8;
}

.absolute-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0; /* Tidak terlihat secara default */
  transition: opacity 0.3s ease;
  pointer-events: none; /* Agar tombol di dalam tidak bisa diklik saat belum muncul */
}

.relative-div:hover .absolute-div {
  opacity: 1; /* Muncul saat div di-hover */
  pointer-events: auto; /* Mengaktifkan interaksi */
}
</style>
