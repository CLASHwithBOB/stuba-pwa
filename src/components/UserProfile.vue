<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name: string;
  avatar?: string;
  status?: 'online' | 'do not disturb' | 'offline';
}

const props = withDefaults(defineProps<Props>(), {
  avatar: '',
  status: 'online',
});

const emit = defineEmits<{
  click: [];
}>();

const statusColor = computed(() => {
  switch (props.status) {
    case 'online':
      return 'positive';
    case 'do not disturb':
      return 'negative';
    case 'offline':
      return 'grey';
    default:
      return 'positive';
  }
});

const initials = computed(() => {
  return props.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
});
</script>

<template>
  <div
    class="user-profile row items-center q-pa-sm cursor-pointer clickable-area"
    @click="emit('click')"
    style="background-color: #2c2f33; height: 56px"
  >
    <div class="avatar-container relative-position">
      <q-avatar class="q-mr-sm" size="32px" color="primary" text-color="white">
        <img v-if="avatar" :src="avatar" :alt="name" />
        <span v-else>{{ initials }}</span>
      </q-avatar>

      <div class="status-indicator absolute-bottom-right" :class="`bg-${statusColor}`" />
    </div>

    <div class="user-info">
      <div class="text-white text-weight-medium">{{ name }}</div>
    </div>

    <!-- Dropdown arrow -->
    <q-icon class="q-ml-sm" name="expand_more" color="white" size="16px" />
  </div>
</template>
<style scoped>
.clickable-area:hover {
  background-color: #3c4043;
}

.avatar-container {
  position: relative;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #2c2f33;
  position: absolute;
  bottom: -2px;
  right: 2px;
}

.user-info {
  flex: 1;
  min-width: 0;
}
</style>
