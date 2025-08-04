<script setup>
import api from '@/api'
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UploadSectionComponent from '@/components/UploadSectionComponent/UploadSectionComponent.vue'
import AlbumSectionComponent from '@/components/ProfileSectionComponent/AlbumSectionComponent.vue'
import SettingSectionComponent from '@/components/ProfileSectionComponent/SettingSectionComponent.vue'
import ProfileStatsComponent from '@/components/ProfileSectionComponent/ProfileStatsComponent.vue'
import ProfileHeaderComponent from '@/components/ProfileSectionComponent/ProfileHeaderComponent.vue'
import ProfileNavigationComponent from '@/components/ProfileSectionComponent/ProfileNavigationComponent.vue'
import FollowerAlbumUpdateComponent from '@/components/ProfileSectionComponent/FollowerAlbumUpdateComponent.vue'
import SubscriptionSectionComponent from '@/components/ProfileSectionComponent/SubscriptionSectionComponent.vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const route = useRoute()
const router = useRouter()

const userData = JSON.parse(localStorage.getItem('user'))
const userDataID = computed(() => route.params.userId)
const isUserHasSameId = ref(false)
const lastPage = ref(10)
const totalAlbum = ref(0)
const currentPage = ref(1)
const limitPage = ref(8)
const recentPhotos = ref([])
const albums = ref([])
const accountConfiguration = ref({
  enableTFA: false,
  tfaMethod: '',
  tfaDevice: '',
})

const userProfile = ref({
  userID: '',
  fullname: '',
  username: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
  subscription: '',
  jobTitle: '',
  company: '',
  avatar: '',
  bio: '',
  areYouFollowedByUserLooking: false,
  maximumMediaSizeString: '',
  maximumMediaSize: 0,
  tags: [],
  socialMedias: {
    instagram: '',
    facebook: '',
    twitter: '',
    website: '',
  },
  stats: {
    mediaCount: 0,
    followers: 0,
    following: 0,
    storageUsed: 0,
    storageTotal: 0,
    storagePercentage: 0,
  },
})

const activeTab = ref(route.query.activeTab || 'albums')
const viewMode = ref('grid')

const sortBy = ref('recent')

const changeActiveTab = (tab) => {
  activeTab.value = tab
}

const changeViewMode = (mode) => {
  viewMode.value = mode

  if (viewMode.value === 'more-grid') {
    limitPage.value = 12
  } else {
    limitPage.value = 8
  }
}

const changeSortBy = (sort) => {
  sortBy.value = sort
  console.log('sort by berubah ke : ', sortBy.value)
}

const userFollow = async () => {
  await getUserProfile()
}

const changePage = (page) => {
  currentPage.value = page

  console.log('page berubah ke : ', currentPage.value)
}

const storeNewAlbumHandler = () => {
  activeTab.value = 'albums'

  setTimeout(() => {
    window.location.reload()
  }, 50) // kasih delay kecil, 50–100 ms cukup
}


const deleteAlbumHandler = () => {
  // getAllAlbums()
  activeTab.value = 'albums'
  window.location.reload()

  toast.add({
    severity: 'success',
    summary: 'Delete Success',
    detail: 'Album Deleted Successfully.',
    life: 3000,
  })
}

const newUserProfile = async (user) => {
  //call api to get new user profile
  console.log('Panggil API User Profile')
  userProfile.value = {
    ...userProfile.value,
    ...user,
  }

  try {
    const responses = await api.put(`/users/${userProfile.value.userID}`, {
      full_name: userProfile.value.fullname,
      user_name: userProfile.value.username,
      email: userProfile.value.email,
      phone_number: userProfile.value.phone,
      bio: userProfile.value.bio,
      tag_preferences: userProfile.value.tags,
      address: userProfile.value.address,
      job_title: userProfile.value.jobTitle,
      state: userProfile.value.state,
      country: userProfile.value.country,
      city: userProfile.value.city,
      company_name: userProfile.value.company,
      social_media: userProfile.value.socialMedias,
      zip_code: userProfile.value.zipcode,
    })

    console.log('update userProfile : ', responses.data)

    if (responses.status === 200) {
      //panggil api getUserProfile
      toast.add({
        severity: 'success',
        summary: 'Update Success',
        detail: 'Profile updated successfully.',
        life: 3000,
      })
      await getUserProfile()
    }
  } catch (error) {
    console.error('error update data : ', error)
    toast.add({
      severity: 'error',
      summary: 'Update Failed',
      detail: 'Failed to update profile. Please try again.',
      life: 3000,
    })
  }

  console.log('data baru nih : ', userProfile.value)
}

//API Call
const getUserConfiguration = async () => {
  try {
    const responses = await api.get(`users/${userDataID.value}/configuration`)

    const config = responses.data.account_config

    console.log('acoount congufuration: ', config)
    accountConfiguration.value.enableTFA = config.is_two_factor_enabled
    accountConfiguration.value.tfaDevice = config.two_factor_auth_device
    accountConfiguration.value.tfaMethod = config.two_factor_auth_method

    console.log('account config : ', accountConfiguration.value)
  } catch (error) {
    console.error('terdapat error : ', error)
  }
}

const getUserProfile = async () => {
  try {
    // Simulate an API call to fetch user profile
    const response = await api.get(`/users/${userDataID.value}`)

    console.log('User Profile: ', response.data)

    const users = response.data.user
    const mediaStats = response.data.media_count

    userProfile.value.userID = users.id
    userProfile.value.fullname = users.first_name + ' ' + users.last_name
    userProfile.value.username = users.user_name
    userProfile.value.email = users.email
    userProfile.value.phone = users.phone
    userProfile.value.address = users.address
    userProfile.value.city = users.city
    userProfile.value.state = users.state
    userProfile.value.company = users.company_name
    userProfile.value.country = users.country
    userProfile.value.zipcode = users.zip_code
    userProfile.value.jobTitle = users.job_title
    userProfile.value.avatar = users.profile_picture
    userProfile.value.subscription = users.subscription
    userProfile.value.bio = users.bio
    userProfile.value.areYouFollowedByUserLooking = users.are_you_following_user
    userProfile.value.tags = users.tag_preferences || []
    userProfile.value.maximumMediaSize = users.maximum_media_size
    userProfile.value.maximumMediaSizeString = users.maximum_media_size_string
    userProfile.value.socialMedias = {
      instagram: users.social_media?.instagram,
      facebook: users.social_media?.facebook,
      twitter: users.social_media?.twitter,
      website: users.social_media?.website,
    }

    userProfile.value.stats = {
      mediaCount: mediaStats.media_count,
      followers: mediaStats.followers_count,
      following: mediaStats.following_count,
      storageUsed: mediaStats.storage_used,
      storageTotal: mediaStats.storage_capacity,
      storagePercentage: mediaStats.storage_percentage,
    }

    console.log('is user same ? = ', isUserHasSameId.value)

    console.log('User Profile after update: ', userProfile.value)
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

const getAllAlbums = async () => {
  try {
    // Simulate an API call to fetch all albums
    console.log('sort by : ', sortBy.value)
    const response = await api.get('/albums', {
      params: {
        user_id: userDataID.value,
        sort_by: sortBy.value,
        search: '',
        page: currentPage.value,
        limit: limitPage.value,
      },
    })

    console.log('All Albums: ', response.data)

    // Update albums with the fetched data
    albums.value = response.data.albums.map((album) => ({
      id: album.album_id,
      title: album.title,
      description: album.description,
      photoCount: album.media_count,
      imageCount: album.image_count,
      videoCount: album.video_count,
      updatedAt: album.last_update,
      coverImage: album.thumbnail_url,
    }))

    lastPage.value = response.data.total_pages
    totalAlbum.value = response.data.total

    console.log('Albums after update: ', albums.value)
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

const getRecentPhotos = async () => {
  try {
    // Simulate an API call to fetch recent photos
    const response = await api.get('/albums/images/latest')

    console.log('Recent Photos: ', response.data)

    // Update recentPhotos with the fetched data
    recentPhotos.value = response.data.album.map((photo) => ({
      id: photo.album_id,
      title: photo.description,
      likes: photo.like_count,
      imageUrl: photo.thumbnail_url,
    }))

    console.log('Recent Photos after update: ', recentPhotos.value)
  } catch (error) {
    console.error('Error fetching recent photos:', error)
  }
}

// Update query param when activeTab changes
watch(activeTab, (newTab) => {
  if (route.query.activeTab !== newTab) {
    router.replace({ query: { ...route.query, activeTab: newTab } })
  }
})

// Watch for changes in query param and update activeTab
watch(
  () => route.query.activeTab,
  (newTab) => {
    activeTab.value = newTab || 'albums'
  },
)

watch(
  () => route.params.userId,
  async (newId, oldId) => {
    if (newId !== oldId) {
      currentPage.value = 1
      if (userData.id === userDataID.value) {
        isUserHasSameId.value = true
        activeTab.value = route.query.activeTab
      } else {
        activeTab.value = 'albums'
      }
      await getUserProfile()
      await getAllAlbums()
      await getUserConfiguration()
    }
  },
  { immediate: true },
)

//watch for sortby and current page, call for getAllAlbums
watch([sortBy, currentPage, limitPage], () => {
  getAllAlbums()
})

onMounted(() => {
  if (userData.id === userDataID.value) {
    isUserHasSameId.value = true
  }
  console.log('route.params.userId:', route.params.userId)


  getRecentPhotos()
  getAllAlbums()
  getUserProfile()
  getUserConfiguration()
})
</script>

<template>
  <!-- Profile Header -->
  <ProfileHeaderComponent
    @user-follow="userFollow"
    :user-data-id="userDataID"
    :user-profile="userProfile"
    :is-user-has-same-id="isUserHasSameId"
  />

  <!-- Profile Stats (Mobile) -->
  <ProfileStatsComponent :user-profile="userProfile" :is-user-has-same-id="isUserHasSameId" />

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
  <ProfileNavigationComponent
    :active-tab="activeTab"
    @change-active-tab="changeActiveTab"
    :is-user-has-same-id="isUserHasSameId"
  />

  <!-- Tab Content -->
  <section class="container mx-auto px-4 py-8">
    <!-- Albums Tab -->
    <AlbumSectionComponent
      v-show="activeTab === 'albums'"
      :view-mode="viewMode"
      @change-view-mode="changeViewMode"
      @change-sort-by="changeSortBy"
      @change-page="changePage"
      :albums="albums"
      :recent-photos="recentPhotos"
      :lastPage="lastPage"
      :totalAlbum="totalAlbum"
      :is-user-has-same-id="isUserHasSameId"
      :user-id="userDataID"
      @delete-album-handler="deleteAlbumHandler"
    />

    <!-- Upload Tab  -->
    <div v-show="activeTab === 'upload'">
      <div class="px-2">
        <UploadSectionComponent
          :user-data="userProfile"
          :user-data-id="userDataID"
          :is-user-has-same-id="isUserHasSameId"
          @store-new-album-handler="storeNewAlbumHandler"
        />
      </div>
    </div>

    <!-- Settings Tab Content -->
    <div v-show="activeTab === 'settings'">
      <SettingSectionComponent
        :is-user-has-same-id="isUserHasSameId"
        :user-profile="userProfile"
        :user-configuration="accountConfiguration"
        @new-user-profile="newUserProfile"
      />
    </div>

    <div v-show="activeTab === 'followers'">
      <FollowerAlbumUpdateComponent />
    </div>

    <div v-show="activeTab === 'subscription'">
      <SubscriptionSectionComponent />
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
