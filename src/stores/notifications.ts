import { defineStore } from 'pinia';
import type { QNotifyCreateOptions } from 'quasar';
import { ref } from 'vue';

export const useNotifications = defineStore('notifications', () => {
  const notification = ref<QNotifyCreateOptions | null>(null);

  function setNotification(options: QNotifyCreateOptions | null) {
    notification.value = options;
  }

  return { notification, setNotification };
});
