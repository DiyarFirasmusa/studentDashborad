import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://foscsgks8cs48ssoowkgkg0c.194.163.168.91.sslip.io/api',
  withCredentials: false, 
});

// ➤ إضافة Interceptor للطلبات الصادرة
apiClient.interceptors.request.use(
  config => {
    const token = Cookies.get('token'); // استرجاع التوكن من الكوكيز

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // إضافة التوكن إلى الهيدر
    }

    return config; // إرجاع الكود المعدل ليتم إرساله
  },
  error => {
    return Promise.reject(error); // في حالة الخطأ، رفض الطلب
  }
);

export default apiClient;
