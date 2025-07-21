<script setup>
import api from '@/api'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const previewActive = ref(false)
const file = ref({
  raw: null,
  type: '',
})
const fileName = ref('')
const mediaUrl = ref('')
const mediaTypePrev = ref('')
const uploadSuccess = ref(false)

const props = defineProps({
  uploadModal: {
    type: Boolean,
    default: false,
  },
  albumDetail: {
    type: Object,
  },
})

const mediaDescription = ref()

// Optional: jika parent bisa mengubah props.albumName, sinkronkan ulang

const emits = defineEmits(['close-modal', 'upload-image'])

const closeModal = () => {
  emits('close-modal')
  resetPreview()
}

const handleFileChange = (event) => {
  const media = event.target.files[0]
  const isImage = media.type.startsWith('image/')

  file.value.raw = media
  file.value.type = isImage ? 'image' : 'video'

  mediaTypePrev.value = isImage ? 'image' : 'video'

  console.log('file new album : ', file.value)
  console.log('description : ', mediaDescription.value)

  if (file.value) {
    fileName.value = media.name
    previewActive.value = true
    mediaUrl.value = URL.createObjectURL(media) // simulasikan URL preview
  }
}

const resetPreview = () => {
  previewActive.value = false
  fileName.value = ''
  mediaUrl.value = ''
  uploadSuccess.value = false
  mediaDescription.value = ''
}

const uploadMedia = async () => {
  try {
    console.log('file new album api : ', file.value)
    console.log('description api: ', mediaDescription.value)

    // Jika description kosong, fallback ke judul album
    mediaDescription.value = mediaDescription.value ?? props.albumDetail.title

    const formData = new FormData()

    if (file.value.type === 'image') {
      formData.append('album_images', file.value.raw)
      formData.append('image_descriptions', mediaDescription.value)
    } else {
      formData.append('album_videos', file.value.raw)
      formData.append('video_descriptions', mediaDescription.value)
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, ' : ', value)
    }

    const response = await api.post('/albums/media', formData, {
      params: {
        album_id: props.albumDetail.id,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.status == 200) {
      console.log('eror ga????')
      console.log('response simpan album media : ', response.data)
      emits('upload-image')
      resetPreview()
    }
  } catch (error) {
    console.error('status errro ', error.status)
    if (error.response && error.response.status === 413) {
      toast.add({
        severity: 'error',
        summary: 'Upload Gagal',
        detail: 'Ukuran file terlalu besar. Maksimal 10MB per file.',
        life: 3000,
      })
      return
    } else if (error.response && error.response.status === 451) {
      // Handle validation errors
      toast.add({
        severity: 'warn',
        summary: 'Kapasitas Penuh',
        detail:
          'Kapasitas album sudah penuh. Silakan hapus beberapa file sebelum mengunggah yang baru.',
        life: 3000,
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Upload Gagal',
        detail: 'Kesalahan Menyimpan Album.',
        life: 3000,
      })
    }
  }
}
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
        <div
          v-if="!previewActive"
          class="border-2 border-dashed border-blue-400 rounded-lg p-12 max-w-2xl mx-auto mb-6 cursor-pointer hover:bg-blue-50 transition duration-300"
          @click="$refs.fileInput.click()"
        >
          <div class="text-4xl text-blue-500 mb-4 text-center">📁</div>
          <p class="text-lg text-gray-600 mb-2 text-center">Drag & Drop your image here</p>
          <p class="text-sm text-gray-500 text-center">or click to browse files</p>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            accept="image/*,video/*"
            @change="handleFileChange"
          />
        </div>

        <div v-else class="max-w-2xl mx-auto">
          <div class="bg-gray-100 rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <span class="font-medium text-gray-700">{{ fileName }}</span>
              <button @click="resetPreview" class="text-red-500 hover:text-red-700 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div class="rounded-lg overflow-hidden mb-4">
              <img
                v-if="mediaTypePrev === 'image'"
                :src="mediaUrl"
                class="w-full max-h-[300px] object-contain"
                alt="Image preview"
              />
              <video
                v-else-if="mediaTypePrev === 'video'"
                controls
                class="w-full h-40 object-cover"
                :src="mediaUrl"
              ></video>
            </div>

            <div class="block mt-4 space-y-2">
              <input
                type="text"
                id="description"
                name="description"
                v-model="mediaDescription"
                :placeholder="props.albumDetail.title"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
              <button
                @click="uploadMedia"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full cursor-pointer"
              >
                Upload Media
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tag-badge {
  transition: all 0.2s ease;
}

.tag-badge:hover {
  background-color: #3b82f6;
  color: white;
}
</style>
