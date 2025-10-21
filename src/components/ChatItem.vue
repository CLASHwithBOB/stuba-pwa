<script setup lang="ts">
defineProps<{
  channel: {
    name: string;
  };
}>();
</script>

<template>
  <q-item class="text-unselectable" v-ripple clickable @click="$emit('click')">
    <q-item-section avatar>
      <q-avatar>
        <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
    </q-item-section>

    <q-item-section class="column message-grid">
      <q-item-label class="text-ellipsis">
        {{ channel.name }}
      </q-item-label>

      <q-item-label class="text-ellipsis" caption>
        Secondary line text.Secondary line text.Secondary line text.Secondary line text.Secondary
        line text.
      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>13:27</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.message-grid {
  display: grid;
  gap: 2px;
  padding-top: 2px;
  justify-content: start;
}
</style>
