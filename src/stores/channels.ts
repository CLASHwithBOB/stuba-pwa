import { defineStore } from 'pinia';
import { api } from 'src/api/api';
import type { ChannelWithMembers, ChannelWithMembersWithMessages } from 'src/types/models';
import { ref } from 'vue';

export const useChannels = defineStore('channels', () => {
  const channels = ref<ChannelWithMembers[] | null>([]);
  const currentChannel = ref<ChannelWithMembersWithMessages | null>(null);

  async function loadChannels() {
    const res = await api.channels.getAll();
    if (res) channels.value = res;
  }

  async function loadChannel(id: number) {
    const res = await api.channels.get(id);
    if (res) currentChannel.value = res;
  }

  function resetCurrentChannel() {
    currentChannel.value = null;
  }

  return {
    channels,
    currentChannel,
    loadChannel,
    loadChannels,
    resetCurrentChannel,
  };
});
