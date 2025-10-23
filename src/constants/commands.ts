import { COMMAND_VERB } from 'src/enums/command';
import type { CommandDefinition } from 'src/types/commands';

export const COMMANDS: Record<COMMAND_VERB, CommandDefinition> = Object.freeze({
  [COMMAND_VERB.JOIN]: {
    description:
      'Join an existing public channel or create a new one. Add "private" to create a private channel.',
    arg: { name: 'channelName' },
    flags: [['private']],
    adminOnly: false,
    channelOnly: false,
  },

  [COMMAND_VERB.QUIT]: {
    description: 'Permanently deletes the current channel (admin-only).',
    adminOnly: true,
    channelOnly: true,
  },

  [COMMAND_VERB.CANCEL]: {
    description: 'Leave the current channel. If you are admin, the channel is deleted.',
    adminOnly: false,
    channelOnly: true,
  },

  [COMMAND_VERB.LIST]: {
    description: 'Show a list of members in the current channel.',
    adminOnly: false,
    channelOnly: true,
  },

  [COMMAND_VERB.INVITE]: {
    description:
      'Add a user to the channel (admin-only for private channels; any member for public).',
    arg: { name: 'nickName' },
    adminOnly: false,
    channelOnly: true,
  },

  [COMMAND_VERB.REVOKE]: {
    description: 'Remove a user from a private channel (admin-only).',
    arg: { name: 'nickName' },
    adminOnly: true,
    channelOnly: true,
  },

  [COMMAND_VERB.KICK]: {
    description:
      'Kick a user from a public channel. 3 kicks = permanent ban. Admin can kick permanently.',
    arg: { name: 'nickName' },
    adminOnly: false,
    channelOnly: true,
  },

  [COMMAND_VERB.STATUS]: {
    description: 'Change your status.',
    arg: {
      name: 'status',
      allowedValues: ['online', 'dnd', 'offline'],
    },
    adminOnly: false,
    channelOnly: false,
  },

  [COMMAND_VERB.THEME]: {
    description: 'Change the theme.',
    arg: {
      name: 'theme',
      allowedValues: ['light', 'dark'],
    },
    adminOnly: false,
    channelOnly: false,
  },

  [COMMAND_VERB.HELP]: {
    description: 'Show this help dialog.',
    adminOnly: false,
    channelOnly: false,
  },
});
