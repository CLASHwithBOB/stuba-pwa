<script setup lang="ts">
import { STATUSES } from 'src/constants/statuses';
import type { USER_STATUS } from 'src/enums/status';

defineProps<{
  user: {
    name: string;
    status: USER_STATUS;
  };
}>();

const randomNum = Math.round(Math.random() * 20);
</script>

<template>
  <q-item class="text-unselectable" v-ripple clickable @click="$emit('click')">
    <q-item-section top avatar>
      <q-avatar>
        <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        <q-icon
          class="absolute-bottom-right"
          name="circle"
          style="border: 6.5px solid #f5f5f5; border-radius: 50%"
          size="12px"
          :color="STATUSES[user.status].color"
        >
          <q-tooltip :delay="300" anchor="top middle" self="bottom middle">
            {{ STATUSES[user.status].label }}
          </q-tooltip>
        </q-icon>
      </q-avatar>
    </q-item-section>

    <q-item-section class="column message-grid">
      <q-item-label class="text-ellipsis">
        {{ user.name }} Lorem ipsum lorem pasdka sndasd nsam,d nas
      </q-item-label>

      <q-item-label class="text-ellipsis" caption>
        Secondary line text. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      </q-item-label>
    </q-item-section>

    <q-item-section class="column justify-between items-end" side>
      <q-item-label caption>13:27</q-item-label>
      <q-badge v-if="randomNum % 2" :label="randomNum" rounded />
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
