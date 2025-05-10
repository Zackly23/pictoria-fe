<script setup>
import { ref } from 'vue'
import PaginationComponent from '../AlbumsComponent/PaginationComponent.vue'

const lastPageNumber = ref(10)
const currentPageNumber = ref(1)

const props = defineProps({
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
  recentPhotos: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['change-view-mode', 'change-sort-by'])

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
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">My Albums</h2>

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
              <option value="older">Oldest First</option>
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
          <button
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
          </button>
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
          <img src="" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <router-link :to="`/album/${album.id}/details`">
              <h3 class="text-white text-xl font-bold">{{ album.title }}</h3>
            </router-link>
            <p class="text-gray-200">{{ album.photoCount }} photos</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4" :class="viewMode === 'more-grid' ? 'hidden' : ''">
            {{ album.description }}
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated {{ album.updatedAt }}</span>
            <div class="flex space-x-2">
              <router-link :to="`/album/${1}/edit`" class="text-gray-500 hover:text-blue-500">
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
              <button class="text-gray-500 hover:text-red-500 cursor-pointer">
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
    <div class="flex justify-between items-center mt-2">
      <div>
        <p class="text-sm text-gray-700">
          Showing <span class="font-medium">1</span> to <span class="font-medium">8</span> of
          <span class="font-medium">24</span> results
        </p>
      </div>
      <div class="flex items-end justify-end">
        <PaginationComponent
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
  </div>
</template>
