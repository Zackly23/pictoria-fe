<script setup>
import api from '@/api'

import { onMounted, ref, computed, watch } from 'vue'

const customer = ref({ name: 'Quin Kelley', email: 'regilacez' })
const billDate = ref('2024-09-27')
const products = ref([{ name: 'Trial Product @ 150', price: 150.0, quantity: 1 }])
const tax = ref(18.0)
const selectedPayment = ref('saved')
const paymentMode = ref('test')

const subtotal = computed(() => {
  return products.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
})

const total = computed(() => subtotal.value + tax.value)

const formattedDateRange = computed(() => {
  const start = new Date(billDate.value)
  const end = new Date(start)
  end.setDate(start.getDate() + 1)
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
})

const closeModal = () => {
  alert('Modal closed')
}

const cancel = () => {
  alert('Cancelled')
}

const schedule = () => {
  alert('Subscription scheduled')
}
const paymentSubscriptionOpen = ref(true)
const activeSubscriptionTab = ref('active-sub')

// const props = defineProps({
//   userProfile: {
//     type: Object,
//     required: true,
//   },
//   userConfiguration: {
//     type: Object,
//     required: true,
//   },
//   isUserHasSameId: {
//     type: Boolean,
//     default: false,
//   },
// })
const currentPlan = 'Basic' // Ganti sesuai plan aktif: 'Basic', 'Advanced', atau 'Enterprise'

const emits = defineEmits(['new-user-profile'])

// Script setup or data
const changePlanningSubscription = (plan) => {
  console.log('change planning subscription to : ', plan)
}

// Script setup or data
const basicFeatures = [
  'Up to 5 GB storage',
  'Max upload size: 50 MB per file',
  'Standard image compression',
  'Manual download (per file)',
  'No image enhancement',
  'Public-only galleries',
  'Email support (response within 72h)',
]

const advancedFeatures = [
  'Up to 100 GB storage',
  'Max upload size: 500 MB per file',
  'Download all files in ZIP',
  'Basic image enhancement (auto-compression, orientation fix)',
  'Bulk image scaling/downscaling',
  'Simple gallery sharing (public/private)',
  'Email support',
  '7-day backup restore',
]

const enterpriseFeatures = [
  'All Advanced Plan features',
  'Unlimited storage',
  'Max upload size: 5 GB per file',
  'Auto image optimization (WebP, lazy load)',
  'Original file preservation (no compression)',
  'Priority access to download queue',
  'Advanced search & tagging',
  'Folder structure & asset grouping',
  'Real-time sync via API',
  '24/7 support with SLA',
]

const filters = ref({
  startDate: '',
  endDate: '',
  search: '',
})

const showDropdown = ref(false)
const toggleDropdown = () => (showDropdown.value = !showDropdown.value)

const subscriptions = ref([])

const filteredSubscriptions = computed(() => {
  return subscriptions.value.filter((sub) => {
    return sub.customer.toLowerCase().includes(filters.value.search.toLowerCase())
  })
})

const getSubscriptionHistories = async () => {
  console.log('filter : ', filters.value)
  try {
    const response = await api.get('/users/subscription', {
      params: {
        start_date: filters.value.startDate,
        end_date: filters.value.endDate,
        search: filters.value.search,
      },
    })

    const subscriptionData = response.data?.subscriptions?.map((sub) => {
      return {
        id: sub.id,
        provider: sub.payment_method,
        customer: sub.customer_name,
        source: sub.subscription_type,
        created: sub.created_at,
        amount: sub.amount,
        status: sub.status,
      }
    })

    subscriptions.value = subscriptionData

    console.log('response subscription : ', response.data)
  } catch (error) {
    console.error('error subscription his : ', error)
  }
}

watch(
  filters,
  () => {
    getSubscriptionHistories()
  },
  { deep: true },
)

onMounted(() => {
  getSubscriptionHistories()
})
</script>

<template>
  <div v-if="true" class="block md:flex space-y-4">
    <!-- Left Sidebar Navigation -->
    <div class="w-full md:w-64 border-gray-200 pr-4 h-full">
      <!-- <h2 class="text-2xl font-bold mb-6 ml-4">Account Settings</h2> -->

      <div class="space-y-1">
        <button
          @click="activeSubscriptionTab = 'active-sub'"
          :class="{
            'bg-blue-50 text-blue-600 font-medium': activeSubscriptionTab === 'active-sub',
            'text-gray-700 hover:bg-gray-100': activeSubscriptionTab !== 'active-sub',
          }"
          class="w-full text-left px-4 py-3 rounded-md flex items-center space-x-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Subscription</span>
        </button>

        <button
          @click="activeSubscriptionTab = 'history-sub'"
          :class="{
            'bg-blue-50 text-blue-600 font-medium': activeSubscriptionTab === 'history-sub',
            'text-gray-700 hover:bg-gray-100': activeSubscriptionTab !== 'history-sub',
          }"
          class="w-full text-left px-4 py-3 rounded-md flex items-center space-x-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span>History</span>
        </button>
      </div>
    </div>

    <!-- Right Content Area -->
    <div class="flex-1 md:pl-8">
      <!-- Profile Settings Content -->
      <div v-show="activeSubscriptionTab === 'active-sub'" class="space-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <!-- Basic Plan -->
          <div
            class="pricing-card relative rounded-2xl p-8 shadow-lg border-2 bg-white border-gray-200 hover:border-indigo-200 transition-all duration-300"
            :class="{ 'opacity-90 ring-2 ring-indigo-500': currentPlan === 'basic' }"
          >
            <div v-if="currentPlan === 'basic'" class="absolute top-2 right-2">
              <span
                class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                Your Plan
              </span>
            </div>

            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center">
                <span
                  class="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold"
                >
                  Basic
                </span>
              </div>
              <div class="mt-4 mb-2">
                <span class="text-sm font-medium text-gray-500"> Monthly </span>
              </div>
              <div class="flex items-baseline justify-center">
                <span class="text-5xl font-bold text-indigo-600"> $0 </span>
              </div>
            </div>

            <ul class="space-y-4 mb-8 text-gray-600 text-sm">
              <li class="flex items-start" v-for="item in basicFeatures" :key="item">
                <svg
                  class="h-5 w-5 mr-3 mt-0.5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {{ item }}
              </li>
            </ul>

            <button
              :disabled="currentPlan === 'basic'"
              @click="changePlanningSubscription('basic')"
              class="w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 border-2 bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600"
            >
              Get Started
            </button>
          </div>

          <!-- Advanced Plan -->
          <div
            class="pricing-card relative rounded-2xl p-8 shadow-lg border-2 bg-indigo-600 text-white"
            :class="{ 'opacity-90 ring-2 ring-yellow-300': currentPlan === 'advanced' }"
          >
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span
                class="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs md:text-sm font-semibold"
              >
                Most Popular
              </span>
            </div>
            <div v-if="currentPlan === 'advanced'" class="absolute top-2 right-2">
              <span class="bg-white text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                Your Plan
              </span>
            </div>

            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center">
                <span
                  class="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold"
                >
                  Advanced
                </span>
              </div>
              <div class="mt-4 mb-2">
                <span class="text-sm font-medium text-indigo-200"> Monthly </span>
              </div>
              <div class="flex items-baseline justify-center">
                <span class="text-5xl font-bold text-white"> $10 </span>
              </div>
            </div>

            <ul class="space-y-4 mb-8 text-indigo-100 text-sm">
              <li class="flex items-start" v-for="item in advancedFeatures" :key="item">
                <svg
                  class="h-5 w-5 mr-3 mt-0.5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {{ item }}
              </li>
            </ul>

            <button
              @click="changePlanningSubscription('advanced')"
              :disabled="currentPlan === 'advanced'"
              class="w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 border-2 bg-white text-indigo-600 hover:bg-gray-50 border-white"
            >
              Get Started
            </button>
          </div>

          <!-- Pro Plan -->
          <div
            class="pricing-card relative rounded-2xl p-8 shadow-lg border-2 bg-white border-gray-200 hover:border-indigo-200 transition-all duration-300"
            :class="{ 'opacity-90 ring-2 ring-green-400': currentPlan === 'enterprise' }"
          >
            <div v-if="currentPlan === 'enterprise'" class="absolute top-2 right-2">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Your Plan
              </span>
            </div>

            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center">
                <span
                  class="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold"
                >
                  Pro
                </span>
              </div>
              <div class="mt-4 mb-2">
                <span class="text-sm font-medium text-gray-500"> Monthly </span>
              </div>
              <div class="flex items-baseline justify-center">
                <span class="text-5xl font-bold text-indigo-600"> $50 </span>
              </div>
            </div>

            <ul class="space-y-4 mb-8 text-gray-600 text-sm">
              <li class="flex items-start" v-for="item in enterpriseFeatures" :key="item">
                <svg
                  class="h-5 w-5 mr-3 mt-0.5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {{ item }}
              </li>
            </ul>

            <button
              :disabled="currentPlan === 'enterprise'"
              @click="changePlanningSubscription('enterprise')"
              class="w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 border-2 bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <!-- Password Settings Content -->
      <div v-show="activeSubscriptionTab === 'history-sub'" class="space-y-8">
        <!-- Header -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Subscription Histories</h1>
            <p class="text-gray-600">
              Keep track of customer subscriptions created via order forms
            </p>
          </div>
          <!-- <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Subscription
          </button> -->
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div class="flex flex-wrap gap-4 items-center justify-between">
            <!-- Date Range -->
            <div
              class="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200"
            >
              <input
                type="date"
                v-model="filters.startDate"
                class="bg-transparent border-none focus:outline-none text-gray-600"
              />
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <input
                type="date"
                v-model="filters.endDate"
                class="bg-transparent border-none focus:outline-none text-gray-600"
              />
            </div>

            <div class="flex items-center gap-3">
              <!-- Search -->
              <div class="relative">
                <svg
                  class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search"
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Filters Button -->
              <!-- <button
                class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                  />
                </svg>
                Filters
              </button> -->
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Provider
                  </th>
                  <th
                    class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Source
                  </th>
                  <th
                    class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(sub, index) in subscriptions" :key="index">
                  <td class="py-4 px-6 text-gray-900 font-medium">{{ sub.provider }}</td>
                  <td class="py-4 px-6 text-gray-600">{{ sub.customer }}</td>
                  <td class="py-4 px-6 text-gray-600">{{ sub.source }}</td>
                  <td class="py-4 px-6 text-gray-600">{{ sub.created }}</td>
                  <td class="py-4 px-6 text-gray-600">{{ sub.amount }}</td>
                  <td class="py-4 px-6">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': sub.status === 'Active',
                        'bg-red-100 text-red-800': sub.status === 'Expired',
                      }"
                    >
                      {{ sub.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-show="activeSubscriptionTab === 'payment-sub'" class="space-y-8">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 mx-auto p-8 relative">
          <!-- Modal Body -->
          <div class="space-y-8">
            <!-- Customer Details -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Customer Details</h3>
              <div class="flex items-center gap-2 mb-1">
                <span
                  class="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold"
                  >OK</span
                >
                <span class="font-medium text-gray-700">{{ customer.name }}</span>
              </div>
              <div class="text-gray-900 font-semibold">{{ customer.name }}</div>
              <div class="text-gray-500 text-sm">{{ customer.email }}</div>
            </div>

            <!-- Subscription Details -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Subscription Details</h3>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bill Start Date</label>
                <input
                  type="date"
                  class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                  v-model="billDate"
                />
              </div>
            </div>

            <!-- Products -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Products</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm border border-gray-200 rounded-lg">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 text-left font-medium text-gray-600">Item</th>
                      <th class="px-4 py-2 text-left font-medium text-gray-600">Price</th>
                      <th class="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
                      <th class="px-4 py-2 text-left font-medium text-gray-600">Tax</th>
                      <th class="px-4 py-2 text-left font-medium text-gray-600">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in products" :key="index" class="border-t">
                      <td class="px-4 py-2">
                        <input
                          type="text"
                          class="border rounded px-2 py-1 w-full"
                          v-model="product.name"
                        />
                      </td>
                      <td class="px-4 py-2">
                        <span class="text-gray-500">$</span>
                        <input
                          type="number"
                          min="0"
                          class="border rounded px-2 py-1 w-20 ml-1"
                          v-model.number="product.price"
                        />
                      </td>
                      <td class="px-4 py-2">
                        <input
                          type="number"
                          min="1"
                          class="border rounded px-2 py-1 w-16"
                          v-model.number="product.quantity"
                        />
                      </td>
                      <td class="px-4 py-2">
                        <span class="text-gray-700">$ {{ tax.toFixed(2) }}</span>
                        <span
                          class="ml-1 text-xs text-gray-400 cursor-pointer"
                          title="Tax per product"
                          >i</span
                        >
                      </td>
                      <td class="px-4 py-2">
                        <span class="font-semibold text-gray-800"
                          >$ {{ (product.price * product.quantity).toFixed(2) }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex items-center gap-2 mt-3 text-gray-500 text-sm">
                <svg
                  class="w-4 h-4 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Billing Period: {{ formattedDateRange }}</span>
              </div>
            </div>

            <!-- Summary -->
            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-medium">$ {{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span
                  >Taxes
                  <span class="ml-1 text-xs text-gray-400 cursor-pointer" title="Total tax"
                    >i</span
                  ></span
                >
                <span class="font-medium">$ {{ tax.toFixed(2) }}</span>
              </div>
              <a href="#" class="text-blue-600 hover:underline text-xs">Add Coupon Code</a>
              <div class="flex justify-between font-semibold text-lg mt-2">
                <span>Amount Due</span>
                <span>$0.00</span>
              </div>
              <div class="flex justify-between font-semibold text-lg">
                <span>Amount Due After Trial</span>
                <span>$ {{ total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Payment Method -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                Add a Payment Method
                <span
                  class="ml-1 text-xs text-gray-400 cursor-pointer"
                  title="Choose payment method"
                  >i</span
                >
              </h3>
              <div class="flex gap-4 mb-3">
                <label
                  class="flex items-center gap-2 cursor-pointer"
                  :class="{ 'font-semibold text-blue-600': selectedPayment === 'saved' }"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="saved"
                    v-model="selectedPayment"
                    class="accent-blue-600"
                  />
                  <span>Saved Cards</span>
                </label>
                <label
                  class="flex items-center gap-2 cursor-pointer"
                  :class="{ 'font-semibold text-blue-600': selectedPayment === 'new' }"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="new"
                    v-model="selectedPayment"
                    class="accent-blue-600"
                  />
                  <span>Add New Card</span>
                </label>
              </div>
              <div
                v-if="selectedPayment === 'saved'"
                class="flex items-center gap-3 bg-gray-100 rounded-lg p-3"
              >
                <div class="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold">VISA</div>
                <div>
                  <div class="font-medium text-gray-700">Visa Ending in X-4242</div>
                  <div class="text-xs text-gray-500">Expiry 12/25</div>
                </div>
              </div>
              <div v-else class="bg-gray-50 rounded-lg p-3 text-gray-400 italic text-sm">
                Card entry form goes here...
              </div>
            </div>

            <!-- Additional Options -->
            <details class="mt-4">
              <summary class="cursor-pointer text-sm font-medium text-gray-700">
                Additional options
              </summary>
              <div class="mt-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                <div class="flex gap-4">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="test"
                      v-model="paymentMode"
                      class="accent-blue-600"
                    />
                    <span>Test</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="live"
                      v-model="paymentMode"
                      class="accent-blue-600"
                    />
                    <span>Live</span>
                  </label>
                </div>
              </div>
            </details>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-3 mt-8">
            <button
              class="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium"
              @click="cancel"
            >
              Cancel
            </button>
            <button
              class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              @click="schedule"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
