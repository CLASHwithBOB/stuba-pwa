<script setup lang="ts">
defineProps<{
  user: { name: string; isOnline: boolean };
}>();

const randomNum = Math.round(Math.random() * 20);
</script>

<template>
  <q-item clickable v-ripple @click="$emit('click')" class="text-unselectable">
    <q-item-section top avatar>
      <q-avatar>
        <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        <!-- TODO [PWA-22]: Make different colors based on statuses: online, dnd, offline -->
        <q-icon
          v-if="user.isOnline"
          name="circle"
          class="absolute-bottom-right"
          size="12px"
          color="green-14"
        />
      </q-avatar>
    </q-item-section>

    <q-item-section class="column message-grid">
      <q-item-label class="text-ellipsis">
        {{ user.name }} Lorem ipsum lorem pasdka sndasd nsam,d nas
      </q-item-label>

      <q-item-label caption class="text-ellipsis">
        Secondary line text. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      </q-item-label>
    </q-item-section>

    <q-item-section side class="column justify-between items-end">
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
