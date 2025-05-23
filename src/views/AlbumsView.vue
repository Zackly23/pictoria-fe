<script setup>
import { ref } from 'vue'
import CategoryHeaderComponent from '@/components/AlbumsComponent/CategoryHeaderComponent.vue'
import FilterSearchComponent from '@/components/AlbumsComponent/FilterSearchComponent.vue'
import ImageGalleryComponent from '@/components/AlbumsComponent/ImageGalleryComponent.vue'
import PaginationComponent from '@/components/AlbumsComponent/PaginationComponent.vue'
import CategoryPillComponent from '@/components/AlbumsComponent/CategoryPillComponent.vue'

const searchQuery = ref('')
const viewMode = ref('grid')
const currentCategory = ref('None')
const sortOrder = ref('newest')
const currentPageNumber = ref(1)
const lastPageNumber = ref(24)
const albums = ref([
  {
    id: 1,
    name: 'Mountain Lake',
    tags: ['nature', 'water', 'reflection'],
    url: '/api/placeholder/400/300',
    views: 246,
    likes: 42,
    date: 'Apr 25, 2025',
  },
  {
    id: 2,
    name: 'Forest Path',
    tags: ['nature', 'trees', 'path'],
    url: '/api/placeholder/400/300',
    views: 189,
    likes: 35,
    date: 'Apr 23, 2025',
  },
  {
    id: 3,
    name: 'Sunset Beach',
    tags: ['nature', 'beach', 'sunset'],
    url: '/api/placeholder/400/300',
    views: 324,
    likes: 56,
    date: 'Apr 22, 2025',
  },
  {
    id: 4,
    name: 'Waterfall Cascade',
    tags: ['nature', 'water', 'waterfall'],
    url: '/api/placeholder/400/300',
    views: 176,
    likes: 28,
    date: 'Apr 20, 2025',
  },
  {
    id: 5,
    name: 'Mountain Peak',
    tags: ['nature', 'mountain', 'snow'],
    url: '/api/placeholder/400/300',
    views: 267,
    likes: 48,
    date: 'Apr 19, 2025',
  },
  {
    id: 6,
    name: 'Desert Landscape',
    tags: ['nature', 'desert', 'sand'],
    url: '/api/placeholder/400/300',
    views: 154,
    likes: 27,
    date: 'Apr 17, 2025',
  },
  {
    id: 7,
    name: 'Autumn Forest',
    tags: ['nature', 'trees', 'autumn'],
    url: '/api/placeholder/400/300',
    views: 221,
    likes: 39,
    date: 'Apr 15, 2025',
  },
  {
    id: 8,
    name: 'Misty Valley',
    tags: ['nature', 'valley', 'mist'],
    url: '/api/placeholder/400/300',
    views: 198,
    likes: 32,
    date: 'Apr 14, 2025',
  },
  {
    id: 9,
    name: 'Tropical Island',
    tags: ['nature', 'island', 'tropical'],
    url: '/api/placeholder/400/300',
    views: 287,
    likes: 51,
    date: 'Apr 12, 2025',
  },
  {
    id: 10,
    name: 'Arctic Glacier',
    tags: ['nature', 'ice', 'glacier'],
    url: '/api/placeholder/400/300',
    views: 143,
    likes: 24,
    date: 'Apr 10, 2025',
  },
  {
    id: 11,
    name: 'Spring Meadow',
    tags: ['nature', 'flowers', 'meadow'],
    url: '/api/placeholder/400/300',
    views: 231,
    likes: 43,
    date: 'Apr 08, 2025',
  },
  {
    id: 12,
    name: 'Canyon View',
    tags: ['nature', 'canyon', 'rocks'],
    url: '/api/placeholder/400/300',
    views: 178,
    likes: 31,
    date: 'Apr 05, 2025',
  },
])

const changeViewMode = (newViewMode) => {
  viewMode.value = newViewMode
}

const changeSortCategory = (newSortCategory) => {
  sortOrder.value = newSortCategory
}

const changeSearch = (newSearchQuery) => {
  searchQuery.value = newSearchQuery
}

const changeCategory = (newCategory) => {
  currentCategory.value = newCategory
}

const changePaginationNumber = (number) => {
  if (number < 1 || number > lastPageNumber.value) {
    return
  }
  currentPageNumber.value = number
  console.log(number)
}
</script>

<template>
  <CategoryHeaderComponent :current-category="currentCategory" />
  <FilterSearchComponent
    @change-view-mode="changeViewMode"
    @change-sort-category="changeSortCategory"
    @change-search="changeSearch"
    :view-mode="viewMode"
    :sort-order="sortOrder"
    :search-query="searchQuery"
  />
  <CategoryPillComponent @change-category="changeCategory" :current-category="currentCategory" />
  <ImageGalleryComponent :view-mode="viewMode" :albums="albums" />
  <PaginationComponent
    :current-page-number="currentPageNumber"
    @change-pagination-number="changePaginationNumber"
    :last-page-number="lastPageNumber"
  />
</template>
