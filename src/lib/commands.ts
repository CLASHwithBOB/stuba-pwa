import type { QNotifyCreateOptions } from 'quasar';
import { COMMANDS } from 'src/constants/commands';
import type { COMMAND_VERB } from 'src/enums/command';
import { error, success } from './notifications';

export function generateUsage(verb: COMMAND_VERB): string {
  const command = COMMANDS[verb];

  const argument = command.arg
    ? command.arg.allowedValues
      ? `<${command.arg.allowedValues.join('|')}>`
      : `[${command.arg.name}]`
    : '';

  const flags = command.flags ? command.flags.map((flag) => `{${flag.join('|')}}`).join(' ') : '';

  return `/${verb} ${argument} ${flags}`.trim();
}

export function validate(text: string): string | null {
  if (!text.startsWith('/')) {
    return 'Command must start with /';
  }

  if ((text.match(/\//g) || []).length > 1) {
    return 'Only one command at a time is allowed';
  }

  let foundCommand = false;

  for (const [verb, command] of Object.entries(COMMANDS)) {
    const parts = text.split(' ');

    if (parts[0] === `/${verb}`) {
      foundCommand = true;

      if (!command.arg && parts.length > 1) {
        return `Command /${verb} does not require arguments`;
      }

      if (command.arg && parts.length === 1) {
        return `Command /${verb} requires an argument`;
      }

      if (command.arg && parts.length > 2 && !command.flags) {
        return `Command /${verb} requires only one argument`;
      }

      if (command.flags && parts.length > 2 + command.flags.length) {
        return `Command /${verb} accepts only one argument and at most ${command.flags.length} flag(s)`;
      }

      if (command.flags && parts.length > 2) {
        const flags = parts.slice(2);

        for (const flag of flags) {
          const isValidFlag = command.flags.some((allowedFlags) => allowedFlags.includes(flag));
          if (!isValidFlag) {
            return `Invalid flag ${flag} for command /${verb}`;
          }
        }
      }
    }
  }

  if (!foundCommand) {
    return `Unknown command ${text.split(' ')[0]}. Type /help for a list of available commands`;
  }

  return null;
}

export const commands: Record<COMMAND_VERB, (user?: string) => QNotifyCreateOptions> = {
  join,
  quit,
  cancel,
  list,
  invite,
  revoke,
  kick,
  status,
  theme,
  help,
};

function join(channel?: string) {
  return channel
    ? ({ ...success, message: `Successfully joined the channel ${channel}.` } as const)
    : ({ ...error, message: `Channel ${channel} not found.` } as const);
}

function quit() {
  return { ...success, message: `Successfully quit the channel.` } as const;
}

function cancel() {
  return { ...success, message: `Successfully left the channel.` } as const;
}

function list() {
  return { ...success, message: `Available channels: #general, #random, #help` } as const;
}

function invite(user?: string) {
  return user
    ? ({ ...success, message: `Invitation sent to user ${user}.` } as const)
    : ({ ...error, message: `Error: No user specified.` } as const);
}

function revoke(user?: string) {
  return user
    ? ({ ...success, message: `Invitation for user ${user} successfully revoked.` } as const)
    : ({ ...error, message: `Error: No user specified.` } as const);
}

function kick(user?: string) {
  return user
    ? ({ ...success, message: `User ${user} successfully kicked from the channel.` } as const)
    : ({ ...error, message: `Error: No user specified.` } as const);
}

function status() {
  return { ...success, message: `You are online.` } as const;
}

function theme() {
  return { ...success, message: `Theme changed successfully.` } as const;
}

function help() {
  return {};
}
