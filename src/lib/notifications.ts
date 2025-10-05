import { type QNotifyCreateOptions } from 'quasar';

export const success: QNotifyCreateOptions = {
  color: 'green-5',
  textColor: 'white',
  icon: 'check',
  position: 'top',
};

export const error: QNotifyCreateOptions = {
  color: 'red-5',
  textColor: 'white',
  icon: 'error',
  position: 'top',
};

export const warning: QNotifyCreateOptions = {
  color: 'orange-5',
  textColor: 'white',
  icon: 'warning',
  position: 'top',
};
