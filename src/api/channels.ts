import { axios } from 'src/boot/axios';
import type { CHANNEL_TYPE } from 'src/enums/channel-type';

export default { join };

async function join(params: {
  name: string;
  type: CHANNEL_TYPE;
}): Promise<{ redirectUrl: string } | { error: string }> {
  try {
    await axios.post(`/api/channels`, params);

    return { redirectUrl: `/channels/${params.name}` };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to join or create a channel.' };
  }
}
