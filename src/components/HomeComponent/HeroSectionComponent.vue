<script setup>
import { ref, onMounted } from 'vue'

// Image Slideshow
const imagesSlideShow = ref([
  {
    tag: 'Professional Photography',
    url: 'yifei-wong-SgULpUGB4cA-unsplash.jpg',
  },
  {
    tag: 'Creative Design Work',
    url: 'husniati-salma-U63WVnKpOws-unsplash.jpg',
  },
  {
    tag: 'Portfolio Showcase',
    url: 'bradford-zak-l2Z909j1vZE-unsplash.jpg',
  },
])

const indexSlideShow = ref(0)

const checkIndexSlide = (index) => indexSlideShow.value === index

onMounted(() => {
  setInterval(() => {
    indexSlideShow.value = (indexSlideShow.value + 1) % imagesSlideShow.value.length
  }, 3000)
})
</script>

<template>
  <!-- Hero Section with Slideshow -->
  <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 md:py-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Store Your Images with Confidence</h1>
          <p class="text-lg max-w-xl mb-10">
            Fast, secure, and reliable image hosting for professionals, creators, and everyone in
            between.
          </p>
          <a
            href="#"
            class="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-300 inline-block"
            >Get Started - It's Free</a
          >
        </div>

        <!-- Slideshow -->
        <div class="md:w-1/2">
          <div class="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <div
              v-for="(image, index) in imagesSlideShow"
              :key="index"
              class="absolute w-full h-full transition-opacity duration-1000"
              :class="checkIndexSlide(index) ? 'opacity-100' : 'opacity-0'"
            >
              <img
                :src="`/src/assets/images/${image.url}`"
                alt="Image showcase"
                class="w-full h-full object-cover rounded-lg slideshow-image"
              />
              <div
                class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
              >
                <p class="text-white font-medium">{{ image.tag }}</p>
              </div>
            </div>

            <!-- Navigation Dots -->
            <div class="absolute bottom-4 right-4 flex space-x-2">
              <button
                v-for="(image, index) in imagesSlideShow"
                :key="index"
                @click="indexSlideShow = index"
                class="w-3 h-3 rounded-full focus:outline-none transition-colors duration-200"
                :class="{
                  'bg-white': indexSlideShow === index,
                  'bg-white bg-opacity-50': indexSlideShow !== index,
                }"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
