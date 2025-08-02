<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { validateAlbumUpload } from '@/validations/AlbumValidation'
import api from '@/api'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toast = useToast()
const userData = computed(() => authStore.user)

const errorsAlbumUpload = ref()
const router = useRouter()
const route = useRoute()
const user = JSON.parse(localStorage.getItem('user'))
const dragActive = ref(false)
const uploadProgress = ref(0)
const targetEmailInput = ref('')
const tagInput = ref('')
const uploading = ref(false)
const availableTags = ref(['Nature', 'Travel', 'Family', 'Friends', 'Work', 'Food'])
// salin deskripsi awal
const originalDescriptions = ref([])

const albumID = route.params.albumId

const albums = ref({
  id: 1,
  title: '',
  tags: [],
  privacy: '',
  description: '',
  targetEmails: [],
  files: [
    {
      id: 1,
      name: '',
      size: '',
      url: '',
      raw: null,
      type: '',
      description: '', // Add a description field for each file
      new: false,
      status: '',
    },
  ],
})
const albumBucket = ref([
  {
    id: 0,
    name: '',
    size: '',
    url: '',
    raw: null,
    type: '',
    description: '', // Add a description field for each file
    new: false,
    status: '',
  },
])

const getAlbumDetail = async () => {
  try {
    const response = await api.get(`/albums/${albumID}`)

    console.log('response : ', response.data)
    const albumDetail = response.data.album
    const albumMedia = response.data.album_medias

    albums.value.id = albumDetail.album_id
    albums.value.title = albumDetail.title
    albums.value.description = albumDetail.description
    albums.value.privacy = albumDetail.album_privacy
    albums.value.tags = albumDetail.tags
    albums.value.targetEmails = albumDetail.target_email

    const files = albumMedia.map((file) => {
      return {
        id: file.media_id,
        name: file.description,
        size: file.size,
        url: file.url,
        raw: null,
        type: file.media_kind,
        status: 'update',
        description: file.description, // Add a description field for each file
        new: false,
      }
    })

    albums.value.files = files

    albums.value.files.forEach((file) => {
      originalDescriptions.value[file.id] = file.description
    })

    //temporal display
    albumBucket.value = files.map((file) => ({ ...file }))

    console.log('albums : ', albums.value)
    console.log('abums bucket : ', albumBucket.value)
  } catch (error) {
    console.error('error ', error)
  }
}

const resetForm = () => {
  console.log('reset')
  // albumTitle.value = ''
  // albumDescription.value = ''
  // privacy.value = 'public'
  // selectedTags.value = []
}

// Simulasi upload
const updateAlbum = async () => {
  try {
    const { isValid, errors } = validateAlbumUpload(
      albums.value.files,
      albums.value.title,
      albums.value.description,
      albums.value.tags,
      albums.value.privacy,
      albums.value.targetEmails,
    )

    if (!isValid) {
      errorsAlbumUpload.value = errors

      toast.add({
        severity: 'warn',
        summary: 'Validation Failed',
        detail: 'Please fill in the album data correctly.',
        life: 3000,
      })

      return
    }

    const formData = new FormData()
    formData.append('user_id', user.id)
    // Tags (tanpa index)
    albums.value.tags.forEach((tag) => {
      formData.append('tags', tag)
    })

    // Target Emails (tanpa index)
    if (albums.value.privacy === 'restricted') {
      albums.value.targetEmails.forEach((email) => {
        formData.append('target_emails', email)
      })
    }

    formData.append('title', albums.value.title)
    formData.append('album_privacy', albums.value.privacy)
    formData.append('description', albums.value.description)

    albums.value.files.forEach((file) => {
      if (file.new) {
        if (file.type === 'image') {
          formData.append('album_images', file.raw)
          formData.append('album_image_ids', 'nil')
          formData.append('image_descriptions', file.description)
          formData.append('image_statuses', 'new')
        } else {
          formData.append('album_videos', file.raw)
          formData.append('album_video_ids', 'nil')
          formData.append('video_descriptions', file.description)
          formData.append('video_statuses', 'new')
        }
      } else {
        if (file.status === 'update') {
          if (file.type === 'image') {
            formData.append('album_image_ids', file.id)
            formData.append('image_descriptions', file.description)
            formData.append('image_statuses', 'update')
          } else {
            formData.append('album_video_ids', file.id)
            formData.append('video_descriptions', file.description)
            formData.append('video_statuses', 'update')
          }
        } else {
          if (file.type === 'image') {
            formData.append('album_image_ids', file.id)
            formData.append('image_descriptions', file.description)
            formData.append('image_statuses', 'delete')
          } else {
            formData.append('album_video_ids', file.id)
            formData.append('video_descriptions', file.description)
            formData.append('video_statuses', 'delete')
          }
        }
      }
    })

    // Debug isi formData
    for (let [key, value] of formData.entries()) {
      console.log(key, ' : ', value)
    }

    // console.log('update album media des : ', albums.value.files)
    // console.log('update album media bucket : ', albumBucket.value)
    const response = await api.put(`/albums/${albumID}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.status === 202) {
      toast.add({
        severity: 'success',
        summary: 'Album Updated',
        detail: 'The album has been successfully updated.',
        life: 3000,
      })

      console.log('response update : ', response.data)

      router.push(`/profile/${user.id}`)
    }
  } catch (error) {
    console.error('error update album : ', error)
    if (error.response && error.response.status === 413) {
      toast.add({
        severity: 'error',
        summary: 'Upload Failed',
        detail: `File size is too large. Maximum allowed is ${userData.value?.maximum_media_size_string} per file.`,
        life: 3000,
      })

      return
    } else if (error.response && error.response.status === 451) {
      // Handle validation errors
      toast.add({
        severity: 'warn',
        summary: 'Storage Full',
        detail: 'Album storage is full. Please delete some files before uploading new ones.',
        life: 3000,
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Upload Failed',
        detail: 'Error saving album.',
        life: 3000,
      })
    }
  }
}

const handleFileChange = (e) => {
  console.log('handle file change : ', e)
  const inputFiles = Array.from(e.target.files)
  inputFiles.forEach((file, index) => {
    let maxSizeBytes = parseInt(userData.value?.maximum_media_size ?? 0, 10)
    if (file && file.size > maxSizeBytes) {
      toast.add({
        severity: 'error',
        summary: 'Upload Failed',
        detail: `File size is too large. Maximum allowed is ${userData.value?.maximum_media_size_string} per file.`,
        life: 3000,
      })
    } else {
      const isImage = file.type.startsWith('image/')
      const newFile = {
        id: uuidv4(),
        name: file.name,
        type: isImage ? 'image' : 'video', // <--- ini penting!
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        url: URL.createObjectURL(file),
        raw: file,
        description: '',
        new: true,
        status: 'new',
      }

      albumBucket.value.push(newFile)

      albums.value.files.push(newFile)

      // console.log('file : ', file)
      // console.log('file url : ', URL.createObjectURL(file))

      console.log('handle bucket album : ', albumBucket.value)
    }
  })
}

const handleDrop = (e) => {
  dragActive.value = false
  handleFileChange({ target: { files: e.dataTransfer.files } })
}

const removeFile = (id) => {
  const fileToUpdate = albums.value.files.find((file) => file.id === id)

  if (!fileToUpdate) return

  if (fileToUpdate.new) {
    // Jika file baru, hapus dari albums.value.files
    albums.value.files = albums.value.files.filter((file) => file.id !== id)
  } else {
    // Jika file lama, tandai status 'delete'
    fileToUpdate.status = 'delete'
  }

  albumBucket.value = albumBucket.value.filter((file) => file.id !== id)
  // Update tampilan bucket (hanya tampilkan file yang belum dihapus)
  // albumBucket.value = albums.value.files.filter((file) => file.status !== 'delete')

  console.log('delete albums : ', albums.value.files)
  console.log('delete albums bucket : ', albumBucket.value)
}

function addTag() {
  const newTag = tagInput.value.trim()
  if (newTag && !albums.value.tags.includes(newTag)) {
    albums.value.tags.push(newTag)
    tagInput.value = ''
  }
}

const removeTag = (tag) => {
  albums.value.tags = albums.value.tags.filter((t) => t !== tag)
}

const filteredTags = computed(() =>
  availableTags.value.filter((tag) => !albums.value.tags.includes(tag)),
)

const addTargetEmail = () => {
  console.log('addTargetEmail : ', albums.value.targetEmails)
  const newTargetEmail = targetEmailInput.value.trim()
  // console.log('target email input : ', newTargetEmail)
  if (newTargetEmail && !albums.value.targetEmails.includes(newTargetEmail)) {
    albums.value.targetEmails.push(newTargetEmail)
    targetEmailInput.value = ''
  }
}

const removeTargetEmail = (email) => {
  albums.value.targetEmails = albums.value.targetEmails.filter((e) => e !== email)
}

const filteredTargetEmails = computed(() =>
  availableTags.value.filter((tag) => !selectedTags.value.includes(tag)),
)

const checkDescriptionChange = (file) => {
  const original = originalDescriptions.value[file.id]
  //update albums.files where file.id == file.id here
  if (file.description !== original) {
    const fileToUpdate = albums.value.files.find((item) => item.id === file.id)
    const fileToUpdateBucket = albumBucket.value.find((item) => item.id === file.id)

    if (fileToUpdate) {
      // fileToUpdate.new = true
      // fileToUpdate.raw = file.raw
      fileToUpdate.name = file.description
      fileToUpdate.description = file.description

      fileToUpdateBucket.name = file.description
      fileToUpdateBucket.description = file.description
    }
  }
  console.log('raw : ', file)
  console.log('update album media des : ', albums.value)
  console.log('update album media bucket : ', albumBucket.value)
}

console.log('usefadata : ', userData)
onMounted(() => {
  // albums.value.files.forEach((file) => {
  //   originalDescriptions.value[file.id] = file.description
  // })

  getAlbumDetail()
})
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
    <!-- <UploadSectionEditComponent :albums="albums" /> -->
    <!-- Dropzone -->
    <div
      class="border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-all"
      :class="dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'"
      @dragenter.prevent="dragActive = true"
      @dragleave.prevent="dragActive = false"
      @dragover.prevent="dragActive = true"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*,video/*"
        class="hidden"
        @change="handleFileChange"
      />

      <div class="flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-blue-500 mb-4"
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
        <h3 class="text-lg font-medium mb-2">Drag and drop your media here</h3>
        <p class="text-gray-500 mb-4">or click to browse files</p>
        <p class="text-gray-400 text-sm">
          Supported formats: JPEG, PNG, GIF, WebP, MP4, MOV, WEBMP
        </p>
        <p class="text-gray-400 text-sm">
          Maximum file size: {{ userData?.maximum_media_size_string }} per media
        </p>
      </div>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading" class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium">Uploading...</span>
        <span class="text-sm font-medium">{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
      </div>
    </div>

    <!-- Selected Files -->
    <div v-if="albumBucket?.length > 0">
      <h3 class="text-lg font-medium mb-3">Selected Images ({{ albumBucket?.length }})</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        <div
          v-for="file in albumBucket"
          :key="file.id"
          class="relative rounded-lg overflow-hidden bg-gray-100"
        >
          <img v-if="file.type === 'image'" :src="file.url" class="w-full h-40 object-cover" />
          <video
            v-else-if="file.type === 'video'"
            :key="`${file.type}-${file.id}`"
            controls
            class="w-full h-40 object-cover"
            :src="file.url"
          ></video>
          <div
            class="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
          >
            <button
              @click="removeFile(file.id)"
              class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 pl-2 truncate space-y-1"
          >
            <input
              type="text"
              v-model="file.description"
              @input="checkDescriptionChange(file)"
              class="w-full bg-transparent border-none text-white placeholder:text-white/70 focus:ring-0 focus:outline-none"
              placeholder="Add a description"
            />
            <!-- <div class="truncate">{{ file.name }}</div> -->
            <div class="text-gray-300">{{ file.size }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Album Details -->
    <div class="mb-6">
      <h3 class="text-lg font-medium mb-4">Album Details</h3>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Album Title</label>
        <input
          v-model="albums.title"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter album title"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="albums.description"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your album"
        ></textarea>
      </div>

      <!-- User Addd -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>

        <div class="flex flex-wrap gap-2 mb-2">
          <span
            v-for="tag in albums.tags"
            :key="tag"
            class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {{ tag }}
            <button
              @click="removeTag(tag)"
              class="ml-1 text-blue-800 hover:text-blue-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
          </span>
        </div>

        <div class="flex">
          <input
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{
              'border-red-500': errorsAlbumUpload?.tag,
            }"
            placeholder="Add a tag"
          />
          <button
            @click="addTag"
            class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <p v-if="errorsAlbumUpload?.tag" class="text-red-500 text-sm mt-1">
          {{ errorsAlbumUpload?.tag }}
        </p>

        <div class="mt-2">
          <p class="text-sm text-gray-600 mb-1">Suggested tags:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in filteredTags"
              :key="tag"
              @click="albums.tags.push(tag)"
              class="bg-gray-100 text-gray-800 hover:bg-gray-200 px-2 py-1 rounded-md text-sm"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Privacy -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Privacy Settings</label>
        <div class="mt-2 space-y-3">
          <div class="flex items-center">
            <input
              id="privacy-public"
              name="privacy"
              type="radio"
              value="public"
              v-model="albums.privacy"
              class="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <label for="privacy-public" class="ml-3">
              <span class="block text-sm font-medium text-gray-700">Public</span>
              <span class="block text-xs text-gray-500">Anyone can view this album</span>
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="privacy-restricted"
              name="privacy"
              type="radio"
              value="restricted"
              v-model="albums.privacy"
              class="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <label for="privacy-restricted" class="ml-3">
              <span class="block text-sm font-medium text-gray-700">Restricted</span>
              <span class="block text-xs text-gray-500"
                >Only people with the link can view this album</span
              >
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="privacy-private"
              name="privacy"
              type="radio"
              value="private"
              v-model="albums.privacy"
              class="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <label for="privacy-private" class="ml-3">
              <span class="block text-sm font-medium text-gray-700">Private</span>
              <span class="block text-xs text-gray-500">Only you can view this album</span>
            </label>
          </div>
        </div>
      </div>

      <div class="mb-4" v-if="albums.privacy === 'restricted'">
        <label class="block text-sm font-medium text-gray-700 mb-1">Target Email</label>
        <div class="flex flex-wrap gap-2 mb-2">
          <span
            v-for="email in albums.targetEmails"
            :key="email"
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center mt-2"
          >
            {{ email }}
            <button
              @click="removeTargetEmail(email)"
              class="ml-1 text-green-800 hover:text-green-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
          </span>
        </div>
        <div class="flex">
          <input
            v-model="targetEmailInput"
            @keydown.enter.prevent="addTargetEmail"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{
              'border-red-500': errorsAlbumUpload?.targetEmail,
            }"
            placeholder="Add a email"
          />
          <button
            @click="addTargetEmail"
            class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <p v-if="errorsAlbumUpload?.targetEmail" class="text-red-500 text-sm mt-1">
          {{ errorsAlbumUpload?.targetEmail }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-4">
        <!-- Cancel Button -->
        <button
          class="cursor-pointer px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          @click="resetForm"
        >
          Cancel
        </button>

        <!-- Upload Button -->
        <button
          class="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="albums.files.length === 0 || !albums.title || uploading"
          @click="updateAlbum"
        >
          <span v-if="!uploading">Upload Album</span>
          <span v-else>Uploading...</span>
        </button>
      </div>
    </div>
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
