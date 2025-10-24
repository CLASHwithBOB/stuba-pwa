<script setup lang="ts">
import { useQuasar } from 'quasar';
import HelpDialog from 'src/components/HelpDialog.vue';
import { RESPONSE_TYPE } from 'src/enums/response';
import { commands, validate } from 'src/lib/commands';
import { useAuth } from 'src/stores/auth';
import { useChannels } from 'src/stores/channels';
import { useNotifications } from 'src/stores/notifications';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import MembersDialog from './MembersDialog.vue';

const props = withDefaults(defineProps<{ modelValue: string; button?: boolean }>(), {
  button: true,
});

const $q = useQuasar();
const { user } = useAuth();
const channelStore = useChannels();
const router = useRouter();
const { setNotification } = useNotifications();

const localValue = ref(props.modelValue);
const showEmojiPicker = ref(false);
const showMembersDialog = ref(false);
const showHelpDialog = ref(false);
const inputRef = ref<HTMLElement | null>(null);

function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value;
}

function onSelectEmoji(emoji: { i: string }) {
  localValue.value += emoji.i;
  inputRef.value?.focus();
}

onMounted(() => inputRef.value?.focus());

async function onSubmit() {
  const trimmedText = localValue.value.trim();
  if (!trimmedText) return;

  if (trimmedText.startsWith('/')) {
    const validationError = validate(trimmedText, channelStore.currentChannel !== null);
    if (validationError) {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: validationError,
        position: 'top',
      });
      return;
    }

    const splitText = trimmedText.split(' ');
    let res = null;

    switch (splitText[0]) {
      case '/join':
        res = await commands.join(splitText.slice(1).join(' '));
        break;
      case '/quit':
        // $q.notify(await commands.quit());
        break;
      case '/cancel':
        // $q.notify(await commands.cancel());
        break;
      case '/list':
        showMembersDialog.value = true;
        break;
      case '/invite':
        // $q.notify(await commands.invite(splitText.slice(1).join(' ')));
        break;
      case '/revoke':
        // $q.notify(await commands.revoke(splitText.slice(1).join(' ')));
        break;
      case '/kick':
        // $q.notify(await commands.kick(splitText.slice(1).join(' ')));
        break;
      case '/status':
        $q.notify(await commands.status(splitText.slice(1).join(' ')));
        break;
      case '/help':
        showHelpDialog.value = true;
        break;
    }

    if (res?.type === RESPONSE_TYPE.REDIRECT) {
      if (res.notification) setNotification(res.notification);

      await router.push(res.url);
    } else if (res?.type === RESPONSE_TYPE.ERROR) $q.notify(res.notification);
  } else {
    // Send message
  }

  localValue.value = '';
}
</script>

<template>
  <q-form style="display: flex; width: 100%" @submit="onSubmit">
    <div style="overflow: hidden; border-radius: 15px; flex: 1">
      <q-input
        v-model="localValue"
        ref="inputRef"
        autogrow
        borderless
        dense
        placeholder="Type a message or command..."
        style="background-color: #3498db; padding-left: 15px; padding-right: 32px"
        input-style="max-height: 150px; color: #ecf0f1; font-size: 16px;"
        @keydown.enter.exact.prevent="onSubmit"
        @keydown.shift.enter.stop
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            dense
            icon="sentiment_satisfied_alt"
            @click="toggleEmojiPicker"
            style="color: #ecf0f1; position: absolute; right: -25px; bottom: 3px"
          />
        </template>
      </q-input>
    </div>

    <div
      v-if="showEmojiPicker"
      style="position: absolute; bottom: 60px; right: 10px; z-index: 1000"
    >
      <EmojiPicker :native="true" @select="onSelectEmoji" />
    </div>

    <div
      v-if="showEmojiPicker"
      @click="showEmojiPicker = false"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999"
    />
    <q-btn
      class="q-ml-sm q-mt-auto"
      type="submit"
      rounded
      outlined
      icon="send"
      style="background-color: #5dade2; height: 40px"
    />
  </q-form>
  <HelpDialog v-model="showHelpDialog" />
  <MembersDialog
    v-if="user && channelStore.currentChannel"
    :channel="channelStore.currentChannel"
    :members="[user, user, user, user]"
    v-model="showMembersDialog"
  />
</template>
