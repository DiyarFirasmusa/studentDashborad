import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token'); 
  const userType = Cookies.get('userType'); // احصل على نوع المستخدم من الكوكيز

  if (to.meta.requiresAuth) {
    if (!token) {
      console.log('hel')
      next({ name: 'Login' });
    } else if (true) {
      console.log('hello')
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
