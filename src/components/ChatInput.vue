<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ modelValue: string }>();

const inputRef = ref<HTMLElement | null>(null);
const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue);

watch(localValue, (val) => emit('update:modelValue', val));

function scrollToBottom() {
  if (!inputRef.value) return;
  inputRef.value.scrollIntoView({ behavior: 'smooth' });
}
</script>
<template>
  <q-input
    v-model="localValue"
    ref="inputRef"
    rounded
    outlined
    @update:model-value="scrollToBottom"
    autogrow
    style="max-height: 200px; overflow-y: auto"
    placeholder="Type a message..."
  />
</template>
