import axios from 'axios';
import Cookies from 'js-cookie'; // استخدام js-cookie بدلاً من cookie

const apiClient = axios.create({
  baseURL: 'http://foscsgks8cs48ssoowkgkg0c.194.163.168.91.sslip.io/api/',
  withCredentials: true
});

apiClient.interceptors.request.use(
  config => {
    const token = Cookies.get('token'); // الآن ستعمل بشكل صحيح
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
