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
      const { loadChannels, setCurrentChannel } = useChannels();

      await loadChannels();
      setCurrentChannel(null);

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
        const { loadChannels, setCurrentChannel, channels } = useChannels();

        await loadChannels();

        if (!channels?.find((c) => c.id === Number(to.params.channelId))) {
          next('/');
          return;
        }
        setCurrentChannel(Number(to.params.channelId));

        next();
      } catch (error) {
        console.error(error);
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
