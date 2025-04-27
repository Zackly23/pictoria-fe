<script setup>
import { ref } from 'vue'

const shareLinks = ref({
  direct: 'https://pixelvault.com/albums/summer-2025',
  embedUrl: 'https://pixelvault.com/embed/albums/summer-2025',
  iframe: 'https://pixelvault.com/embed/albums/summer-2025',
})

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('Copied to clipboard!')
    })
    .catch((err) => {
      console.error('Failed to copy: ', err)
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
      <div class="flex items-center space-x-1">
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
      </div>
    </div>
    <!-- URL Copy Section -->
    <div class="space-y-3 mb-6">
      <div class="flex">
        <input
          type="text"
          readonly
          value='<iframe src="https://pixelvault.com/embed/albums/summer-2025" width="100%" height="500" frameborder="0"></iframe>'
          class="bg-gray-100 px-4 py-3 rounded-l flex-grow focus:outline-none"
        />
        <button
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
    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">Share on social media</h3>
      <div class="flex flex-wrap gap-3">
        <!-- Facebook -->
        <a
          href="#"
          class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            />
          </svg>
          <span>Facebook</span>
        </a>

        <!-- Twitter/X -->
        <a
          href="#"
          class="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
          <span>Twitter</span>
        </a>

        <!-- Pinterest -->
        <a
          href="#"
          class="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
            />
          </svg>
          <span>Pinterest</span>
        </a>

        <!-- LinkedIn -->
        <a
          class="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm8 0h-4.73v16h4.73v-8.5c0-4.971 6.27-5.38 6.27 0v8.5h4.73v-10.273c0-8.368-9.5-8.067-11 3.923v-5.15z"
            />
          </svg>
          <span>LinkedIn</span>
        </a>

        <!-- Email -->
        <a
          href="#"
          class="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Email</span>
        </a>

        <!-- WhatsApp -->
        <a
          href="#"
          class="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
            />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </div>

    <!-- QR Code -->
    <div class="mt-6 flex flex-col sm:flex-row items-center sm:space-x-6">
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
    </div>
  </div>
</template>
