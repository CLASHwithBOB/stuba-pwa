<script setup lang="ts">
import { useQuasar } from 'quasar';
import ChatItem from 'src/components/ChatItem.vue';
import { USER_STATUS } from 'src/enums/status';
import { computed, ref } from 'vue';
import OptionsDropdown from 'src/components/OptionsDropdown.vue';
import UserControlsBar from 'src/components/UserControlsBar.vue';

const $q = useQuasar();
const selectedUser = ref<string | null>(null);
const isDesktop = computed(() => $q.screen.width >= 830);
const mobileView = computed(() => (selectedUser.value ? 'chat' : 'list'));

// Current user data (this should come from your auth/state management)
const currentUser = ref({
  name: 'John Doe',
  avatar: '',
  status: USER_STATUS.ONLINE,
});

const users = ref([
  { name: 'User 1' },
  { name: 'User 2' },
  { name: 'User 3' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
  { name: 'User 4' },
]);
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="!isDesktop && mobileView === 'chat'"
          flat
          dense
          round
          icon="arrow_back"
          @click="selectedUser = null"
        />
        <q-toolbar-title class="text-unselectable">PingMe</q-toolbar-title>
        <OptionsDropdown :is-admin="true" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row no-wrap full-height">
        <q-page
          class="bg-grey-2 column"
          v-if="isDesktop || mobileView === 'list'"
          :class="!isDesktop && 'col'"
          :style="isDesktop && 'width:300px'"
        >
          <!-- Users List -->
          <q-scroll-area class="col">
            <q-list>
              <ChatItem
                v-for="(user, index) in users"
                :key="index"
                :user="{
                  name: user.name,
                  status: Object.values(USER_STATUS)[index % 3] as USER_STATUS,
                }"
                @click="selectedUser = user.name"
              >
                {{ user.name }}
              </ChatItem>
            </q-list>
          </q-scroll-area>

          <!-- User Controls Bar at bottom -->
          <div>
            <UserControlsBar
              :user-name="currentUser.name"
              :user-avatar="currentUser.avatar"
              :user-status="currentUser.status"
            />
          </div>
        </q-page>

        <router-view v-slot="{ Component }">
          <component :is="Component" :isDesktop :mobileView />
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
/* Ensure the sidebar takes full height and the footer stays at bottom */
.q-page.column {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Make sure the scroll area takes available space */
.q-scroll-area.col {
  flex: 1;
  min-height: 0;
}
</style>
