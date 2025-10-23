import { axios } from 'src/boot/axios';
import type { CHANNEL_TYPE } from 'src/enums/channel-type';
import type { Channel } from 'src/types/models';

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
}): Promise<{ redirectUrl: string; notification: string } | { error: string }> {
  try {
    await axios.post(`/api/channels`, params);

    return {
      redirectUrl: `/channels/${params.name}`,
      notification: 'Channel created successfully.',
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to join or create a channel.' };
  }
}
