import { baseService } from "@/api/BaseService"

export const useGetList = <T>(
  fullUrl: string | (() => string),
  options?: {
    start?: number
    limit?: number
  },
  onError?: (error: any) => void,
) => {
  const data = ref<T>()
  const totalPage = ref<number>(0)
  const loading = ref(false)
  const query = ref<any[]>([])
  const totalCount = ref<number>(0)

  const joinQuery = (url: string) => {
    const params = query.value.reduce((p, c) => (`${(p ? '&' : '') + c.key}=${c.value}`), '')

    return url + (url.includes('?') ? '&' : '?') + params
  }

  const fetch = async () => {
    loading.value = true

    try {
      const url = typeof fullUrl == 'function' ? fullUrl() : fullUrl
      const result = await baseService.getList(joinQuery(url))

      const items = result.items ?? result

      totalCount.value = result.totalCount

      data.value = items
      totalPage.value = Math.ceil(totalCount.value / (options?.limit ?? 1000))
    }
    catch (error) {
      // error handler
      onError?.(error)
    }

    loading.value = false
  }

  watch(query, fetch, { deep: true })

  const doFilter = (f: any) => {
    const filter = query.value.find(x => x.key === f.key)
    if (filter)
      filter.value = f.value
    else query.value.push(f)
  }

  return { fetch, data, loading, doFilter, totalCount }
}
