import { ref } from 'vue'

const errors = ref({
  email: '',
  password: '',
})

export const validateLogin = (email, password) => {
  let isValid = true

  errors.value.email = ''
  errors.value.password = ''
  if (!email) {
    errors.value.email = 'Email is required'
    isValid = false
  }
  if (!password) {
    errors.value.password = 'Password is required'
    isValid = false
  }
  if (password && password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long'
    isValid = false
  }
  if (password && password.length > 20) {
    errors.value.password = 'Password must be less than 20 characters long'
    isValid = false
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.value.email = 'Email is not valid'
    isValid = false
  }
  if (email && email.length > 50) {
    errors.value.email = 'Email must be less than 50 characters long'
    isValid = false
  }
  if (email && email.length < 5) {
    errors.value.email = 'Email must be at least 5 characters long'
    isValid = false
  }
  return { isValid, errors: errors.value }
}


