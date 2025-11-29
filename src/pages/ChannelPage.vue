<script setup lang="ts">
import ChatBubble from 'src/components/chat/ChatBubble.vue';
import ChatInput from 'src/components/chat/ChatInput.vue';
import type { TypingUser } from 'src/components/chat/TypingIndicator.vue';
import TypingIndicator from 'src/components/chat/TypingIndicator.vue';
import { socket } from 'src/services/socket';
import { useAuth } from 'src/stores/auth';
import { useChannels } from 'src/stores/channels';
import type { Message, MessageWithUser } from 'src/types/models';
import { onMounted, onUnmounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

defineProps<{ isDesktop: boolean }>();

const route = useRoute();
const typingUsers = ref<TypingUser[]>([]);
const { loadChannel, currentChannel } = useChannels();
const { user } = useAuth();

const messages = ref<MessageWithUser[]>([]);
const input = ref('');
const scrollArea = ref();

function scrollToBottom() {
  requestAnimationFrame(() => {
    const area = scrollArea.value;
    if (area) {
      const { verticalSize } = area.getScroll();
      area.setScrollPosition('vertical', verticalSize, 300);
    }
  });
}

onMounted(() => {
  currentChannel?.messages.forEach((msg) => {
    const member = currentChannel?.members.find((m) => m.id === msg.userId);
    if (!member) return;
    messages.value.push({ ...msg, user: member });
  });

  scrollToBottom();

  socket.emit('join-channel', Number(route.params.channelId));

  socket.on('typing', ({ channelId, text, userId }) => {
    if (channelId !== Number(route.params.channelId)) return;
    if (user!.id === userId) return;

    typingUsers.value = typingUsers.value.filter((u) => u.id !== userId);
    typingUsers.value.push({
      id: userId,
      nickname: currentChannel?.members.find((m) => m.id === userId)?.nickname || 'Unknown',
      message: text,
    });
  });

  socket.on('message', (message: Message) => {
    if (message.channelId !== Number(route.params.channelId)) return;

    const member = currentChannel?.members.find((m) => m.id === message.userId);
    if (!member) return;

    messages.value.push({ ...message, user: member });
    scrollToBottom();
  });
});

onUnmounted(() => {
  socket.emit('leave-channel', Number(route.params.channelId));
  socket.off('typing');
  socket.off('message');
});

onBeforeRouteUpdate(async (to) => {
  const channelId = Number(to.params.channelId);
  await loadChannel(channelId);
  socket.emit('join-channel', channelId);
  requestAnimationFrame(scrollToBottom);
});
</script>

<template>
  <q-page v-if="user" class="col chat-page" style="display: flex; flex-direction: column">
    <q-scroll-area
      ref="scrollArea"
      class="q-px-sm q-pt-sm"
      style="height: 100%; width: 100%; max-height: 100%"
    >
      <ChatBubble
        v-for="message in messages"
        :key="message.id"
        :sent="message.userId === user?.id"
        :user="{ nickname: message.user.nickname, avatar: message.user.avatar || '' }"
        :text="[message.content]"
        :highlight="
          !(message.userId === user?.id) && message.content.includes(`@${user?.nickname}`)
        "
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
