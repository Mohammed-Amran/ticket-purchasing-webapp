import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../../features/auth/views/LoginView.vue'
import HomeView from '../../features/matches/views/HomeView.vue'
import CheckoutView from '../../features/tickets/views/CheckoutView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },

  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
