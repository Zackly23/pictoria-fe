<script setup>
import { ref } from 'vue'
import UploadSectionComponent from '@/components/UploadSectionComponent/UploadSectionComponent.vue'

const activeTab = ref('albums')
</script>

<template>
  <!-- Profile Header -->
  <section class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center md:items-start">
        <div
          class="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold mb-4 md:mb-0 md:mr-6"
        >
          JD
        </div>
        <div class="text-center md:text-left flex-1">
          <div class="flex flex-col md:flex-row md:items-center mb-2">
            <h1 class="text-3xl font-bold">John Doe</h1>
            <div class="mt-2 md:mt-0 md:ml-4 flex items-center justify-center md:justify-start">
              <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Pro Subscription
              </span>
            </div>
          </div>
          <p class="text-gray-600 mb-4">Professional Photographer • San Francisco, CA</p>
          <div class="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm tag-badge"
              >Portrait</span
            >
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm tag-badge"
              >Nature</span
            >
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm tag-badge"
              >Travel</span
            >
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm tag-badge"
              >Architecture</span
            >
          </div>
          <p class="text-gray-700 max-w-2xl mb-6">
            Award-winning photographer with over 10 years of experience. Specializing in portrait,
            nature, and architectural photography. Available for freelance work and collaborations.
          </p>
          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <button
              class="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition"
            >
              Follow
            </button>
            <button
              class="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition"
            >
              Message
            </button>
            <a
              href="#"
              class="text-blue-500 hover:text-blue-700 px-6 py-2 font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                />
              </svg>
              Share Profile
            </a>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <div class="flex space-x-8 mb-2">
              <div>
                <p class="text-2xl font-bold">128</p>
                <p class="text-gray-600 text-sm">Images</p>
              </div>
              <div>
                <p class="text-2xl font-bold">10.5k</p>
                <p class="text-gray-600 text-sm">Followers</p>
              </div>
              <div>
                <p class="text-2xl font-bold">324</p>
                <p class="text-gray-600 text-sm">Following</p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-blue-100">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-600">Storage:</span>
                <span class="font-medium">15.7 GB / 50 GB</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 31%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Profile Stats (Mobile) -->
  <section class="md:hidden bg-blue-50 border-b border-gray-200">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between mb-4">
        <div class="text-center">
          <p class="text-xl font-bold">128</p>
          <p class="text-gray-600 text-sm">Images</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">10.5k</p>
          <p class="text-gray-600 text-sm">Followers</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">324</p>
          <p class="text-gray-600 text-sm">Following</p>
        </div>
      </div>
      <div class="pt-2 border-t border-blue-100">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-600">Storage:</span>
          <span class="font-medium">15.7 GB / 50 GB</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" style="width: 31%"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Subscription Info (Mobile) -->
  <!-- <section class="md:hidden bg-white border-b border-gray-200 py-3">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-center">
        <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Pro Subscription
        </span>
      </div>
    </div>
  </section> -->

  <!-- Profile Navigation -->
  <section class="bg-white border-b border-gray-200 sticky top-16 z-30">
    <div class="container mx-auto px-4">
      <div class="flex overflow-x-auto scrollbar-hide" x-data="{ activeTab: 'albums' }">
        <button
          @click="activeTab = 'albums'"
          :class="{ 'tab-active': activeTab === 'albums' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Albums
        </button>
        <button
          @click="activeTab = 'upload'"
          :class="{ 'tab-active': activeTab === 'upload' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Upload
        </button>
        <!-- <button
          @click="activeTab = 'about'"
          :class="{ 'tab-active': activeTab === 'about' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          About
        </button> -->
        <button
          @click="activeTab = 'settings'"
          :class="{ 'tab-active': activeTab === 'settings' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Settings
        </button>
        <button
          @click="activeTab = 'subscription'"
          :class="{ 'tab-active': activeTab === 'subscription' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Subscription
        </button>
      </div>
    </div>
  </section>

  <!-- Tab Content -->
  <section class="container mx-auto px-4 py-8" x-data="{ activeTab: 'albums' }">
    <!-- Albums Tab -->
    <div v-show="activeTab === 'albums'">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">My Albums</h2>
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
        >
          <div class="relative h-48">
            <img src="" alt="Album cover" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"
            ></div>
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
                <router-link :to="`/album/${1}/edit`"  class="text-gray-500 hover:text-blue-500">
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
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"
            ></div>
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
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"
            ></div>
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

    <!-- Upload Tab  -->
    <div v-show="activeTab === 'upload'">
      <div class="px-2">
        <UploadSectionComponent />
      </div>
    </div>
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
