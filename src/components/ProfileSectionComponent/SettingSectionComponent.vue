<script setup>
import api from '@/api'
import QRCode from 'qrcode'
import { onMounted, ref } from 'vue'
import countriesData from '../../../src/assets/file/countries.json'
import ResetPasswordModalComponent from './ResetPasswordModalComponent.vue'
import TwoFactorAuthModalComponent from './TwoFactorAuthModalComponent.vue'
import DeactivateAccountModalComponent from './DeactivateAccountModalComponent.vue'
import DeleteAccountModalComponent from './DeleteAccountModalComponent.vue'

const countries = ref(countriesData)
const TFAEnabled = ref(true)
const twoFactorModalOpen = ref(false)
const resetPasswordModalOpen = ref(false)
const deactivateAccountModalOpen = ref(false)
const deleteAccountModalOpen = ref(false)
const activeSettingTab = ref('profile')
const selectedTags = ref(['Portrait', 'Nature', 'Travel', 'Architecture'])
const totpSetup = ref({
  secret: '',
  QRurl: '',
  QRbase64: null,
})
const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
  userConfiguration: {
    type: Object,
    required: true,
  },
  isUserHasSameId: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['new-user-profile'])

const popularCategories = [
  'Portrait',
  'Nature',
  'Street',
  'Wildlife',
  'Macro',
  'Food',
  'Travel',
  'Architecture',
  'Aerial',
]

const bio = ref(
  'Award-winning photographer with over 10 years of experience. Specializing in portrait, nature, and architectural photography. Available for freelance work and collaborations.',
)

const newTag = ref('')

const removeTag = (tag) => {
  props.userProfile.tags = props.userProfile.tags.filter((t) => t !== tag)
}

const addTag = () => {
  const trimmedTag = newTag.value.trim()
  if (trimmedTag !== '' && !props.userProfile.tags.includes(trimmedTag)) {
    props.userProfile.tags.push(trimmedTag)
  }
  newTag.value = ''
}

const addPopularTag = (tag) => {
  if (Array.isArray(props.userProfile.tags)) {
    if (!props.userProfile.tags.includes(tag) || props.userProfile.tags.length < 1) {
      props.userProfile.tags.push(tag)
    }
  } else {
    console.error('tags should be an array')
  }
}

const changeCountry = (country) => {
  props.userProfile.country = country
  console.log('Selected country:', country)
  // You can add logic here to handle country change if needed
}

const newUserProfile = () => {
  const newUserProfileValue = props.userProfile
  emits('new-user-profile', newUserProfileValue)
  console.log('Updated User Profile:', props.userProfile)
}

const configureTFA = async () => {
  try {
    const response = await api.post('/auth/generate-totp')

    console.log('response : ', response.data)

    QRCode.toDataURL(response.data.otp_url)
      .then((url) => {
        // isi setup setelah QR berhasil digenerate
        const setup = {
          secret: response.data.secret,
          QRurl: response.data.otp_url,
          QRbase64: url,
        }

        totpSetup.value = setup
        twoFactorModalOpen.value = true

        console.log('totp : ', totpSetup.value)
      })
      .catch((err) => {
        console.error('QR generation failed:', err)
      })
  } catch (error) {
    console.error('error generating TOTP:', error)
  }
}

onMounted(() => {
  // console.log('countries : ', countries)
  //initiate
  TFAEnabled.value = props.userConfiguration.enableTFA
})
</script>

<template>
  <div v-if="props.isUserHasSameId" class="block md:flex">
    <!-- Left Sidebar Navigation -->
    <div class="w-full md:w-64 border-gray-200 pr-4 h-full">
      <!-- <h2 class="text-2xl font-bold mb-6 ml-4">Account Settings</h2> -->

      <div class="space-y-1">
        <button
          @click="activeSettingTab = 'profile'"
          :class="{
            'bg-blue-50 text-blue-600 font-medium': activeSettingTab === 'profile',
            'text-gray-700 hover:bg-gray-100': activeSettingTab !== 'profile',
          }"
          class="w-full text-left px-4 py-3 rounded-md flex items-center space-x-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Profile</span>
        </button>

        <button
          @click="activeSettingTab = 'password'"
          :class="{
            'bg-blue-50 text-blue-600 font-medium': activeSettingTab === 'password',
            'text-gray-700 hover:bg-gray-100': activeSettingTab !== 'password',
          }"
          class="w-full text-left px-4 py-3 rounded-md flex items-center space-x-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Password</span>
        </button>
      </div>
    </div>

    <!-- Right Content Area -->
    <div class="flex-1 md:pl-8">
      <!-- Profile Settings Content -->
      <div v-show="activeSettingTab === 'profile'" class="space-y-8">
        <!-- Basic Information -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Basic Information</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-700"
                  >Full Name</label
                >
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  v-model="props.userProfile.fullname"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700"
                  >Username</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  v-model="props.userProfile.username"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700"
                  >Email Address</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="props.userProfile.email"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700"
                  >Phone Number</label
                >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+123"
                  v-model="props.userProfile.phone"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Address Information</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700"
                  >Street Address</label
                >
                <input
                  type="text"
                  id="address"
                  name="address"
                  v-model="props.userProfile.address"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  v-model="props.userProfile.city"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="state" class="block text-sm font-medium text-gray-700"
                  >State/Province</label
                >
                <input
                  type="text"
                  id="state"
                  name="state"
                  v-model="props.userProfile.state"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="zipcode" class="block text-sm font-medium text-gray-700"
                  >ZIP/Postal Code</label
                >
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  v-model="props.userProfile.zipcode"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                <select
                  id="country"
                  name="country"
                  @change="changeCountry($event.target.value)"
                  @keyup.enter="changeCountry($event.target.value)"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                >
                  <option v-for="country in countries" :value="country.code" selected>
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Photography Preferences -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Photography Preferences</h3>
          <div class="space-y-6" @submit.prevent>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3"
                >Photography Categories</label
              >

              <!-- Selected Categories -->
              <div class="mb-3 flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in props.userProfile.tags"
                  :key="index"
                  class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <span>{{ tag }}</span>
                  <button
                    type="button"
                    @click="removeTag(tag)"
                    class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              <!-- Add New Category -->
              <div class="flex">
                <div class="relative flex-grow">
                  <div class="flex justify-center items-center">
                    <input
                      type="text"
                      v-model="newTag"
                      @keydown.enter.prevent="addTag"
                      placeholder="Add a category..."
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    />
                    <button
                      type="button"
                      @click="addTag"
                      class="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add
                    </button>
                  </div>

                  <!-- Popular Categories -->
                  <div class="mt-2">
                    <p class="text-xs text-gray-500 mb-2">Popular categories:</p>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="(popular, index) in popularCategories"
                        :key="index"
                        type="button"
                        @click="addPopularTag(popular)"
                        class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded-full text-gray-700 transition"
                      >
                        {{ popular }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                Add categories that best describe your photography style.
              </p>
            </div>

            <!-- Bio Section -->
            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                id="bio"
                v-model="props.userProfile.bio"
                rows="4"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              ></textarea>
              <p class="mt-1 text-sm text-gray-500">
                Brief description that appears on your profile. Maximum 200 characters.
              </p>
            </div>
          </div>
        </div>

        <!-- Job Title and Organization -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Professional Information</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="jobTitle" class="block text-sm font-medium text-gray-700"
                  >Job Title</label
                >
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  v-model="props.userProfile.jobTitle"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="organization" class="block text-sm font-medium text-gray-700"
                  >Organization</label
                >
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  v-model="props.userProfile.company"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Social Media Links</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  v-model="props.userProfile.socialMedias.website"
                  value="https://johndoephotography.com"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="instagram" class="block text-sm font-medium text-gray-700"
                  >Instagram</label
                >
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value="@johndoephotos"
                  v-model="props.userProfile.socialMedias.instagram"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="facebook" class="block text-sm font-medium text-gray-700"
                  >Facebook</label
                >
                <input
                  type="text"
                  id="facebook"
                  name="facebook"
                  value="johnDoephotography"
                  v-model="props.userProfile.socialMedias.facebook"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="twitter" class="block text-sm font-medium text-gray-700">Twitter</label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value="@johndoephotos"
                  v-model="props.userProfile.socialMedias.twitter"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            @click="newUserProfile(props.userProfile)"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Profile Changes
          </button>
        </div>
      </div>

      <!-- Password Settings Content -->
      <div v-show="activeSettingTab === 'password'" class="space-y-8">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Change Password</h3>
          <div class="space-y-4">
            <div>
              <button
                @click="resetPasswordModalOpen = true"
                type="button"
                class="cursor-pointer inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
              >
                Reset Password
              </button>
              <p class="mt-2 text-neutral-600 hover:text-neutral-500 text-sm font-medium">
                If you forgot your password, click here to reset it.
              </p>
            </div>
          </div>
        </div>

        <!-- Two-Factor Authentication -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-medium">Two-Factor Authentication</h3>
              <p class="text-sm text-gray-500 mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <div class="flex items-center">
              <span
                class="text-sm font-medium mr-3"
                :class="props.userConfiguration.enableTFA ? 'text-green-600' : 'text-gray-400'"
              >
                {{ props.userConfiguration.enableTFA ? 'Enabled' : 'Disabled' }}
              </span>
              <button
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 transition-colors duration-200 ease-in-out',
                  props.userConfiguration.enableTFA
                    ? 'bg-green-500 border-green-500'
                    : 'bg-gray-300 border-gray-300',
                ]"
                role="switch"
                :aria-checked="props.userConfiguration.enableTFA.toString()"
              >
                <span
                  aria-hidden="true"
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    props.userConfiguration.enableTFA ? 'translate-x-5' : 'translate-x-0',
                  ]"
                ></span>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <button
              v-if="!props.userConfiguration.enableTFA"
              @click="configureTFA"
              type="button"
              class="cursor-pointer text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Configure Two-Factor Authentication
            </button>
          </div>
        </div>

        <!-- Account Danger Zone -->
        <div class="bg-red-50 p-6 rounded-lg shadow-sm border border-red-100">
          <h3 class="text-lg font-medium text-red-800 mb-4">Danger Zone</h3>
          <div class="space-y-4">
            <div>
              <button
                type="button"
                @click="() => (deactivateAccountModalOpen = true)"
                class="cursor-pointer inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Deactivate Account
              </button>
              <p class="mt-1 text-sm text-red-600">
                Temporarily disable your account. You can reactivate later.
              </p>
            </div>
            <div>
              <button
                @click="() => (deleteAccountModalOpen = true)"
                type="button"
                class="cursor-pointer inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Account
              </button>
              <p class="mt-1 text-sm text-red-600">
                Permanently delete your account and all your data. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <transition name="fade-zoom" appear>
      <div
        v-show="resetPasswordModalOpen"
        class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30 h-full"
        role="dialog"
      >
        <ResetPasswordModalComponent @close-modal="resetPasswordModalOpen = false" />
      </div>
    </transition>

    <transition name="fade-zoom" appear>
      <div
        v-show="twoFactorModalOpen"
        class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30 h-full"
        role="dialog"
      >
        <TwoFactorAuthModalComponent
          @close-modal="twoFactorModalOpen = false"
          :totp-setup="totpSetup"
        />
      </div>
    </transition>

    <transition name="fade-zoom" appear>
      <div
        v-show="deactivateAccountModalOpen"
        class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30 h-full"
        role="dialog"
      >
        <DeactivateAccountModalComponent @close-modal="deactivateAccountModalOpen = false" />
      </div>
    </transition>

    <transition name="fade-zoom" appear>
      <div
        v-show="deleteAccountModalOpen"
        class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30 h-full"
        role="dialog"
      >
        <DeleteAccountModalComponent @close-modal="deleteAccountModalOpen = false" />
      </div>
    </transition>
  </div>
</template>
