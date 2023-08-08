import { AxiosResponse } from "axios";
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
import { functionLoader } from "./function/funcloader.js";

import { FunctionMessageBuilder, FunctionResponse } from "./interface.js";

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



async function getCompletion(messages: Array<ChatCompletionRequestMessage>, functionsSchema: Array<any>) {
  try {
    const response = await openai.createChatCompletion({
      model: config.model,
      messages,
      functions: functionsSchema,
      temperature: 0,
    });

    return response;
  } catch (error: any) {
    throw Error(`${error.response.statusText} ${error.response.data?.error?.message}`)
  }
};

/**
 * chat with gpt functions
 * @param username 当前用户
 * @param message 消息
 * @returns 结果
 */
async function chatWithFunctions(username: string, message: string): Promise<any> {

  // 先将用户输入的消息添加到数据库中
  DBUtils.addUserMessage(username, message);
  const messages = DBUtils.getChatMessage(username);

  // 加载自定义函数
  const { functions, functionsSchema } = functionLoader()
  console.log("Question: " + message);
  let response: AxiosResponse<CreateChatCompletionResponse, any> = await getCompletion(messages, functionsSchema);
  if (checkFinishReason(response)) {
    return functionCall(response, functionsSchema, functions, messages, username)
  }

  return response.data.choices[0].message?.content
}

/**
 * 调用函数
 * @param response openai 响应
 * @param functionsSchema 自定义函数结构
 * @param functions 函数
 * @param messages 历史消息
 * @param username 当前用户
 * @returns 调用结果
 */
async function functionCall(response: AxiosResponse<CreateChatCompletionResponse, any>,
  functionsSchema: Array<any>,
  functions: any,
  messages: Array<ChatCompletionRequestMessage>,
  username: string): Promise<any> {

  try {
    const fnName = response?.data.choices[0].message?.function_call?.name || ""
    let args = response?.data.choices[0].message?.function_call?.arguments || "{}";
    // 在这里加上我们需要的其他参数，例如 username
    const argsObj = { ...JSON.parse(args), username }
    args = JSON.stringify(argsObj)

    console.log("⚙️ Function call: " + fnName);
    console.log(`🔢 Arguments: `, argsObj);

    const fn = functions[fnName];
    const result: FunctionResponse = await fn(argsObj);

    if (result.save) {
      DBUtils.addRuntimeData(username, {
        name: "",
        data: result.data
      })
    }

    if (FunctionMessageBuilder.isDirectMsgType(result.msgType)) {
      return FunctionMessageBuilder.build(result)
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


    response = await getCompletion(messages, functionsSchema)
    if (checkFinishReason(response)) {
      return await functionCall(response, functionsSchema, functions, messages, username)
    }

    return response.data.choices[0].message?.content || ""
  } catch (error: any) {
    return error.message
  }
}

/**
 * 检查完成原因
 * @param response openai 响应
 * @param finish_reason 默认 function_call
 * @returns bool
 */
function checkFinishReason(
  response: AxiosResponse<CreateChatCompletionResponse, any>,
  finish_reason: string = "function_call"
): boolean {
  return response && response.data.choices[0].finish_reason === finish_reason;
}

export { chatgpt, dalle, whisper, keyProvider, chatWithFunctions };


