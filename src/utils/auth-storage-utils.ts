import type { CurrentUser } from '@/models/auth/current-user'
import type { UserAbility } from '@/plugins/casl/AppAbility'
import type { UserData } from '@/models/storage/user-data'
import ability, { initialAbility } from '@/plugins/casl/ability'
import router from '@/router'

export const AuthStorageUtils = {
  saveAccessTokenToLocalStorag: (accessToken: string) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
  },
  removeAccessTokenFromLocalStorag: () => {
    localStorage.removeItem('accessToken')
  },
  saveUserAbilitiesToLocalStorage: (userAbilities: UserAbility[]) => {
    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
  },
  removeUserAbilitiesFromLocalStorage: () => {
    localStorage.removeItem('userAbilities')
  },
  saveUserDataToLocalStorage: (currentUser: CurrentUser) => {
    const userData: UserData = {
      avatar: '/src/assets/images/avatars/avatar-static-1.png',
      email: currentUser.email,
      fullName: currentUser.name,
      id: currentUser.id,
      roles: currentUser.roles,
      username: currentUser.userName,
    }

    localStorage.setItem('userData', JSON.stringify(userData))
  },
  removeUserDataFromLocalStorage: () => {
    localStorage.removeItem('userData')
  },
  getUserDataFromLocalStorage: (): UserData => {
    return JSON.parse(localStorage.getItem('userData') || '{}') as UserData
  },
  logout: () => {
    // clear local storage and session storage and indexDB and cookies
    localStorage.clear()
    sessionStorage.clear()
    window.indexedDB.databases().then(dbs => {
      dbs.forEach(db => {
        window.indexedDB.deleteDatabase(db.name as string)
      })
    })
    document.cookie = ''
    router.push({ name: 'login' }).then(() => {
      // Reset ability to initial ability
      ability.update(initialAbility)
    })
  },
}
