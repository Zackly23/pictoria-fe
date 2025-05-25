import { ref } from 'vue'

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  passwordSignup: '',
  passwordConfirm: '',
})

export const validateSignup = (firstName, lastName, email, passwordSignup, passwordConfirm) => {
  let isValid = true

  errors.value.firstName = ''
  errors.value.lastName = ''
  errors.value.email = ''
  errors.value.passwordSignup = ''
  errors.value.passwordConfirm = ''

  if (!firstName) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }
  if (!lastName) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }
  if (!email) {
    errors.value.email = 'Email is required'
    isValid = false
  }
  if (!passwordSignup) {
    errors.value.passwordSignup = 'Password is required'
    isValid = false
  }
  if (!passwordConfirm) {
    errors.value.passwordConfirm = 'Password confirmation is required'
    isValid = false
  }
  if (passwordSignup && passwordSignup.length < 6) {
    errors.value.passwordSignup = 'Password must be at least 6 characters long'
    isValid = false
  }
  if (passwordSignup && passwordSignup.length > 20) {
    errors.value.passwordSignup = 'Password must be less than 20 characters long'
    isValid = false
  }
  if (passwordConfirm && passwordConfirm.length < 6) {
    errors.value.passwordConfirm = 'Password confirmation must be at least 6 characters long'
    isValid = false
  }

    if (passwordConfirm && passwordConfirm.length > 20) {
        errors.value.passwordConfirm = 'Password confirmation must be less than 20 characters long'
        isValid = false
    }
    if (passwordSignup && passwordConfirm && passwordSignup !== passwordConfirm) {
        errors.value.passwordConfirm = 'Password confirmation does not match'
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