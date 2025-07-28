<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'

const toast = useToast()
const router = useRouter()
const route = useRoute()

const token = ref(route.query.token || '')
const newPasswordConfirmation = ref('')
const newPassword = ref('')
const showNewPassword = ref(false)
const showNewPasswordConfirmation = ref(false)
const passwordNotMatch = ref(false)

const sendForgotPassword = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:3001/api/v1/auth/forgot-password', {
      token: token.value,
      new_password: newPassword.value,
      new_password_confirmation: newPasswordConfirmation.value,
    })

    // console.log('email : ', emailResetPassword.value)

    if (response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Reset Password',
        detail: 'Password berhasil diubah',
        life: 3000,
      })
      router.push('/login')
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal mengubah password',
      detail: 'Terjadi kesalahan saat mengubah password',
      life: 3000,
    })
    console.error(error)
  }
}

watch(
  () => [newPassword.value, newPasswordConfirmation.value],
  () => {
    passwordNotMatch.value = newPassword.value !== newPasswordConfirmation.value
  },
)
</script>

<template>
  <section class="container mx-auto px-4 py-4 mb-16 items-center justify-center flex mt-30">
    <div
      class="relative bg-white p-8 md:p-8 rounded-lg shadow-md max-w-xl md:min-w-xl h-auto w-full"
    >
      <div>
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-50 rounded-lg p-4">
            <!-- <h1 classs="text-xl font-semibold">Forget Password</h1> -->

            <div class="flex flex-col space-y-4 mt-4 mb-4">
              <div>
                <label for="new-password" class="block text-sm font-medium text-gray-700 mb-2">
                  New password
                </label>

                <div class="relative flex flex-col">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    id="new-password"
                    name="new-password"
                    v-model="newPassword"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="At least 8 characters"
                  />

                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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

              <div>
                <label
                  for="new-password-confirmation"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  New password Confirmation
                </label>

                <div class="relative flex flex-col">
                  <input
                    :type="showNewPasswordConfirmation ? 'text' : 'password'"
                    id="new-password-confirmation"
                    name="new-password-confirmation"
                    v-model="newPasswordConfirmation"
                    :class="{
                      'border-red-500': passwordNotMatch,
                    }"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="At least 8 characters"
                  />

                  <button
                    type="button"
                    @click="showNewPasswordConfirmation = !showNewPasswordConfirmation"
                    class="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      v-if="showNewPasswordConfirmation"
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
              <p v-if="passwordNotMatch" class="text-red-500 text-sm mt-1">
                Passwords does not match.
              </p>
            </div>
            <button
              @click="sendForgotPassword"
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
