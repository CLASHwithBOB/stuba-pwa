<script setup lang="ts">
defineProps<{
  user: { nickname: string };
  text: string[];
  sent?: boolean;
}>();
</script>
<template>
  <q-chat-message
    :text
    :sent
    :text-color="sent ? 'white' : 'black'"
    :bg-color="sent ? 'primary' : 'amber'"
  >
    <template v-slot:name>{{ user.nickname }}</template>
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
