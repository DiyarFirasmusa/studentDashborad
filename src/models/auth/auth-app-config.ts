import type { Authorization } from './authorization'
import type { CurrentUser } from './current-user'

export interface AuthAppConfig {
  currentUser: CurrentUser
  auth: Authorization
}
