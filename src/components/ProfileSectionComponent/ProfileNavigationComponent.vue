<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    default: 'albums',
  },
  isUserHasSameId: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change-active-tab'])

const changeActiveTab = (tab) => {
  emit('change-active-tab', tab)
}
</script>

<template>
  <section class="bg-white border-b border-gray-200 sticky top-16 z-30">
    <div class="container mx-auto px-4">
      <div class="flex overflow-x-auto scrollbar justify-start">
        <button
          @click="changeActiveTab('albums')"
          :class="{ 'tab-active': props.activeTab === 'albums' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Albums
        </button>
        <button
          v-if="props.isUserHasSameId"
          @click="changeActiveTab('upload')"
          :class="{ 'tab-active': props.activeTab === 'upload' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Upload
        </button>
        <!-- <button
          @click="activeTab = 'about'"
          :class="{ 'tab-active': activeTab === 'about' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          About
        </button> -->
        <button
          v-if="props.isUserHasSameId"
          @click="changeActiveTab('settings')"
          :class="{ 'tab-active': props.activeTab === 'settings' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Settings
        </button>
        <button
          v-if="props.isUserHasSameId"
          @click="changeActiveTab('subscription')"
          :class="{ 'tab-active': props.activeTab === 'subscription' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Subscription
        </button>

        <button
          v-if="props.isUserHasSameId"
          @click="changeActiveTab('followers')"
          :class="{ 'tab-active': props.activeTab === 'followers' }"
          class="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
        >
          Followers
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-active {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}
</style>
