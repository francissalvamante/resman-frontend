import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Redeem from '../views/Redeem.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/redeem/:id',
    name: 'Redeem',
    component: Redeem,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      window.scrollTo(0, 0)
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') === null) {
      window.scrollTo(0, 0)
      next()
    } else {
      window.scrollTo(0, 0)
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    }
  } else {
    window.scrollTo(0, 0)
    next()
  }
})

export default router
