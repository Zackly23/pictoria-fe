<script setup>
import { computed } from 'vue'
const emits = defineEmits(['change-pagination-number'])

const props = defineProps({
  currentPageNumber: {
    type: Number,
    default: 1,
  },
  lastPageNumber: {
    type: Number,
    default: 10,
  },
  position: {
    type: String,
    default: 'center',
  },
})

const lastPageNumber = computed(() => {
  return props.lastPageNumber
})

const firstHalfPageNumbers = computed(() => {
  if (props.lastPageNumber <= 6) {
    return Array.from({ length: props.lastPageNumber }, (_, i) => i + 1)
  }
  return Array.from({ length: 3 }, (_, i) => i + 1)
})

const secondHalfPageNumbers = computed(() => {
  if (props.lastPageNumber <= 6) {
    return []
  }
  return Array.from({ length: 3 }, (_, i) => props.lastPageNumber - 2 + i)
})

const changePaginationNumber = (number) => {
  if (number >= 1 && number <= props.lastPageNumber) {
    emits('change-pagination-number', number)
  }
}
</script>

<template>
  <!-- Pagination -->
  <section class="container mx-auto px-4 pb-8">
    <div
      class="flex justify-center mt-4 px-3 py-1 items-center space-x-5 text-white bg-gray-600 rounded-xl w-auto text-sm"
    >
      <div class="cursor-pointer" @click="changePaginationNumber(currentPageNumber - 1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div class="flex items-center space-x-2 text-md">
        <span>{{ currentPageNumber }}</span>
        <span> OF </span>
        <span>{{ lastPageNumber }}</span>
      </div>

      <div class="cursor-pointer" @click="changePaginationNumber(currentPageNumber + 1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  </section>
</template>
