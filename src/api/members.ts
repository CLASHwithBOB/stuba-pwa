import { isAxiosError } from 'axios';
import { RESPONSE_TYPE } from 'src/enums/response';
import { axios } from 'src/lib/axios';
import { error, success } from 'src/lib/notifications';
import type { User } from 'src/types/models';
import type { NotificationResponse, RedirectResponse } from 'src/types/responses';

export default { getAll, invite, kick, revoke, cancel };

function notifyError(message: string): NotificationResponse {
  return {
    type: RESPONSE_TYPE.NOTIFICATION,
    notification: {
      ...error,
      message,
    },
  };
}

async function getAll(channelId: number): Promise<User[] | undefined> {
  try {
    const res = await axios.get(`/api/channels/${channelId}/members`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function invite(channelId: number, memberNickname: string): Promise<NotificationResponse> {
  try {
    const res = await axios.post(`/api/channels/${channelId}/members/${memberNickname}`);

    return {
      type: RESPONSE_TYPE.NOTIFICATION,
      notification: {
        ...success,
        message: res.data.message,
      },
    };
  } catch (e) {
    const message = isAxiosError(e)
      ? e.response?.data.message
      : 'An unknown error occurred while inviting the member to the channel.';

    return notifyError(message);
  }
}

async function revoke(channelId: number, memberNickname: string): Promise<NotificationResponse> {
  try {
    const res = await axios.put(`/api/channels/${channelId}/members/${memberNickname}`);

    return {
      type: RESPONSE_TYPE.NOTIFICATION,
      notification: {
        ...success,
        message: res.data.message,
      },
    };
  } catch (e) {
    const message = isAxiosError(e)
      ? e.response?.data.message
      : 'An unknown error occurred while revoking the member from the channel.';

    return notifyError(message);
  }
}

async function kick(channelId: number, memberNickname: string): Promise<NotificationResponse> {
  try {
    const res = await axios.delete(`/api/channels/${channelId}/members/${memberNickname}`);

    return {
      type: RESPONSE_TYPE.NOTIFICATION,
      notification: {
        ...success,
        message: res.data.message,
      },
    };
  } catch (e) {
    const message = isAxiosError(e)
      ? e.response?.data.message
      : 'An unknown error occurred while kicking the member from the channel.';

    return notifyError(message);
  }
}

async function cancel(channelId: number): Promise<RedirectResponse | NotificationResponse> {
  try {
    const res = await axios.put(`/api/channels/${channelId}/members`);

    return {
      type: RESPONSE_TYPE.REDIRECT,
      url: `/dashboard`,
      notification: {
        ...success,
        message: res.data.message,
      },
    };
  } catch (e) {
    const message = isAxiosError(e)
      ? e.response?.data.message
      : 'An unknown error occurred while cancelling the membership.';

    return notifyError(message);
  }
}
