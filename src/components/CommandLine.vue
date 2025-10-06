<script setup lang="ts">
import { useQuasar } from 'quasar';
import { commands, validate } from 'src/lib/commands';
import { ref } from 'vue';
import HelpDialog from './HelpDialog.vue';

const $q = useQuasar();

const text = ref('');
const showHelpDialog = ref(false);

function onSubmit() {
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
      $q.notify(commands.join(splitText.slice(1).join(' ')));
      break;
    case '/quit':
      $q.notify(commands.quit());
      break;
    case '/cancel':
      $q.notify(commands.cancel());
      break;
    case '/list':
      $q.notify(commands.list());
      break;
    case '/invite':
      $q.notify(commands.invite(splitText.slice(1).join(' ')));
      break;
    case '/revoke':
      $q.notify(commands.revoke(splitText.slice(1).join(' ')));
      break;
    case '/kick':
      $q.notify(commands.kick(splitText.slice(1).join(' ')));
      break;
    case '/status':
      $q.notify(commands.status(splitText.slice(1).join(' ')));
      break;
    case '/theme':
      $q.notify(commands.theme(splitText.slice(1).join(' ')));
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
