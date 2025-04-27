<script setup>
import { ref } from 'vue'

const showComments = ref(true)
const commentText = ref('')
const comments = ref([
  { id: 1, author: 'User 1', text: 'This is a comment.', date: '2025-04-26' },
  { id: 2, author: 'User 2', text: 'Another comment.', date: '2025-04-26' }
])

function addComment() {
  if (commentText.value.trim() !== '') {
    comments.value.unshift({
      id: Date.now(),
      author: 'Anonymous',
      text: commentText.value,
      date: new Date().toLocaleDateString()
    })
    commentText.value = ''
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold">
        Comments ({{ comments.length }})
      </h2>
      <button @click="showComments = !showComments" class="text-blue-500 flex items-center">
        <span>{{ showComments ? 'Hide Comments' : 'Show Comments' }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1 transition-transform duration-300"
          :class="{ 'rotate-180': showComments }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

    <!-- Add Comment Form -->
    <div class="mb-6">
      <div class="flex items-start space-x-3">
        <div class="bg-gray-200 text-gray-500 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div class="flex-grow">
          <textarea
            v-model="commentText"
            placeholder="Write a comment..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
          ></textarea>
          <div class="flex justify-end mt-2">
            <button
              @click="addComment"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-2"
              :disabled="commentText.trim() === ''"
              :class="{ 'opacity-50 cursor-not-allowed': commentText.trim() === '' }"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span>Post Comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments List -->
    <div v-show="showComments" class="space-y-4 divide-y divide-gray-200">
      <div v-for="comment in comments" :key="comment.id" class="pt-4">
        <div class="flex items-start space-x-3">
          <div class="bg-gray-200 text-gray-500 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium">{{ comment.author }}</h3>
                <p class="text-sm text-gray-500">{{ comment.date }}</p>
              </div>
              <div class="flex">
                <button class="text-gray-400 hover:text-blue-500 p-1">
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
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p class="mt-2">{{ comment.text }}</p>
            <div class="mt-2 flex items-center space-x-4 mb-2">
              <button class="text-gray-500 hover:text-blue-500 text-sm flex items-center space-x-1">
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
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>Like</span>
              </button>
              <button class="text-gray-500 hover:text-blue-500 text-sm flex items-center space-x-1">
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-show="showComments && comments.length === 0" class="py-8 text-center">
      <div class="inline-block p-3 bg-gray-100 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-700">No comments yet</h3>
      <p class="text-gray-500 mt-1">Be the first to share your thoughts!</p>
    </div>

    <!-- Load More Button -->
    <div v-show="showComments && comments.length > 0" class="mt-6 text-center">
      <button
        class="text-blue-500 px-4 py-2 border border-blue-500 rounded hover:bg-blue-50 transition"
      >
        Load More Comments
      </button>
    </div>
  </div>
</template>
