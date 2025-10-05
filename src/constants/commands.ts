import { COMMAND_VERB } from 'src/enums/command';

export const COMMANDS = Object.freeze([
  { verb: COMMAND_VERB.JOIN, requireArgs: true },
  { verb: COMMAND_VERB.QUIT, requireArgs: false },
  { verb: COMMAND_VERB.CANCEL, requireArgs: false },
  { verb: COMMAND_VERB.LIST, requireArgs: false },
  { verb: COMMAND_VERB.INVITE, requireArgs: true },
  { verb: COMMAND_VERB.REVOKE, requireArgs: true },
  { verb: COMMAND_VERB.KICK, requireArgs: true },
  { verb: COMMAND_VERB.STATUS, requireArgs: true }, //custom
  { verb: COMMAND_VERB.THEME, requireArgs: true }, //custom
  { verb: COMMAND_VERB.HELP, requireArgs: false }, //custom
]);
