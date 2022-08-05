<h1 align="center">🛠 Utils for grammY</h1>

Useful utils for grammY.

## Install

### Node

// TODO

### Deno

// TODO

## Utils

- [Allowed updates](#allowed-updates) - helps to create a list of update types the bot will receive.

### Allowed updates

Helps to create a list of update types the bot will receive.

#### Usage

```ts
import { AllowedUpdates } from "@grammyjs/util";

// Use predefined update lists:
bot.start({
  allowed_updates: AllowedUpdates.messages,
});

// Merge predefined update lists:
bot.start({
  allowed_updates: AllowedUpdates.from(
    AllowedUpdates.messages,
    AllowedUpdates.channelPosts,
    AllowedUpdates.inline,
  ),
});

// Manual addition of update type:
bot.start({
  allowed_updates: AllowedUpdates.from(
    AllowedUpdates.messages,
    AllowedUpdates.channelPosts,
    AllowedUpdates.raw.inlineQuery,
  ),
});

// Manual creation of update type list:
bot.start({
  allowed_updates: AllowedUpdates.from(
    AllowedUpdates.raw.channelPost,
    AllowedUpdates.raw.inlineQuery,
  ),
});
```

#### Predefined lists of update types

| Name            | Update types                                      |
| --------------- | ------------------------------------------------- |
| messages        | message, edited_message, callback_query           |
| channelPosts    | channel_post, edited_channel_post, callback_query |
| inline          | inline_query, chosen_inline_result                |
| payments        | shipping_query, pre_checkout_query                |
| polls           | poll, poll_answer                                 |
| myChatMember    | my_chat_member                                    |
| chatMember      | chat_member                                       |
| chatJoinRequest | chat_join_request                                 |
| all             | Contains all types of updates specified above     |
