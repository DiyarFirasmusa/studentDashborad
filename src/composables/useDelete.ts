import { baseService } from "@/api/BaseService"

export const useDelete = (
  url: string,
  onError?: (error: any) => void,
) => {
  const loading = ref(false)

  const deleteById = async (id: string | number) => {
    loading.value = true

    try {
      // delete
      await baseService.delete(url, id)
    }
    catch (error) {
      // on fail
      onError?.(error)
    }
    finally {
      loading.value = false
    }
  }

  return { loading, deleteById }
}
