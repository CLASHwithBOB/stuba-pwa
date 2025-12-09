<script setup lang="ts">
import { STATUSES } from 'src/constants/statuses';
import type { USER_STATUS } from 'src/enums/user-status';
import { computed } from 'vue';

const props = defineProps<{ nickname: string; avatar: string; status: USER_STATUS }>();

const initials = computed(() => {
  return props.nickname
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
      <q-img v-if="avatar" :src="avatar" :alt="nickname" />
      <span v-else>{{ initials }}</span>
    </q-avatar>

    <div
      v-if="status"
      class="status-indicator absolute-bottom-right"
      :class="`bg-${STATUSES[status].color}`"
    />
  </div>
</template>

<style lang="sass" scoped>
.status-indicator
  width: 12px
  height: 12px
  border-radius: 50%
  border: 2px solid #2c2f33
  position: absolute
  bottom: 0px
  right: 4px
</style>
