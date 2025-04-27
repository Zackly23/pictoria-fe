<script setup>

const props = defineProps({
  viewMode: {
    type: Number,
    default: 1,
  },
});

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
            @click="viewMode = 1"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ active: viewMode === 1 }"
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
            @click="viewMode = 3"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ active: viewMode === 3 }"
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
            @click="viewMode = 6"
            class="grid-layout-btn px-3 py-1 hover:bg-gray-100 focus:outline-none transition"
            :class="{ active: viewMode === 6 }"
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
              class="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Oldest First</option>
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <!-- Album grid  -->
      <div
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      >
        <div class="relative h-48">
          <img src="" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-white text-xl font-bold">Nature Collection</h3>
            <p class="text-gray-200">25 photos</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4">
            A collection of my best nature photography from around the world.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated 3 days ago</span>
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

      <div
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      >
        <div class="relative h-48">
          <img src="" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-white text-xl font-bold">Urban Landscapes</h3>
            <p class="text-gray-200">18 photos</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4">
            City scenes and architectural photography from my travels.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated 1 week ago</span>
            <div class="flex space-x-2">
              <button class="text-gray-500 hover:text-blue-500">
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
              </button>
              <button class="text-gray-500 hover:text-blue-500">
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

      <div
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      >
        <div class="relative h-48">
          <img src="" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-white text-xl font-bold">Portrait Sessions</h3>
            <p class="text-gray-200">32 photos</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4">
            Professional portrait photography sessions with various clients.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated 2 weeks ago</span>
            <div class="flex space-x-2">
              <button class="text-gray-500 hover:text-blue-500">
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
              </button>
              <button class="text-gray-500 hover:text-blue-500">
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

      <div
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      >
        <div class="relative h-48">
          <img src="" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-white text-xl font-bold">Nature Collection</h3>
            <p class="text-gray-200">25 photos</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4">
            A collection of my best nature photography from around the world.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated 3 days ago</span>
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

      <div
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      >
        <div class="relative h-48">
          <img src="" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-white text-xl font-bold">Urban Landscapes</h3>
            <p class="text-gray-200">18 photos</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4">
            City scenes and architectural photography from my travels.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated 1 week ago</span>
            <div class="flex space-x-2">
              <button class="text-gray-500 hover:text-blue-500">
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
              </button>
              <button class="text-gray-500 hover:text-blue-500">
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

      <div
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      >
        <div class="relative h-48">
          <img src="" alt="Album cover" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-white text-xl font-bold">Portrait Sessions</h3>
            <p class="text-gray-200">32 photos</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 mb-4">
            Professional portrait photography sessions with various clients.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">Updated 2 weeks ago</span>
            <div class="flex space-x-2">
              <button class="text-gray-500 hover:text-blue-500">
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
              </button>
              <button class="text-gray-500 hover:text-blue-500">
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

    <!-- Pagination  -->
    <!-- Add this pagination component after your image grid -->
    <div class="flex items-center justify-between mt-8 mb-12">
      <div class="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">8</span> of
            <span class="font-medium">24</span> results
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              aria-current="page"
              class="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              2
            </a>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              3
            </a>
            <span
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              ...
            </span>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              8
            </a>
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold mb-6">Recent Photos</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 image-grid">
      <div class="overflow-hidden rounded-lg relative group">
        <img src="" alt="User image" class="w-full h-48 object-cover transition duration-300" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition duration-300"
        ></div>
        <div
          class="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition duration-300"
        >
          <p class="text-white font-medium">Mountain Sunset</p>
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
            145
          </div>
        </div>
      </div>

      <div class="overflow-hidden rounded-lg relative group">
        <img src="" alt="User image" class="w-full h-48 object-cover transition duration-300" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition duration-300"
        ></div>
        <div
          class="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition duration-300"
        >
          <p class="text-white font-medium">Mountain Sunset</p>
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
            145
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
