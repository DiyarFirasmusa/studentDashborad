import { useToastStore } from '@/stores/toast'

export function useAlert(type: 'error' | 'success' | 'warning', message: string) {
  const toastStore = useToastStore()

  toastStore.showToast(message, type)
}
