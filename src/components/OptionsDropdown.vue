<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = defineProps<{ isAdmin: boolean }>();

const options = props.isAdmin
  ? {
      label: 'Delete',
      icon: 'delete',
      color: 'negative',
      action: 'delete',
    }
  : {
      label: 'Leave',
      icon: 'exit_to_app',
      color: 'primary',
      action: 'leave',
    };

function handleAction(action: string) {
  switch (action) {
    case 'leave':
      onLeave();
      break;
    case 'delete':
      onDelete();
      break;
  }
}

function onLeave() {
  $q.notify({
    message: 'Leaving...',
    color: 'primary',
    position: 'top',
    timeout: 2000,
  });
}

function onDelete() {
  $q.dialog({
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete? This action cannot be undone.',
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
    },
    cancel: {
      label: 'Cancel',
      color: 'grey',
    },
  }).onOk(() => {
    $q.notify({
      message: 'Deleted successfully',
      color: 'negative',
      position: 'top',
      timeout: 3000,
    });
  });
}
</script>

<template>
  <q-btn-dropdown
    class="q-mr-md dropdown-menu"
    flat
    round
    dense
    icon="more_vert"
    dropdown-icon="none"
    style="position: relative"
  >
    <q-list style="min-width: 140px">
      <q-item
        class="q-pa-sm"
        v-close-popup
        :key="options.action"
        clickable
        @click="handleAction(options.action)"
      >
        <q-item-section avatar>
          <q-icon :name="options.icon" :color="options.color" />
        </q-item-section>
        <q-item-section :class="`text-${options.color}`">
          {{ options.label }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<style scoped>
.dropdown-menu > :nth-child(2) {
  position: absolute;
  top: 4.5px;
  left: 4.5px;
}
</style>
