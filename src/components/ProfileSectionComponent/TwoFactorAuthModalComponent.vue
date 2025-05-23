<script setup>
import { ref } from 'vue'

const emits = defineEmits(['close-modal', 'verify-tfa'])

const closeModal = () => {
  emits('close-modal')
}

const verifyTFA = () => {
  emits('verify-tfa')
}
</script>

<template>
  <section class="container mx-auto px-4 py-4 mb-16 items-center justify-center flex mt-30">
    <div
      class="relative bg-white p-8 md:p-8 rounded-lg shadow-md max-w-xl md:min-w-md h-auto w-full"
    >
      <!-- Tombol X (Close) -->
      <button
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
      </button>

      <div>
        <div class="max-w-xl mx-auto">
          <div class="bg-gray-50 rounded-lg p-3">
            <!-- <h3 class="text-base font-semibold mb-2">Two-Factor Authentication (2FA)</h3> -->
            <div class="space-y-3">
              <!-- QR Code Area -->
              <div class="flex flex-col items-center">
                <div class="bg-gray-50 p-3 rounded-lg">
                  <div
                    class="bg-white p-2 border border-gray-200 rounded-md shadow-sm mx-auto w-44 h-44 flex items-center justify-center"
                  >
                    <!-- Replace with actual QR code -->
                    <img src="" alt="QR Code" class="w-full h-full" />
                  </div>
                </div>
                <p class="mt-2 text-xs text-gray-600 text-center max-w-xs">
                  Scan this QR code with your authenticator app (Google Authenticator, Microsoft
                  Authenticator, Authy, or similar)
                </p>
              </div>

              <!-- 6-Digit Code Input -->
              <div class="mt-3">
                <label for="otp" class="block text-xs font-medium text-gray-700 mb-2">
                  Enter the 6-digit verification code
                </label>
                <div class="grid grid-cols-4 gap-2 items-center">
                  <!-- 75% Width for OTP inputs -->
                  <div class="col-span-3 flex justify-between space-x-2">
                    <input
                      type="text"
                      maxlength="1"
                      class="sm:w-12 sm:h-12 w-10 h-10 text-center text-base font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      autofocus
                    />
                    <input
                      type="text"
                      maxlength="1"
                      class="sm:w-12 sm:h-12 w-10 h-10 text-center text-base font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                    <input
                      type="text"
                      maxlength="1"
                      class="sm:w-12 sm:h-12 w-10 h-10 text-center text-base font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                    <input
                      type="text"
                      maxlength="1"
                      class="sm:w-12 sm:h-12 w-10 h-10 text-center text-base font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                    <input
                      type="text"
                      maxlength="1"
                      class="sm:w-12 sm:h-12 w-10 h-10 text-center text-base font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                    <input
                      type="text"
                      maxlength="1"
                      class="sm:w-12 sm:h-12 w-10 h-10 text-center text-base font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>

                  <!-- 25% Width for Verify button -->
                  <div class="hidden sm:grid sm:col-span-1">
                    <button
                      type="button"
                      @click="verifyTFA"
                      class="w-full h-12 inline-flex justify-center items-center px-4 py-2 text-md font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>

              <div class="sm:hidden flex justify-center">
                <button
                  type="button"
                  @click="verifyTFA"
                  class="w-[40%] h-12 inline-flex justify-center items-center px-4 py-2 text-md font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Verify
                </button>
              </div>

              <!-- Backup Code Section -->
              <div class="bg-yellow-50 border border-yellow-200 rounded-md p-2 mt-2">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-yellow-400"
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
                  <div class="ml-2">
                    <h4 class="text-xs font-medium text-yellow-800">
                      Important: Save your backup codes
                    </h4>
                    <p class="text-xs text-yellow-700 mt-1">
                      After completing setup, you'll receive backup codes. Store these securely in
                      case you lose access to your authenticator app.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
