import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [{ path: '', component: () => import('pages/DashboardPage.vue') }],
    meta: { auth: true },
  },
  {
    path: '/login',
    component: () => import('layouts/auth/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/LoginPage.vue') }],
    meta: { guest: true },
  },
  {
    path: '/register',
    component: () => import('layouts/auth/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/RegisterPage.vue') }],
    meta: { guest: true },
  },
  {
    path: '/forgot-password',
    component: () => import('layouts/auth/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/ForgotPassword.vue') }],
    meta: { guest: true },
  },
  {
    path: '/reset-password',
    component: () => import('layouts/auth/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/ResetPassword.vue') }],
    meta: { guest: true },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
