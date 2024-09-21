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
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    authRequired: true
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
  const store = useStore()
  dispatchEvent('closeAllMessages')
  if (store.showingMenu)
    store.toggleMenu()
  to.authRequired = routes.find((route) => route.name == to.name).authRequired
  if (to.authRequired && !store.userProfile)
    next({ name: 'Home' })
  else
    next()
})

export default router
