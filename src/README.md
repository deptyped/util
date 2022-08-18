<h1 align="center">🛠 Utils for grammY</h1>

Useful utils for grammY.

## Install

### Node

// TODO

### Deno

// TODO

## Utils

- [Allowed updates](#allowed-updates) - helps to create a list of update types the bot will receive.
- [Automatic sending of chat actions](#automatic-sending-of-chat-actions) - helps to automatically send the appropriate [chat actions](https://core.telegram.org/bots/api#sendchataction).
- [Test server URL builder](#test-server-url-builder) - helps to use Telegram test server for API calls.

### Allowed updates

Helps to create a list of update types the bot will receive.

#### Usage

```ts
import { AllowedUpdates } from "@grammyjs/util";

// Manual creation of update type list:
bot.start({
  allowed_updates: AllowedUpdates.from(
    AllowedUpdates.message |
      AllowedUpdates.editedMessage |
      AllowedUpdates.callbackQuery,
  ),
});

// Use predefined update lists:
bot.start({
  allowed_updates: AllowedUpdates.from(AllowedUpdates.all),
});

// Merge predefined update lists:
bot.start({
  allowed_updates: AllowedUpdates.from(
    AllowedUpdates.messages |
      AllowedUpdates.channelPosts |
      AllowedUpdates.inline,
  ),
});

// Manual addition of update type:
bot.start({
  allowed_updates: AllowedUpdates.from(
    AllowedUpdates.messages |
      AllowedUpdates.channelPosts |
      AllowedUpdates.inlineQuery,
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

### Automatic sending of chat actions

Helps to automatically send the appropriate [chat actions](https://core.telegram.org/bots/api#sendchataction).

#### Usage

```ts
import { autoChatAction } from "@grammyjs/util";

// Install the plugin
bot.api.config.use(autoChatAction());
```

### Test server URL builder

Helps to use Telegram test server for API calls.

#### Usage

```ts
import { buildTestServerUrl } from "@grammyjs/util";

// Pass the function to the bot URL builder:
const bot = new Bot("<token>", {
  client: {
    buildUrl: buildTestServerUrl,
  },
});
```
