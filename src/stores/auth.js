import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLogin: !!localStorage.getItem('user'),
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    subsription: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getRefreshToken: (state) => state.refreshToken,
    getAccessToken: (state) => state.accessToken,
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user) {
      this.user = user
      this.isLogin = true
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(access_token, refresh_token) {
      this.accessToken = access_token
      this.refreshToken = refresh_token

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
    },
    setSubscription(subscription) {
      this.subsription = subscription
    },
    logout() {
      this.user = null
      this.token = null
      this.subsription = null
      this.isLogin = false

      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('last_visited_page')
    },
  },
})
