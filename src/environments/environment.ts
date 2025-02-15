import { apiUrl } from './network-helper'
import type { Environment } from '@/models/environment'

const baseUrl = `${apiUrl}`

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Classify Admin',
  }
} as Environment

