<script setup>
import { ref, computed, onMounted } from 'vue'

import UploadModalComponent from '../UploadSectionComponent/UploadModalComponent.vue'
import ImagePreviewZoomComponent from '../UploadSectionComponent/ImagePreviewZoomComponent.vue'

const isLoading = ref(true)
const uploadModal = ref(false)
const previewModal = ref(false)
const imagePreview = ref()

const props = defineProps({
  albumDetail: {
    type: Object,
    required: true,
  },
  viewMode: {
    type: Number,
    default: 3,
  },
})

const emits = defineEmits(['new-image-upload'])

const openLightbox = (index) => {
  console.log('Open lightbox for index', index)
}

const toggleLike = (index) => {
  images.value[index].likes++
}

const openPreviewImageModal = (imgId) => {
  if (props.viewMode !== 1) {
    console.log('image id ', imgId)
    previewModal.value = true
    imagePreview.value = props.albumDetail.medias.find((img) => img.id === imgId)
    console.log('preview image : ', imagePreview.value)
  }
}

const nextPreviewImageModal = () => {
  const currentIndex = props.albumDetail.medias.findIndex((img) => img.id === imagePreview.value.id)
  if (currentIndex === props.albumDetail.medias.length - 1) return
  const nextIndex = (currentIndex + 1) % props.albumDetail.medias.length
  imagePreview.value = props.albumDetail.medias[nextIndex]

  console.log('next image : ', imagePreview.value)
}

const previousPreviewImageModal = () => {
  const currentIndex = props.albumDetail.medias.findIndex((img) => img.id === imagePreview.value.id)
  if (currentIndex === 0) return
  const previousIndex = currentIndex - 1
  imagePreview.value = props.albumDetail.medias[previousIndex]

  console.log('previous image : ', imagePreview.value)
}

const uploadImage = (image) => {
  console.log('Image uploaded in imagegrid :', image)
  emits('new-image-upload', image)
  uploadModal.value = false
}

console.log('album detail : ', props.albumDetail)

const closeDropdownOnClickOutside = (event) => {
  // Check if the click is outside any dropdown or button
  // console.log(isDropdownOpen("profile"));
  if (
    !event.target.closest("[data-dropdown-button]") &&
    !event.target.closest("[data-dropdown-content]")
  ) {
    previewModal.value = false;
  }
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div class="mb-8">
    <!-- Loaded Images -->
    <div>
      <div v-if="props.viewMode === 1" class="grid grid-cols-1 gap-6 place-items-center">
        <div
          v-for="(image, index) in props.albumDetail.medias"
          :key="image.id"
          class="bg-white rounded-lg overflow-hidden shadow-sm w-full sm:w-[75%] aspect-[4/3]"
        >
          <!-- Kondisi jika media adalah gambar -->
          <img
            v-if="image.type === 'image'"
            :src="image.url"
            :alt="image.description"
            class="w-full h-full"
          />

          <!-- Kondisi jika media adalah video -->
          <video
            v-else-if="image.type === 'video'"
            :src="image.url"
            class="w-full h-full"
            controls
            preload="metadata"
            playsinline
            controlsList="nodownload"
          ></video>
          <div class="p-2 rounded-full shadow">
            <!-- <button @click="() => openPreviewImageModal(index + 1)" class="p-2 rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button> -->
          </div>
          <div class="p-3">
            <div class="flex justify-between items-center">
              <h3 class="font-medium">{{ image.description }}</h3>
              <div class="flex items-center space-x-1">
                <button
                  @click="() => toggleLike(index)"
                  class="text-gray-500 hover:text-red-500 transition"
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <span>{{ image.likes }}</span>
              </div>
            </div>
            <p class="text-sm text-gray-500">{{ image.date }}</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in image.tags"
                :key="tag"
                class="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600"
                >{{ tag }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div v-if="props.viewMode === 3" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="(image, index) in props.albumDetail.medias"
          :key="image.id"
          class="relative-div bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <!-- Kondisi jika media adalah gambar -->
          <img
            v-if="image.type === 'image'"
            :src="image.url"
            :alt="image.description"
            class="w-full h-48 object-cover"
          />

          <!-- Kondisi jika media adalah video -->
          <video
            v-else-if="image.type === 'video'"
            :src="image.url"
            class="w-full h-48 object-cover"
            controls
            preload="metadata"
            playsinline
            controlsList="nodownload"
          ></video>
          <div class="absolute-div p-2 rounded-full shadow">
            <button @click="() => openPreviewImageModal(index + 1)" class="p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button>
          </div>
          <div class="p-3">
            <div class="flex justify-between items-center">
              <h3 class="font-medium">{{ image.description }}</h3>
              <div class="flex items-center space-x-1">
                <button
                  @click="() => toggleLike(index)"
                  class="text-gray-500 hover:text-red-500 transition"
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <span>{{ image.likes }}</span>
              </div>
            </div>
            <p class="text-sm text-gray-500">{{ image.createdAt }}</p>
          </div>
        </div>
      </div>

      <div v-if="props.viewMode === 6" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          v-for="(image, index) in props.albumDetail.medias"
          :key="image.id"
          class="relative-div bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <!-- Kondisi jika media adalah gambar -->
          <img
            v-if="image.type === 'image'"
            :src="image.url"
            :alt="image.description"
            class="w-full h-32 object-cover"
          />

          <!-- Kondisi jika media adalah video -->
          <video
            v-else-if="image.type === 'video'"
            :src="image.url"
            class="w-full h-32 object-cover"
            controls
            preload="metadata"
            playsinline
            controlsList="nodownload"
          ></video>
          <div class="absolute-div p-2 rounded-full shadow">
            <button @click="() => openPreviewImageModal(index + 1)" class="p-2 rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button>
          </div>
          <div class="p-2">
            <h3 class="text-sm font-medium truncate">{{ image.description }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Image Button -->
  <div class="flex justify-center">
    <button
      @click="uploadModal = true"
      class="bg-white border-2 border-dashed border-gray-300 rounded-full p-3 hover:bg-gray-50 transition focus:outline-none cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>

  <!-- Sharing Section -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-lg font-semibold">Share to</h2>
    <div class="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fill-rule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="font-medium">1.2k</span>
    </div>
  </div>

  <div>
    <div
      v-show="uploadModal"
      class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30 h-full"
      role="dialog"
    >
      <UploadModalComponent
        :upload-modal="uploadModal"
        :album-name="props.albumDetail.title"
        @close-modal="uploadModal = false"
        @upload-image="uploadImage"
      />
    </div>
  </div>

  <div>
    <transition name="fade-zoom" appear>
      <div
        v-show="previewModal"
        class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30 h-full"
        role="dialog"
      >
        <ImagePreviewZoomComponent
          :open-modal="previewModal"
          @close-modal="previewModal = false"
          @next-image="nextPreviewImageModal"
          @previous-image="previousPreviewImageModal"
          :media="imagePreview"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.relative-div {
  position: relative;
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease,
    filter 0.3s ease;
}

.relative-div:hover {
  background-color: rgba(128, 128, 128, 0.3); /* Warna abu-abu */
  filter: grayscale(50%);
  opacity: 0.8;
}

.absolute-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0; /* Tidak terlihat secara default */
  transition: opacity 0.3s ease;
  pointer-events: none; /* Agar tombol di dalam tidak bisa diklik saat belum muncul */
}

.relative-div:hover .absolute-div {
  opacity: 1; /* Muncul saat div di-hover */
  pointer-events: auto; /* Mengaktifkan interaksi */
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}
.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
