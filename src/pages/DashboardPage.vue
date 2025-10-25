<script setup lang="ts">
import ChatInput from 'src/components/chat/ChatInput.vue';
import { ref } from 'vue';

defineProps<{
  isDesktop: boolean;
}>();

const input = ref('');
</script>

<template>
  <q-page class="col chat-page" v-if="isDesktop" style="display: flex; flex-direction: column">
    <div class="col"></div>
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
