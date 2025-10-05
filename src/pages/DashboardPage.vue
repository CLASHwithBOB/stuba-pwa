<script setup lang="ts">
defineProps<{
  selectedUser: string | null;
  isDesktop: boolean;
  mobileView: 'chat' | 'list';
}>();
</script>

<template>
  <q-page class="col bg-white column" v-if="isDesktop || mobileView === 'chat'">
    <div class="col scroll q-pa-md">
      <p v-if="selectedUser">Chat with {{ selectedUser }}</p>
      <p v-else>Select a chat</p>
    </div>

    <div class="bg-orange q-pa-sm">Chat input here</div>
  </q-page>
</template>
