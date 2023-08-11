
import axios from "axios";

import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { FunctionResponse, MessageType } from '../../interface.js';

export function createText2Voice() {
    const paramsSchema = z.object({
        text: z.string({ description: "转换成语音的文字信息" }),
    });

    const name = 'text2Voice';
    const description = "text to Voice,speech,说,说话";
    let response: FunctionResponse = {
        msgType: MessageType.Audio
    }
    const execute = async ({ text }: z.infer<typeof paramsSchema>) => {
        try {
            const res = await axios.request({
                timeout: 3000,
                method: "post",
                url: `https://douyin.zeabur.app/tts`,
                data: { "text": text, "format": "sil" },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            response.data = res.data
        } catch (error: any) {
            console.error(error.message)
            response.msgType = MessageType.RuntimeError
            response.data = text
        }

        return response
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

const fetchRequest = (url: string, params = {}, timeout = 10000) => {
    let isTimeout = false;
    return new Promise(function (resolve, reject) {
        const TO = setTimeout(function () {
            isTimeout = true;
            reject(new Error('Fetch timeout'));
        }, timeout);

        fetch(url, params)
            .then(res => {
                clearTimeout(TO)
                if (!isTimeout) {
                    resolve(res)
                }
            }).catch(e => {
                if (isTimeout) {
                    return
                }
                reject(e)
            })
    })
}