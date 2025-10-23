<script setup lang="ts">
import { useQuasar } from 'quasar';
import ChannelItem from 'src/components/ChannelItem.vue';
import OptionsDropdown from 'src/components/OptionsDropdown.vue';
import UserDropdown from 'src/components/UserDropdown.vue';
import { useChannel } from 'src/stores/channels';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const channelStore = useChannel();

const selectedChannelId = computed(() => route.params?.channelId);
const isDesktop = computed(() => $q.screen.width >= 830);
const mobileView = computed(() => (selectedChannelId.value ? 'chat' : 'list'));

onMounted(async () => {
  if (!channelStore.channels?.length) await channelStore.loadChannels();
});

const channels = ref([
  { id: 1, name: 'Channel 1' },
  { id: 2, name: 'Channel 2' },
  { id: 3, name: 'Channel 3' },
  { id: 4, name: 'Channel 4' },
  { id: 5, name: 'Channel 5' },
  { id: 6, name: 'Channel 6' },
  { id: 7, name: 'Channel 7' },
  { id: 8, name: 'Channel 8' },
  { id: 9, name: 'Channel 9' },
  { id: 10, name: 'Channel 10' },
  { id: 11, name: 'Channel 11' },
  { id: 12, name: 'Channel 12' },
  { id: 13, name: 'Channel 13' },
  { id: 14, name: 'Channel 14' },
  { id: 15, name: 'Channel 15' },
  { id: 16, name: 'Channel 16' },
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
          @click="router.push('/')"
        />
        <q-toolbar-title class="text-unselectable">PingMe</q-toolbar-title>
        <q-toolbar-title class="text-unselectable">
          {{ channelStore.currentChannel?.name }}
        </q-toolbar-title>
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
          <q-scroll-area class="col">
            <q-list>
              <ChannelItem
                v-for="channel in channels"
                :key="channel.id"
                :channel="{
                  id: channel.id,
                  name: channel.name,
                }"
              />
            </q-list>
          </q-scroll-area>

          <div>
            <UserDropdown />
          </div>
        </q-page>

        <router-view v-slot="{ Component }">
          <component :is="Component" :isDesktop />
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>
