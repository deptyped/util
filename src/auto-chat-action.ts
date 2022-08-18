import type { Transformer } from "./deps.deno.ts";

type Method = typeof methods[number];

const methods = [
  "sendMessage",
  "sendPhoto",
  "sendVideo",
  "sendVoice",
  "sendDocument",
  "sendSticker",
  "sendLocation",
  "sendVideoNote",
] as const;

const actionsOfMethods: Record<
  Method,
  | "typing"
  | "upload_photo"
  | "upload_video"
  | "upload_voice"
  | "upload_document"
  | "choose_sticker"
  | "find_location"
  | "upload_video_note"
> = {
  sendMessage: "typing",
  sendPhoto: "upload_photo",
  sendVideo: "upload_video",
  sendVoice: "upload_voice",
  sendDocument: "upload_document",
  sendSticker: "choose_sticker",
  sendLocation: "find_location",
  sendVideoNote: "upload_video_note",
};

const isChatActionRequired = (method: string): method is Method =>
  methods.some((m) => m === method);

const getChatAction = (method: Method) => actionsOfMethods[method];

/**
 * Creates an
 * [API transformer function](https://grammy.dev/advanced/transformers.html)
 * that sends the appropriate chat action automatically.
 *
 * @returns The created API transformer function
 */
export const autoChatAction =
  (): Transformer => async (prev, method, payload, signal) => {
    let handle: ReturnType<typeof setTimeout> | undefined;

    if (isChatActionRequired(method) && "chat_id" in payload) {
      const sendAction = () =>
        prev("sendChatAction", {
          chat_id: payload.chat_id as string | number,
          action: getChatAction(method as Method),
        });

      sendAction();
      handle ??= setInterval(() => sendAction, 5000);
    }

    try {
      return await prev(method, payload, signal);
    } finally {
      clearInterval(handle);
    }
  };
