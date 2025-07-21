<script setup>
import api from '@/api'
import { ref, computed } from 'vue'

const props = defineProps({
  albumDetail: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['close-modal', 'update-target-email'])

const newEmail = ref('')

// Search/filter
// const searchTerm = ref('')

// Email yang ditampilkan sesuai pencarian
const filteredEmails = computed(() => {
  if (!newEmail.value) return props.albumDetail.targetEmails
  return props.albumDetail.targetEmails.filter((email) =>
    email.toLowerCase().includes(newEmail.value.toLowerCase()),
  )
})

const addEmail = async () => {
  try {
    console.log('album id : ', props.albumDetail.id)
    const response = await api.put(`/albums/${props.albumDetail.id}/target-email`, {
      email: newEmail.value,
    })

    if (response.status === 200) {
      console.log('response add email : ', response.data)
      newEmail.value = ''

      emits('update-target-email')
    }
  } catch (error) {
    console.error('error add email : ', error)
  }
}

const closeModal = () => {
  emits('close-modal')
}
</script>

<template>
  <section class="container mx-auto px-4 py-4 mb-16 items-center justify-center flex mt-30">
    <div
      class="relative bg-white p-8 md:p-8 rounded-lg shadow-md max-w-2xl md:min-w-2xl h-auto w-full"
    >
      <!-- Tombol X (Close) -->
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 border border-gray-400 rounded-full hover:border-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Input untuk menambah email -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Tambahkan Email Target:</label>
        <div class="flex space-x-2">
          <input
            v-model="newEmail"
            type="email"
            placeholder="contoh@email.com"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="addEmail"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Tambah
          </button>
        </div>
      </div>

      <!-- Filter/Search Email -->
      <!-- <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-1">Cari Email:</label>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Cari berdasarkan email..."
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> -->

      <!-- List Email -->
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2">Daftar Email Target:</label>
        <div class="max-h-60 overflow-y-auto border border-gray-200 rounded p-3 space-y-2">
          <div
            v-if="filteredEmails?.length"
            v-for="(email, index) in filteredEmails"
            :key="index"
            class="text-sm text-gray-800 bg-gray-100 px-3 py-1 rounded"
          >
            {{ email }}
          </div>
          <div v-else class="text-gray-400 text-sm">Tidak ada email ditemukan.</div>
        </div>
      </div>
    </div>
  </section>
</template>
