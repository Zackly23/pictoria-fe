<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'

const toast = useToast()

const router = useRouter()
const emailResetPassword = ref('')
const emit = defineEmits(['close-modal'])

const sendResetPassword = async () => {
  console.log('emailResetPassword : ', emailResetPassword.value)
  try {
    const response = await axios.post('http://127.0.0.1:3001/api/v1/auth/reset-password', {
      email: emailResetPassword.value,
    })

    console.log('email : ', emailResetPassword.value)

    if (response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Reset Password',
        detail: 'Email reset password telah dikirim',
        life: 3000,
      })
      // Tutup modal
      closeModal()
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal mengirim email',
      detail: 'Terjadi kesalahan saat mengirim email reset password',
      life: 3000,
    })
    console.error(error)
  }
}

const closeModal = () => {
  emailResetPassword.value = ''
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
            <h1 classs="text-xl font-semibold">Forget Password</h1>

            <div class="rounded-lg overflow-hidden mb-4 mt-4">
              <label for="current-password" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <div class="flex items-center">
                <input
                  type="email"
                  id="current-password"
                  name="current-password"
                  v-model="emailResetPassword"
                  placeholder="your@email.com"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
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
