import type { CHANNEL_TYPE } from 'src/enums/channel-type';
import { RESPONSE_TYPE } from 'src/enums/response';
import { axios } from 'src/lib/axios';
import { useChannels } from 'src/stores/channels';
import type { Channel } from 'src/types/models';
import type { ErrorResponse, RedirectResponse } from 'src/types/responses';

export default { getAll, join };

async function getAll(): Promise<Channel[] | undefined> {
  try {
    const { data } = await axios.get(`/api/channels`);

    return data.channels;
  } catch (error) {
    console.error(error);
  }
}

async function join(params: {
  name: string;
  type: CHANNEL_TYPE;
}): Promise<RedirectResponse | ErrorResponse> {
  try {
    const res = await axios.post(`/api/channels`, params);
    const channel = res.data.channel as Channel;

    const { addChannel } = useChannels();

    addChannel(channel);

    return {
      type: RESPONSE_TYPE.REDIRECT,
      url: `/channels/${channel.id}`,
      notification: {
        message: `You have joined the channel ${channel.name}.`,
        color: 'positive',
        position: 'top',
        timeout: 2000,
      },
    };
  } catch (error) {
    console.error('Failed to join the channel.', error);

    return {
      type: RESPONSE_TYPE.ERROR,
      notification: {
        message: `Failed to join the channel ${params.name}.`,
        color: 'negative',
        position: 'top',
        timeout: 2000,
      },
    };
  }
}
