import { axios } from 'src/boot/axios';
import type { USER_STATUS } from 'src/enums/user-status';

export default { update };

async function update(params: { nickname?: string; status?: USER_STATUS }): Promise<void> {
  try {
    await axios.patch(`/api/user`, params);
  } catch (error) {
    console.error(error);
  }
}
