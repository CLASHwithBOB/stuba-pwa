<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/api/api';
import { STATUSES } from 'src/constants/statuses';
import { RESPONSE_TYPE } from 'src/enums/response';
import { USER_STATUS } from 'src/enums/user-status';
import { useAuth } from 'src/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const { user } = useAuth();

const showDialog = ref(false);
const editedNickname = ref(user?.nickname);
const editedFirstName = ref(user?.firstName);
const editedLastName = ref(user?.lastName);
const editedAvatar = ref(user?.avatar);
const editedUserStatus = ref(user?.status);
const editedTaggedNotificationsOnly = ref(user?.taggedNotificationsOnly);

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

async function handleSave() {
  const res = await api.user.update({
    nickname: editedNickname.value,
    firstName: editedFirstName.value,
    lastName: editedLastName.value,
    avatar: editedAvatar.value,
    status: editedUserStatus.value,
    taggedNotificationsOnly: editedTaggedNotificationsOnly.value,
  });

  if (res.type === RESPONSE_TYPE.REDIRECT) {
    router.go(0);
    return;
  }

  $q.notify(res.notification);
}

defineExpose({
  showDialog,
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
              <img v-if="editedAvatar" :src="editedAvatar" alt="User avatar" />
              <span v-else>{{ editedNickname?.charAt(0).toUpperCase() }}</span>
            </q-avatar>
            <div class="col">
              <q-input v-model="editedAvatar" dense outlined label="Avatar URL" />
            </div>
          </div>
        </div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Username</div>
          <q-input
            v-model="editedNickname"
            dense
            outlined
            label="Username"
            :rules="[(val) => (val && val.length > 0) || 'Username is required']"
          />
        </div>

        <div class="q-mb-md row q-gutter-md">
          <div class="col">
            <div class="text-subtitle2 q-mb-sm">First Name</div>
            <q-input v-model="editedFirstName" dense outlined label="First Name" />
          </div>
          <div class="col">
            <div class="text-subtitle2 q-mb-sm">Last Name</div>
            <q-input v-model="editedLastName" dense outlined label="Last Name" />
          </div>
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

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Notifications</div>
          <q-toggle
            v-model="editedTaggedNotificationsOnly"
            label="Notify only when mentioned (@nickname)"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="Cancel" color="grey" @click="showDialog = false" />
        <q-btn flat label="Save" color="primary" @click="handleSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
