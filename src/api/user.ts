import { isAxiosError } from 'axios';
import { RESPONSE_TYPE } from 'src/enums/response';
import type { USER_STATUS } from 'src/enums/user-status';
import { axios } from 'src/lib/axios';
import { error, success } from 'src/lib/notifications';
import type { NotificationResponse, RedirectResponse } from 'src/types/responses';

export default { update };

function notifyError(message: string): NotificationResponse {
  return {
    type: RESPONSE_TYPE.NOTIFICATION,
    notification: {
      ...error,
      message,
    },
  };
}

async function update(params: {
  nickname?: string | undefined;
  status?: USER_STATUS | undefined;
  avatar?: string | undefined;
  taggedNotificationsOnly?: boolean | undefined;
}): Promise<NotificationResponse | RedirectResponse> {
  try {
    const res = await axios.patch(`/api/user`, params);

    return {
      type: RESPONSE_TYPE.REDIRECT,
      url: '/dashboard',
      notification: {
        ...success,
        message: res.data.message,
      },
    };
  } catch (e) {
    const message = isAxiosError(e)
      ? e.response?.data.message
      : 'An unknown error occurred while updating user settings.';

    return notifyError(message);
  }
}
