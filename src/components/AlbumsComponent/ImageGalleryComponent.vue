<script setup>
const props = defineProps({
  albums: {
    type: Array,
    default: [],
  },
  viewMode: {
    type: String,
    default: 'grid',
  },
})
</script>

<template>
  <!-- album Gallery - Grid View -->
  <section class="container mx-auto px-4 py-8" v-show="viewMode === 'grid'">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      v-show="albums?.length > 0"
    >
      <template v-for="album in albums" :key="album.id">
        <div class="bg-white rounded-lg overflow-hidden shadow-md album-card">
          <router-link :to="'/album/' + album.id + '/details'">
            <div class="relative group">
              <img
                :src="album.url"
                :alt="album.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              ></div>
            </div>
          </router-link>
          <!-- <img :src="album.url" :alt="album.name" class="w-full h-48 object-cover" /> -->
          <div class="p-4">
            <router-link :to="'/album/' + album.id + '/details'">
              <div class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2" v-text="album.name"></h3>
            </router-link>
            <div class="flex flex-wrap gap-1 mb-3">
              <div v-for="tag in album.tags" :key="tag">
                <span
                  class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                  v-text="tag"
                ></span>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <div class="flex justify-center items-center space-x-2">
                <div class="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span v-text="album.views"></span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span v-text="album.likes"></span>
                </div>
              </div>

              <span v-text="album.date"></span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- No results message -->
    <div class="text-center py-12" v-show="albums?.length === 0">
      <div class="text-5xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">No albums found</h3>
      <p class="text-gray-500">Try adjusting your search or browse a different category</p>
    </div>
  </section>

  <!-- Modern album Gallery - List View -->
  <section class="container mx-auto px-4 py-8" v-show="viewMode === 'list'">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <!-- Table header -->
          <thead>
            <tr class="bg-gradient-to-r from-indigo-50 to-blue-50">
              <th class="px-6 py-4 text-left">
                <div class="font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="hidden sm:inline">Album</span>
                </div>
              </th>
              <th class="px-6 py-4 text-left hidden md:table-cell">
                <div class="font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Tags
                </div>
              </th>
              <th class="px-6 py-4 text-left hidden sm:table-cell">
                <div class="font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Date
                </div>
              </th>
              <th class="px-6 py-4 text-center">
                <div class="font-semibold text-gray-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span class="hidden sm:inline">Stats</span>
                </div>
              </th>
            </tr>
          </thead>

          <!-- Table body -->
          <tbody class="divide-y divide-gray-100">
            <template v-for="album in albums" :key="album.id">
              <tr class="hover:bg-blue-50 transition-colors duration-200 cursor-pointer group">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-4">
                    <div class="relative">
                      <router-link to="/album/1/details">
                        <img
                          :src="album.url"
                          :alt="album.name"
                          class="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:shadow transition-shadow duration-200"
                        />
                      </router-link>
                    </div>
                    <div>
                      <router-link to="/album/1/details">
                        <span
                          class="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-200"
                          v-text="album.name"
                        ></span>
                      </router-link>
                      <p class="hidden md:block text-sm text-gray-500">
                        Ini adalah deskripsi dari album
                      </p>
                      <p class="text-xs text-gray-400 mt-1 hidden sm:block">
                        By: David Dwi Nugroho
                      </p>
                      <!-- Mobile only tags -->
                      <div class="flex flex-wrap gap-1 mt-2 md:hidden">
                        <div v-for="tag in album.tags" :key="tag" class="mb-1">
                          <span
                            class="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-indigo-100"
                            v-text="tag"
                          ></span>
                        </div>
                      </div>
                      <!-- Mobile only date -->
                      <p class="text-xs text-gray-500 mt-1 sm:hidden">{{ album.date }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 hidden md:table-cell">
                  <div class="flex flex-wrap gap-1">
                    <div v-for="tag in album.tags" :key="tag" class="mb-1">
                      <span
                        class="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-indigo-100"
                        v-text="tag"
                      ></span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 hidden sm:table-cell">
                  <span
                    class="text-gray-600 text-sm group-hover:text-indigo-600 transition-colors duration-200"
                    >{{ album.date }}</span
                  >
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center space-x-3">
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-blue-500 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span
                        class="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium"
                        >{{ album.views }}</span
                      >
                    </div>
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-pink-500 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span
                        class="bg-pink-50 text-pink-600 px-2 py-1 rounded-md text-xs font-medium"
                        >{{ album.likes }}</span
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- No results message -->
      <div class="text-center py-16" v-show="albums?.length === 0">
        <div class="flex justify-center">
          <div class="bg-indigo-50 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mt-4 mb-2">No albums found</h3>
        <p class="text-gray-500 max-w-md mx-auto">
          Try adjusting your search filters or browse a different category to find what you're
          looking for.
        </p>
        <button
          class="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Browse All albums
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.album-card {
  transition: all 0.3s ease;
}

.album-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
