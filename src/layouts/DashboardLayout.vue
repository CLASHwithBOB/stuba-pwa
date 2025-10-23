<script setup lang="ts">
import { useQuasar } from 'quasar';
import ChannelItem from 'src/components/ChannelItem.vue';
import OptionsDropdown from 'src/components/OptionsDropdown.vue';
import UserDropdown from 'src/components/UserDropdown.vue';
import { useChannels } from 'src/stores/channels';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const channelStore = useChannels();

const selectedChannelId = computed(() => route.params?.channelId);
const isDesktop = computed(() => $q.screen.width >= 830);
const mobileView = computed(() => (selectedChannelId.value ? 'chat' : 'list'));

onMounted(async () => {
  if (!channelStore.channels?.length) await channelStore.loadChannels();
});
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
                v-for="channel in channelStore.channels"
                :key="channel.id"
                :channel
                :highlight="channel.id === 1"
              />
            </q-list>
          </q-scroll-area>

          <UserDropdown />
        </q-page>

        <router-view v-slot="{ Component }">
          <component :is="Component" :isDesktop />
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>
