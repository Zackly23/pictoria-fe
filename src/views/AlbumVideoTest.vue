<script setup>
// import video from '@/assets/video/Facebook Story_2.mp4'
// import video2 from '@/assets/video/Facebook Story.mp4'

const videoList = [
  {
    id: 1,
    title: 'Video 1',
    videoUrl: video,
  },
  {
    id: 2,
    title: 'Video 2',
    videoUrl: video2,
  },
]

const pauseAllVideoExcept = (currentId) => {
  const videos = document.querySelectorAll('video')
  videos.forEach((video) => {
    if (video.id !== currentId) {
      video.pause()
    }
  })
}
</script>

<template>
  <div class="flex  items-center justify-center h-screen space-x-2">
    <video
      v-for="video in videoList"
      :id="'video-' + video.id"
      :src="video.videoUrl"
      controls
      width="200px"
      :key="video.id"
      @play="pauseAllVideoExcept('video-' + video.id)"
    ></video>
  </div>
</template>
