<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import CategoryHeaderComponent from '@/components/AlbumsComponent/CategoryHeaderComponent.vue'
import FilterSearchComponent from '@/components/AlbumsComponent/FilterSearchComponent.vue'
import ImageGalleryComponent from '@/components/AlbumsComponent/ImageGalleryComponent.vue'
import PaginationComponent from '@/components/AlbumsComponent/PaginationComponent.vue'
import CategoryPillComponent from '@/components/AlbumsComponent/CategoryPillComponent.vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import router from '@/router'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const route = useRoute()
const searchQuery = ref('')
const viewMode = ref('grid')
// Ambil category dari query, default ke ' ' (spasi) jika tidak ada
const currentCategory = ref(route.query.category || 'All')
const sortOrder = ref('recent')
const currentPageNumber = ref(1)
const lastPageNumber = ref(10)
const albums = ref([
  {
    id: null,
    name: '',
    description: '',
    tags: [],
    url: '',
    views: 0,
    likes: 0,
    date: '',
    creatorId: null,
    creatorName: '',
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

const getAllPublicAlbum = async () => {
  console.log('Fetching public albums with params:', {
    page: currentPageNumber.value,
    limit: 12,
    sort_by: sortOrder.value,
    tag: currentCategory.value,
    search: searchQuery.value,
  })

  try {
    let tag = currentCategory.value
    if (searchQuery.value != '') {
      tag = searchQuery.value
    }

    console.log('tag : ', tag)
    const response = await axios.get(`${API_BASE_URL}/api/v1/category/albums`, {
      params: {
        page: currentPageNumber.value,
        limit: 12,
        sort_by: sortOrder.value,
        tag: tag,
        search: searchQuery.value,
      },
    })

    const albumsData = response.data?.albums

    albums.value = albumsData?.map((album) => ({
      id: album.album_id,
      name: album.title,
      tags: album.tags,
      url: album.thumbnail_url,
      description: album.description || '',
      views: album.view_count,
      likes: album.like_count,
      date: album.last_update,
      creatorId: album.user_detail.user_id,
      creatorName: album.user_detail.full_name,
    }))

    lastPageNumber.value = response.data.total_pages

    console.log('lastPageNumber : ', lastPageNumber.value)
    console.log('response : ', response.data)
    console.log('albums : ', albums.value)
  } catch (error) {
    console.error('Error fetching public albums:', error)
  }
}

watch(
  [currentPageNumber, sortOrder, currentCategory, searchQuery],
  () => {
    getAllPublicAlbum()
  },
  { immediate: true },
)

watch(currentCategory, (newVal) => {
  router.push({
    name: 'albums',
    query: {
      ...route.query,
      category: newVal,
    },
  })
})

onMounted(() => {
  getAllPublicAlbum()
})
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
