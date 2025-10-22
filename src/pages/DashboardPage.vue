<script setup lang="ts">
import ChatInput from 'src/components/ChatInput.vue';
import { useChannel } from 'src/stores/channels';
import { onMounted, ref } from 'vue';

defineProps<{
  isDesktop: boolean;
}>();

const channelStore = useChannel();

onMounted(() => channelStore.setCurrentChannel(null));

const input = ref('');
</script>

<template>
  <q-page class="col" v-if="isDesktop" style="display: flex; flex-direction: column">
    <div class="col"></div>
    <div class="q-pa-sm flex items-end" style="background-color: #2c3e50">
      <ChatInput v-model="input" />
      <q-btn class="q-ml-sm" rounded outlined icon="send" style="background-color: #5dade2" />
    </div>
  </q-page>
</template>
