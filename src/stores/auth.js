import { defineStore } from 'pinia'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLogin: false,
    accessToken: null,
    refreshToken: null,
    subsription: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getRefreshToken: (state) => state.refreshToken,
    getAccessToken: (state) => state.accessToken,
    getUser: (state) => state.user,
  },
  actions: {
    async fetchUserFromApi() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/me`, {
          withCredentials: true,
        })

        this.user = response.data.user
        this.isLogin = true
      } catch (error) {
        this.logout()
      }
    },
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

      // localStorage.removeItem('user')
      // localStorage.removeItem('access_token')
      // localStorage.removeItem('refresh_token')
      // localStorage.removeItem('last_visited_page')
    },
  },
})
