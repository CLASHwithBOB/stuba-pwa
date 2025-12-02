<script setup lang="ts">
import { useAuth } from 'src/stores/auth';
import type { MessageWithUser } from 'src/types/models';

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
    <template v-slot:name>{{ user?.nickname }}</template>
    <template v-slot:stamp>7 minutes ago</template>
    <template v-slot:avatar>
      <img
        class="q-message-avatar"
        src="https://cdn.quasar.dev/img/avatar4.jpg"
        :class="sent ? 'q-message-avatar--sent' : 'q-message-avatar--received'"
      />
    </template>
  </q-chat-message>
</template>

<style lang="sass" scoped>
.highlighted-message :deep(.q-message-text)
  font-weight: bold
</style>
