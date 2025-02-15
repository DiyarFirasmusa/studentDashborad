export const useLocalstorage = (key:string) => {
 const item = localStorage.getItem(key)
    try {
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
}