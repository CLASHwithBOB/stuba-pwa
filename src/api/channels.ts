import { axios } from 'src/boot/axios';
import type { Channel } from 'src/types/models';

export default { getAll };

async function getAll(): Promise<Channel[] | undefined> {
  try {
    const { data } = await axios.get(`/api/channels`);

    return data.channels;
  } catch (error) {
    console.error(error);
  }
}
