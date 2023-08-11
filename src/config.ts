import * as dotenv from "dotenv";
import { IConfig } from "./interface";
dotenv.config();

export const config: IConfig = {
  api: process.env.API,
  openai_api_key: process.env.OPENAI_API_KEY || "123456789",
  model: process.env.MODEL || "gpt-3.5-turbo",
  chatPrivateTriggerKeyword: process.env.CHAT_PRIVATE_TRIGGER_KEYWORD || "",
  chatTriggerRule: process.env.CHAT_TRIGGER_RULE || "",
  disableGroupMessage: process.env.DISABLE_GROUP_MESSAGE === "true",
  temperature: process.env.TEMPERATURE ? parseFloat(process.env.TEMPERATURE) : 0.6,
  blockWords: process.env.BLOCK_WORDS?.split(",") || [],
  chatgptBlockWords: process.env.CHATGPT_BLOCK_WORDS?.split(",") || [],
  padlocalToken: process.env.PADLOCAL_TOKEN || "",
  openaiKeyUrl: process.env.OPENAI_KEY_URL || "",
  amapApiKey: process.env.AMAP_API_KEY || "",
  mjApiHost: process.env.MJ_API_HOST || "",
  mjApiKey: process.env.MJ_API_KEY || "",
  ewelinkName: process.env.EWELINK_NAME || "",
  ewelinkPassword: process.env.EWELINK_PASSWORD || "",
  ewelinkRegion: process.env.EWELINK_REGION || "",
  ewelinkAllowUser: process.env.EWELINK_ALLOW_USER || "",
  qqmusicCookie: process.env.QQMUSIC_COOKIE || "",
};
