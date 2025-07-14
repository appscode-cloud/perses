

/**
 * Checks if a string is a regex pattern.
 */
export function isRegexPattern(input: string | null | undefined): boolean {
  return Boolean(input?.startsWith('/'));
}

/**
 * Converts a string to RegExp. Handles both regular strings and regex patterns.
 * For regular strings, creates exact match regex.
 * For patterns like "/pattern/flags", creates corresponding RegExp.
 */
export function createRegexFromString(input: string): RegExp {
  if (!input) {
    throw new Error('Input string cannot be empty');
  }

  if (!isRegexPattern(input)) {
    return new RegExp(`^${input}$`);
  }

  const regexPattern = /^\/(.+)\/([gimy]*)$/;
  const matches = input.match(regexPattern);

  if (!matches) {
    throw new Error(`Invalid regular expression format: ${input}`);
  }

  const [, pattern = '', flags = ''] = matches;

  try {
    return new RegExp(pattern, flags);
  } catch (error) {
    throw new Error(`Failed to create RegExp ${error}`);
  }
}
