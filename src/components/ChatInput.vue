<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue', 'send']);

const localValue = ref(props.modelValue);

watch(localValue, (val) => emit('update:modelValue', val));

const inputRef = ref<HTMLElement | null>(null);

function scrollToBottom() {
  if (!inputRef.value) return;
  inputRef.value.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <div class="col-grow" style="border-radius: 15px; overflow: hidden">
    <q-input
      v-model="localValue"
      ref="inputRef"
      @update:model-value="scrollToBottom"
      autogrow
      borderless
      dense
      placeholder="Type a message..."
      style="overflow-y: auto; background-color: #3498db; padding-left: 15px"
      input-style="max-height: 150px; color: #ecf0f1; font-size: 16px; overflow-y: auto;"
    >
    </q-input>
  </div>
</template>
