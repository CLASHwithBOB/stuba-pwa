<script setup lang="ts">
import { useQuasar } from 'quasar';
import { COMMANDS } from 'src/constants/commands';
import { commands } from 'src/lib/commands';
import { ref } from 'vue';

const $q = useQuasar();

const text = ref('');

function onSubmit() {
  const trimmedText = text.value.trim();
  const validationError = validateCommand(trimmedText);

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

  const command = trimmedText.split(' ')[0];

  switch (command) {
    case '/join':
      $q.notify(commands.join(trimmedText.split(' ')[1]));
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
      $q.notify(commands.invite(trimmedText.split(' ')[1]));
      break;
    case '/revoke':
      $q.notify(commands.revoke(trimmedText.split(' ')[1]));
      break;
    case '/kick':
      $q.notify(commands.kick(trimmedText.split(' ')[1]));
      break;
    case '/status':
      $q.notify(commands.status(trimmedText.split(' ')[1]));
      break;
    case '/theme':
      $q.notify(commands.theme(trimmedText.split(' ')[1]));
      break;
    case '/help':
      $q.notify(commands.help());
      break;
  }
}

// join
// quit
// cancel
// list
// invite
// revoke
// kick
// status
// theme
// help

function validateCommand(text: string): string | null {
  if (!text.startsWith('/')) {
    return 'Command must start with /';
  }

  if ((text.match(/\//g) || []).length > 1) {
    return 'Only one command at a time is allowed';
  }

  let foundCommand = false;

  for (const command of COMMANDS) {
    if (text.includes(`/${command.verb}`)) {
      foundCommand = true;

      const parts = text.split(' ');

      if (!command.requireArgs && parts.length > 1) {
        return `Command /${command.verb} does not require arguments`;
      }

      if (command.requireArgs && parts.length === 1) {
        return `Command /${command.verb} requires an argument`;
      }

      if (command.requireArgs && parts.length > 2) {
        return `Command /${command.verb} requires only one argument`;
      }
    }
  }

  if (!foundCommand) {
    return `Unknown command ${text.split(' ')[0]}. Type /help for a list of available commands`;
  }

  return null;
}
</script>

<template>
  <q-form @submit="onSubmit" style="width: 100%; max-width: 250px">
    <q-input dark dense standout v-model="text" placeholder="Type a command..." maxlength="128" />
  </q-form>
</template>
