<script setup lang="ts">
import type { User } from 'src/types/models';
import UserAvatar from './UserAvatar.vue';

defineProps<{ user: User }>();
</script>

<template>
  <div
    class="user-profile row items-center q-pa-sm cursor-pointer clickable-area"
    style="background-color: #2c2f33; height: 56px"
  >
    <UserAvatar :user />

    <div class="user-info" style="flex: 1; min-width: 0">
      <div class="text-white text-weight-medium">{{ user.nickname }}</div>
    </div>

    <q-icon class="q-ml-sm" name="expand_more" color="white" size="16px" />
  </div>
</template>
<style scoped>
.clickable-area:hover {
  background-color: #3c4043;
}
</style>
