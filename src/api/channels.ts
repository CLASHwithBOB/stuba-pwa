import type { CHANNEL_TYPE } from 'src/enums/channel-type';
import { RESPONSE_TYPE } from 'src/enums/response';
import { axios } from 'src/lib/axios';
import { error, success } from 'src/lib/notifications';
import type { Channel, ChannelWithMembers, ChannelWithMembersWithMessages } from 'src/types/models';
import type { NotificationResponse, RedirectResponse } from 'src/types/responses';

export default { get, getAll, join, quit };

function notifyError(message: string): NotificationResponse {
  return {
    type: RESPONSE_TYPE.NOTIFICATION,
    notification: {
      ...error,
      message,
    },
  };
}

async function get(id: number): Promise<ChannelWithMembersWithMessages | undefined> {
  try {
    const res = await axios.get(`/api/channels/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getAll(): Promise<ChannelWithMembers[] | undefined> {
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

async function quit(id: number): Promise<RedirectResponse | NotificationResponse> {
  try {
    await axios.delete(`/api/channels/${id}`);

    return {
      type: RESPONSE_TYPE.REDIRECT,
      url: '/dashboard',
      notification: {
        ...success,
        message: `You have quit and deleted the channel.`,
      },
    };
  } catch (e) {
    console.error('Failed to quit the channel.', e);

    return notifyError('Failed to join the channel.');
  }
}
