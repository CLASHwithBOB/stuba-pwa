import type { CHANNEL_TYPE } from 'src/enums/channel-type';
import type { USER_STATUS } from 'src/enums/user-status';

export interface User {
  id: number;
  nickname: string;
  email: string;
  status: USER_STATUS;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  id: number;
  user_id: string;
  name: string;
  type: CHANNEL_TYPE;
  createdAt: string;
  updatedAt: string;
}
