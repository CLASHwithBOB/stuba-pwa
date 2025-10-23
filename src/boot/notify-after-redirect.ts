import { useQuasar } from 'quasar';
import { boot } from 'quasar/wrappers';
import { useNotifications } from 'src/stores/notifications';

export default boot(({ router }) => {
  router.afterEach(() => {
    const $q = useQuasar();
    const { notification } = useNotifications();

    if (notification && notification.message)
      $q.notify({
        message: notification.message,
        color: notification?.color ?? 'positive',
        position: notification?.position ?? 'top',
        timeout: notification?.timeout ?? 2000,
      });
  });
});
