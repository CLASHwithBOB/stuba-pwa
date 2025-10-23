import type { QNotifyCreateOptions } from 'quasar';
import type { RESPONSE_TYPE } from 'src/enums/response';

export interface RedirectResponse {
  type: RESPONSE_TYPE.REDIRECT;
  url: string;
  notification?: QNotifyCreateOptions;
}

export interface ErrorResponse {
  type: RESPONSE_TYPE.ERROR;
  notification: QNotifyCreateOptions;
}
