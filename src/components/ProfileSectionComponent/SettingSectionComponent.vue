<script setup>
import { ref } from 'vue'

const activeSettingTab = ref('profile')
const selectedTags = ref(['Portrait', 'Nature', 'Travel', 'Architecture'])

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

function removeTag(tag) {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag)
}

function addTag() {
  const trimmedTag = newTag.value.trim()
  if (trimmedTag !== '' && !selectedTags.value.includes(trimmedTag)) {
    selectedTags.value.push(trimmedTag)
  }
  newTag.value = ''
}

function addPopularTag(tag) {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag)
  }
}
</script>

<template>
  <div class="flex">
    <!-- Left Sidebar Navigation -->
    <div class="w-64 border-r border-gray-200 pr-4 h-full">
      <h2 class="text-2xl font-bold mb-6">Account Settings</h2>

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
    <div class="flex-1 pl-8">
      <!-- Profile Settings Content -->
      <div v-show="activeSettingTab === 'profile'" class="space-y-8">
        <!-- Basic Information -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Basic Information</h3>
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-700"
                  >Full Name</label
                >
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value="John Doe"
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
                  value="johndoe"
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
                  value="john.doe@example.com"
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
                  value="+1 (555) 123-4567"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
          </form>
        </div>

        <!-- Address Information -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Address Information</h3>
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700"
                  >Street Address</label
                >
                <input
                  type="text"
                  id="address"
                  name="address"
                  value="123 Photography Lane"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value="San Francisco"
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
                  value="California"
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
                  value="94105"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                <select
                  id="country"
                  name="country"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                >
                  <option value="US" selected>United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="JP">Japan</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <!-- Photography Preferences -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Photography Preferences</h3>
          <form class="space-y-6" @submit.prevent>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3"
                >Photography Categories</label
              >

              <!-- Selected Categories -->
              <div class="mb-3 flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in selectedTags"
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
                v-model="bio"
                rows="4"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              ></textarea>
              <p class="mt-1 text-sm text-gray-500">
                Brief description that appears on your profile. Maximum 200 characters.
              </p>
            </div>
          </form>
        </div>

        <!-- Social Media Links -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">Social Media Links</h3>
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
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
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
          </form>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            type="submit"
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
          <form class="space-y-4">
            <div>
              <label for="current-password" class="block text-sm font-medium text-gray-700"
                >Current Password</label
              >
              <input
                type="password"
                id="current-password"
                name="current-password"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700"
                >New Password</label
              >
              <input
                type="password"
                id="new-password"
                name="new-password"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
              <p class="mt-1 text-sm text-gray-500">
                Password must be at least 8 characters and include a number and a special character
              </p>
            </div>
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700"
                >Confirm New Password</label
              >
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </div>
          </form>
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
              <span class="text-sm text-green-600 font-medium mr-3">Enabled</span>
              <button
                type="button"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-green-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                role="switch"
                aria-checked="true"
              >
                <span
                  aria-hidden="true"
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5"
                ></span>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <button type="button" class="text-blue-600 hover:text-blue-500 text-sm font-medium">
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
                class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Deactivate Account
              </button>
              <p class="mt-1 text-sm text-red-600">
                Temporarily disable your account. You can reactivate later.
              </p>
            </div>
            <div>
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
</template>
