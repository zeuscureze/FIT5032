import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutPage.vue'
import NoAccess from '../views/NoAccess.vue'
import FirebaseSigninView from '@/views/FirebaseLogin.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AddBookView from '../views/AddBookview.vue'
import BookList from '../views/BookList.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'

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
    path: '/no-access',
    name: 'NoAccess',
    component: NoAccess
  },
  {
    path: '/',
    name: 'FireLogin',
    component: FirebaseSigninView 
  },
  {
    path: '/fire-register',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/booklist', name: 'booklist', component: BookList },
  {
    path: '/GetBookCountView',
    name: 'GetBookCountView',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    
    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
      next('/no-access');
    } else {
      next();  
    }
  });
});

export default router;
