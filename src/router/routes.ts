import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/auth/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/LoginPage.vue') }],
  },
  {
    path: '/register',
    component: () => import('layouts/auth/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/RegisterPage.vue') }],
  },
  {
    path: '/forgotpswd',
    component: () => import('layouts/auth/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/ForgotPassword.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
