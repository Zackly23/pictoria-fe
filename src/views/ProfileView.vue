<script setup>
import { ref } from 'vue'
import UploadSectionComponent from '@/components/UploadSectionComponent/UploadSectionComponent.vue'
import AlbumSectionComponent from '@/components/ProfileSectionComponent/AlbumSectionComponent.vue'
import SettingSectionComponent from '@/components/ProfileSectionComponent/SettingSectionComponent.vue'

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
    <AlbumSectionComponent v-show="activeTab === 'albums'" :view-mode="viewMode" />

    <!-- Upload Tab  -->
    <div v-show="activeTab === 'upload'">
      <div class="px-2">
        <UploadSectionComponent />
      </div>
    </div>

    <!-- Settings Tab Content -->
    <SettingSectionComponent v-show="activeTab === 'settings'" />
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
