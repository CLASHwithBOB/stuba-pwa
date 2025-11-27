<script setup lang="ts">
import ChatBubble from 'src/components/chat/ChatBubble.vue';
import ChatInput from 'src/components/chat/ChatInput.vue';
import type { TypingUser } from 'src/components/chat/TypingIndicator.vue';
import TypingIndicator from 'src/components/chat/TypingIndicator.vue';
import { socket } from 'src/services/socket';
import { useAuth } from 'src/stores/auth';
import { useChannels } from 'src/stores/channels';
import { onMounted, onUnmounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

defineProps<{
  isDesktop: boolean;
}>();

const route = useRoute();
const typingUsers = ref<TypingUser[]>([]);
const { loadChannel, currentChannel } = useChannels();
const { user } = useAuth();

onMounted(() => {
  socket.emit('join-channel', Number(route.params.channelId));

  socket.on('typing', ({ channelId, text, userId }) => {
    if (channelId !== Number(route.params.channelId)) return;
    if (user!.id === userId) return;

    typingUsers.value = typingUsers.value.filter((u) => u.id !== userId);
    typingUsers.value.push({
      id: userId,
      nickname:
        currentChannel?.members.find((member) => member.id === userId)?.nickname || 'Unknown',
      message: text,
    });

    console.log(typingUsers.value);
  });
});

onUnmounted(() => {
  socket.emit('leave-channel', Number(route.params.channelId));
  socket.off('typing');
});

onBeforeRouteUpdate(async (to) => {
  const channelId = Number(to.params.channelId);

  await loadChannel(channelId);
  socket.emit('join-channel', channelId);
});

const messages = ref([
  { id: 1, text: 'Hello!', user: { nickname: 'Gosho' } },
  { id: 2, text: 'Hi!', sent: true, user: { nickname: user!.nickname } },
  { id: 3, text: `Hey @${user!.nickname}, how are you doing?`, user: { nickname: 'Gosho' } },
  { id: 4, text: 'I am doing great, thanks!', sent: true, user: { nickname: user!.nickname } },
  { id: 5, text: 'Pesho, did you see the latest updates?', user: { nickname: 'Gosho' } },
]);

const input = ref('');
</script>

<template>
  <q-page v-if="user" class="col chat-page" style="display: flex; flex-direction: column">
    <q-scroll-area class="q-px-sm q-pt-sm" style="height: 100%; width: 100%; max-height: 100%">
      <ChatBubble
        v-for="message in messages"
        :key="message.id"
        :sent="!!message.sent"
        :user="{ nickname: message.user.nickname }"
        :text="[message.text]"
        :highlight="!message.sent && message.text.includes(`@${user?.nickname}`)"
      />
    </q-scroll-area>
    <div class="q-pa-sm chat-footer">
      <TypingIndicator :users="typingUsers" />
      <ChatInput v-model="input" />
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.chat-page
  background-color: $bg-chat

.chat-footer
  background-color: $bg-footer
  padding-top: 8px
  border-top: 1px solid $gray-200
</style>
