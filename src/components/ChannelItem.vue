<script setup lang="ts">
import type { Channel } from 'src/types/models';
import { useRouter } from 'vue-router';

defineProps<{
  channel: Channel;
  highlight?: boolean;
}>();

const router = useRouter();
</script>

<template>
  <q-item
    class="text-unselectable"
    :class="{ 'highlighted-item': highlight }"
    v-ripple
    clickable
    @click="router.push(`/channels/${channel.id}`)"
  >
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

.highlighted-item .q-item__label {
  font-weight: bold;
}
</style>
