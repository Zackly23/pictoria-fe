<script setup>
import { ref } from 'vue'

const shareLinks = ref({
  direct: 'https://pixelvault.com/albums/summer-2025',
  embedUrl: 'https://pixelvault.com/embed/albums/summer-2025',
  iframe: '<iframe src="https://pixelvault.com/embed/albums/summer-2025"></iframe>',
})

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('Copied to clipboard!')
    })
    .catch((err) => {
      console.error('Failed to copy: ', err)
    })
}
</script>

<template>
  <!-- URL Sharing Section -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <div class="mb-4">
      <div class="flex mb-3">
        <input
          type="text"
          readonly
          :value="shareLinks.direct"
          class="bg-gray-100 px-4 py-3 rounded-l flex-grow"
        />
        <button
          @click="copyToClipboard(shareLinks.direct)"
          class="bg-gray-400 text-white px-6 py-3 rounded-r hover:bg-gray-500 transition"
        >
          COPY
        </button>
      </div>

      <div class="flex mb-3">
        <input
          type="text"
          readonly
          :value="shareLinks.embedUrl"
          class="bg-gray-100 px-4 py-3 rounded-l flex-grow"
        />
        <button
          @click="copyToClipboard(shareLinks.embedUrl)"
          class="bg-gray-400 text-white px-6 py-3 rounded-r hover:bg-gray-500 transition"
        >
          COPY
        </button>
      </div>

      <div class="flex">
        <input
          type="text"
          readonly
          :value="shareLinks.iframe"
          class="bg-gray-100 px-4 py-3 rounded-l flex-grow font-mono text-xs"
        />
        <button
          @click="copyToClipboard(shareLinks.iframe)"
          class="bg-gray-400 text-white px-6 py-3 rounded-r hover:bg-gray-500 transition"
        >
          COPY
        </button>
      </div>
    </div>
  </div>
</template>
