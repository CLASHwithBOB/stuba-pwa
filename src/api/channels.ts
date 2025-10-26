import { isAxiosError } from 'axios';
import type { CHANNEL_TYPE } from 'src/enums/channel-type';
import { RESPONSE_TYPE } from 'src/enums/response';
import { axios } from 'src/lib/axios';
import { error, success } from 'src/lib/notifications';
import { useChannels } from 'src/stores/channels';
import type { Channel, User } from 'src/types/models';
import type { NotificationResponse, RedirectResponse } from 'src/types/responses';

export default { getAll, join, getMembers, kickMember };

function notifyError(message: string): NotificationResponse {
  return {
    type: RESPONSE_TYPE.NOTIFICATION,
    notification: {
      ...error,
      message,
    },
  };
}

async function getAll(): Promise<Channel[] | undefined> {
  try {
    const res = await axios.get(`/api/channels`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function join(params: {
  name: string;
  type: CHANNEL_TYPE;
}): Promise<RedirectResponse | NotificationResponse> {
  try {
    const res = await axios.post(`/api/channels`, params);
    const channel = res.data as Channel;

    const { addChannel } = useChannels();

    addChannel(channel);

    return {
      type: RESPONSE_TYPE.REDIRECT,
      url: `/channels/${channel.id}`,
      notification: {
        ...success,
        message: `You have joined the channel ${channel.name}.`,
      },
    };
  } catch (e) {
    console.error('Failed to join the channel.', e);

    return notifyError('Failed to join the channel.');
  }
}

async function kickMember(
  channelId: number,
  memberNickname: string,
): Promise<NotificationResponse> {
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

async function getMembers(channelId: number): Promise<User[] | undefined> {
  try {
    const res = await axios.get(`/api/channels/${channelId}/members`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
