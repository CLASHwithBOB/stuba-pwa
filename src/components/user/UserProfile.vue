<script setup lang="ts">
import type { User } from 'src/types/models';
import UserAvatar from './UserAvatar.vue';

defineProps<{ user: User }>();
</script>

<template>
  <div class="user-profile row items-center q-pa-sm cursor-pointer">
    <UserAvatar :nickname="user.nickname" :avatar="user.avatar ?? ''" :status="user.status" />

    <div style="flex: 1">
      <div class="text-weight-medium">{{ user.nickname }}</div>
    </div>

    <q-icon class="q-ml-sm" name="expand_more" size="16px" />
  </div>
</template>
<style lang="sass" scoped>
.user-profile
  background-color: #e6ebf5;
  height: 56px;


.user-profile:hover
  background-color: $gray-300
</style>
