<script setup lang="ts">
import { COMMANDS } from 'src/constants/commands';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <q-dialog v-model="model">
    <q-card class="q-ma-sm" style="max-width: 600px; width: 100%">
      <q-card-section class="text-h6 text-primary"> Command Reference </q-card-section>

      <q-separator class="q-my-sm q-mx-md" />

      <q-card-section>
        <q-list class="rounded-borders" dense bordered>
          <q-item class="q-my-xs" v-for="cmd in COMMANDS" :key="cmd.verb">
            <q-item-section>
              <span class="text-bold text-primary">{{ cmd.usage }}</span>
              <p class="text-caption text-grey-7">{{ cmd.description }}</p>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator class="q-my-sm q-mx-md" />

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="model = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
