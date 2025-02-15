import axios from 'axios'
import { errorResponseHandler, errorResponseRejectHandler } from '@/plugins/axiosErrorsHanding'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
    baseURL: 'https://warith.freelance.omnia.sh/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
    headers: {'Content-Type': 'application/json'},
})

// --------------------------------------------------
// Each Request
// --------------------------------------------------
//
axiosIns.interceptors.request.use(onEachRequest, onEachRequestRejected)
axiosIns.interceptors.response.use(errorResponseHandler, errorResponseRejectHandler)
function onEachRequest(request: any) {
  setAccessTokenInHeader(request)

  return request
}

function onEachRequestRejected(error: unknown) {
  return Promise.reject(error)
}

function setAccessTokenInHeader(request: any) {
  // Get token from localStorage
  let accessToken = ''
  try {
    accessToken = JSON.parse(localStorage.getItem('accessToken') as string)
  }
  catch (error) {

  }

  // If token is present add it to request's Authorization Header
  if (accessToken)
    request.headers.Authorization = `Bearer ${accessToken}`
  else
    request.headers.Authorization = null
}

export default axiosIns
