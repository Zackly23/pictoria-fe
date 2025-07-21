<script setup>
import api from '@/api'
import { computed, ref } from 'vue'

const emits = defineEmits(['user-follow'])

const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
  userDataId: {
    type: String,
    required: true,
  },
  isUserHasSameId: {
    type: Boolean,
    default: false,
  },
})

// const userHasFollow = ref(props.userProfile.areYouFollowedByUserLooking)
const previewUrl = computed(() => props.userProfile?.avatar)
const initials = computed(() => props.userProfile.fullname.split(' ')[0]) // Ganti dengan nama pengguna dinamis jika perlu

const uploadAvatar = async (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      previewUrl.value = reader.result
    }
    reader.readAsDataURL(file)
  }

  console.log('file:', file)

  try {
    const formData = new FormData()
    formData.append('profile_picture', file)

    const response = await api.put(
      `users/${props.userDataId}/profile/picture`,
      formData, // <- wajib pakai FormData
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    emits('user-follow')
    console.log('response update profile: ', response)
  } catch (error) {
    console.error('error update profile: ', error)
  }
}

const followingUser = async () => {
  try {
    const response = await api.post(
      `/users/follow`,
      {},
      {
        params: {
          user_to_follow: props.userDataId,
        },
      },
    )

    console.log('response followe : ', response.data)
    emits('user-follow')
    // userHasFollow.value = response.data.is_user_now_follow
  } catch (error) {
    console.error('error following : ', error)
  }
}

console.log('user profile pic : ', props.userProfile)
console.log('previewurl : ', previewUrl.value)
console.log('user has follow : ', props.userProfile.areYouFollowedByUserLooking)
// console.log("user has folloe : ", userHasFollow.value)
</script>

<template>
  <!-- Profile Header -->
  <section class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center md:items-start space-x-3">
        <div class="relative w-32 h-32">
          <!-- Klik area unggah -->
          <label for="profilePicture" class="cursor-pointer">
            <div
              class="w-32 h-32 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold"
            >
              <img
                v-if="props.userProfile?.avatar"
                :src="props.userProfile?.avatar"
                alt="Profile Picture"
                class="object-cover w-full h-full"
              />
              <span v-else>{{ initials }}</span>
            </div>

            <!-- Ikon kamera -->
            <div
              v-if="props.isUserHasSameId"
              class="absolute top-0 left-2 bg-white rounded-full p-1 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            </div>
          </label>

          <!-- Input file disembunyikan -->
          <input
            v-if="props.isUserHasSameId"
            type="file"
            id="profilePicture"
            accept="image/*"
            class="hidden"
            @change="uploadAvatar"
          />
        </div>
        <div class="text-center md:text-left flex-1">
          <div class="flex flex-col md:flex-row md:items-center mb-2">
            <h1 class="text-3xl font-bold">{{ props.userProfile.fullname }}</h1>
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
                {{ props.userProfile.subscription }}
              </span>
            </div>
          </div>
          <p class="text-gray-600 mb-4">
            {{ props.userProfile.jobTitle }} • {{ props.userProfile.city }},
            {{ props.userProfile.state }}
          </p>
          <div class="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            <span
              v-for="(tag, index) in props.userProfile.tags"
              :key="index"
              class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm tag-badge"
              >{{ tag }}</span
            >
          </div>
          <p class="text-gray-700 max-w-2xl mb-6">
            {{ props.userProfile.bio }}
          </p>
          <div
            v-if="!props.isUserHasSameId"
            class="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <button
              @click="followingUser"
              class="text-white px-6 py-2 rounded-full font-medium transition"
              :class="{
                'hover:bg-blue-600 bg-blue-500': !props.userProfile.areYouFollowedByUserLooking,
                'hover:bg-amber-600 bg-amber-500': props.userProfile.areYouFollowedByUserLooking,
              }"
            >
              <span v-if="!props.userProfile.areYouFollowedByUserLooking">Follow</span>
              <div
                v-else-if="props.userProfile.areYouFollowedByUserLooking"
                class="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-4.293a1 1 0 011.414 0l2.5 2.5a1 1 0 01-1.414 1.414l-2.5-2.5a1 1 0 010-1.414zM10 4a6 6 0 100 12A6 6 0 0010 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Following</span>
              </div>
            </button>
            <!-- <button
              class="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition"
            >
              Message
            </button> -->
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
        <div v-if="props.isUserHasSameId" class="hidden md:block">
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <div class="flex space-x-8 mb-2">
              <div>
                <p class="text-2xl font-bold">{{ props.userProfile.stats.mediaCount }}</p>
                <p class="text-gray-600 text-sm">Medias</p>
              </div>
              <div>
                <p class="text-2xl font-bold">{{ props.userProfile.stats.followers }}</p>
                <p class="text-gray-600 text-sm">Followers</p>
              </div>
              <div>
                <p class="text-2xl font-bold">{{ props.userProfile.stats.following }}</p>
                <p class="text-gray-600 text-sm">Following</p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-blue-100">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-600">Storage:</span>
                <span class="font-medium"
                  >{{ props.userProfile.stats.storageUsed }} /
                  {{ props.userProfile.stats.storageTotal }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full"
                  :style="{ width: `${props.userProfile.stats.storagePercentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
