import { defineRouter } from '#q-app/wrappers';
import { useAuth } from 'src/stores/auth';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const auth = useAuth();

    if (auth.token && !auth.user) {
      try {
        const me = await auth.me();

        if (!me) {
          localStorage.removeItem('auth_token');
        }
      } catch (err) {
        console.error('Auth fetch failed:', err);
        await auth.logout();
      }
    }

    if (to.meta.auth) {
      if (auth.token) next();
      else next('/login');
    } else if (to.meta.guest) {
      if (auth.token) next('/dashboard');
      else next();
    } else {
      next();
    }
  });

  return Router;
});
