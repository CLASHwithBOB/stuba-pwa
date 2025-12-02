import { axios } from 'src/lib/axios';
import type { MessageWithUser } from 'src/types/models';

export default { paginate };

async function paginate({
  channelId,
  beforeId,
}: {
  channelId: number;
  beforeId: number | undefined;
}): Promise<MessageWithUser[] | undefined> {
  try {
    const res = await axios.get(`/api/channels/${channelId}/messages`, {
      params: { beforeId },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
