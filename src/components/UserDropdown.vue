<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useAuth } from 'src/stores/auth';
import { ref } from 'vue';
import UserProfile from './UserProfile.vue';
import UserSettings from './UserSettings.vue';

const $q = useQuasar();
const { user } = useAuth();

const showDropdown = ref(false);
const profileRef = ref();
const settingsRef = ref();

function handleLogout() {
  $q.notify({
    message: 'Logging out...',
    color: 'primary',
    position: 'top',
    timeout: 2000,
  });
  showDropdown.value = false;
}

function handleSettings() {
  showDropdown.value = false;
  if (settingsRef.value) {
    settingsRef.value.showDialog = true;
  }
}
</script>

<template>
  <div
    v-if="user"
    class="user-profile-content"
    ref="profileRef"
    style="width: 100%; position: relative"
  >
    <UserProfile :name="user.nickname" :avatar="false || ''" :status="user.status" />
  </div>

  <q-menu v-model="showDropdown" :target="profileRef" anchor="top end" self="bottom end">
    <q-list style="width: 200px">
      <q-item class="dropdown-item" v-close-popup clickable @click="handleLogout">
        <q-item-section avatar>
          <q-icon name="logout" color="negative" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-negative">Logout</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="dropdown-item" v-close-popup clickable @click="handleSettings">
        <q-item-section avatar>
          <q-icon name="settings" color="grey-7" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>

  <UserSettings ref="settingsRef" />
</template>
<style scoped>
.dropdown-item:hover {
  background-color: #c3ccdb;
}
</style>
