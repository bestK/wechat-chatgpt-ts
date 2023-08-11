import { FileBox } from "file-box";
import { ChatCompletionRequestMessage } from "openai";
import { createText2Voice } from "./function/voice/regsiter.js";


export interface IConfig {
  api?: string;
  openai_api_key: string;
  model: string;
  chatTriggerRule: string;
  disableGroupMessage: boolean;
  temperature: number;
  blockWords: string[];
  chatgptBlockWords: string[];
  chatPrivateTriggerKeyword: string;
  padlocalToken: string;
  openaiKeyUrl: string;
  amapApiKey: string;
  mjApiHost: string;
  mjApiKey: string;
  ewelinkName: string;
  ewelinkPassword: string;
  ewelinkRegion: string;
  ewelinkAllowUser: string;
  qqmusicCookie: string
}

export interface User {
  username: string,
  chatMessage: Array<ChatCompletionRequestMessage>,
  runtimeData: Array<RuntimeData>
}

export enum MessageType {
  RuntimeError = -1,
  ForwardMessage = 999,
  Unknown = 0,
  Attachment = 1, // Attach(6),
  Audio = 2, // Audio(1), Voice(34)
  Contact = 3, // ShareCard(42)
  ChatHistory = 4, // ChatHistory(19)
  Emoticon = 5, // Sticker: Emoticon(15), Emoticon(47)
  Image = 6, // Img(2), Image(3)
  Text = 7, // Text(1)
  Location = 8, // Location(48)
  MiniProgram = 9, // MiniProgram(33)
  GroupNote = 10, // GroupNote(53)
  Transfer = 11, // Transfers(2000)
  RedEnvelope = 12, // RedEnvelopes(2001)
  Recalled = 13, // Recalled(10002)
  Url = 14, // Url(5)
  Video = 15, // Video(4), Video(43)
  Post = 16, // Moment, Channel, Tweet, etc
}



export interface FunctionResponse {
  msgType: MessageType,
  data?: any,
  msg?: string,
  save?: boolean
}


export class FunctionMessageBuilder {
  /**
   * 是否为直接返回的消息类型
   * @param messageType 消息类型
   * @returns bool
   */
  static isDirectMsgType(messageType: MessageType): boolean {
    const dmts = [MessageType.RuntimeError, MessageType.Image, MessageType.Audio, MessageType.Emoticon, MessageType.ForwardMessage]
    return dmts.includes(messageType)
  }

  static build(message: FunctionResponse) {
    switch (message?.msgType) {
      case MessageType.Image:
        return FileBox.fromUrl(message.data, { name: `${new Date().getTime()}.png` })
      case MessageType.Audio:
        const { data, voice_ms } = message.data
        const audioFileBox = FileBox.fromBase64(data, `${new Date().getTime()}.sil`)
        audioFileBox.metadata = {
          voiceLength: voice_ms
        }
        return audioFileBox
      case MessageType.Emoticon:
        const { cdnurl } = message.data
        const emoticonBox = FileBox.fromUrl(cdnurl,
          `message-emotion.jpg`
        )
        emoticonBox.mimeType = "emoticon";
        emoticonBox.metadata = {
          type: "emoticon",
          payload: message.data
        };
        return emoticonBox
      case MessageType.ForwardMessage:
        return message?.data;
      default:
        return message?.data;
    }

  }

  static async text2audio(text: string) {
    const [fn, _] = createText2Voice()
    const res = await fn({ text })
    return this.build(res)
  }
}

export interface RuntimeData {
  name: string
  data: any
}

export class RuntimeDataCtx {
  static dataList: Array<RuntimeData> = [];

  static save(data: RuntimeData, overwrite: boolean = false) {
    if (overwrite) {
      this.removeByName(data.name)
    }
    this.dataList.push(data)
  }

  static get(name: string): RuntimeData | undefined {
    return this.dataList.find(item => item.name == name);
  }

  static removeByName(name: string) {
    this.dataList = this.dataList.filter(item => item.name !== name);
  }
}


export enum MidjourneyAction {
  UPSCALE = "UPSCALE",// 放大
  VARIATION = "VARIATION", // 变换
  REROLL = "REROLL", // 重新生成
}
