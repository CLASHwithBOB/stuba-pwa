<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { api } from 'src/api/api';
import { CHANNEL_TYPE } from 'src/enums/channel-type';
import { RESPONSE_TYPE } from 'src/enums/response';
import { useAuth } from 'src/stores/auth';
import { useChannels } from 'src/stores/channels';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useAuth();
const { currentChannel } = storeToRefs(useChannels());

const isAdmin = computed(
  () => currentChannel.value !== null && user?.id === currentChannel.value?.userId,
);
const options = computed(() =>
  isAdmin.value
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
      },
);

const showCreateTypeDialog = ref(false);
const showCreateNameDialog = ref(false);
const showDeleteDialog = ref(false);

const channelType = ref<CHANNEL_TYPE>(CHANNEL_TYPE.PUBLIC);
const channelName = ref('');

async function handleAction(action: string) {
  switch (action) {
    case 'leave':
      await onLeave();
      break;
    case 'delete':
      showDeleteDialog.value = true;
      break;
  }
}

async function onLeave() {
  if (!currentChannel.value) return;

  const res = await api.members.cancel(currentChannel.value.id);
  if (res.type === RESPONSE_TYPE.REDIRECT) await router.push(res.url);
  router.go(0);
  showDeleteDialog.value = false;
}

function onCreateChannel() {
  channelType.value = CHANNEL_TYPE.PUBLIC;
  showCreateTypeDialog.value = true;
}

function handleChannelTypeSelected() {
  showCreateTypeDialog.value = false;
  channelName.value = '';
  showCreateNameDialog.value = true;
}

async function handleCreateChannel() {
  if (!channelName.value || !channelType.value) return;

  const res = await api.channels.join({ name: channelName.value, type: channelType.value });
  if (res.type === RESPONSE_TYPE.REDIRECT) await router.push(res.url);
  router.go(0);
  showCreateNameDialog.value = false;
}

async function handleDeleteChannel() {
  if (!currentChannel.value) return;

  const res = await api.channels.quit(currentChannel.value.id);
  if (res.type === RESPONSE_TYPE.REDIRECT) await router.push(res.url);
  router.go(0);
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

      <q-separator v-if="!!currentChannel" />

      <q-item
        v-if="!!currentChannel"
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
<style lang="sass" scoped>
.dropdown-menu > :nth-child(2)
  position: absolute
  top: 4.5px
  left: 4.5px
</style>
