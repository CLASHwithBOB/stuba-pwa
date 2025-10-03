<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const selectedUser = ref<string | null>(null);

const isDesktop = computed(() => $q.screen.width >= 830);
const mobileView = computed(() => (selectedUser.value ? 'chat' : 'list'));
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
        <q-toolbar-title>PingMe</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row no-wrap full-height">
        <q-page
          v-if="isDesktop || mobileView === 'list'"
          class="bg-grey-2"
          :class="isDesktop ? 'col-auto' : 'col'"
          :style="isDesktop ? 'width:300px' : ''"
        >
          <q-list>
            <q-item clickable v-ripple @click="selectedUser = 'User 1'">
              <q-item-section>User 1</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="selectedUser = 'User 2'">
              <q-item-section>User 2</q-item-section>
            </q-item>
          </q-list>
        </q-page>

        <q-page v-if="isDesktop || mobileView === 'chat'" class="col bg-white column">
          <div class="col scroll q-pa-md">
            <p v-if="selectedUser">Chat with {{ selectedUser }}</p>
            <p v-else>Select a chat</p>
          </div>

          <div class="bg-orange q-pa-sm">Chat input here</div>
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>
