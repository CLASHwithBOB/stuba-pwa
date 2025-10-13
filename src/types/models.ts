import type { CHANNEL_TYPE } from 'src/enums/channel-type';

export interface User {
  id: number;
  nickname: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  id: number;
  userId: number;
  name: string;
  type: CHANNEL_TYPE;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  channelId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
