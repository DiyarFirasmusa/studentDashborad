import type { AxiosError, AxiosResponse } from 'axios'

import { AuthStorageUtils } from '@/utils/auth-storage-utils'
import { useToastStore } from '@/stores/toast'
import { TYPE } from 'vue-toastification'


function errorResponseHandler(response: AxiosResponse): AxiosResponse {
  // ignore

  return response
}
function errorResponseRejectHandler(error: AxiosError) {
  const toastStore = useToastStore()
   console.log('error', error)
  if (error.response?.status === 401) {
    toastStore.showToast('Unauthorized : Please login again', TYPE.ERROR)
    AuthStorageUtils.logout()
  }
  else if (error.response?.status === 400) {
    toastStore.showToast(`Bad Request: ${(<any>error.response.data)?.error?.message ?? ''}`, TYPE.ERROR)
  }
  else if (error.response?.status === 403) {
    toastStore.showToast(`Forbidden: ${(<any>error.response.data)?.error?.message ?? ''}`, TYPE.ERROR)
  }
  else if (error.response?.status === 404) {
    toastStore.showToast(`Not Found: ${(<any>error.response.data)?.error?.message ?? ''}`, TYPE.ERROR)
  }
  else if (error.response?.status === 500) {
    toastStore.showToast('Internal Server Error', TYPE.ERROR)
  }
  else {
    toastStore.showToast(error.message, TYPE.ERROR)
  }

  return Promise.reject(error)
}
export { errorResponseHandler, errorResponseRejectHandler }
