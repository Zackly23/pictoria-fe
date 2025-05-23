<script setup>
import { ref } from 'vue'

//dummy data
const featuredImages = ref([
  {
    albumId: 1,
    image: {
      id: 1,
      src: 'bradford-zak-l2Z909j1vZE-unsplash.jpg',
      title: 'Nature',
    },
  },
  {
    albumId: 2,
    image: {
      id: 2,
      src: 'muhammad-thoha-ma-ruf-0i93q-D5vYE-unsplash.jpg',
      title: 'City',
    },
  },
  {
    albumId: 3,
    image: {
      id: 3,
      src: 'md-duran-RkeDATkBUfY-unsplash.jpg',
      title: 'Mountains',
    },
  },
  {
    albumId: 4,
    image: {
      id: 4,
      src: 'sumant-kumar-XQY7u9fu7WU-unsplash.jpg',
      title: 'Sunset',
    },
  },
  {
    albumId: 5,
    image: {
      id: 5,
      src: 'rainier-ridao-Gj6w4IasZY0-unsplash.jpg',
      title: 'Forest',
    },
  },
  {
    albumId: 6,
    image: {
      id: 6,
      src: 'COVER.png',
      title: 'Cover',
    },
  },
  {
    albumId: 7,
    image: {
      id: 7,
      src: 'zee.jpg',
      title: 'Ocean',
    },
  },
])

</script>

<template>
  <section class="container mx-auto px-4 py-8 mb-6">
    <h2 class="text-3xl font-bold text-center mb-8">Featured Images</h2>
    <p class="text-center text-gray-600 mb-10">Discover what others are sharing on PixelVault</p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 image-grid">
      <div
        v-for="(img, index) in featuredImages"
        :key="index"
        class="overflow-hidden rounded-lg bg-white shadow-sm p-2"
        :class="{ 'md:col-span-2': index === 4 }"
      >
        <img
          :src="`/src/assets/images/${img.image.src}`"
          alt="Featured image"
          class="w-full h-48 object-cover rounded mb-2"
        />

        <!-- <div class="text-xs text-gray-500 mb-1 truncate">{{ img.src }}</div> -->
      </div>
    </div>

    <div class="text-center mt-8">
      <router-link
        to="/"
        class="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center"
      >
        Upload Your Own Images
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
