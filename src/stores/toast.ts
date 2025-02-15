import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'

interface CustomToast {
  id: string
  message: string
  type: string
}

export const useToastStore = defineStore('toast', () => {
  const toastType = ref('')
  const timeout = 5000
  const toasts: Ref<CustomToast[]> = ref<CustomToast[]>([])

  function showToast(msg: string, type: string) {
    // random unique id
    const id = Math.random().toString(36).substr(2, 9)

    toastType.value = type

    toasts.value.unshift({
      id,
      message: msg,
      type,
    })
  }
  function removeToast(id: string) {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return { showToast, removeToast, toasts, timeout, toastType }
})
