import { baseService } from "@/api/BaseService";

export const useSubmit = (
  urls: { create: string; update?: string },
  validator: () => Promise<boolean>,
  onError?: (error: any) => void,
  onSuccess?: (error: any) => void,
) => {
  const loading = ref(false)

  const submit = async (
    id: null | number | string,
    postingData: object,
  ) => {
    const validateStaus = await validator()

    if (!validateStaus)
      return

    loading.value = true

    let result: any = null

    try {
      // create
      if (!id) {
        result = await baseService.create(urls.create, postingData)
        if (!onSuccess) {
          // messageStore.setMessage({
          //   messageCode: 'savedSuccessfully',
          //   type: 'success',
          // })
        }
        else {
          onSuccess?.(result)
        }
      }

      // update
      else if (urls.update) {
        result = await baseService.updateById(urls.update, id, postingData)
        if (!onSuccess) {
          // messageStore.setMessage({
          //   messageCode: 'savedSuccessfully',
          //   type: 'success',
          // })
        }
        else {
          onSuccess?.(result)
        }
      }
    }
    catch (error) {
      // on fail
      onError?.(error)
    }
    finally {
      loading.value = false
    }

    return result
  }

  return { submit, loading }
}
