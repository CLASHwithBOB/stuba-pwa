<script setup lang="ts">
const {
  name,
  color = '#1976d2',
  size = '44px',
} = defineProps<{
  name: string;
  color?: string;
  size?: string;
}>();
</script>

<template>
  <div role="img">
    <div class="icon-inner" :style="{ background: color }">
      <q-icon class="text-white" :name="name" :size="size" />
    </div>
  </div>
</template>

<style scoped>
.icon-inner {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: visible;
}
</style>
