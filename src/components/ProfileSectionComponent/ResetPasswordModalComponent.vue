<script setup>
import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const emit = defineEmits(['close-modal'])
const recentPassword = ref('')
const newPassword = ref('')

const sendResetPassword = async () => {
  console.log('email reset password : ', recentPassword.value, ' and ', newPassword.value)
  try {
    const response = await api.put('/auth/change-password', {
      recent_password: recentPassword.value,
      new_password: newPassword.value,
    })

    console.log('response : ', response)

    if (response.status === 200) {
      console.log('permintaan terkirim')
      router.push('/login')
    }
  } catch (error) {
    console.error(error)
  }
}

const closeModal = () => {
  emit('close-modal')
}
</script>

<template>
  <section class="container mx-auto px-4 py-4 mb-16 items-center justify-center flex mt-30">
    <div
      class="relative bg-white p-8 md:p-8 rounded-lg shadow-md max-w-xl md:min-w-xl h-auto w-full"
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
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="rounded-lg overflow-hidden mb-4">
              <div>
                <label for="current-password" class="block text-sm font-medium text-gray-700"
                  >Current Password</label
                >
                <div class="relative flex items-center mb-3">
                  <input
                    :type="showCurrentPassword ? 'text' : 'password'"
                    id="current-password"
                    name="current-password"
                    v-model="recentPassword"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                  />
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      v-if="showCurrentPassword"
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.684.068-1.352.2-2M15 12a3 3 0 01-6 0m6 0a3 3 0 00-6 0m6 0h.01M12 5c1.657 0 3.156.672 4.242 1.758A6.002 6.002 0 0120 12a6.002 6.002 0 01-3.758 5.242M3 3l18 18"
                      />
                    </svg>
                    <svg
                      v-else
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm4.243-2.828A10.003 10.003 0 0012 5c-2.5 0-4.786.92-6.535 2.586A9.956 9.956 0 003 12c0 1.956.584 3.772 1.586 5.293A10.003 10.003 0 0012 19c2.5 0 4.786-.92 6.535-2.586A9.956 9.956 0 0021 12c0-1.956-.584-3.772-1.586-5.293z"
                      />
                    </svg>
                  </button>
                </div>

                <label for="new-password" class="block text-sm font-medium text-gray-700"
                  >New Password</label
                >
                <div class="relative flex items-center">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    id="new-password"
                    name="new-password"
                    v-model="newPassword"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                  />
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      v-if="showNewPassword"
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.684.068-1.352.2-2M15 12a3 3 0 01-6 0m6 0a3 3 0 00-6 0m6 0h.01M12 5c1.657 0 3.156.672 4.242 1.758A6.002 6.002 0 0120 12a6.002 6.002 0 01-3.758 5.242M3 3l18 18"
                      />
                    </svg>
                    <svg
                      v-else
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm4.243-2.828A10.003 10.003 0 0012 5c-2.5 0-4.786.92-6.535 2.586A9.956 9.956 0 003 12c0 1.956.584 3.772 1.586 5.293A10.003 10.003 0 0012 19c2.5 0 4.786-.92 6.535-2.586A9.956 9.956 0 0021 12c0-1.956-.584-3.772-1.586-5.293z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <button
              @click="sendResetPassword"
              class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full cursor-pointer"
            >
              Send Reset Password
            </button>
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
