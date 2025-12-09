<script setup lang="ts">
import { useQuasar } from 'quasar';
import ChannelItem from 'src/components/ChannelItem.vue';
import OptionsDropdown from 'src/components/OptionsDropdown.vue';
import UserDropdown from 'src/components/user/UserDropdown.vue';
import { USER_STATUS } from 'src/enums/user-status';
import { socket } from 'src/services/socket';
import { useAuth } from 'src/stores/auth';
import { useChannels } from 'src/stores/channels';
import type { Message } from 'src/types/models';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const { channels } = useChannels();
const { user } = useAuth();

const selectedChannelId = computed(() => route.params?.channelId);
const isDesktop = computed(() => $q.screen.width >= 830);
const mobileView = computed(() => (selectedChannelId.value ? 'chat' : 'list'));

onMounted(async () => {
  if (Notification.permission !== 'granted') await Notification.requestPermission();

  if (channels?.length) {
    channels.forEach((channel) => socket.emit('join-channel', channel.id));
  }

  socket.on('message', (message: Message) => {
    if (!channels) return;
    if (!user || user.status === USER_STATUS.DND || user.status === USER_STATUS.OFFLINE) return;

    let member = null;
    let messageChannelName = null;

    for (const channel of channels) {
      member = channel.members.find((m) => m.id === message.userId);

      if (member) {
        messageChannelName = channel.name;
        break;
      }
    }

    if (!member) return;
    if (!$q.appVisible && document.visibilityState === 'hidden' && message.userId !== user?.id) {
      if (Notification.permission === 'granted')
        if (
          !user.taggedNotificationsOnly ||
          (user.taggedNotificationsOnly && message.content.includes(`@${user.nickname}`))
        )
          new Notification(`PingMe - ${messageChannelName}`, {
            body: `${member.nickname}, ${user.nickname}: ${message.content}`,
          });
    }
  });
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="height: 100vh">
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

    <q-page-container class="fit">
      <div class="row no-wrap fit">
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
