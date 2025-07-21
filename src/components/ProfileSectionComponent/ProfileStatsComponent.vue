<script setup>
const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
  isUserHasSameId: {
    type: Boolean,
    default: false,
  },
})

console.log('stats: ', props.userProfile.stats)
</script>

<template>
  <!-- Profile Stats (Mobile) -->
  <section v-if="props.isUserHasSameId" class="md:hidden bg-blue-50 border-b border-gray-200">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between mb-4">
        <div class="text-center">
          <p class="text-xl font-bold">{{ props.userProfile.stats?.mediaCount }}</p>
          <p class="text-gray-600 text-sm">Media</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">{{ props.userProfile.stats.followers }}</p>
          <p class="text-gray-600 text-sm">Followers</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">{{ props.userProfile.stats.following }}</p>
          <p class="text-gray-600 text-sm">Following</p>
        </div>
      </div>
      <div class="pt-2 border-t border-blue-100">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-600">Storage:</span>
          <span class="font-medium"
            >{{ props.userProfile.stats.storageUsed }} / {{ props.userProfile.stats.storageTotal }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-500 h-2 rounded-full"
            :style="{ width: props.userProfile.stats.storagePercentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
