export interface Environment {
  apis: Apis
  application: ApplicationInfo
  hmr?: boolean
  test?: boolean
  localization?: {
    defaultResourceName?: string
  }
  production: boolean
  oAuthConfig: AuthConfig
  configuration: ApplicationConfiguration
}

export interface ApplicationConfiguration {
  url: string
}
export interface Apis {
  [key: string]: Partial<ApiConfig>
  default: ApiConfig
}
export interface ApiConfig {
  [key: string]: string
  url: string
}
export interface ApplicationInfo {
  name: string
  baseUrl?: string
  logoUrl?: string
}

export declare class AuthConfig {
  /**
   * The client's id as registered with the auth server
   */
  clientId?: string

  /**
   * The client's secret as registered with the auth server
   */
  clientSecret?: string

  /**
   * The auth server's endpoint that allows to log
   * the user in when using implicit flow.
   */
  loginUrl?: string

  /**
   * The requested scopes
   */
  scope?: string

  /**
   * password - code
   */
  grantType?: string

  username?: string
  password?: string

  /**
   * The issuer's uri.
   */
  issuer?: string

  /**
   * The logout url.
   */
  logoutUrl?: string

  /**
   * Url of the token endpoint as defined by OpenId Connect and OAuth 2.
   */
  tokenEndpoint?: string

  resetPasswordEndpoint?: string

  /**
   * Defines when the token_timeout event should be raised.
   * If you set this to the default value 0.75, the event
   * is triggered after 75% of the token's life time.
   */
  timeoutFactor?: number
}

