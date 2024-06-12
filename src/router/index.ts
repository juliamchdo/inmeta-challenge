import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NewLogin from '../views/NewLogin.vue'
import Trades from '../views/Trades.vue'


const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/new-login',
    component: NewLogin
  },
  {
    path: '/trades',
    component: Trades
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router