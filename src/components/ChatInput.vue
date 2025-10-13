<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue', 'send']);

const localValue = ref(props.modelValue);

watch(localValue, (val) => emit('update:modelValue', val));

const inputRef = ref<HTMLElement | null>(null);

function scrollToBottom() {
  if (!inputRef.value) return;
  inputRef.value.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <q-input
    v-model="localValue"
    ref="inputRef"
    @update:model-value="scrollToBottom"
    autogrow
    outlined
    rounded
    placeholder="Type a message..."
    style="max-height: 200px; overflow-y: auto"
  >
    <template v-slot:append>
      <q-btn
        flat
        round
        dense
        color="primary"
        icon="send"
        style="position: absolute; bottom: 2px; right: 2px"
      />
    </template>
  </q-input>
</template>
