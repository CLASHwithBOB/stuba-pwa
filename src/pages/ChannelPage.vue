<script setup lang="ts">
import ChatBubble from 'src/components/ChatBubble.vue';
import ChatInput from 'src/components/ChatInput.vue';
import { ref } from 'vue';

defineProps<{
  isDesktop: boolean;
}>();

const messages = [
  { id: 1, text: 'Hello!', user: { nickname: 'Gosho' } },
  { id: 2, text: 'Hi!', sent: true, user: { nickname: 'Pesho' } },
];

const input = ref('');
</script>

<template>
  <q-page class="col" style="display: flex; flex-direction: column">
    <q-scroll-area class="q-px-sm q-pt-sm" style="height: 100%; width: 100%; max-height: 100%">
      <ChatBubble
        v-for="message in messages"
        :key="message.id"
        :sent="!!message.sent"
        :user="{ nickname: message.user.nickname }"
        :text="[message.text]"
      />
    </q-scroll-area>
    <div class="q-pa-sm flex items-end" style="background-color: #2c3e50">
      <ChatInput v-model="input" />
      <q-btn class="q-ml-sm" rounded outlined icon="send" style="background-color: #5dade2" />
    </div>
  </q-page>
</template>
