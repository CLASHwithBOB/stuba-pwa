export interface CommandArgument {
  name: string;
  allowedValues?: string[];
}

export interface CommandDefinition {
  description: string;
  arg?: CommandArgument;
  flags?: string[][];
  minArgs?: number;
  maxArgs?: number;
  adminOnly?: boolean;
}
