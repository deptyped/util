import type { Update } from "./deps.deno.ts";

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type AllowedUpdate = keyof Omit<Update, "update_id">;
type AllowedUpdates = AllowedUpdate[];

const updates: Record<SnakeToCamelCase<AllowedUpdate>, number> = {
  message: 1,
  editedMessage: 1 << 1,
  channelPost: 1 << 2,
  editedChannelPost: 1 << 3,
  callbackQuery: 1 << 4,
  inlineQuery: 1 << 5,
  chosenInlineResult: 1 << 6,
  shippingQuery: 1 << 7,
  preCheckoutQuery: 1 << 8,
  poll: 1 << 9,
  pollAnswer: 1 << 10,
  myChatMember: 1 << 11,
  chatMember: 1 << 12,
  chatJoinRequest: 1 << 13,
};

/**
 * Alias for "message" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const message = updates.message;

/**
 * Alias for "edited_message" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const editedMessage = updates.editedMessage;

/**
 * Alias for "channel_post" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const channelPost = updates.channelPost;

/**
 * Alias for "edited_channel_post" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const editedChannelPost = updates.editedChannelPost;

/**
 * Alias for "callback_query" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const callbackQuery = updates.callbackQuery;

/**
 * Alias for "inline_query" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const inlineQuery = updates.inlineQuery;

/**
 * Alias for "chosen_inline_result" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const chosenInlineResult = updates.chosenInlineResult;

/**
 * Alias for "shipping_query" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const shippingQuery = updates.shippingQuery;

/**
 * Alias for "pre_checkout_query" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const preCheckoutQuery = updates.preCheckoutQuery;

/**
 * Alias for "poll" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const poll = updates.poll;

/**
 * Alias for "poll_answer" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const pollAnswer = updates.pollAnswer;

/**
 * Alias for "my_chat_member" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const myChatMember = updates.myChatMember;

/**
 * Alias for "chat_member" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const chatMember = updates.chatMember;

/**
 * Alias for "chat_join_request" update type.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const chatJoinRequest = updates.chatJoinRequest;

/**
 * Contains the types of updates that are associated with messages.
 *
 * Alias for "message", "edited_message", "callback_query" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const messages = updates.message | updates.editedMessage |
  updates.callbackQuery;

/**
 * Contains the types of updates that are associated with channel posts.
 *
 * Alias for "channel_post", "edited_channel_post", "callback_query" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const channelPosts = updates.channelPost | updates.editedChannelPost |
  updates.callbackQuery;

/**
 * Contains the types of updates that are associated with inline mode.
 *
 * Alias for "inline_query", "chosen_inline_result" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const inline = updates.inlineQuery | updates.chosenInlineResult;

/**
 * Contains the types of updates that are associated with payments.
 *
 * Alias for "shipping_query", "pre_checkout_query" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const payments = updates.shippingQuery | updates.preCheckoutQuery;

/**
 * Contains the types of updates that are associated with polls.
 *
 * Alias for "poll", "poll_answer" update types.
 *
 * **Official reference:** https://core.telegram.org/bots/api#update
 */
export const polls = updates.poll | updates.pollAnswer;

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
export const all = messages |
  channelPosts |
  inline |
  payments |
  polls |
  myChatMember |
  chatMember |
  chatJoinRequest;

/**
 * Returns the merged list of update types.
 *
 * ```ts
 * // Merge predefined update lists:
 * AllowedUpdates.from(AllowedUpdates.messages | AllowedUpdates.channelPosts)
 *
 * // Manual addition of update type:
 * AllowedUpdates.from(AllowedUpdates.messages | AllowedUpdates.channelPosts | AllowedUpdates.inlineQuery)
 * ```
 */
export const from = (updateTypes: number): AllowedUpdates => {
  const types: AllowedUpdates = [];

  if (updateTypes & updates.message) {
    types.push("message");
  }

  if (updateTypes & updates.editedMessage) {
    types.push("edited_message");
  }

  if (updateTypes & updates.channelPost) {
    types.push("channel_post");
  }

  if (updateTypes & updates.editedChannelPost) {
    types.push("edited_channel_post");
  }

  if (updateTypes & updates.callbackQuery) {
    types.push("callback_query");
  }

  if (updateTypes & updates.inlineQuery) {
    types.push("inline_query");
  }

  if (updateTypes & updates.chosenInlineResult) {
    types.push("chosen_inline_result");
  }

  if (updateTypes & updates.shippingQuery) {
    types.push("shipping_query");
  }

  if (updateTypes & updates.preCheckoutQuery) {
    types.push("pre_checkout_query");
  }

  if (updateTypes & updates.poll) {
    types.push("poll");
  }

  if (updateTypes & updates.pollAnswer) {
    types.push("poll_answer");
  }

  if (updateTypes & updates.myChatMember) {
    types.push("my_chat_member");
  }

  if (updateTypes & updates.chatMember) {
    types.push("chat_member");
  }

  if (updateTypes & updates.chatJoinRequest) {
    types.push("chat_join_request");
  }

  return types;
};
