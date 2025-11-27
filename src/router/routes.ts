import { useChannels } from 'src/stores/channels';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [{ path: '', component: () => import('pages/DashboardPage.vue') }],
    meta: { auth: true },
    beforeEnter: async (to, from, next) => {
      const { loadChannels, resetCurrentChannel } = useChannels();

      await loadChannels();
      resetCurrentChannel();

      next();
    },
  },
  {
    path: '/channels/:channelId',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [{ path: '', component: () => import('pages/ChannelPage.vue') }],
    meta: { auth: true },
    beforeEnter: async (to, from, next) => {
      try {
        const { loadChannels, loadChannel } = useChannels();

        await loadChannels();
        await loadChannel(Number(to.params.channelId));

        next();
      } catch (err) {
        console.error(err);
        next(false);
      }
    },
  },
  {
    path: '/login',
    component: () => import('pages/auth/LoginPage.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    component: () => import('pages/auth/RegisterPage.vue'),
    meta: { guest: true },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
