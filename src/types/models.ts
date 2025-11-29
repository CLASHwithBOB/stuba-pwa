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
  userId: number;
  name: string;
  type: CHANNEL_TYPE;
  invitedRecently?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  userId: number;
  channelId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageWithUser extends Message {
  user: User;
}

export interface ChannelWithMembersWithMessages extends Channel {
  members: User[];
  messages: MessageWithUser[];
}
