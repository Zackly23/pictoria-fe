<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const user = authStore.user
const props = defineProps({
  currentCategory: {
    type: String,
    default: 'Nature',
  },
})
</script>

<template>
  <!-- Category Header -->
  <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <div>
          <h1
            class="text-3xl md:text-4xl font-bold mb-2"
            v-text="
              `${props.currentCategory !== 'None' ? props.currentCategory : 'Search'}` + ' Images'
            "
          ></h1>
          <p class="text-blue-100">
            Explore beautiful images in our
            <span>{{ props.currentCategory }}</span> collection
          </p>
        </div>
        <router-link
          v-if="user"
          :to="{
            name: 'profile',
            params: { userId: user?.id },
            query: { activeTab: 'upload' },
          }"
          class="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          <span class="hidden sm:block">Upload to This Category</span>
          <span class="block sm:hidden">Upload</span>
        </router-link>
        <router-link
          v-else
          to="/login"
          class="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          <span class="hidden sm:block">Upload to This Category</span>
          <span class="block sm:hidden">Upload</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
