<script setup lang="ts">
defineProps<{
  user: { nickname: string };
  text: string[];
  sent?: boolean;
  highlight?: boolean;
}>();
</script>
<template>
  <q-chat-message
    :text
    :sent
    text-color="white"
    :bg-color="highlight ? 'positive' : 'primary'"
    :class="{ 'highlighted-message': highlight }"
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

<style lang="sass" scoped>
.highlighted-message :deep(.q-message-text)
  font-weight: bold
</style>
