import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NewLogin from '../views/NewLogin.vue'
import Home from '../views/Home.vue'
import NewCards from '../views/NewCards.vue'
import { AuthService } from '../services/auth'


const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/new-login',
    component: NewLogin
  },
  {
    path: '/home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/new-cards',
    component: NewCards,
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthService.isAuthenticated()) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router