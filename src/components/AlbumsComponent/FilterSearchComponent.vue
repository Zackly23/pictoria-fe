<script setup>
const props = defineProps({
  viewMode: {
    type: String,
    default: 'grid',
  },
  sortOrder: {
    type: String,
    default: 'newest',
  },
  searchQuery: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['change-view-mode', 'change-sort-category', 'change-search'])

const changeViewMode = (view) => {
  console.log('view: ', view)
  emits('change-view-mode', view)

  console.log('new view : ', props.viewMode)
}

const changeSearch = (search) => {
  console.log('search: ', search)
  emits('change-search', search)

  console.log('new search : ', props.searchQuery)
}

const changeSortCategory = (sort) => {
  console.log('sort: ', sort)
  emits('change-sort-category', sort)

  console.log('new sort : ', props.sortOrder)
}
</script>

<template>
  <!-- Filtering and Sorting -->
  <!-- Filters and Search -->
  <section class="container mx-auto px-4 py-6 ">
    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <!-- Search Box -->
      <div class="w-full md:w-64 relative">
        <input
          type="text"
          placeholder="Search by name or tags..."
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
          @input="changeSearch($event.target.value)"
          @keyup.enter="changeSearch($event.target.value)"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex items-center space-x-4">
        <!-- Sort dropdown -->
        <div>
          <select
            class="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white"
            @change="changeSortCategory($event.target.value)"
            @keyup.enter="changeSortCategory($event.target.value)"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="likes">Most Likes</option>
          </select>
        </div>

        <!-- View type toggle -->
        <div class="flex bg-gray-200 rounded-lg p-1">
          <button
            class="px-3 py-1 rounded-md flex items-center space-x-1 transition"
            :class="
              props.viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-800'
            "
            @click="changeViewMode('grid')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span class="hidden sm:inline">Grid</span>
          </button>
          <button
            class="px-3 py-1 rounded-md flex items-center space-x-1 transition"
            :class="
              props.viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-800'
            "
            @click="changeViewMode('list')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="hidden sm:inline">List</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
