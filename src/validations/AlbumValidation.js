import { ref } from 'vue'

const errors = ref({
  media: '',
  title: '',
  description: '',
  tag: '',
  privacy: '',
  targetEmail: '',
})

export const validateAlbumUpload = (media, title, description, tag, privacy, targetEmail) => {
  let isValid = true

  errors.value = {
    media: '',
    title: '',
    description: '',
    tag: '',
    privacy: '',
    targetEmail: '',
  }

  if (!media) {
    errors.value.media = 'Minimum 1 media File'
    isValid = false
  }
  if (!title) {
    errors.value.title = 'Title is required'
    isValid = false
  }
  if (!tag || tag.length === 0) {
    errors.value.tag = 'Tag is required'
    isValid = false
  }
  if (!privacy) {
    errors.value.privacy = 'Privacy Setting is required'
    isValid = false
  }
  if (privacy === 'restricted') {
    if (!targetEmail || targetEmail.length === 0) {
      errors.value.targetEmail = 'Target email is required'
      isValid = false
    }
  }

  return { isValid, errors: errors.value }
}
