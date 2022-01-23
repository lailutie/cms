import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // name: 'Login',
    // component: Login
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/Main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/not-found/not-fount.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 设置路由守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCatch('token')
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
