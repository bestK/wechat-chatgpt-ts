

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
        const body = JSON.stringify({ "text": text, "format": "sil" })
        const api = await fetch(`https://douyin.zeabur.app/tts`, {
            method: 'post',
            body: body,
            headers: {
                "content-type": "application/json",
            }
        })

        const res = await api.json()
        response.data = res
        return response
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

