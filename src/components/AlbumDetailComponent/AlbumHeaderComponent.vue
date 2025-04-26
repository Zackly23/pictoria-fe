<script setup>
import { ref } from 'vue'

const viewMode = ref(1)
</script>

<template>
  <!-- Album Header -->
  <div
    class="flex flex-col md:flex-row md:justify-between md:items-start mb-6 pb-4 border-b border-gray-200"
  >
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
          <span class="text-gray-600">• By John Photographer</span>
          <span class="mx-2 text-gray-400">•</span>
          <span class="text-gray-600">6 photos</span>
        </div>
        <p class="text-gray-500 mt-2">
          A collection of beautiful summer memories captured during our vacation at the beach and
          mountains.
        </p>
      </div>
    </div>
    <div class="flex flex-col items-end">
      <span class="text-gray-600 mb-3">29 Juni 2025</span>
      <div
        class="flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-y-0 md:space-x-4"
      >
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-2"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Download All</span>
        </button>
        <div class="flex items-center space-x-1 border border-gray-300 rounded overflow-hidden">
          <button
            @click="viewMode = 1"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ active: viewMode === 1 }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" />
            </svg>
          </button>
          <button
            @click="viewMode = 3"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ active: viewMode === 3 }"
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <button
            @click="viewMode = 6"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ active: viewMode === 6 }"
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
