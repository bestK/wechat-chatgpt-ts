

import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { FunctionResponse, MessageType } from '../../interface.js';

export function createDuckduckgoSearch() {
    const paramsSchema = z.object({
        keyword: z.string(),
    });

    const name = 'duckduckgoSearch';
    const description = "search on internet";
    let response: FunctionResponse = {
        msgType: MessageType.Text
    }
    const execute = async ({ keyword }: z.infer<typeof paramsSchema>) => {
        const url = `https://search.linkof.link/search?q=${keyword}&max_results=3`
        const api = await fetch(url, {
            method: 'get',
        });

        const res = await api.json()
        response.data = res
        return response
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

