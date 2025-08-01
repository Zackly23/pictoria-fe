<script setup>
import api from '@/api'
import { onMounted, ref } from 'vue'

const albums = ref([])

const getAlbumFollower = async () => {
  try {
    const response = await api.get('/albums/media/follower')

    console.log('response media follower : ', response.data)

    albums.value = response.data.albums.map((album) => ({
      id: album.album_id,
      title: album.title,
      description: album.description,
      photoCount: album.media_count,
      imageCount: album.image_count,
      videoCount: album.video_count,
      updatedAt: album.last_update,
      coverImage: album.thumbnail_url,
      creatorName: album.user_detail?.full_name || 'Pengguna Tidak Dikenal',
      creatorId: album.user_detail?.user_id || '',
    }))
  } catch (error) {
    console.error('error media follower ', error)
  }
}

onMounted(() => {
  getAlbumFollower()
})
</script>

<template>
  <div
    v-for="album in albums"
    :key="album.id"
    class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 mt-4"
  >
    <div class="relative h-48">
      <img :src="album.coverImage" alt="Album cover" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
      <div class="absolute bottom-0 left-0 p-4">
        <router-link :to="`/albums/${album.id}/details`">
          <h3 class="text-white text-xl font-bold hover:underline">
            {{ album.title }}
          </h3>
        </router-link>
        <a
          :href="$router.resolve({ name: 'profile', params: { userId: album.creatorId } }).href"
          target="_blank"
          class="text-white text-sm hover:underline"
        >
          oleh {{ album.creatorName }}
        </a>
        <div class="flex items-center space-x-4 mt-1">
          <div class="flex items-center space-x-1 text-white text-sm">
            <span>{{ album.imageCount }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
              />
            </svg>
          </div>
          <div class="flex items-center space-x-1 text-white text-sm">
            <span>{{ album.videoCount }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4">
      <p class="text-gray-600 mb-3 line-clamp-2">
        {{ album.description }}
      </p>
      <p class="text-sm text-gray-400">Updated {{ album.updatedAt }}</p>
    </div>
  </div>

  <div class="mt-6 text-center">
    <button
      @click="getAlbumFollower"
      class="text-blue-500 px-4 py-2 border border-blue-500 rounded hover:bg-blue-50 transition"
    >
      Muat Ulang Album
    </button>
  </div>
</template>
