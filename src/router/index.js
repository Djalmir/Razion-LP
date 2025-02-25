import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '../stores/main.js'
import Home from '../views/Home.vue'
import { dispatchEvent } from '../utils/events.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    alias: '/auth/signup',
    name: 'Auth',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    authRequired: true,
    onlyAdmin: true
  },
  {
    path: '/estimativeGenerator/:estimativeId?',
    name: 'EstimativeGenerator',
    component: () => import('../views/EstimativeGenerator.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    authRequired: true
  },
  {
    path: '/svgLib',
    name: 'SvgLib',
    component: () => import('@/views/SvgLibViewer.vue'),
    authRequired: true,
    onlyAdmin: true
  },

  {
    path: '/:pathMatch(.*)',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const allowedRoles = ['owner', 'admin']
  const store = useStore()
  dispatchEvent('closeAllMessages')
  if (store.showingMenu)
    store.toggleMenu()
  to.authRequired = routes.find((route) => route.name == to.name).authRequired
  to.onlyAdmin = routes.find((route) => route.name == to.name).onlyAdmin
  if (to.authRequired && !store.userProfile)
    next({ name: 'Home' })
  else if(!allowedRoles.includes(store.userProfile?.role) && to.onlyAdmin)
    next({ name: 'Home' })
  else
    next()
})

export default router
