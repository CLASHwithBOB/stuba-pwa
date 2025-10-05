<script setup lang="ts">
import { useQuasar } from 'quasar';
import ChatItem from 'src/components/ChatItem.vue';
import CommandLine from 'src/components/CommandLine.vue';
import { computed, ref } from 'vue';

const $q = useQuasar();

const selectedUser = ref<string | null>(null);

const isDesktop = computed(() => $q.screen.width >= 830);
const mobileView = computed(() => (selectedUser.value ? 'chat' : 'list'));

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

        <CommandLine />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row no-wrap full-height">
        <q-page
          v-if="isDesktop || mobileView === 'list'"
          class="bg-grey-2"
          :class="!isDesktop && 'col'"
          :style="isDesktop && 'width:300px'"
        >
          <q-scroll-area class="fit">
            <q-list>
              <ChatItem
                v-for="(user, index) in users"
                :key="index"
                :user="{ name: user.name, isOnline: index % 2 === 0 }"
                @click="selectedUser = user.name"
              >
                {{ user.name }}
              </ChatItem>
            </q-list>
          </q-scroll-area>
        </q-page>

        <router-view v-slot="{ Component }">
          <component :is="Component" :selectedUser :isDesktop :mobileView />
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>
