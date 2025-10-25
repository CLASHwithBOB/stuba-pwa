import type { QNotifyCreateOptions } from 'quasar';
import type { RESPONSE_TYPE } from 'src/enums/response';

export interface RedirectResponse {
  type: RESPONSE_TYPE.REDIRECT;
  url: string;
  notification?: QNotifyCreateOptions;
}

export interface NotificationResponse {
  type: RESPONSE_TYPE.NOTIFICATION;
  notification: QNotifyCreateOptions;
}
