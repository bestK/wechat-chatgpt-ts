import { FileBox } from "file-box";
import { Message } from "wechaty";
import { ContactImpl, ContactInterface, RoomImpl, RoomInterface } from "wechaty/impls";
import { config } from "./config.js";
import DBUtils from "./data.js";
import { MessageType, RuntimeDataCtx } from "./interface.js";
import { chatWithFunctions, whisper } from "./openai.js";
import { regexpEncode, uploadImageToImgur } from "./utils.js";

const SINGLE_MESSAGE_MAX_SIZE = 500;
type Speaker = RoomImpl | ContactImpl;
interface ICommand {
  name: string;
  description: string;
  exec: (talker: Speaker, text: string) => Promise<void>;
}
export class ChatGPTBot {
  padlocalToken = config.padlocalToken;
  chatPrivateTriggerKeyword = config.chatPrivateTriggerKeyword;
  chatTriggerRule = config.chatTriggerRule ? new RegExp(config.chatTriggerRule) : undefined;
  disableGroupMessage = config.disableGroupMessage || false;
  botName: string = "";
  ready = false;
  setBotName(botName: string) {
    this.botName = botName;
  }
  get chatGroupTriggerRegEx(): RegExp {
    return new RegExp(`^@${regexpEncode(this.botName)}\\s`);
  }
  get chatPrivateTriggerRule(): RegExp | undefined {
    const { chatPrivateTriggerKeyword, chatTriggerRule } = this;
    let regEx = chatTriggerRule
    if (!regEx && chatPrivateTriggerKeyword) {
      regEx = new RegExp(regexpEncode(chatPrivateTriggerKeyword))
    }
    return regEx
  }
  private readonly commands: ICommand[] = [
    {
      name: "help",
      description: "显示帮助信息",
      exec: async (talker) => {
        await this.trySay(talker,
          `
        ========
        /cmd help
        # 显示帮助信息
        /cmd prompt <PROMPT>
        # 设置当前会话的 prompt
        /img <PROMPT>
        # 根据 prompt 生成图片
        /cmd clear
        # 清除自上次启动以来的所有会话
        ========
        `);
      }
    },
    {
      name: "prompt",
      description: "设置当前会话的prompt",
      exec: async (talker, prompt) => {
        if (talker instanceof RoomImpl) {
          DBUtils.setPrompt(await talker.topic(), prompt);
        } else {
          DBUtils.setPrompt(talker.name(), prompt);
        }
      }
    },
    {
      name: "clear",
      description: "清除自上次启动以来的所有会话",
      exec: async (talker) => {
        if (talker instanceof RoomImpl) {
          DBUtils.clearHistory(await talker.topic());
        } else {
          DBUtils.clearHistory(talker.name());
        }
      }
    }
  ]

  /**
   * EXAMPLE:
   *       /cmd help
   *       /cmd prompt <PROMPT>
   *       /cmd img <PROMPT>
   *       /cmd clear
   * @param contact
   * @param rawText
   */
  async command(contact: any, rawText: string): Promise<void> {
    const [commandName, ...args] = rawText.split(/\s+/);
    const command = this.commands.find(
      (command) => command.name === commandName
    );
    if (command) {
      await command.exec(contact, args.join(" "));
    }
  }
  // remove more times conversation and mention
  cleanMessage(rawText: string, privateChat: boolean = false): string {
    let text = rawText;
    const item = rawText.split("- - - - - - - - - - - - - - -");
    if (item.length > 1) {
      text = item[item.length - 1];
    }

    const { chatTriggerRule, chatPrivateTriggerRule } = this;

    if (privateChat && chatPrivateTriggerRule) {
      text = text.replace(chatPrivateTriggerRule, "")
    } else if (!privateChat) {
      text = text.replace(this.chatGroupTriggerRegEx, "")
      text = chatTriggerRule ? text.replace(chatTriggerRule, "") : text
    }
    // remove more text via - - - - - - - - - - - - - - -
    return text
  }
  async getGPTMessage(talkerName: string, text: string): Promise<string> {
    let gptMessage = await chatWithFunctions(talkerName, text);
    if (gptMessage && gptMessage !== "") {
      if (typeof gptMessage.content == "string") {
        DBUtils.addAssistantMessage(talkerName, gptMessage);
      }
      return gptMessage;
    }
    return "Sorry, please try again later. 😔";
  }
  // Check if the message returned by chatgpt contains masked words]
  checkChatGPTBlockWords(message: string): boolean {
    if (config.chatgptBlockWords.length == 0) {
      return false;
    }
    return config.chatgptBlockWords.some((word) => message.includes(word));
  }
  // The message is segmented according to its size
  async trySay(
    talker: RoomInterface | ContactInterface,
    mesasge: string
  ): Promise<void> {
    const messages: Array<string> = [];
    if (this.checkChatGPTBlockWords(mesasge)) {
      console.log(`🚫 Blocked ChatGPT: ${mesasge}`);
      return;
    }
    let message = mesasge;
    while (message.length > SINGLE_MESSAGE_MAX_SIZE) {
      messages.push(message.slice(0, SINGLE_MESSAGE_MAX_SIZE));
      message = message.slice(SINGLE_MESSAGE_MAX_SIZE);
    }
    messages.push(message);
    for (const msg of messages) {
      await talker.say(msg);
    }
  }
  // Check whether the ChatGPT processing can be triggered
  triggerGPTMessage(text: string, privateChat: boolean = false): boolean {
    const { chatTriggerRule } = this;
    let triggered = false;
    if (privateChat) {
      const regEx = this.chatPrivateTriggerRule
      triggered = regEx ? regEx.test(text) : true;
    } else {
      triggered = this.chatGroupTriggerRegEx.test(text);
      // group message support `chatTriggerRule`
      if (triggered && chatTriggerRule) {
        triggered = chatTriggerRule.test(text.replace(this.chatGroupTriggerRegEx, ""))
      }
    }
    if (triggered) {
      console.log(`🎯 Triggered ChatGPT: ${text}`);
    }
    return triggered;
  }
  // Check whether the message contains the blocked words. if so, the message will be ignored. if so, return true
  checkBlockWords(message: string): boolean {
    if (config.blockWords.length == 0) {
      return false;
    }
    return config.blockWords.some((word) => message.includes(word));
  }
  // Filter out the message that does not need to be processed
  isNonsense(
    talker: ContactInterface,
    messageType: MessageType,
    text: string
  ): boolean {
    return (
      talker.self() ||
      // TODO: add doc support
      !(messageType == MessageType.Text || messageType == MessageType.Audio || messageType == MessageType.Image) ||
      talker.name() === "微信团队" ||
      // 语音(视频)消息
      text.includes("收到一条视频/语音聊天消息，请在手机上查看") ||
      // 红包消息
      text.includes("收到红包，请在手机上查看") ||
      // Transfer message
      text.includes("收到转账，请在手机上查看") ||
      // 位置消息
      text.includes("/cgi-bin/mmwebwx-bin/webwxgetpubliclinkimg") ||
      // 聊天屏蔽词
      this.checkBlockWords(text)
    );
  }

  async onPrivateMessage(talker: ContactInterface, text: string) {
    const gptMessage = await this.getGPTMessage(talker.name(), text);
    await this.trySay(talker, gptMessage);
  }

  async onGroupMessage(
    talker: ContactInterface,
    text: string,
    room: RoomInterface
  ) {
    const gptMessage = await this.getGPTMessage(await room.topic(), text);
    const result = `@${talker.name()} ${text}\n\n------\n ${gptMessage}`;
    await this.trySay(room, result);
  }
  async onMessage(message: Message) {
    const talker = message.talker();
    const rawText = message.text();
    const refererMsg = await this.refererMsg(message)
    const room = message.room();
    const messageType = message.type();
    const privateChat = !room;
    if (privateChat) {
      console.log(`🤵 Contact: ${talker.name()} 💬 Text: ${rawText}`)
    } else {
      const topic = await room.topic()
      console.log(`🚪 Room: ${topic} 🤵 Contact: ${talker.name()} 💬 Text: ${rawText}`)
    }
    if (this.isNonsense(talker, messageType, rawText)) {
      return;
    }
    if (messageType == MessageType.Audio) {
      // 保存语音文件
      const fileBox = await message.toFileBox();
      let fileName = "./public/" + fileBox.name;
      await fileBox.toFile(fileName, true).catch((e) => {
        console.log("保存语音失败", e);
        return;
      });
      // Whisper
      whisper("", fileName).then((text) => {
        message.say(text);
      })
      return;
    }

    if (privateChat && messageType == MessageType.Image) {
      const imageMsg = await message.toFileBox()
      const url = await uploadImageToImgur(imageMsg)
      await message.say(url)
      return
    }

    if (rawText.startsWith("/cmd ")) {
      console.log(`🤖 Command: ${rawText}`)
      const cmdContent = rawText.slice(5) // 「/cmd 」一共5个字符(注意空格)
      if (privateChat) {
        await this.command(talker, cmdContent);
      } else {
        await this.command(room, cmdContent);
      }
      return;
    }

    if (this.triggerGPTMessage(rawText, privateChat)) {
      const text = this.cleanMessage(rawText, privateChat);
      if (privateChat) {
        return await this.onPrivateMessage(talker, text);
      } else {
        if (!this.disableGroupMessage) {
          return await this.onGroupMessage(talker, text, room);
        } else {
          return;
        }
      }
    } else {
      return;
    }
  }


  async refererMsg(message: Message) {
    // @ts-ignore
    const referMessagePayload = message.payload?.referMessagePayload
    return referMessagePayload
  }

  async getRefMsgFileBox(payload: any): Promise<FileBox | null> {
    try {
      // @ts-ignore
      return await RuntimeDataCtx.get("bot")?.data.puppet.messageFile(payload?.svrid);
    } catch (error) {
      return null
    }
  }
}




