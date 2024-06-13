import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NewLogin from '../views/NewLogin.vue'
import Home from '../views/Home.vue'
import CardsList from '../views/CardsList.vue'
import TradesList from '../views/TradesList.vue'
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
    path: '/trades',
    component: TradesList
  },
  {
    path: '/home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/cards',
    component: CardsList,
    meta: {requiresAuth: true}
  },
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