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

  if (to.meta.requiresAuth) {
    const token = Cookies.get('token'); 
    if (!token) {
      next({ name: 'Login' }); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
