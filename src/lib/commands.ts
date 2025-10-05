import type { QNotifyCreateOptions } from 'quasar';
import type { COMMAND_VERB } from 'src/enums/command';
import { error, success } from './notifications';

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
  return {
    ...success,
    message: `Available commands: /join, /quit, /cancel, /list, /invite, /revoke, /kick, /status, /theme, /help`,
  } as const;
}
