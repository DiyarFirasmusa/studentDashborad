import type { AuthAppConfig } from './auth-app-config'
import type { LoginResponse } from './login-response'

export interface AuthLoginRequest {
  username: string
  password: string
  onLogin: (loginResponse: LoginResponse) => void
  onError: (message: string) => void
  onDone: (authAppConfig: AuthAppConfig | null) => void
}

export interface AuthResetPasswordRequest extends AuthLoginRequest {
  newPassword: string
}

