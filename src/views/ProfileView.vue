<script setup>
import { ref, watch } from 'vue'
import UploadSectionComponent from '@/components/UploadSectionComponent/UploadSectionComponent.vue'
import AlbumSectionComponent from '@/components/ProfileSectionComponent/AlbumSectionComponent.vue'
import SettingSectionComponent from '@/components/ProfileSectionComponent/SettingSectionComponent.vue'
import ProfileStatsComponent from '@/components/ProfileSectionComponent/ProfileStatsComponent.vue'
import ProfileHeaderComponent from '@/components/ProfileSectionComponent/ProfileHeaderComponent.vue'
import ProfileNavigationComponent from '@/components/ProfileSectionComponent/ProfileNavigationComponent.vue'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeTab = ref(route.query.activeTab || 'albums')
const viewMode = ref('grid')

// Watch for changes in query param and update activeTab
watch(
  () => route.query.activeTab,
  (newTab) => {
    activeTab.value = newTab || 'albums'
  }
)

// Update query param when activeTab changes
watch(
  activeTab,
  (newTab) => {
    if (route.query.activeTab !== newTab) {
      router.replace({ query: { ...route.query, activeTab: newTab } })
    }
  }
)
const sortBy = ref('recent')
const userProfile = ref({
  fullname: 'David Dwi Nugroho',
  username: 'johndoe',
  email: 'johndoe@gmail.com',
  phone: '+1 234 567 8900',
  address: '123 Main St, San Francisco, CA 94101',
  city: 'San Francisco',
  state: 'CA',
  country: 'USA',
  zipcode: '94101',
  subscription: 'Pro Subscription',
  jobTitle: 'Professional Photographer',
  company: 'Doe Photography',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Award-winning photographer with over 10 years of experience. Specializing in portrait, nature, and architectural photography. Available for freelance work and collaborations.',
  tags: ['Portrait', 'Nature', 'Travel', 'Architecture'],
  stats: {
    images: 128,
    followers: '10.5k',
    following: 324,
    storageUsed: '15.7 GB',
    storageTotal: '50 GB',
    storagePercentage: 31,
  },
  socialMedias: {
    instagram: '@johndoe',
    facebook: 'johdoeganteng',
    twitter: '@johdoe',
    website: 'www.johndoeganten.com',
  },
})

const albums = ref([
  {
    id: 1,
    title: 'Nature Collection',
    description: 'A collection of my best nature photography from around the world.',
    photoCount: 25,
    updatedAt: '3 days ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    title: 'Cityscapes',
    description: 'Urban photography showcasing the beauty of city life.',
    photoCount: 18,
    updatedAt: '1 week ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    title: 'Wildlife Adventures',
    description: 'Capturing the essence of wildlife in their natural habitat.',
    photoCount: 30,
    updatedAt: '2 weeks ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 4,
    title: 'Abstract Art',
    description: 'Exploring abstract patterns and colors through photography.',
    photoCount: 12,
    updatedAt: '1 month ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 5,
    title: 'Portraits',
    description: 'A collection of stunning portrait photography.',
    photoCount: 20,
    updatedAt: '2 days ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 6,
    title: 'Underwater Wonders',
    description: 'Discover the beauty of underwater life.',
    photoCount: 15,
    updatedAt: '5 days ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 7,
    title: 'Desert Landscapes',
    description: 'The serene beauty of desert landscapes.',
    photoCount: 10,
    updatedAt: '3 weeks ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 8,
    title: 'Black and White',
    description: 'A timeless collection of black and white photography.',
    photoCount: 22,
    updatedAt: '4 days ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 9,
    title: 'Food Photography',
    description: 'Delicious and artistic food photography.',
    photoCount: 16,
    updatedAt: '1 week ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 10,
    title: 'Travel Diaries',
    description: 'Photos from my travels around the globe.',
    photoCount: 28,
    updatedAt: '2 weeks ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 11,
    title: 'Seasonal Colors',
    description: 'The vibrant colors of different seasons.',
    photoCount: 14,
    updatedAt: '1 month ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
  {
    id: 12,
    title: 'Street Photography',
    description: 'Capturing candid moments from the streets.',
    photoCount: 19,
    updatedAt: '2 days ago',
    coverImage: 'https://via.placeholder.com/300x200',
  },
])

const recentPhotos = ref([
  {
    id: 1,
    title: 'Mountain Sunset',
    likes: 145,
    imageUrl: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    title: 'Ocean Waves',
    likes: 120,
    imageUrl: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    title: 'Forest Path',
    likes: 98,
    imageUrl: 'https://via.placeholder.com/300x200',
  },
  {
    id: 4,
    title: 'City Lights',
    likes: 200,
    imageUrl: 'https://via.placeholder.com/300x200',
  },
])

const changeActiveTab = (tab) => {
  activeTab.value = tab
}

const changeViewMode = (mode) => {
  viewMode.value = mode
}

const changeSortBy = (sort) => {
  sortBy.value = sort
}

const newStoreAlbum = () => {
  //call api to get new albums
  console.log('Panggil API Album')
  albums.value.push({
    id: 13,
    title: 'New Store Album',
    description: 'This is New Store Album',
    photoCount: 23,
    updatedAt: new Date(),
    coverImage: 'https://via.placeholder.com/300x200',
  })
}

const newUserProfile = (user) => {
  //call api to get new user profile
  console.log('Panggil API User Profile')
  userProfile.value = {
    ...userProfile.value,
    ...user,
  }
}
</script>

<template>
  <!-- Profile Header -->
  <ProfileHeaderComponent :user-profile="userProfile" />

  <!-- Profile Stats (Mobile) -->
  <ProfileStatsComponent />

  <!-- Subscription Info (Mobile) -->
  <!-- <section class="md:hidden bg-white border-b border-gray-200 py-3">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-center">
        <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Pro Subscription
        </span>
      </div>
    </div>
  </section> -->

  <!-- Profile Navigation -->
  <ProfileNavigationComponent :active-tab="activeTab" @change-active-tab="changeActiveTab" />

  <!-- Tab Content -->
  <section class="container mx-auto px-4 py-8">
    <!-- Albums Tab -->
    <AlbumSectionComponent
      v-show="activeTab === 'albums'"
      :view-mode="viewMode"
      @change-view-mode="changeViewMode"
      @change-sort-by="changeSortBy"
      :albums="albums"
      :recent-photos="recentPhotos"
    />

    <!-- Upload Tab  -->
    <div v-show="activeTab === 'upload'">
      <div class="px-2">
        <UploadSectionComponent @new-store-album="newStoreAlbum" />
      </div>
    </div>

    <!-- Settings Tab Content -->
    <div v-show="activeTab === 'settings'">
      <SettingSectionComponent :user-profile="userProfile" @new-user-profile="newUserProfile" />
    </div>
  </section>
</template>

<style scoped>
.image-grid img:hover {
  transform: scale(1.05);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.tag-badge {
  transition: all 0.2s ease;
}

.tag-badge:hover {
  background-color: #3b82f6;
  color: white;
}
</style>
