<script setup lang="ts">
import { ref } from 'vue';
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

const showJoinDialog = ref(false);
const showCreateTypeDialog = ref(false);
const showCreateNameDialog = ref(false);
const showDeleteDialog = ref(false);

const joinChannelCode = ref('');
const channelType = ref('public');
const channelName = ref('');

function handleAction(action: string) {
  switch (action) {
    case 'leave':
      onLeave();
      break;
    case 'delete':
      showDeleteDialog.value = true;
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

function onJoinChannel() {
  joinChannelCode.value = '';
  showJoinDialog.value = true;
}

function handleJoinChannel() {
  if (joinChannelCode.value) {
    $q.notify({
      message: `Joining channel: ${joinChannelCode.value}`,
      color: 'positive',
      position: 'top',
      timeout: 2000,
    });
    showJoinDialog.value = false;
  }
}

function onCreateChannel() {
  channelType.value = 'public';
  showCreateTypeDialog.value = true;
}

function handleChannelTypeSelected() {
  showCreateTypeDialog.value = false;
  channelName.value = '';
  showCreateNameDialog.value = true;
}

function handleCreateChannel() {
  if (channelName.value) {
    $q.notify({
      message: `Creating ${channelType.value} channel: ${channelName.value}`,
      color: 'positive',
      position: 'top',
      timeout: 2000,
    });
    showCreateNameDialog.value = false;
  }
}

function handleDeleteChannel() {
  $q.notify({
    message: 'Deleted successfully',
    color: 'negative',
    position: 'top',
    timeout: 3000,
  });
  showDeleteDialog.value = false;
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
      <q-item class="q-pa-sm" v-close-popup clickable @click="onCreateChannel">
        <q-item-section avatar>
          <q-icon name="add" color="primary" />
        </q-item-section>
        <q-item-section class="text-primary"> Create Channel </q-item-section>
      </q-item>

      <q-item class="q-pa-sm" v-close-popup clickable @click="onJoinChannel">
        <q-item-section avatar>
          <q-icon name="login" color="primary" />
        </q-item-section>
        <q-item-section class="text-primary"> Join Channel </q-item-section>
      </q-item>

      <q-separator />

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

  <q-dialog v-model="showJoinDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Join Channel</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="joinChannelCode"
          autofocus
          dense
          label="Channel code or name"
          @keyup.enter="handleJoinChannel"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="Cancel" color="grey" />
        <q-btn flat label="Join" color="primary" @click="handleJoinChannel" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showCreateTypeDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create Channel</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2 q-mb-md">Choose channel type:</div>
        <q-option-group
          v-model="channelType"
          :options="[
            { label: 'Create Public Channel', value: 'public' },
            { label: 'Create Private Channel', value: 'private' },
          ]"
          color="primary"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="Cancel" color="grey" />
        <q-btn flat label="Next" color="primary" @click="handleChannelTypeSelected" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showCreateNameDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Create {{ channelType.charAt(0).toUpperCase() + channelType.slice(1) }} Channel
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="channelName"
          autofocus
          dense
          label="Channel name"
          @keyup.enter="handleCreateChannel"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="Cancel" color="grey" />
        <q-btn flat label="Create" color="primary" @click="handleCreateChannel" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showDeleteDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Confirm Delete</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Are you sure you want to delete? This action cannot be undone.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="Cancel" color="grey" />
        <q-btn flat label="Delete" color="negative" @click="handleDeleteChannel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.dropdown-menu > :nth-child(2) {
  position: absolute;
  top: 4.5px;
  left: 4.5px;
}
</style>
