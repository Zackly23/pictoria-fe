<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const props = defineProps({
  albumId: {
    type: String,
    required: true,
  },
})

const shareLinks = ref({
  direct: 'https://pixelvault.com/albums/summer-2025',
  embedUrl: 'https://pixelvault.com/embed/albums/summer-2025',
  iframe: 'https://pixelvault.com/embed/albums/summer-2025',
})

function sharePage() {
  const shareData = {
    title: document.title,
    text: 'Cek halaman ini!',
    url: window.location.href,
  }

  if (navigator.share) {
    // ✅ MOBILE: Native share sheet
    navigator.share(shareData).catch((err) => console.warn('Share failed:', err))
  } else {
    // 💻 DESKTOP: Fallback (copy to clipboard)
    navigator.clipboard.writeText(shareData.url).then(() => {
      alert('URL copied to clipboard!')
    })
  }
}

function copyToClipboard(text) {
  console.log('Copying to clipboard:', text)
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Copied Successfully',
        detail: 'URL successfully copied to clipboard.',
        life: 3000,
      })
    })
    .catch((err) => {
      toast.add({
        severity: 'error',
        summary: 'Copy Failed',
        detail: 'Failed to copy the URL. Please try again.',
        life: 3000,
      })
    })
}

function shareOn(platform) {
  const url = shareLinks.value.direct
  const encodedUrl = encodeURIComponent(url)
  const text = encodeURIComponent('Check out this amazing album!')
  const description = encodeURIComponent('Summer Memories 2025')
  const media = encodeURIComponent(`${url}/cover.jpg`)

  let shareUrl = ''

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`
      break
    case 'pinterest':
      shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${media}&description=${description}`
      break
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      break
    case 'email':
      shareUrl = `mailto:?subject=${description}&body=I thought you might like this album: ${url}`
      break
    default:
      break
  }

  if (shareUrl) {
    window.open(shareUrl, `${platform}-share`, 'width=580,height=296')
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Share Album</h2>
      <button @click="sharePage" class="flex items-center space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <span class="text-sm text-gray-500">Share with friends</span>
      </button>
    </div>
    <!-- URL Copy Section -->
    <div class="space-y-3 mb-6">
      <div class="flex">
        <input
          type="text"
          readonly
          :value="`https://pixelvault.site/albums/${props.albumId}/details`"
          class="bg-gray-100 px-4 py-3 rounded-l flex-grow focus:outline-none"
        />
        <button
          @click="copyToClipboard(`https://pixelvault.site/albums/${props.albumId}/details`)"
          class="bg-blue-500 text-white px-6 py-3 rounded-r hover:bg-blue-600 transition flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          COPY
        </button>
      </div>
    </div>

    <!-- Social Media Sharing -->

    <!-- QR Code -->
    <!-- <div class="mt-6 flex flex-col sm:flex-row items-center sm:space-x-6">
      <div class="bg-white p-3 border border-gray-200 rounded-lg mb-4 sm:mb-0">
        <img src="" alt="QR Code" class="w-32 h-32" />
      </div>
      <div>
        <h3 class="text-sm font-medium text-gray-700">Scan to view</h3>
        <p class="text-gray-500 text-sm mt-1">
          Use your phone camera to scan this QR code to quickly view this album on your mobile
          device
        </p>
        <button
          class="mt-3 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition flex items-center space-x-2"
          @click="showNotification('QR code downloaded!')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Download QR Code</span>
        </button>
      </div>
    </div> -->
  </div>
</template>
