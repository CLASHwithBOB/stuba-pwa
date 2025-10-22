import { defineStore } from 'pinia';
import { api } from 'src/api/api';
import type { Channel } from 'src/types/models';
import { ref } from 'vue';

export const useChannel = defineStore('channel', () => {
  const channels = ref<Channel[] | null>([]);
  const currentChannel = ref<Channel | null>(null);

  async function loadChannels() {
    const res = await api.channels.getAll();
    if (res) channels.value = res;
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

  return { channels, currentChannel, loadChannels, setCurrentChannel };
});
