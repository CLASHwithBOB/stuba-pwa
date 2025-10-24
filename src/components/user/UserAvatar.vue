<script setup lang="ts">
import { STATUSES } from 'src/constants/statuses';
import type { User } from 'src/types/models';
import { computed } from 'vue';

const props = defineProps<{ user: User }>();

const initials = computed(() => {
  return props.user.nickname
    ?.split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
});
</script>

<template>
  <div class="avatar-container relative-position" style="width: 38px">
    <q-avatar size="32px" color="primary" text-color="white">
      <q-img v-if="user.avatar" :src="user.avatar" :alt="user.nickname" />
      <span v-else>{{ initials }}</span>
    </q-avatar>

    <div
      v-if="user.status"
      class="status-indicator absolute-bottom-right"
      :class="`bg-${STATUSES[user.status].color}`"
      style="
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid #2c2f33;
        position: absolute;
        bottom: 0px;
        right: 4px;
      "
    />
  </div>
</template>
