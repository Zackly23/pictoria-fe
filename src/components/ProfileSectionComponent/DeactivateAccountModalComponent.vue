<script setup>
import { ref } from 'vue'
import api from '@/api'

const emits = defineEmits(['close-modal'])

const closeModal = () => {
  emits('close-modal')
}

const deactivateConfirmation = ref('')

const deactivateAccount = async () => {
  try {
    if (deactivateConfirmation.value === 'DEACTIVATE') {
      const response = await api.post('/users/deactivate')

      console.log('response deactivate: ', response.data)

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')

      window.location.href = '/'
    } else {
      return
    }
  } catch (error) {
    console.error('error deactuvate : ', error)
  }
}
</script>

<template>
  <section class="container mx-auto px-4 py-4 mb-16 items-center justify-center flex mt-30">
    <div
      class="relative bg-white p-4 md:p-6 rounded-lg shadow-md max-w-xl md:min-w-md h-auto w-full"
    >
      <!-- Tombol X (Close) -->
      <!-- <button
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
      </button> -->

      <div class="bg-white rounded-lg shadow-lg max-w-xl mx-auto overflow-hidden">
        <!-- Header -->
        <div class="bg-red-500 p-4">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 class="text-lg font-bold text-white ml-2">Deactivate Account</h2>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 pb-1">
          <div class="mb-6">
            <h3 class="text-gray-800 font-medium mb-2">What happens when you deactivate:</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Your profile and content will be hidden immediately</span>
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>You won't be able to access your account or data</span>
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  >If you do not log in within 30 days, your account will be permanently
                  deleted</span
                >
              </li>
            </ul>
          </div>

          <!-- Confirmation Input -->
          <div class="mb-4">
            <label for="confirm" class="block text-sm font-medium text-gray-700 mb-2">
              To confirm, type "DEACTIVATE" below:
            </label>
            <input
              type="text"
              id="confirm"
              placeholder="DEACTIVATE"
              v-model="deactivateConfirmation"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-sm"
              autofocus
            />
          </div>

          <!-- Warning Box -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-yellow-700">
                  You can reactivate your account anytime within 30 days by logging in. After that,
                  it may be scheduled for deletion depending on our data retention policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="bg-gray-50 px-6 py-4 flex justify-between">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="deactivateAccount"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}
.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
