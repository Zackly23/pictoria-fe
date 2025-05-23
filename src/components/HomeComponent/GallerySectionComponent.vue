<script setup>
import { ref } from 'vue';

const AlbumByCategories = ref([
  {
    id: 1,
    title: 'Nature',
    count: 1254,
    image: 'jkt48.jpg',
  },
  {
    id: 2,
    title: 'Architecture',
    count: 879,
    image: 'husniati-salma-U63WVnKpOws-unsplash.jpg',
  },
  {
    id: 3,
    title: 'Travel',
    count: 2156,
    image: 'bradford-zak-l2Z909j1vZE-unsplash.jpg',
  },
  {
    id: 4,
    title: 'Cat',
    count: 1254,
    image: 'jkt48.jpg',
  },
  {
    id: 5,
    title: 'Dog',
    count: 879,
    image: 'husniati-salma-U63WVnKpOws-unsplash.jpg',
  },
  {
    id: 6,
    title: 'Website',
    count: 2156,
    image: 'bradford-zak-l2Z909j1vZE-unsplash.jpg',
  },
])
</script>

<template>
  <section class="container mx-auto px-4 py-8 mb-16">
    <h2 class="text-3xl font-bold text-center mb-8">Explore by Category</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a v-for="category in AlbumByCategories" :key="category.id" href="#" class="block group">
        <div class="relative rounded-lg overflow-hidden shadow-md">
          <img
            :src="`/src/assets/images/${category.image}`"
            :alt="`${category.title} category`"
            class="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <h3 class="text-white text-xl font-bold mb-1">{{ category.title }}</h3>
            <p class="text-gray-200">{{ category.count.toLocaleString() }} images</p>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
