<script setup>
import { computed, ref } from 'vue'
import PaginationAlbumComponent from '../AlbumsComponent/PaginationAlbumComponent.vue'
import DeleteAlbumModalComponent from './DeleteAlbumModalComponent.vue'
import router from '@/router'

const lastPageNumber = computed(() => props.lastPage)
const currentPageNumber = ref(1)
const deleteAlbumModalOpen = ref(false)
const albumIdSelected = ref('')

const props = defineProps({
  isUserHasSameId: {
    type: Boolean,
    default: false,
  },
  viewMode: {
    type: String,
    default: 'grid',
  },
  sortBy: {
    type: String,
    default: 'date',
  },
  albums: {
    type: Array,
    default: () => [],
  },
  userId: {
    type: String,
    required: true,
  },
  recentPhotos: {
    type: Array,
    default: () => [],
  },
  lastPage: {
    type: Number,
    required: true,
  },
  totalAlbum: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits([
  'change-view-mode',
  'change-sort-by',
  'change-page',
  'delete-album-handler',
])

const deleteAlbum = (album) => {
  console.log('albumID : ', album)
  albumIdSelected.value = album.id
  deleteAlbumModalOpen.value = true
}

const deleteAlbumHandler = () => {
  // Logic to delete the album
  console.log('Album deleted')
  deleteAlbumModalOpen.value = false
  emits('delete-album-handler')
}

const changeViewMode = (mode) => {
  emits('change-view-mode', mode)
}

const changeSortBy = (sort) => {
  // console.log('sort by : ', sort)
  emits('change-sort-by', sort)
  // console.log('sort by now : ', props.sortBy)
}

const changePaginationNumber = (number) => {
  if (number < 1 || number > lastPageNumber.value) {
    return
  }
  currentPageNumber.value = number
  console.log(number)

  emits('change-page', number)
}

console.log('ada albums = ? ', props?.albums)
console.log('ada file : ', props.albums.files)
</script>

<template>
  <div>
    <div class="flex justify-end items-center mb-6">
      <!-- <h2 class="text-xl font-bold">My Albums</h2> -->

      <div class="flex justify-center items-center space-x-2">
        <div
          class="md:flex items-center border border-gray-300 rounded overflow-hidden hidden px-3 py-1"
        >
          <!-- 2x2 Grid View Button -->
          <button
            @click="changeViewMode('grid')"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ 'active bg-gray-200 rounded-md': props.viewMode === 'grid' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="8" height="8" rx="1" stroke-width="2" />
              <rect x="13" y="3" width="8" height="8" rx="1" stroke-width="2" />
              <rect x="3" y="13" width="8" height="8" rx="1" stroke-width="2" />
              <rect x="13" y="13" width="8" height="8" rx="1" stroke-width="2" />
            </svg>
          </button>

          <!-- 4x4 Grid View Button -->
          <button
            @click="changeViewMode('more-grid')"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ 'active bg-gray-200 rounded-md': props.viewMode === 'more-grid' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="8" y="3" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="13" y="3" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="18" y="3" width="4" height="4" rx="0.5" stroke-width="2" />

              <rect x="3" y="8" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="8" y="8" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="13" y="8" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="18" y="8" width="4" height="4" rx="0.5" stroke-width="2" />

              <rect x="3" y="13" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="8" y="13" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="13" y="13" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="18" y="13" width="4" height="4" rx="0.5" stroke-width="2" />

              <rect x="3" y="18" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="8" y="18" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="13" y="18" width="4" height="4" rx="0.5" stroke-width="2" />
              <rect x="18" y="18" width="4" height="4" rx="0.5" stroke-width="2" />
            </svg>
          </button>

          <!-- List View Button -->
          <button
            @click="changeViewMode('list')"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ 'active bg-gray-200 rounded-md': props.viewMode === 'list' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="4" width="4" height="4" rx="1" stroke-width="2" />
              <rect x="3" y="10" width="4" height="4" rx="1" stroke-width="2" />
              <rect x="3" y="16" width="4" height="4" rx="1" stroke-width="2" />
              <line x1="10" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round" />
              <line x1="10" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round" />
              <line x1="10" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <select
              @change="changeSortBy($event.target.value)"
              @keyup.enter="changeSortBy($event.target.value)"
              class="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="oldest">Oldest First</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <router-link
            v-if="isUserHasSameId"
            :to="{
              name: 'profile',
              params: { userId: props.userId },
              query: { activeTab: 'upload' },
            }"
            class="bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-600 transition flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            New Album
          </router-link>
        </div>
      </div>
    </div>

    <!-- Album Section  -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3"
      :class="
        viewMode === 'grid'
          ? 'lg:grid-cols-4'
          : viewMode === 'more-grid'
            ? 'lg:grid-cols-6'
            : 'lg:grid-cols-1'
      "
    >
      <!-- Album grid  -->
      <div
        v-for="album in props.albums"
        :key="album.id"
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      >
        <div class="relative h-48">
          <img :src="album.coverImage" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <router-link :to="`/album/${album.id}/details`">
              <h3 class="text-white text-xl font-bold">{{ album.title }}</h3>
            </router-link>
            <!-- <p class="text-gray-200">{{ album.photoCount }} Media</p> -->
            <div class="flex items-center space-x-2">
              <div class="flex items-center space-x-1 text-white text-sm">
                <span>{{ album.imageCount }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                  />
                </svg>
              </div>
              <div class="flex items-center space-x-1 text-white text-sm">
                <span>{{ album.videoCount }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4" :class="viewMode === 'more-grid' ? 'hidden' : ''">
            {{ album.description }}
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated {{ album.updatedAt }}</span>
            <div class="flex space-x-2">
              <router-link
                :to="`/album/${album.id}/edit`"
                class="text-gray-500 hover:text-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </router-link>
              <button
                @click="deleteAlbum(album)"
                class="text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- End of album grid  -->
    </div>

    <!-- Pagination Section  -->
    <!-- Pagination  -->
    <div class="flex sm:justify-between justify-end items-center mt-2">
      <div class="hidden sm:flex items-center">
        <p class="text-sm text-gray-700">
          Showing <span class="font-medium">1</span> to
          <span class="font-medium">{{ props.albums?.length }}</span> of
          <span class="font-medium">{{ props.totalAlbum }}</span> results
        </p>
      </div>
      <div class="flex items-end justify-end">
        <PaginationAlbumComponent
          :current-page-number="currentPageNumber"
          @change-pagination-number="changePaginationNumber"
          :last-page-number="lastPageNumber"
          :position="'end'"
        />
      </div>
    </div>

    <!-- Recent Photos Section  -->
    <h2 class="text-xl font-bold mb-6">Recent Photos</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 image-grid">
      <div
        v-for="photo in props.recentPhotos"
        class="overflow-hidden rounded-lg relative group"
        :key="photo.id"
      >
        <img
          :src="photo.imageUrl"
          :alt="photo.title"
          class="w-full h-48 object-cover transition duration-300"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition duration-300"
        ></div>
        <div
          class="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition duration-300"
        >
          <p class="text-white font-medium">{{ photo.title }}</p>
          <div class="flex items-center text-white text-sm mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
              />
            </svg>
            {{ photo.likes }}
          </div>
        </div>
      </div>
    </div>

    <transition name="fade-zoom" appear>
      <div
        v-show="deleteAlbumModalOpen"
        class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30 h-full"
        role="dialog"
      >
        <DeleteAlbumModalComponent
          @close-modal="deleteAlbumModalOpen = false"
          @delete-album-handler="deleteAlbumHandler"
          :album-id="albumIdSelected"
        />
      </div>
    </transition>
  </div>
</template>
