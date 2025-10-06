export interface CommandArgument {
  name: string;
  allowedValues?: string[];
}

export interface CommandDefinition {
  description: string;
  arg?: CommandArgument;
  flags?: string[][];
  adminOnly?: boolean;
}
