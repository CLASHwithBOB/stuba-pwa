<script setup lang="ts">
import { useQuasar } from 'quasar';
import { commands, validate } from 'src/lib/commands';
import { ref } from 'vue';
import HelpDialog from './HelpDialog.vue';

const $q = useQuasar();

const text = ref('');
const showHelpDialog = ref(false);

async function onSubmit() {
  const trimmedText = text.value.trim();
  const validationError = validate(trimmedText);

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

  text.value = '';
}
</script>

<template>
  <q-form @submit="onSubmit" style="width: 100%; max-width: 250px">
    <q-input v-model="text" dark dense standout placeholder="Type a command..." maxlength="128" />
  </q-form>
  <HelpDialog v-model="showHelpDialog" />
</template>
