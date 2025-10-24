<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Password',
  },
  placeholder: {
    type: String,
    default: 'Enter your password',
  },
});

const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue);
const isVisible = ref(false);

watch(localValue, (val) => emit('update:modelValue', val));
</script>

<template>
  <div class="q-mb-sm">
    <label class="text-caption text-weight-medium q-mb-xs block">{{ label }}</label>
    <q-input
      v-model="localValue"
      outlined
      dense
      :type="isVisible ? 'text' : 'password'"
      :placeholder="placeholder"
    >
      <template #prepend>
        <q-icon name="lock" size="sm" />
      </template>
      <template #append>
        <q-icon
          class="cursor-pointer"
          size="sm"
          :name="isVisible ? 'visibility' : 'visibility_off'"
          @click="isVisible = !isVisible"
        />
      </template>
    </q-input>
  </div>
</template>
