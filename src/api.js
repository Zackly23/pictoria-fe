import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Inisialisasi instance Axios
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ⬅️ Penting untuk mengirim cookie ke server
})

// Tidak perlu menyisipkan Authorization header dari localStorage

// Interceptor response untuk menangani 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (originalRequest?.skipAuthErrorHandler) {
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Minta token baru dari server (cookie-based)
        await api.post(
          `/auth/refresh`,
          {},
          {
            withCredentials: true, // ⬅️ Kirim cookie refresh_token
          }
        )

        // Ulangi permintaan sebelumnya
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)

        // Redirect ke login
        // window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
