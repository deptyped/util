import type { Update } from "./deps.deno.ts";

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type AllowedUpdate = keyof Omit<Update, "update_id">;
type AllowedUpdates = AllowedUpdate[];

export const raw: Record<SnakeToCamelCase<AllowedUpdate>, AllowedUpdate> = {
  message: "message",
  editedMessage: "edited_message",
  channelPost: "channel_post",
  editedChannelPost: "edited_channel_post",
  callbackQuery: "callback_query",
  inlineQuery: "inline_query",
  chosenInlineResult: "chosen_inline_result",
  shippingQuery: "shipping_query",
  preCheckoutQuery: "pre_checkout_query",
  poll: "poll",
  pollAnswer: "poll_answer",
  myChatMember: "my_chat_member",
  chatMember: "chat_member",
  chatJoinRequest: "chat_join_request",
};

/**
 * Contains the types of updates that are associated with messages.
 *
 * Alias for "message", "edited_message", "callback_query" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const messages: AllowedUpdates = [
  raw.message,
  raw.editedMessage,
  raw.callbackQuery,
];

/**
 * Contains the types of updates that are associated with channel posts.
 *
 * Alias for "channel_post", "edited_channel_post", "callback_query" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const channelPosts: AllowedUpdates = [
  raw.channelPost,
  raw.editedChannelPost,
  raw.callbackQuery,
];

/**
 * Contains the types of updates that are associated with inline mode.
 *
 * Alias for "inline_query", "chosen_inline_result" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const inline: AllowedUpdates = [raw.inlineQuery, raw.chosenInlineResult];

/**
 * Contains the types of updates that are associated with payments.
 *
 * Alias for "shipping_query", "pre_checkout_query" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const payments: AllowedUpdates = [
  raw.shippingQuery,
  raw.preCheckoutQuery,
];

/**
 * Contains the types of updates that are associated with polls.
 *
 * Alias for "poll", "poll_answer" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const polls: AllowedUpdates = [raw.poll, raw.pollAnswer];

/**
 * Alias for "my_chat_member" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const myChatMember: AllowedUpdate = raw.myChatMember;

/**
 * Alias for "chat_member" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const chatMember: AllowedUpdate = raw.chatMember;

/**
 * Alias for "chat_join_request" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const chatJoinRequest: AllowedUpdate = raw.chatJoinRequest;

/**
 * Contains all types of updates.
 *
 * Alias for
 * "message", "edited_message",
 * "channel_post", "edited_channel_post",
 * "callback_query",
 * "inline_query", "chosen_inline_result",
 * "shipping_query", "pre_checkout_query",
 * "poll", "poll_answer",
 * "my_chat_member",
 * "chat_member",
 * "chat_join_request"
 * update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const all: AllowedUpdates = [
  ...messages,
  ...channelPosts,
  ...inline,
  ...payments,
  ...polls,
  myChatMember,
  chatMember,
  chatJoinRequest,
];

/**
 * Returns the merged list of update types.
 *
 * ```ts
 * // Merge predefined update lists:
 * AllowedUpdates.from(AllowedUpdates.messages, AllowedUpdates.channelPosts)
 *
 * // Manual addition of update type:
 * AllowedUpdates.from(AllowedUpdates.messages, AllowedUpdates.channelPosts, AllowedUpdates.raw.inlineQuery)
 * ```
 */
export const from = (
  ...updateType: (AllowedUpdate | AllowedUpdates)[]
): AllowedUpdates => {
  const updateTypes = updateType.map((u) => (Array.isArray(u) ? u : [u]));

  return [
    ...new Set(
      updateTypes.reduce((previous, current) => previous.concat(current), []),
    ),
  ];
};
