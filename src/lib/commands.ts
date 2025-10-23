import type { QNotifyCreateOptions } from 'quasar';
import { api } from 'src/api/api';
import { COMMANDS } from 'src/constants/commands';
import { CHANNEL_TYPE } from 'src/enums/channel-type';
import type { COMMAND_VERB } from 'src/enums/command';
import type { USER_STATUS } from 'src/enums/user-status';
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

export function validate(text: string, isChatOpen: boolean): string | null {
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

      if (command.arg && command.arg.allowedValues && parts.length >= 2) {
        const arg = parts[1]!;
        if (!command.arg.allowedValues.includes(arg)) {
          return `Invalid argument "${arg}" for /${verb}. Allowed values are: ${command.arg.allowedValues.join(', ')}`;
        }
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

      if (command.channelOnly && !isChatOpen) {
        return `Command /${verb} can only be used within a channel.`;
      }
    }
  }

  if (!foundCommand) {
    return `Unknown command ${text.split(' ')[0]}. Type /help for a list of available commands`;
  }

  return null;
}

export const commands = {
  join,
  quit,
  cancel,
  list,
  invite,
  revoke,
  kick,
  status,
  help,
};

async function join(
  args?: string,
): Promise<{ notification: QNotifyCreateOptions } | { redirectUrl: string }> {
  if (!args)
    return await Promise.resolve({
      notification: { ...error, message: 'Error: No channel name specified.' },
    } as const);

  const split = args.split(' ');
  const name = split[0]!;
  const type = split[1] === CHANNEL_TYPE.PRIVATE ? CHANNEL_TYPE.PRIVATE : CHANNEL_TYPE.PUBLIC;

  const res = await api.channels.join({ name, type });

  if ('error' in res) {
    return { notification: { ...error, message: res.error } } as const;
  }

  return await Promise.resolve({
    redirectUrl: `/channels/${name}`,
  });
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

async function status(status?: string) {
  if (!status) {
    return { ...error, message: `Error: No status specified.` } as const;
  }

  await api.user.update({ status: status as USER_STATUS });

  return { ...success, message: `You are ${status}.` } as const;
}

function help() {
  return {};
}
