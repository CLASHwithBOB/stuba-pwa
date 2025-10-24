import type { USER_STATUS } from 'src/enums/user-status';
import { axios } from 'src/lib/axios';

export default { update };

async function update(params: { nickname?: string; status?: USER_STATUS }): Promise<void> {
  try {
    await axios.patch(`/api/user`, params);
  } catch (error) {
    console.error(error);
  }
}
