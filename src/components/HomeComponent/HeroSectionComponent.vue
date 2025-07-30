<template>
  <section class="bg-blue-600 text-white py-16">
    <div class="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
      <!-- Text Area -->
      <div class="md:w-1/2 text-center md:text-left space-y-6">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
          Store and Share Albums Securely
        </h1>
        <p class="text-lg md:text-xl text-white/90 max-w-xl">
          Upload, organize, and share your photos with ease. Control privacy and collaborate
          effortlessly.
        </p>
        <router-link
          to="/login"
          class="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:-translate-y-1 transition"
        >
          Try It Now — Free
        </router-link>
      </div>

      <!-- Video Preview -->
      <div class="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-2xl">
        <video autoplay muted loop playsinline class="w-full h-72 md:h-96 object-cover rounded-2xl">
          <source src="/video_tutorial.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
</template>

<script setup>
const imagesSlideShow = [
  { tag: 'Professional Photography', url: 'yifei-wong-SgULpUGB4cA-unsplash.jpg' },
  { tag: 'Creative Design Work', url: 'husniati-salma-U63WVnKpOws-unsplash.jpg' },
  { tag: 'Portfolio Showcase', url: 'bradford-zak-l2Z909j1vZE-unsplash.jpg' },
  { tag: 'Organized Albums', url: 'another-image.jpg' },
]
</script>
