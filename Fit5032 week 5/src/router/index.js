import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutPage.vue'
import LoginView from '../views/loginPage.vue'
import NoAccess from '../views/NoAccess.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/No-Access',
    name: 'NoAccess',
    component: NoAccess
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/No-Access')  
  } else {
    next()  
  }
})

export default router