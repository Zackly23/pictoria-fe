<script setup>
import { ref, computed } from 'vue'

const emits = defineEmits(['new-store-album'])
const props = defineProps({
  albums: {
    type: Object,
    default: ref(),
  },
})

const dragActive = ref(false)
const files = ref(props.albums.files)
const uploading = ref(false)
const uploadProgress = ref(0)

const albumTitle = ref('')
const albumDescription = ref('')
const selectedTags = ref([])
const availableTags = ref(['Nature', 'Travel', 'Family', 'Friends', 'Work', 'Food'])
const tagInput = ref('')
const privacy = ref('public')
const targetEmailInput = ref('')
const selectedEmails = ref([])

// Reset form
const resetForm = () => {
  files.value = []
  albumTitle.value = ''
  albumDescription.value = ''
  privacy.value = 'public'
  selectedTags.value = []
}

// Simulasi upload
const simulateUpload = () => {
  uploading.value = true

  // Simulasi delay upload (contoh 2 detik)
  setTimeout(() => {
    storeNewAlbum()
    alert('Upload berhasil!')
    resetForm()
    uploading.value = false
  }, 2000)
}

const storeNewAlbum = () => {
  let status = 200
  // Simulate storing the new album in a database or API
  console.log('Storing new album...')
  console.log('Title:', albumTitle.value)
  console.log('Description:', albumDescription.value)
  console.log('Files:', files.value)
  console.log('Tags:', selectedTags.value)
  console.log('Privacy:', privacy.value)
  console.log('Target Emails:', selectedEmails.value)

  if (status == 200) {
    emits('new-store-album')
  }
}

const handleFileChange = (e) => {
  const inputFiles = Array.from(e.target.files)
  inputFiles.forEach((file, index) => {
    files.value.push({
      id: Date.now() + index,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      url: URL.createObjectURL(file),
      raw: file,
      description: '', // Add a description field for each file
    })
  })
}

const handleDrop = (e) => {
  dragActive.value = false
  handleFileChange({ target: { files: e.dataTransfer.files } })
}

const removeFile = (id) => {
  files.value = files.value.filter((file) => file.id !== id)
}

function addTag() {
  const newTag = tagInput.value.trim()
  if (newTag && !selectedTags.value.includes(newTag)) {
    selectedTags.value.push(newTag)
    tagInput.value = ''
  }
}

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag)
}

const filteredTags = computed(() =>
  availableTags.value.filter((tag) => !selectedTags.value.includes(tag)),
)

const addTargetEmail = () => {
  console.log('addTargetEmail : ', targetEmailInput.value)
  const newTargetEmail = targetEmailInput.value.trim()
  if (newTargetEmail && !selectedEmails.value.includes(newTargetEmail)) {
    selectedEmails.value.push(newTargetEmail)
    targetEmailInput.value = ''
  }
}

const removeTargetEmail = (email) => {
  selectedEmails.value = selectedEmails.value.filter((e) => e !== email)
}

const filteredTargetEmails = computed(() =>
  availableTags.value.filter((tag) => !selectedTags.value.includes(tag)),
)
</script>

<template>
  <!-- <h2 class="text-2xl font-bold mb-6">Upload Photos</h2> -->

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
      accept="image/*"
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
      <h3 class="text-lg font-medium mb-2">Drag and drop your images here</h3>
      <p class="text-gray-500 mb-4">or click to browse files</p>
      <p class="text-gray-400 text-sm">Supported formats: JPEG, PNG, GIF, WebP</p>
      <p class="text-gray-400 text-sm">Maximum file size: 10MB per image</p>
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
  <div v-if="files.length > 0">
    <h3 class="text-lg font-medium mb-3">Selected Images ({{ files.length }})</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
      <div
        v-for="file in files"
        :key="file.id"
        class="relative rounded-lg overflow-hidden bg-gray-100"
      >
        <img :src="file.url" class="w-full h-40 object-cover" />
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
        v-model="albumTitle"
        type="text"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter album title"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea
        v-model="albumDescription"
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
          v-for="tag in selectedTags"
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
          placeholder="Add a tag"
        />
        <button
          @click="addTag"
          class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div class="mt-2">
        <p class="text-sm text-gray-600 mb-1">Suggested tags:</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in filteredTags"
            :key="tag"
            @click="selectedTags.push(tag)"
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
            v-model="privacy"
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
            v-model="privacy"
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
            v-model="privacy"
            class="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
          />
          <label for="privacy-private" class="ml-3">
            <span class="block text-sm font-medium text-gray-700">Private</span>
            <span class="block text-xs text-gray-500">Only you can view this album</span>
          </label>
        </div>
      </div>
    </div>

    <div class="mb-4" v-if="privacy === 'restricted'">
      <label class="block text-sm font-medium text-gray-700 mb-1">Target Email</label>

      <div class="flex">
        <input
          v-model="targetEmailInput"
          @keydown.enter.prevent="addTargetEmail"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a email"
        />
        <button
          @click="addTargetEmail"
          class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="email in selectedEmails"
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
        :disabled="files.length === 0 || !albumTitle || uploading"
        @click="simulateUpload"
      >
        <span v-if="!uploading">Upload Album</span>
        <span v-else>Uploading...</span>
      </button>
    </div>
  </div>

</template>
