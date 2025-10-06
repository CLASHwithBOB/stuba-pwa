import { COMMAND_VERB } from 'src/enums/command';

export const COMMANDS = [
  {
    verb: COMMAND_VERB.JOIN,
    usage: '/join <channelName> [private]',
    requireArgs: true,
    description:
      'Join an existing public channel or create a new one. Add private to create a private channel.',
  },
  {
    verb: COMMAND_VERB.QUIT,
    usage: '/quit',
    requireArgs: false,
    description: 'Permanently deletes the current channel (admin-only).',
  },
  {
    verb: COMMAND_VERB.CANCEL,
    usage: '/cancel',
    requireArgs: false,
    description: 'Leave the current channel. If you are admin, the channel is deleted.',
  },
  {
    verb: COMMAND_VERB.LIST,
    usage: '/list',
    requireArgs: false,
    description: 'Show a list of members in the current channel.',
  },
  {
    verb: COMMAND_VERB.INVITE,
    usage: '/invite <nickName>',
    requireArgs: true,
    description:
      'Add a user to the channel (admin-only for private channels; any member for public).',
  },
  {
    verb: COMMAND_VERB.REVOKE,
    usage: '/revoke <nickName>',
    requireArgs: true,
    description: 'Remove a user from a private channel (admin-only).',
  },
  {
    verb: COMMAND_VERB.KICK,
    usage: '/kick <nickName>',
    requireArgs: true,
    description:
      'Kick a user from a public channel. 3 kicks = permanent ban. Admin can kick permanently.',
  },
  {
    verb: COMMAND_VERB.STATUS,
    usage: '/status <online|dnd|offline>',
    requireArgs: true,
    description: 'Change your status.',
  }, //custom
  {
    verb: COMMAND_VERB.THEME,
    usage: '/theme <light|dark>',
    requireArgs: true,
    description: 'Changes the theme.',
  }, //custom
  {
    verb: COMMAND_VERB.HELP,
    requireArgs: false,
    usage: '/help',
    description: 'Show this help dialog.',
  }, //custom
];
