<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

defineProps<{
  selectedUser: string | null;
  isDesktop: boolean;
  mobileView: 'chat' | 'list';
}>();
</script>

<template>
  <q-page v-if="isDesktop || mobileView === 'chat'" class="col bg-white column">
    <div class="col scroll q-pa-md">
      <p v-if="selectedUser">Chat with {{ selectedUser }}</p>
      <p v-else>Select a chat</p>
    </div>

    <div class="bg-orange q-pa-sm">Chat input here</div>
  </q-page>
</template>
