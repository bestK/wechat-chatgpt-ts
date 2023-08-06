import fs from "fs";
import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionResponse,
  CreateImageRequestResponseFormatEnum,
  CreateImageRequestSizeEnum,
  OpenAIApi
} from "openai";
import { config } from "./config.js";
import DBUtils from "./data.js";
import { createAmapTraffic, createMidjourney } from "./functions.js";
import { FunctionResponse as FunctionResult, MessageBuilder, MessageType } from "./interface.js";

let cacheKeys: string[] = [];
let lastFetchTime = 0;
const cacheDuration = 2 * 60 * 60 * 1000; // 两个小时，以毫秒为单位


const configuration = new Configuration({
  // apiKey: config.openai_api_key,
  apiKey: (await keyProvider())[0],
  basePath: config.api,
});
const openai = new OpenAIApi(configuration);

/**
 * Get completion from OpenAI
 * @param username
 * @param message
 */
async function chatgpt(username: string, message: string): Promise<string> {
  // 先将用户输入的消息添加到数据库中
  DBUtils.addUserMessage(username, message);
  const messages = DBUtils.getChatMessage(username);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: config.temperature,
  });
  let assistantMessage = "";
  try {
    if (response.status === 200) {
      assistantMessage = response?.data.choices[0].message?.content?.replace(/^\n+|\n+$/g, "") as string;
    } else {
      console.log(`Something went wrong,Code: ${response.status}, ${response.statusText}`)
    }
  } catch (e: any) {
    if (e.request) {
      console.log("请求出错");
    }
  }
  return assistantMessage;
}

/**
 * Get image from Dall·E
 * @param username
 * @param prompt
 */
async function dalle(username: string, prompt: string) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: CreateImageRequestSizeEnum._256x256,
    response_format: CreateImageRequestResponseFormatEnum.Url,
    user: username
  }).then((res) => res.data).catch((err) => console.log(err));
  if (response) {
    return response.data[0].url;
  } else {
    return "Generate image failed"
  }
}

/**
 * Speech to text
 * @param username
 * @param videoPath
 */
async function whisper(username: string, videoPath: string): Promise<string> {
  const file: any = fs.createReadStream(videoPath);
  const response = await openai.createTranscription(file, "whisper-1")
    .then((res) => res.data).catch((err) => console.log(err));
  if (response) {
    return response.text;
  } else {
    return "Speech to text failed"
  }
}


async function keyProvider() {
  const currentTime = new Date().getTime();
  // 如果缓存不为空且在有效期内，直接返回缓存的 API 密钥
  if (cacheKeys.length > 0 && currentTime - lastFetchTime < cacheDuration) {
    return cacheKeys;
  }

  // 否则重新获取 API 密钥
  const url = `${config.openaiKeyUrl}?${currentTime}`;
  const api = await fetch(url, { method: 'get' })
  const res = await api.json();
  cacheKeys = res.APIkey.keys;
  lastFetchTime = currentTime;
  return cacheKeys;
}



async function functionCall(prompt: string): Promise<any> {

  // ✨ STEP 1: new the tools you want to use
  const [amapTraffic, amapTrafficSchema] = createAmapTraffic()
  const [midjourney, midjourneySchema] = createMidjourney()

  const functionsSchema = [
    amapTrafficSchema,
    midjourneySchema,
  ];

  // ✨ STEP 2:  add the tools to the functions object
  const functions = {
    amapTraffic,
    midjourney,
  }

  const messages: [ChatCompletionRequestMessage] = [
    {
      role: "user",
      content: prompt,
    },
  ];


  const getCompletion = async (messages: [ChatCompletionRequestMessage]) => {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages,
      // ✨ STEP 3: add the tools to the schema
      functions: functionsSchema,
      temperature: 0,
    });

    return response;
  };

  console.log("Question: " + prompt);
  let response: import("axios").AxiosResponse<CreateChatCompletionResponse, any> = await getCompletion(messages);

  if (response != null && response.data.choices[0].finish_reason === "function_call") {
    const fnName = response?.data.choices[0].message?.function_call?.name;
    const args = response?.data.choices[0].message?.function_call?.arguments;

    console.log("⚙️ Function call: " + fnName);
    console.log("🔢 Arguments: " + args);

    //  ✨ STEP 4: call the function
    // @ts-ignore
    const fn = functions[fnName];
    // @ts-ignore
    const result: FunctionResult = await fn(JSON.parse(args));

    if (result.msgType == MessageType.Image) {
      return MessageBuilder.build(result)
    }

    messages.push({
      role: "assistant",
      // @ts-ignore
      content: null,
      function_call: {
        name: fnName,
        arguments: args,
      },
    });

    messages.push({
      role: "function",
      name: fnName,
      content: JSON.stringify({ result: result.data }),
    });


    response = await getCompletion(messages)
    return response?.data.choices[0].message?.content || ""
  }

  return null
}

export { chatgpt, dalle, whisper, keyProvider, functionCall };

