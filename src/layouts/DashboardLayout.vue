<script setup lang="ts">
import { useQuasar } from 'quasar';
import ChannelItem from 'src/components/ChannelItem.vue';
import OptionsDropdown from 'src/components/OptionsDropdown.vue';
import UserDropdown from 'src/components/user/UserDropdown.vue';
import { useChannels } from 'src/stores/channels';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const { channels } = useChannels();

const selectedChannelId = computed(() => route.params?.channelId);
const isDesktop = computed(() => $q.screen.width >= 830);
const mobileView = computed(() => (selectedChannelId.value ? 'chat' : 'list'));
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
        <OptionsDropdown />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row no-wrap full-height">
        <q-page
          class="sidebar-page column"
          v-if="isDesktop || mobileView === 'list'"
          :class="!isDesktop && 'col'"
          :style="isDesktop && 'width:300px'"
        >
          <q-scroll-area class="col">
            <q-list>
              <ChannelItem
                v-for="channel in channels"
                :key="channel.id"
                :channel
                :highlight="channel.invitedRecently || channel.id.toString() === selectedChannelId"
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
<style lang="sass" scoped>
.sidebar-page
  background-color: #f5f7fb
  border-right: 1px solid $gray-200
</style>
