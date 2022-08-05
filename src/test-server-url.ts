/**
 * Returns the builder function for test server API calls.
 *
 * ```ts
 * // Pass the function to the bot URL builder:
 * const bot = new Bot('<token>', {
 *    client: {
 *        buildUrl: buildTestServerUrl,
 *    },
 * });
 * ```
 */
export const buildTestServerUrl = (
  root: string,
  token: string,
  method: string,
): string => `${root}/bot${token}/test/${method}`;
