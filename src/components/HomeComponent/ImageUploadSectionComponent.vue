<script setup>
import axios from 'axios'
import { ref } from 'vue'

const previewActive = ref(false)
const fileName = ref('')
const mediaUrl = ref('') // ini untuk URL hasil upload
const mediaTypePrev = ref('')
const albumImageTempUrl = ref('') // ini untuk URL hasil upload
const copied = ref(false)
const uploadSuccess = ref(false)
const fileInput = ref(null)

const fileElement = ref(null) // untuk <input> DOM
const selectedFile = ref(null) // untuk menyimpan File

const handleFileChange = (event) => {
  const file = event.target.files[0]
  console.log('Selected file:', file)

  if (file) {
    selectedFile.value = file // Simpan filenya di ref yang berbeda
    fileName.value = file.name
    previewActive.value = true
    mediaUrl.value = URL.createObjectURL(file)
    copied.value = false
    mediaTypePrev.value = file.type.startsWith('image/') ? 'image' : 'video'

    console.log('Selected file saved in ref:', selectedFile.value)
  }
}

const uploadTemporaryMedia = async () => {
  console.log('Uploading file:', selectedFile.value)
  try {
    const formData = new FormData()
    formData.append('media_temp', selectedFile.value)

    const response = await axios.post('http://localhost:3001/api/v1/temp/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.status === 200) {
      uploadSuccess.value = true
      albumImageTempUrl.value = `http://localhost:5173/image/${response.data.temp_media.id}/temp`
      // mediaUrl.value = response.data.temp_media.media_url
    } else {
      console.error('Upload failed:', response.statusText)
    }
  } catch (error) {
    console.error('Upload error:', error)
  }
}

const resetPreview = () => {
  previewActive.value = false
  fileName.value = ''
  imageUrl.value = ''
  copied.value = false
  uploadSuccess.value = false
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(albumImageTempUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}
</script>

<template>
  <section class="container mx-auto px-4 py-4 mb-16">
    <div class="bg-white p-8 md:p-12 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-4">Try One Now</h2>
      <p class="text-gray-600 text-center mb-8">Experience how simple media hosting can be</p>

      <div>
        <div
          v-if="!previewActive"
          class="border-2 border-dashed border-blue-400 rounded-lg p-12 max-w-2xl mx-auto mb-6 cursor-pointer hover:bg-blue-50 transition duration-300"
          @click="$refs.fileElement.click()"
        >
          <div class="text-4xl text-blue-500 mb-4 text-center">📁</div>
          <p class="text-lg text-gray-600 mb-2 text-center">Drag & Drop your media here</p>
          <p class="text-sm text-gray-500 text-center">or click to browse files</p>
          <input
            type="file"
            ref="fileElement"
            class="hidden"
            accept="image/*,video/*"
            @change="handleFileChange"
          />
        </div>

        <div v-else class="max-w-2xl mx-auto mb-6">
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
                class="w-full h-auto object-cover"
                :src="mediaUrl"
              ></video>
            </div>
            <p class="text-red-400 text-sm mb-2 text-bold">Your image will only be available for 30 minutes</p>
            <div>
              <button
                @click="uploadTemporaryMedia"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full cursor-pointer"
              >
                Upload File
              </button>
            </div>
            <!-- Copy URL -->
            <div v-if="uploadSuccess" class="flex items-center gap-2 mb-2 mt-4">
              <input
                type="text"
                :value="albumImageTempUrl"
                class="w-full px-4 py-2 rounded border border-gray-300"
                readonly
              />
              <button
                @click="copyToClipboard"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                {{ copied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- <p class="text-gray-500 text-center">Free accounts can upload up to 10 images per day</p> -->
    </div>
  </section>
</template>
