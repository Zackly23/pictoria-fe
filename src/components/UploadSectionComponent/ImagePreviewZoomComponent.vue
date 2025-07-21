<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  previewModal: {
    type: Boolean,
    default: false,
  },
  media: {
    type: Object,
    default: {},
  },
})

const peviewMediaLoad = computed(() => {
  if (props.media.type === 'image') {
    return props.media.url
  } else if (props.media.type === 'video') {
    return props.media.url
  }
})

const emits = defineEmits(['close-modal', 'previous-image', 'next-image'])

const closeModal = () => {
  emits('close-modal')
}

const previousImage = () => {
  emits('previous-image')
}

const nextImage = () => {
  emits('next-image')
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

      <!-- Previous Preview arrow  -->
      <div
        class="absolute top-1/2 left-[-30px] transform -translate-y-1/2 rounded-full bg-gray-200 py-2"
      >
        <button @click="previousImage" class="text-gray-800 font-semibold py-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      <div class="">
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 rounded-lg p-4">
            <div
              class="w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center"
            >
              <img
                v-if="props.media.type === 'image'"
                :src="props.media.url"
                class="max-w-full max-h-[65vh] object-contain"
                alt="Image preview"
              />

              <video
                v-else-if="props.media.type === 'video'"
                :key="`${props.media.type}-${props.media.id}`"
                controls
                class="max-w-full max-h-[65vh] object-contain"
              >
                <source :src="props.media.url" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Preview arrow  -->
      <div
        class="absolute top-1/2 right-[-30px] transform -translate-y-1/2 rounded-full bg-gray-200 py-2"
      >
        <button @click="nextImage" class="text-gray-800 font-semibold py-2 px-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
