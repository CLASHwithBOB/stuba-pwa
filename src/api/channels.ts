import { axios } from 'src/boot/axios';
import type { CHANNEL_TYPE } from 'src/enums/channel-type';
import { RESPONSE_TYPE } from 'src/enums/response';
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
    await axios.post(`/api/channels`, params);

    return {
      type: RESPONSE_TYPE.REDIRECT,
      url: `/channels/${params.name}`,
      notification: {
        message: `You have joined the channel ${params.name}.`,
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
