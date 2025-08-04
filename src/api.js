import axios from 'axios'
import { useAuthStore } from './stores/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (originalRequest?.skipAuthErrorHandler) {
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 401) {
      try {
        await api.get('/auth/refresh', {
          withCredentials: true, // ⬅️ Kirim cookie refresh_token
        }) // Sudah dalam scope /api/v1
        return api(originalRequest)
      } catch (refreshError) {

        authStore.logout()

        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default api
