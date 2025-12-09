<script setup lang="ts">
import { timeAgo } from 'src/lib/date';
import { useAuth } from 'src/stores/auth';
import type { MessageWithUser } from 'src/types/models';
import UserAvatar from '../user/UserAvatar.vue';

const props = defineProps<{
  message: MessageWithUser;
}>();

const { user } = useAuth();

const sent = props.message.userId === user?.id;
const highlight = !sent && props.message.content.includes(`@${user?.nickname}`);
</script>
<template>
  <q-chat-message
    :text="[message.content]"
    :sent
    text-color="white"
    :bg-color="highlight ? 'info' : 'primary'"
    :class="{ 'highlighted-message': highlight }"
  >
    <template v-slot:name>{{ message.user.nickname }}</template>
    <template v-slot:stamp>{{ timeAgo(message.createdAt) }}</template>
    <template v-slot:avatar>
      <user-avatar
        :nickname="message.user.nickname"
        :avatar="message.user.avatar ?? ''"
        :status="message.user.status"
      />
    </template>
  </q-chat-message>
</template>

<style lang="sass" scoped>
.highlighted-message :deep(.q-message-text)
  font-weight: bold
</style>
