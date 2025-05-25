<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { validateLogin } from '@/validations/LoginValidation'
import { validateSignup } from '@/validations/SignupValidation'
import api from '@/api'

const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()
const emailLogin = ref('')
const passwordLogin = ref('')
const emailSignup = ref('')
const passwordSignup = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const rememberMe = ref(false)
const termsAccepted = ref(false)

const showCurrentPasswordLogin = ref(false)
const showCurrentPasswordSignup = ref(false)
const showCurrentPasswordConfirm = ref(false)

const errorsLogin = ref()
const errorsSignup = ref()

const userLogin = async () => {
  // Logic for user login
  console.log('Logging in')
  // Check validation
  const { isValid, errors } = validateLogin(emailLogin.value, passwordLogin.value)

  if (!isValid) {
    errorsLogin.value = errors

    return
  }

  const response = await api.post('/login', {
    email: emailLogin.value,
    password: passwordLogin.value,
  })

  if (response.status === 200) {
    const user = response.data.user
    const accessToken = response.data.access_token
    const refreshToken = response.data.refresh_token

    console.log('Login response:', response.data)
    console.log('accessToken:', accessToken)
    console.log('refreshToken:', refreshToken)

    authStore.setUser(user)
    authStore.setToken(accessToken, refreshToken)


    if (localStorage.getItem('last_visited_page')) {
      router.push(localStorage.getItem('last_visited_page'))
    }

    router.push(`/profile/${user.id}`)
  }

  // console.log('Logging in with:', emailLogin.value, passwordLogin.value)
}

const userSignup = async () => {
  // Logic for user

  //check validation
  const { isValid, errors } = validateSignup(
    firstName.value,
    lastName.value,
    emailSignup.value,
    passwordSignup.value,
    confirmPassword.value,
  )

  // console.log('Signup data:', errors)

  if (!isValid) {
    errorsSignup.value = errors
    return
  }

  console.log(
    'Signing up with:',
    firstName.value,
    lastName.value,
    emailSignup.value,
    passwordSignup.value,
    confirmPassword.value,
  )

  const response = await api.post('/signup', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: emailSignup.value,
    password: passwordSignup.value,
    passwordConfirm: confirmPassword.value,
  })

  console.log('Signup response:', response.data)
}

// Ambil form yang sesuai dengan URL
const tab = computed(() => (route.path === '/signup' ? 'signup' : 'login'))

// Fungsi untuk mengubah rute ketika tombol ditekan
const changeRoute = (newTab) => {
  router.push({ path: `/${newTab}` })
}
</script>

<template>
  <main class="min-h-screen py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Auth Container -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="md:flex">
            <!-- Left side image and content -->
            <div class="auth-container hidden md:block md:w-1/2 relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"
              ></div>
              <div
                class="absolute inset-0 flex flex-col justify-center items-center text-white p-8"
              >
                <div class="text-4xl font-bold mb-4">Welcome Back!</div>
                <p class="text-lg mb-6 text-center">
                  Store, share, and showcase your images with the world's most trusted platform
                </p>
                <div class="flex justify-center space-x-4">
                  <div class="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold">5M+</div>
                    <div class="text-sm">Images</div>
                  </div>
                  <div class="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold">500K+</div>
                    <div class="text-sm">Users</div>
                  </div>
                  <div class="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold">99.9%</div>
                    <div class="text-sm">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right side form -->
            <div class="md:w-1/2 p-8">
              <div class="mb-8 flex justify-center md:justify-start">
                <div class="inline-flex rounded-lg">
                  <button
                    @click="changeRoute('login')"
                    :class="[
                      'py-2 px-6 rounded-l-lg font-medium transition focus:outline-none cursor-pointer',
                      tab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700',
                    ]"
                  >
                    Login
                  </button>
                  <button
                    @click="changeRoute('signup')"
                    :class="[
                      'py-2 px-6 rounded-r-lg font-medium transition focus:outline-none cursor-pointer',
                      tab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700',
                    ]"
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <!-- Login form -->
              <div v-if="tab === 'login'" class="form-fade-in">
                <!-- Your login form content here -->
                <h2 class="text-2xl font-bold mb-6 text-center md:text-left">
                  Sign In to Your Account
                </h2>
                <!-- ... (keep login form content here) -->
                <div class="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button
                    class="flex items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition w-full cursor-pointer"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    class="flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition w-full cursor-pointer"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                    Continue with Facebook
                  </button>
                </div>

                <div class="relative flex items-center my-6">
                  <div class="flex-grow border-t border-gray-300"></div>
                  <span class="flex-shrink mx-4 text-gray-600">or</span>
                  <div class="flex-grow border-t border-gray-300"></div>
                </div>

                <div>
                  <div class="mb-4">
                    <label for="email-login" class="block text-gray-700 font-medium mb-2"
                      >Email Address</label
                    >
                    <input
                      type="email"
                      id="email-login"
                      v-model="emailLogin"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="your@email.com"
                      :class="{
                        'border-red-500': errorsLogin?.email,
                      }"
                    />
                    <p v-if="errorsLogin?.email" class="text-red-500 text-sm mt-1">
                      {{ errorsLogin?.email }}
                    </p>
                  </div>

                  <div class="mb-6">
                    <div class="flex justify-between mb-2">
                      <label for="password-login" class="block text-gray-700 font-medium"
                        >Password</label
                      >
                      <router-link
                        to="/"
                        class="cursor-pointer text-sm text-blue-500 hover:text-blue-700"
                        >Forgot Password?</router-link
                      >
                    </div>
                    <div class="relative flex items-center">
                      <input
                        :type="showCurrentPasswordLogin ? 'text' : 'password'"
                        id="password-login"
                        v-model="passwordLogin"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="••••••••"
                        :class="{
                          'border-red-500': errorsLogin?.password,
                        }"
                      />

                      <button
                        type="button"
                        @click="showCurrentPasswordLogin = !showCurrentPasswordLogin"
                        class="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <svg
                          v-if="showCurrentPasswordLogin"
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
                    <p v-if="errorsLogin?.password" class="text-red-500 text-sm mt-1">
                      {{ errorsLogin?.password }}
                    </p>
                  </div>

                  <div class="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      v-model="rememberMe"
                      class="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label for="remember" class="ml-2 block text-gray-700">Remember me</label>
                  </div>

                  <button
                    @click="userLogin"
                    class="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>

                <p class="mt-6 text-center text-gray-600">
                  <span>New to PixelVault? </span>
                  <button
                    @click="changeRoute('signup')"
                    class="text-blue-500 hover:text-blue-700 font-medium cursor-pointer"
                  >
                    Create an account
                  </button>
                </p>
              </div>

              <!-- Signup form -->
              <div v-if="tab === 'signup'" class="form-fade-in">
                <!-- Your signup form content here -->
                <h2 class="text-2xl font-bold mb-6 text-center md:text-left">
                  Create Your Account
                </h2>
                <!-- ... (keep signup form content here) -->
                <div>
                  <div class="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label for="first-name" class="block text-gray-700 font-medium mb-2"
                        >First Name</label
                      >
                      <input
                        type="text"
                        id="first-name"
                        v-model="firstName"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="John"
                        :class="{
                          'border-red-500': errorsSignup?.firstName,
                        }"
                      />
                      <p v-if="errorsSignup?.firstName" class="text-red-500 text-sm mt-1">
                        {{ errorsSignup?.firstName }}
                      </p>
                    </div>
                    <div>
                      <label for="last-name" class="block text-gray-700 font-medium mb-2"
                        >Last Name</label
                      >
                      <input
                        type="text"
                        id="last-name"
                        v-model="lastName"
                        :class="{
                          'border-red-500': errorsSignup?.lastName,
                        }"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Doe"
                      />
                      <p v-if="errorsSignup?.lastName" class="text-red-500 text-sm mt-1">
                        {{ errorsSignup?.lastName }}
                      </p>
                    </div>
                  </div>

                  <div class="mb-4">
                    <label for="email-signup" class="block text-gray-700 font-medium mb-2"
                      >Email Address</label
                    >
                    <input
                      type="email"
                      id="email-signup"
                      v-model="emailSignup"
                      :class="{
                        'border-red-500': errorsSignup?.email,
                      }"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="your@email.com"
                    />
                    <p v-if="errorsSignup?.email" class="text-red-500 text-sm mt-1">
                      {{ errorsSignup?.email }}
                    </p>
                  </div>

                  <div class="mb-4">
                    <label for="password-signup" class="block text-gray-700 font-medium mb-2"
                      >Password</label
                    >
                    <div class="relative flex items-center">
                      <input
                        :type="showCurrentPasswordSignup ? 'text' : 'password'"
                        id="password-signup"
                        v-model="passwordSignup"
                        :class="{
                          'border-red-500': errorsSignup?.passwordSignup,
                        }"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="At least 8 characters"
                      />
                      <button
                        type="button"
                        @click="showCurrentPasswordSignup = !showCurrentPasswordSignup"
                        class="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <svg
                          v-if="showCurrentPasswordSignup"
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
                    <p v-if="errorsSignup?.passwordSignup" class="text-red-500 text-sm mt-1">
                      {{ errorsSignup?.passwordSignup }}
                    </p>
                  </div>

                  <div class="mb-6">
                    <label for="confirm-password" class="block text-gray-700 font-medium mb-2"
                      >Confirm Password</label
                    >
                    <div class="relative flex items-center">
                      <input
                        :type="showCurrentPasswordConfirm ? 'text' : 'password'"
                        id="confirm-password"
                        v-model="confirmPassword"
                        :class="{
                          'border-red-500': errorsSignup?.passwordConfirm,
                        }"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="At least 8 characters"
                      />
                      <button
                        type="button"
                        @click="showCurrentPasswordConfirm = !showCurrentPasswordConfirm"
                        class="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <svg
                          v-if="showCurrentPasswordConfirm"
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
                    <p v-if="errorsSignup?.passwordConfirm" class="text-red-500 text-sm mt-1">
                      {{ errorsSignup?.passwordConfirm }}
                    </p>
                  </div>

                  <div class="mb-6 flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      v-model="termsAccepted"
                      class="h-4 w-4 mt-1 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label for="terms" class="ml-2 block text-gray-700 text-sm">
                      I agree to the
                      <a href="#" class="text-blue-500 hover:text-blue-700">Terms of Service</a> and
                      <a href="#" class="text-blue-500 hover:text-blue-700">Privacy Policy</a>
                    </label>
                  </div>

                  <button
                    @click="userSignup"
                    class="cursor-pointer w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                  >
                    Create Account
                  </button>
                </div>

                <div class="relative flex items-center my-6">
                  <div class="flex-grow border-t border-gray-300"></div>
                  <span class="flex-shrink mx-4 text-gray-600">or</span>
                  <div class="flex-grow border-t border-gray-300"></div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <button
                    class="cursor-pointer flex items-center justify-center bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>

                  <button
                    class="cursor-pointer flex items-center justify-center bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                    Facebook
                  </button>
                </div>

                <p class="mt-6 text-center text-gray-600">
                  <span>Already have an account? </span>
                  <button
                    @click="tab = 'login'"
                    class="cursor-pointer text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.form-fade-in {
  transition: opacity 0.3s ease;
}
</style>
