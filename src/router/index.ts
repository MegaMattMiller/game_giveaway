/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/signin',
      component: () => import('@/views/SignInView.vue'),
    },
    {
      path: '/edit',
      component: () => import('@/views/EditView.vue'),
    },
  ],
});

export default router;
