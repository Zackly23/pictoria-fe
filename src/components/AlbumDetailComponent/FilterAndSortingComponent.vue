<script setup>
import { ref } from 'vue'

const tags = ref(['Beach', 'Mountain', 'City']) // contoh data, bisa disesuaikan
const filterTag = ref('')
const sortBy = ref('date')
const sortOrder = ref('asc')

const props = defineProps({
  albumDetail: {
    type: Object,
    required: true,
  },
  sortBy: {
    type: String,
    default: 'date',
  },

  sortOrder: {
    type: String,
    default: 'asc',
  },
})

const emits = defineEmits(['change-sort-by', 'change-sort-order'])

const changeSortBy = (sort) => {
  console.log('sort by : ', sort)
  emits('change-sort-by', sort)
  console.log('sort by now : ', props.sortBy)
}

const changeSortOrder = (sort) => {
  let sortOrder = sort === 'asc' ? 'desc' : 'asc'
  emits('change-sort-order', sortOrder)

  console.log('sort order now : ', props.sortOrder)
}
</script>

<template>
  <!-- Filtering and Sorting -->
  <div class="mb-6 flex flex-col md:flex-row justify-between items-center">
    <div class="flex flex-wrap gap-2 mb-4 md:mb-0">
      <button
        @click="filterTag = ''"
        class="px-3 py-1 rounded text-sm"
        :class="filterTag === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'"
      >
        All
      </button>
      <template v-for="tag in props.albumDetail.tags" :key="tag">
        <button
          @click="filterTag = tag"
          class="px-3 py-1 rounded text-sm"
          :class="filterTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'"
        >
          {{ tag }}
        </button>
      </template>
    </div>
    <div class="flex items-center">
      <label for="sortBy" class="mr-2 text-gray-600">Sort by:</label>
      <select
        id="sortBy"
        @change="changeSortBy($event.target.value)"
        @keyup.enter="changeSortBy($event.target.value)"
        class="mr-2 px-3 py-1 border border-gray-300 rounded bg-white"
      >
        <option value="date">Date</option>
        <option value="likes">Popularity</option>
        <option value="title">Title</option>
      </select>
      <button @click="changeSortOrder(props.sortOrder)" class="p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          :class="{ 'rotate-180': props.sortOrder === 'desc' }"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4h13M3 8h9M3 12h5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
