import { defineStore } from 'pinia';
import { api } from 'src/api/api';
import type { Channel } from 'src/types/models';
import { ref } from 'vue';

export const useChannels = defineStore('channels', () => {
  const channels = ref<Channel[] | null>([]);
  const currentChannel = ref<Channel | null>(null);

  async function loadChannels() {
    const res = await api.channels.getAll();
    if (res) channels.value = res;
  }

  function addChannel(channel: Channel) {
    channels.value?.unshift(channel);
  }

  function removeChannel(channelId: number) {
    if (!channels.value) return;
    channels.value = channels.value.filter((c) => c.id !== channelId);
    if (currentChannel.value?.id === channelId) {
      currentChannel.value = null;
    }
  }

  function setCurrentChannel(channelId: number | null) {
    if (!channelId) {
      currentChannel.value = null;
      return;
    }
    if (!channels.value) return;
    if (currentChannel.value?.id === channelId) return;

    currentChannel.value = channels.value.find((c) => c.id === channelId) || null;
  }

  return { channels, currentChannel, loadChannels, addChannel, removeChannel, setCurrentChannel };
});
