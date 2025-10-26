<script setup lang="ts">
defineProps<{
  user: { nickname: string };
  text: string[];
}>();
</script>

<template>
  <q-chat-message :text text-color="white" bg-color="primary" />
</template>
