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
  <section class="container mx-auto px-4 py-8">
    <div class="flex" :class="`justify-${props.position}`">
      <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <!-- Previous Button -->
        <button
          @click="changePaginationNumber(props.currentPageNumber - 1)"
          :disabled="props.currentPageNumber === 1"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Number Buttons -->
        <button
          v-for="n in firstHalfPageNumbers"
          :key="n"
          @click="changePaginationNumber(n)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
            props.currentPageNumber === n
              ? 'bg-blue-50 text-blue-600 border-gray-300'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ n }}
        </button>

        <!-- Ellipsis -->
        <span
          v-if="props.lastPageNumber > 5"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
        >
          ...
        </span>

        <!-- Second Half Number Buttons -->
        <button
          v-for="n in secondHalfPageNumbers"
          :key="n"
          @click="changePaginationNumber(n)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
            props.currentPageNumber === n
              ? 'bg-blue-50 text-blue-600 border-gray-300'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ n }}
        </button>

        <!-- Next Button -->
        <button
          @click="changePaginationNumber(props.currentPageNumber + 1)"
          :disabled="props.currentPageNumber === props.lastPageNumber"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  </section>
</template>
