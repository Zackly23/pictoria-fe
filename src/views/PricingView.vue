<script setup>
import api from '@/api'

import { onMounted, ref, computed, watch } from 'vue'

const currentPlan = 'Basic' // Ganti sesuai plan aktif: 'Basic', 'Advanced', atau 'Enterprise'

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
</script>

<template>
  <!-- Right Content Area -->
  <div class="flex-1 md:pl-8 mt-3 mb-6">
    <!-- Section Title -->
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold">Choose Your Plan</h2>
      <p class="text-gray-500 text-sm">Flexible storage options for every need</p>
    </div>

    <!-- Plans Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      <!-- Basic Plan -->
      <div
        class="pricing-card relative rounded-2xl p-6 shadow-md border bg-white border-gray-200 hover:border-indigo-200 transition-all"
        :class="{ 'opacity-90 ring-2 ring-indigo-500': currentPlan === 'basic' }"
      >
        <div v-if="currentPlan === 'basic'" class="absolute top-2 right-2">
          <span class="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-medium"
            >Your Plan</span
          >
        </div>
        <div class="text-center mb-4">
          <span class="bg-yellow-400 text-yellow-900 px-3 py-0.5 rounded-full text-sm font-semibold"
            >Basic</span
          >
          <div class="text-sm text-gray-500 mt-2">Monthly</div>
          <div class="text-4xl font-bold text-indigo-600 mt-1">$0</div>
        </div>
        <ul class="space-y-2 mb-4 text-gray-600 text-sm">
          <li v-for="item in basicFeatures" :key="item" class="flex items-start">
            <svg
              class="h-4 w-4 mr-2 mt-0.5 text-green-500"
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
          class="w-full py-2 px-4 rounded-lg font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Get Started
        </button>
      </div>

      <!-- Advanced Plan -->
      <div
        class="pricing-card relative rounded-2xl p-6 shadow-md border bg-indigo-600 text-white transition-all"
        :class="{ 'opacity-90 ring-2 ring-yellow-300': currentPlan === 'advanced' }"
      >
        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span class="bg-yellow-400 text-yellow-900 px-3 py-0.5 rounded-full text-xs font-semibold"
            >Most Popular</span
          >
        </div>
        <div v-if="currentPlan === 'advanced'" class="absolute top-2 right-2">
          <span class="bg-white text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium"
            >Your Plan</span
          >
        </div>
        <div class="text-center mb-4">
          <span class="bg-yellow-400 text-yellow-900 px-3 py-0.5 rounded-full text-sm font-semibold"
            >Advanced</span
          >
          <div class="text-sm text-indigo-200 mt-2">Monthly</div>
          <div class="text-4xl font-bold mt-1">$10</div>
        </div>
        <ul class="space-y-2 mb-4 text-indigo-100 text-sm">
          <li v-for="item in advancedFeatures" :key="item" class="flex items-start">
            <svg
              class="h-4 w-4 mr-2 mt-0.5 text-yellow-300"
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
          :disabled="currentPlan === 'advanced'"
          class="w-full py-2 px-4 rounded-lg font-semibold text-sm bg-white text-indigo-600 hover:bg-indigo-50 transition"
        >
          Get Started
        </button>
      </div>

      <!-- Pro / Enterprise Plan -->
      <div
        class="pricing-card relative rounded-2xl p-6 shadow-md border bg-white border-gray-200 hover:border-indigo-200 transition-all"
        :class="{ 'opacity-90 ring-2 ring-green-400': currentPlan === 'enterprise' }"
      >
        <div v-if="currentPlan === 'enterprise'" class="absolute top-2 right-2">
          <span class="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium"
            >Your Plan</span
          >
        </div>
        <div class="text-center mb-4">
          <span class="bg-yellow-400 text-yellow-900 px-3 py-0.5 rounded-full text-sm font-semibold"
            >Enterprise</span
          >
          <div class="text-sm text-gray-500 mt-2">Monthly</div>
          <div class="text-4xl font-bold text-indigo-600 mt-1">$50</div>
        </div>
        <ul class="space-y-2 mb-4 text-gray-600 text-sm">
          <li v-for="item in enterpriseFeatures" :key="item" class="flex items-start">
            <svg
              class="h-4 w-4 mr-2 mt-0.5 text-green-500"
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
          class="w-full py-2 px-4 rounded-lg font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>
