<script setup lang="ts">
import ChatBubble from 'src/components/chat/ChatBubble.vue';
import ChatInput from 'src/components/chat/ChatInput.vue';
import { useAuth } from 'src/stores/auth';
import { useChannels } from 'src/stores/channels';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

defineProps<{
  isDesktop: boolean;
}>();

const route = useRoute();
const { setCurrentChannel } = useChannels();
const { user } = useAuth();

watch(
  () => route.params.channelId,
  () => setCurrentChannel(Number(route.params.channelId)),
  { immediate: true },
);

const currentUserNickname = `@${user?.nickname}`;

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
        :highlight="!message.sent && message.text.includes(currentUserNickname)"
      />
    </q-scroll-area>
    <div class="q-pa-sm chat-footer">
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
