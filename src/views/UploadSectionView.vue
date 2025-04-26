<script setup>
import UploadSectionComponent from '@/components/UploadSectionComponent/UploadSectionComponent.vue'
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
    <UploadSectionComponent />
  </div>
  <!-- Tips Section -->
  <section class="max-w-4xl mx-auto bg-blue-50 rounded-lg p-6 border border-blue-100 mb-6">
    <h3 class="text-lg font-medium text-blue-800 mb-3">Tips for better uploads</h3>
    <ul class="space-y-2 text-blue-700">
      <li class="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        Use high-resolution images (at least 1920px on the longest side) for best quality viewing
      </li>
      <li class="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        Add specific and relevant tags to make your photos discoverable
      </li>
      <li class="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        Writing descriptive album titles and descriptions helps with SEO
      </li>
    </ul>
  </section>
</template>

<style scoped>
.image-grid img:hover {
  transform: scale(1.05);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.tab-active {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}

.tag-badge {
  transition: all 0.2s ease;
}

.tag-badge:hover {
  background-color: #3b82f6;
  color: white;
}
</style>
