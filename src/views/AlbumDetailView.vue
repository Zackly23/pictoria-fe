<script setup>
import AlbumHeaderComponent from '@/components/AlbumDetailComponent/AlbumHeaderComponent.vue'
import FilterAndSortingComponent from '@/components/AlbumDetailComponent/FilterAndSortingComponent.vue'
import ImageGridComponent from '@/components/AlbumDetailComponent/ImageGridComponent.vue'
import URLCopyComponent from '@/components/AlbumDetailComponent/URLCopyComponent.vue'
</script>

<template>
  <div class="bg-gray-100 text-gray-800 font-sans">
    <section class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <AlbumHeaderComponent />

        <FilterAndSortingComponent />

        <ImageGridComponent />
      </div>
      <URLCopyComponent />
    </section>
  </div>
</template>
