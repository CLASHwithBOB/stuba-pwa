<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

import { commands, validate } from 'src/lib/commands';
import HelpDialog from './HelpDialog.vue';
import { useChannel } from 'src/stores/channels';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue', 'send']);

const $q = useQuasar();
const channelStore = useChannel();

const localValue = ref(props.modelValue);
const showEmojiPicker = ref(false);
const showHelpDialog = ref(false);
const inputRef = ref<HTMLElement | null>(null);

watch(localValue, (val) => emit('update:modelValue', val));

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

    switch (splitText[0]) {
      case '/join':
        $q.notify(await commands.join(splitText.slice(1).join(' ')));
        break;
      case '/quit':
        $q.notify(await commands.quit());
        break;
      case '/cancel':
        $q.notify(await commands.cancel());
        break;
      case '/list':
        $q.notify(await commands.list());
        break;
      case '/invite':
        $q.notify(await commands.invite(splitText.slice(1).join(' ')));
        break;
      case '/revoke':
        $q.notify(await commands.revoke(splitText.slice(1).join(' ')));
        break;
      case '/kick':
        $q.notify(await commands.kick(splitText.slice(1).join(' ')));
        break;
      case '/status':
        $q.notify(await commands.status(splitText.slice(1).join(' ')));
        break;
      case '/theme':
        $q.notify(await commands.theme(splitText.slice(1).join(' ')));
        break;
      case '/help':
        showHelpDialog.value = true;
        break;
    }
  } else {
    emit('send', trimmedText);
  }

  localValue.value = '';
}
</script>

<template>
  <div class="col-grow relative">
    <div style="overflow: hidden; border-radius: 15px">
      <q-input
        v-model="localValue"
        ref="inputRef"
        @keydown.enter="onSubmit"
        autogrow
        borderless
        dense
        placeholder="Type a message or command..."
        style="overflow-y: auto; background-color: #3498db; padding-left: 15px; padding-right: 32px"
        input-style="max-height: 150px; color: #ecf0f1; font-size: 16px; overflow-y: auto;"
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
  </div>
  <HelpDialog v-model="showHelpDialog" />
</template>
