<script setup>
import { ref } from 'vue'

const props = defineProps({
  albumDetail: {
    type: Object,
    required: true,
  },
  viewMode: {
    type: Number,
    default: 1,
  },
})

const emits = defineEmits(['change-view-mode', 'click-like-album'])

const changeViewMode = (mode) => {
  emits('change-view-mode', mode)

  console.log('view mode now:', props.viewMode)
}

const clickLikeAlbum = () => {
  emits('click-like-album')
}
</script>

<template>
  <!-- Album Header -->
  <div
    class="flex flex-col md:flex-row md:justify-between md:items-start mb-6 pb-4 border-b border-gray-200"
  >
    <div class="flex items-start space-x-3 mb-4 md:mb-0">
      <div class="bg-blue-500 text-white p-2 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      </div>
      <div>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">{{ props.albumDetail.title }}</h1>

          <span class="text-gray-600 mb-3 hidden md:hidden sm:block">{{
            props.albumDetail.createdAt
          }}</span>
        </div>

        <div class="block sm:flex items-center mt-1 space-y-2 sm:space-y-0 sm:space-x-3">
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
              />
            </svg>

            <span class="text-gray-600">{{ props.albumDetail.creator.createdBy }}</span>
          </div>
          <!-- <span class="mx-2 text-gray-400">•</span> -->
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">{{ props.albumDetail.imageCount }} </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </div>

            <div class="flex items-center space-x-1">
              <span class="text-gray-600">{{ props.albumDetail.videoCount }} </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>

            <div class="flex items-center space-x-1">
              <span>{{ props.albumDetail.likes }}</span>

              <button @click="clickLikeAlbum" class="text-gray-500 hover:text-red-500 transition">
                <svg
                  v-if="!props.albumDetail.watcherHasLike"
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

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.998 4.529c-2.5-2.403-6.57-2.054-8.77.693-1.87 2.356-1.573 5.81.716 7.898l7.275 7.036a.75.75 0 001.062 0l7.275-7.036c2.289-2.088 2.586-5.542.716-7.898-2.2-2.747-6.27-3.096-8.77-.693l-.252.242-.252-.242z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <p class="sm:block hidden text-gray-500 mt-2">
          {{ props.albumDetail.description }}
        </p>
      </div>
    </div>

    <div class="md:flex flex-col items-end">
      <span class="text-gray-600 mb-3 hidden md:block">{{ props.albumDetail.createdAt }}</span>
      <div class="flex flex-col items-end md:items-center space-y-4 md:space-x-4">
        <div
          class="md:flex items-end space-x-1 border border-gray-300 rounded overflow-hidden hidden"
        >
          <button
            @click="changeViewMode(1)"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ 'bg-blue-500 text-white': props.viewMode === 1 }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" />
            </svg>
          </button>
          <button
            @click="changeViewMode(3)"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ 'bg-blue-500 text-white': props.viewMode === 3 }"
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <button
            @click="changeViewMode(6)"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ 'bg-blue-500 text-white': props.viewMode === 6 }"
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <!-- <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-2"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Download All</span>
        </button> -->
      </div>
    </div>
  </div>
</template>
