import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NewLogin from '../views/NewLogin.vue'
import Home from '../views/Home.vue'


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
    path: '/home',
    component: Home
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router