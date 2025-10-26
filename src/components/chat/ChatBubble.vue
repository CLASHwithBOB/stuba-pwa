<script setup lang="ts">
withDefaults(
  defineProps<{
    user: { nickname: string };
    text: string[];
    sent?: boolean;
    highlight?: boolean;
    showAvatar?: boolean;
    showName?: boolean;
    showStamp?: boolean;
  }>(),
  {
    showAvatar: true,
    showName: true,
    showStamp: true,
  },
);
</script>
<template>
  <q-chat-message
    :text
    :sent
    text-color="white"
    :bg-color="highlight ? 'info' : 'primary'"
    :class="{ 'highlighted-message': highlight }"
  >
    <template v-if="showName" v-slot:name>{{ user.nickname }}</template>
    <template v-if="showStamp" v-slot:stamp>7 minutes ago</template>
    <template v-if="showAvatar" v-slot:avatar>
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
