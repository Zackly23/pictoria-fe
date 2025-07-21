<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-6xl font-bold text-yellow-600">500</h1>
    <p class="text-xl mt-4 text-gray-700">Terjadi kesalahan pada server</p>
    <p class="text-sm text-gray-500 mt-2">Silakan coba beberapa saat lagi atau hubungi admin.</p>
    <router-link
      to="/"
      class="mt-6 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
    >
      Kembali ke Beranda
    </router-link>
  </div>
</template>

<script setup>
// Tidak ada logic tambahan
</script>
