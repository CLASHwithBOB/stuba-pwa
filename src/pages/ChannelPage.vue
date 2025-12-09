<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { api } from 'src/api/api';
import ChatBubble from 'src/components/chat/ChatBubble.vue';
import ChatInput from 'src/components/chat/ChatInput.vue';
import type { TypingUser } from 'src/components/chat/TypingIndicator.vue';
import TypingIndicator from 'src/components/chat/TypingIndicator.vue';
import { USER_STATUS } from 'src/enums/user-status';
import { socket } from 'src/services/socket';
import { useAuth } from 'src/stores/auth';
import { useChannels } from 'src/stores/channels';
import type { Message, MessageWithUser } from 'src/types/models';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

defineProps<{ isDesktop: boolean }>();

const typingUsers = ref<TypingUser[]>([]);
const channelsStore = useChannels();
const { loadChannel } = channelsStore;
const { currentChannel } = storeToRefs(channelsStore);
const { user } = useAuth();

const messages = ref<MessageWithUser[]>([]);
const input = ref('');
const infiniteScroll = ref();

async function onLoad(index: number, done: (stop?: boolean) => void) {
  if (!currentChannel.value) {
    done(true);
    return;
  }

  const res = await api.messages.paginate({
    channelId: currentChannel.value.id,
    beforeId: messages.value[0]?.id,
  });

  if (!res || res.length === 0) {
    done(true);
    return;
  }

  const newMessages: MessageWithUser[] = [];
  res.forEach((msg) => {
    const member = currentChannel.value?.members.find((m) => m.id === msg.userId);
    if (!member) return;
    newMessages.push({ ...msg, user: member });
  });

  const wasEmpty = messages.value.length === 0;
  messages.value = [...newMessages, ...messages.value];

  if (wasEmpty) {
    await nextTick(() => {
      scrollToBottom('auto');
    });
  }

  done();
}

function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
  if (infiniteScroll.value) {
    const el = infiniteScroll.value.$el as HTMLElement;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior });

      if (behavior === 'auto') {
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 0);
      }
    }
  }
}

onMounted(async () => {
  await loadMessages();

  socket.on('typing', ({ channelId, text, userId }) => {
    if (channelId !== currentChannel.value?.id) return;
    if (user!.id === userId) return;

    typingUsers.value = typingUsers.value.filter((u) => u.id !== userId);
    typingUsers.value.push({
      id: userId,
      nickname: currentChannel.value?.members.find((m) => m.id === userId)?.nickname || 'Unknown',
      message: text,
    });
  });

  socket.on('message', async (message: Message) => {
    if (message.channelId !== currentChannel.value?.id) return;
    if (user && (user.status === USER_STATUS.DND || user.status === USER_STATUS.OFFLINE)) return;

    const member = currentChannel.value?.members.find((m) => m.id === message.userId);
    if (!member) return;

    messages.value.push({ ...message, user: member });

    await nextTick(() => {
      scrollToBottom();
    });
  });

  socket.on('user-updated', async (userId) => {
    if (currentChannel.value?.members.some((m) => m.id === userId)) {
      await loadChannel(currentChannel.value.id);
      await loadMessages();
    }
  });
});

onUnmounted(() => {
  socket.off('typing');
  socket.off('message');
});

async function loadMessages() {
  messages.value = [];
  if (currentChannel.value) {
    const initialMessages: MessageWithUser[] = [];
    currentChannel.value.messages?.forEach((msg) => {
      const member = currentChannel.value?.members.find((m) => m.id === msg.userId);
      if (!member) return;
      initialMessages.push({ ...msg, user: member });
    });
    messages.value = initialMessages;
  }

  if (infiniteScroll.value) {
    infiniteScroll.value.resume();
  }

  await nextTick(() => {
    scrollToBottom('auto');
  });
}

onBeforeRouteUpdate(async (to) => {
  const channelId = Number(to.params.channelId);
  await loadChannel(channelId);
  await loadMessages();
  socket.emit('join-channel', channelId);
});
</script>

<template>
  <q-page
    v-if="user"
    class="col chat-page"
    style="display: flex; flex-direction: column; height: 100%; overflow: hidden"
  >
    <div class="col" style="overflow: hidden; display: flex; flex-direction: column; min-height: 0">
      <q-infinite-scroll ref="infiniteScroll" @load="onLoad" reverse class="col scroll">
        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>

        <div v-for="message in messages" :key="message.id" class="q-px-sm q-pt-sm">
          <ChatBubble :message="message" />
        </div>
      </q-infinite-scroll>
    </div>

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
