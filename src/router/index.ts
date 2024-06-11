import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NewLogin from '../views/NewLogin.vue'


const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/new-login',
    component: NewLogin
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router