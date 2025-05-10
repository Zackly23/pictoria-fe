<script setup>
import { ref } from 'vue'

const props = defineProps({
  previewModal: {
    type: Boolean,
    default: false,
  },
  image: {
    type: Object,
    default: {},
  },
})

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

console.log('image preview is : ', props.image)
</script>

<template>
  <section class="container mx-auto px-4 py-4 mb-16 items-center justify-center flex mt-30">
    <div
      class="relative bg-white p-8 md:p-8 rounded-lg shadow-md max-w-2xl md:min-w-2xl h-auto w-full"
    >
      <!-- Tombol X (Close) -->
      <button
        @click="closeModal"
        class="absolute top-2 right-2 md:top-2 md:right-2 text-gray-400 hover:text-gray-600 border-1 border-gray-400 rounded-full hover:border-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div>
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 rounded-lg p-4">
            <div class="rounded-lg overflow-hidden mb-4">
              <img :src="props.image.url" class="w-full max-h-[350px]" alt="Image preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
