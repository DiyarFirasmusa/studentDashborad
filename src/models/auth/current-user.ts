export interface CurrentUser {
  id: string
  isAuthenticated: boolean
  tenantId: boolean
  userName: string
  name: string
  surName: string
  email: string
  roles: string[]
}
