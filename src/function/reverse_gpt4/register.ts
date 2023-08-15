

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { FunctionResponse, MessageType } from '../../interface.js';

export function createReverseGPT4() {
    const paramsSchema = z.object({
        prompt: z.string(),
    });

    const name = 'reverseGPT4';
    const description = "gpt4";
    let response: FunctionResponse = {
        msgType: MessageType.Text
    }

    const configuration = new Configuration({
        apiKey: process.env.REVERSE_GPT4_KEY,
        basePath: process.env.REVERSE_GPT4_BASE_PATH
    });
    const openai = new OpenAIApi(configuration);

    const execute = async ({ prompt }: z.infer<typeof paramsSchema>) => {
        const messages: Array<ChatCompletionRequestMessage> = [{ role: 'user', content: prompt }]
        const gpt_response = await openai.createChatCompletion({
            messages: messages,
            model: 'gpt-4'
        })

        response.data = gpt_response.data.choices[0].message?.content

        return response
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

