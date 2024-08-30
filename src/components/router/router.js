import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomePage.vue';
import Login from '@/components/UserForm.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
