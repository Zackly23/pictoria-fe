<script setup>
import AlbumHeaderComponent from '@/components/AlbumDetailComponent/AlbumHeaderComponent.vue'
import FilterAndSortingComponent from '@/components/AlbumDetailComponent/FilterAndSortingComponent.vue'
import ImageGridComponent from '@/components/AlbumDetailComponent/ImageGridComponent.vue'
import URLCopyComponent from '@/components/AlbumDetailComponent/URLCopyComponent.vue'
import CommentSectionComponent from '@/components/AlbumDetailComponent/CommentSectionComponent.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))
const albumID = route.params.albumId
const viewMode = ref(1) // 1 for grid view, 2 for list view
const sortOrder = ref('asc')
const sortBy = ref('date')

const albumDetail = ref({
  id: 1,
  title: 'Summer Memories 2025',
  description:
    'A collection of beautiful summer memories captured during our vacation at the beach and mountains.',
  createdAt: '2025-06-29',
  creator: {
    creatorID: '',
    createdBy: 'John Programming',
    isAlbumUserOwn: false,
  },
  watcherHasLike: false,
  tags: ['Nature', 'Technology', 'Vacation', 'Bali'],
  likes: '1.2 k',
  imageCount: 0,
  videoCount: 0,
  viewCount: 0,
  albumPrivacy: '',
  targetEmails: [],
  medias: [
    {
      id: 1,
      type: 'image',
      url: 'https://picsum.photos/200/300',
      description: 'A beautiful sunset at the beach.',
      createdAt: '2025-06-29',
      createdBy: 'John Photographer',
      likes: 10,
      watcherHasLike: false,
    },
  ],
})

const albumBucket = ref([
  {
    id: 0,
    index: 0,
    type: '',
    url: '',
    description: '',
    createdAt: '',
    // createdBy: 'John Photographer',
    likes: 0,
  },
])

const getAlbumDetail = async () => {
  try {
    const response = await api.get(`/albums/${albumID}`, {
      params: {
        sort_by: sortBy.value,
        order_by: sortOrder.value,
      },
    })

    console.log('response : ', response.data)

    const albumData = response.data.album
    const medias = response.data.album_medias

    albumDetail.value.id = albumData.album_id
    albumDetail.value.title = albumData.title
    albumDetail.value.description = albumData.description
    albumDetail.value.tags = albumData.tags
    albumDetail.value.likes = albumData.like_count
    albumDetail.value.imageCount = albumData.image_count
    albumDetail.value.videoCount = albumData.video_count
    albumDetail.value.watcherHasLike = response.data.user_has_like
    albumDetail.value.albumPrivacy = albumData.album_privacy
    albumDetail.value.viewCount = albumData.view_count
    albumDetail.value.createdAt = albumData.created_at
    albumDetail.value.creator = {
      creatorID: albumData.user_detail.user_id,
      createdBy: albumData.user_detail.full_name,
      isAlbumUserOwn: albumData.user_detail.user_id === response.data.user_login_id,
    }
    albumDetail.value.targetEmails = albumData.target_email

    console.log(
      'album creator user id : ',
      albumData.user_detail.user_id,
      ' user login : ',
      user.id,
    )
    console.log('ini ? = ', albumData.user_detail.user_id === user.id)

    const media = medias.map((file, idx) => {
      return {
        id: file.media_id,
        index: idx,
        url: file.url,
        type: file.media_kind,
        description: file.description,
        createdAt: file.created_at_modified,
        watcherHasLike: file.user_has_like,
        // createdBy: 'John Photographer',
        likes: file.likes_count,
      }
    })

    // if (albumDetail.value.creator.creatorID === user.id) {
    //   console.log('bro ini kerha ga ? ', albumDetail.value.creator.creatorID === user.id)
    //   isAlbumUserOwn.value = true

    // }

    albumDetail.value.medias = media

    albumBucket.value = media.map((file) => ({ ...file }))

    console.log('album : ', albumDetail.value)
    console.log('album bucker : ', albumBucket.value)
  } catch (error) {
    console.error('error get data : ', error)

    if (error.status === 403) {
      router.back()
    }
  }
}

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

const uploadNewImage = async () => {
  window.location.reload()
}

const clickLikeAlbum = async () => {
  try {
    console.log('data click : ', {
      user_id: user.id,
      album_id: albumDetail.value.id,
    })
    const response = await api.post('/albums/likes', {
      user_id: user.id,
      album_id: albumDetail.value.id,
    })

    if (response.status == 200) {
      console.log('response like album : ', response.data)
      getAlbumDetail()
    }
  } catch (error) {
    console.error('response error like album : ', error)
  }
}

const clickLikeMedia = async (mediaID, mediaType) => {
  try {
    console.log('data click : ', {
      user_id: user.id,
      media_id: mediaID,
      media_type: mediaType,
    })
    const response = await api.post('/albums/media/likes', {
      user_id: user.id,
      media_id: mediaID,
      media_type: mediaType,
    })

    if (response.status == 200) {
      console.log('response like album : ', response.data)
      getAlbumDetail()
    }
  } catch (error) {
    console.error('response error like album : ', error)
  }
}

watch([sortBy, sortOrder], () => {
  getAlbumDetail()
})

onMounted(() => {
  getAlbumDetail()
})
</script>

<template>
  <div class="bg-gray-100 text-gray-800 font-sans">
    <section class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <AlbumHeaderComponent
          :album-detail="albumDetail"
          @change-view-mode="changeViewMode"
          @click-like-album="clickLikeAlbum"
          :view-mode="viewMode"
        />

        <FilterAndSortingComponent
          :album-detail="albumDetail"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          @change-sort-by="changeSortBy"
          @change-sort-order="changeSortOrder"
        />

        <ImageGridComponent
          :album-detail="albumDetail"
          :view-mode="viewMode"
          @new-image-upload="uploadNewImage"
          @click-like-media="clickLikeMedia"
        />
      </div>
      <URLCopyComponent :album-id="albumID"/>
      <CommentSectionComponent />
    </section>
  </div>
</template>
