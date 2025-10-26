<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  users: { id: number; nickname: string }[];
}>();

const selectedUser = ref<{ id: number; nickname: string } | null>(null);
const popupLeft = ref(0);

const displayUsers = computed(() => props.users.slice(0, 3));

const typingVerb = computed(() => (props.users.length === 1 ? 'is' : 'are'));

function togglePreview(user: { id: number; nickname: string }, event: MouseEvent) {
  if (selectedUser.value?.id === user.id) {
    selectedUser.value = null;
  } else {
    selectedUser.value = user;
    const target = event.target as HTMLElement;
    const indicator = target.closest('.typing-indicator') as HTMLElement;
    if (indicator) {
      const indicatorRect = indicator.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      popupLeft.value = targetRect.left - indicatorRect.left;
    }
  }
}
</script>

<template>
  <div v-if="users.length" class="typing-indicator">
    <div class="typing-text">
      <span v-if="users.length > 3">{{ users.length }} people are typing</span>
      <span v-else>
        <template v-for="(user, index) in displayUsers" :key="user.id">
          <span class="nickname" @click="togglePreview(user, $event)">{{ user.nickname }}</span>
          <template v-if="index < displayUsers.length - 2">, </template>
          <template v-else-if="index === displayUsers.length - 2"> and </template>
        </template>
        {{ typingVerb }} typing
      </span>
      <div class="typing-dots">
        <span class="dot" />
        <span class="dot" />
        <span class="dot" />
      </div>
    </div>

    <div v-if="selectedUser" class="preview-popup" :style="{ left: `${popupLeft}px` }">
      <q-chat-message :text="['This is a preview message']" text-color="white" bg-color="primary" />
    </div>

    <div v-if="selectedUser" class="preview-backdrop" @click="selectedUser = null" />
  </div>
</template>

<style lang="sass" scoped>
.typing-indicator
  position: relative
  padding: 8px 15px
  margin-bottom: 4px

.typing-text
  display: flex
  align-items: center
  gap: 6px
  color: $text-secondary
  font-size: 14px

.nickname
  cursor: pointer
  font-weight: 500
  color: $text-primary
  transition: opacity 0.2s

  &:hover
    opacity: 0.7

.typing-dots
  display: flex
  gap: 3px
  align-items: center

.dot
  width: 4px
  height: 4px
  background-color: $text-secondary
  border-radius: 50%
  animation: bounce 1.4s infinite ease-in-out both

  &:nth-child(1)
    animation-delay: -0.32s
  &:nth-child(2)
    animation-delay: -0.16s

@keyframes bounce
  0%, 80%, 100%
    transform: scale(0.8)
    opacity: 0.5
  40%
    transform: scale(1)
    opacity: 1

.preview-popup
  position: absolute
  bottom: calc(100% + 8px)
  z-index: 1000

  :deep(.q-message-text:before)
    transform: rotate(180deg)
    left: 0
    bottom: -8px
    top: auto

.preview-backdrop
  position: fixed
  inset: 0
  z-index: 999
</style>
