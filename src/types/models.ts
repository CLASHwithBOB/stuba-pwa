import type { CHANNEL_TYPE } from 'src/enums/channel-type';
import type { USER_STATUS } from 'src/enums/user-status';

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  nickname: string;
  email: string;
  status: USER_STATUS;
  taggedNotificationsOnly: boolean;
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

export interface ChannelWithMembers extends Channel {
  members: User[];
}

export interface ChannelWithMembersWithMessages extends ChannelWithMembers {
  messages: MessageWithUser[];
}
