<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { USER_STATUS } from 'src/enums/user-status';
import { STATUSES } from 'src/constants/statuses';

interface Props {
  userName: string;
  userAvatar?: string;
  userStatus: USER_STATUS;
}

const props = withDefaults(defineProps<Props>(), {
  userAvatar: '',
});

const $q = useQuasar();

const showDialog = ref(false);
const editedUserName = ref('');
const editedUserAvatar = ref('');
const editedUserStatus = ref(USER_STATUS.ONLINE);

const statusOptions = [
  {
    label: STATUSES[USER_STATUS.ONLINE].label,
    value: USER_STATUS.ONLINE,
    color: STATUSES[USER_STATUS.ONLINE].color,
  },
  {
    label: STATUSES[USER_STATUS.DND].label,
    value: USER_STATUS.DND,
    color: STATUSES[USER_STATUS.DND].color,
  },
  {
    label: STATUSES[USER_STATUS.OFFLINE].label,
    value: USER_STATUS.OFFLINE,
    color: STATUSES[USER_STATUS.OFFLINE].color,
  },
];

function open() {
  editedUserName.value = props.userName;
  editedUserAvatar.value = props.userAvatar;
  editedUserStatus.value = props.userStatus;
  showDialog.value = true;
}

function handleSave() {
  if (!editedUserName.value.trim()) {
    $q.notify({
      message: 'Username cannot be empty',
      color: 'negative',
      position: 'top',
      timeout: 2000,
    });
    return;
  }

  $q.notify({
    message: 'Settings saved successfully',
    color: 'positive',
    position: 'top',
    timeout: 2000,
  });

  // Add your save logic here
  console.log('Settings saved:', {
    userName: editedUserName.value,
    userAvatar: editedUserAvatar.value,
    userStatus: editedUserStatus.value,
  });

  showDialog.value = false;
}

function handleCancel() {
  showDialog.value = false;
}

defineExpose({
  open,
});
</script>

<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 450px">
      <q-card-section>
        <div class="text-h6">User Settings</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Avatar</div>
          <div class="row items-center q-gutter-md">
            <q-avatar size="64px" color="primary" text-color="white">
              <img v-if="editedUserAvatar" :src="editedUserAvatar" alt="User avatar" />
              <span v-else>{{ editedUserName.charAt(0).toUpperCase() }}</span>
            </q-avatar>
            <div class="col">
              <q-input
                v-model="editedUserAvatar"
                dense
                outlined
                label="Avatar URL"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
        </div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Username</div>
          <q-input
            v-model="editedUserName"
            dense
            outlined
            label="Username"
            :rules="[(val) => (val && val.length > 0) || 'Username is required']"
          />
        </div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Status</div>
          <q-option-group
            v-model="editedUserStatus"
            :options="statusOptions"
            color="primary"
            type="radio"
          >
            <template v-slot:label="opt">
              <div class="row items-center">
                <div
                  class="q-mr-sm"
                  :style="{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: `var(--q-${opt.color})`,
                  }"
                />
                <span>{{ opt.label }}</span>
              </div>
            </template>
          </q-option-group>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="Cancel" color="grey" @click="handleCancel" />
        <q-btn flat label="Save" color="primary" @click="handleSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
