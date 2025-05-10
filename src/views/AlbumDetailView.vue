<script setup>
import AlbumHeaderComponent from '@/components/AlbumDetailComponent/AlbumHeaderComponent.vue'
import FilterAndSortingComponent from '@/components/AlbumDetailComponent/FilterAndSortingComponent.vue'
import ImageGridComponent from '@/components/AlbumDetailComponent/ImageGridComponent.vue'
import URLCopyComponent from '@/components/AlbumDetailComponent/URLCopyComponent.vue'
import CommentSectionComponent from '@/components/AlbumDetailComponent/CommentSectionComponent.vue'
import { ref } from 'vue'

const viewMode = ref(3) // 1 for grid view, 2 for list view
const sortOrder = ref('asc')
const sortBy = ref('date')
const albumDetail = ref({
  id: 1,
  title: 'Summer Memories 2025',
  description:
    'A collection of beautiful summer memories captured during our vacation at the beach and mountains.',
  createdAt: '2025-06-29',
  createdBy: 'John Photographer',
  tags: ['Nature', 'Technology', 'Vacation', 'Bali'],
  photos: [
    {
      id: 1,
      url: 'https://picsum.photos/200/300',
      description: 'A beautiful sunset at the beach.',
      createdAt: '2025-06-29',
      createdBy: 'John Photographer',
      likes: 10,
    },
    {
      id: 2,
      url: 'https://picsum.photos/200/300',
      description: 'Hiking in the mountains.',
      createdAt: '2025-06-29',
      createdBy: 'John Photographer',
      likes: 200,
    },
    {
      id: 3,
      url: 'https://images.dog.ceo/breeds/puggle/IMG_075018.jpg',
      description: 'A beautiful sunset at the beach.',
      createdAt: '2025-06-29',
      createdBy: 'John Photographer',
      likes: 10,
    },
    {
      id: 4,
      url: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_1761.jpg',
      description: 'A beautiful sunset at the beach.',
      createdAt: '2025-06-29',
      createdBy: 'John Photographer',
      likes: 10,
    },
    // Add more photos as needed
  ],
  comments: [
    {
      id: 1,
      text: 'Amazing album!',
      createdAt: '2025-06-30',
    },
    {
      id: 2,
      text: 'Beautiful memories!',
      createdAt: '2025-06-30',
    },
  ],
})

//function
const changeViewMode = (mode) => {
  console.log('Changing view mode from:', mode)
  viewMode.value = mode

  console.log('View mode changed to:', mode)
}

const changeSortBy = (sort) => {
  sortBy.value = sort
}

const changeSortOrder = (sort) => {
  sortOrder.value = sort
}

const uploadNewImage = (image) => {
  console.log('New image uploaded:', image)
  albumDetail.value.photos.push({
    id: albumDetail.value.photos.length + 1,
    url: image.url,
    description: image.description,
    createdAt: new Date().toISOString(),
    createdBy: 'John Photographer',
    likes: 0,
  })
}
</script>

<template>
  <div class="bg-gray-100 text-gray-800 font-sans">
    <section class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <AlbumHeaderComponent
          :album-detail="albumDetail"
          @change-view-mode="changeViewMode"
          :view-mode="viewMode"
        />

        <FilterAndSortingComponent
          :album-detail="albumDetail"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          @change-sort-by="changeSortBy"
          @change-sort-order="changeSortOrder"
        />

        <ImageGridComponent :album-detail="albumDetail" :view-mode="viewMode" @new-image-upload="uploadNewImage"/>
      </div>
      <URLCopyComponent />
      <CommentSectionComponent />
    </section>
  </div>
</template>
