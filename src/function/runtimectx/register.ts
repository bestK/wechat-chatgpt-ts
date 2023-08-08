
import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { FunctionResponse, MessageType, RuntimeDataCtx } from '../../interface.js';

export function createRuntimeDataSaver() {

    const paramsSchema = z.object({
        data: z.any()
    });

    const name = 'runtimeDataSaver';
    const description = "Useful for store runtime data info. if you got a data, you can use this tool to remember it. you will get 'true' if input data is OK. otherwise there will ba an error message.";

    let response: FunctionResponse = {
        msgType: MessageType.Text
    }
    const execute = async ({ data }: z.infer<typeof paramsSchema>) => {
        RuntimeDataCtx.save(data)
        response.data = true
        return response
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

export function createGetRuntimeData() {

    const paramsSchema = z.object({
        name: z.string({ description: "" })
    });

    const name = 'getRuntimeData';
    const description = "Useful for get save runtime data info. ";

    let response: FunctionResponse = {
        msgType: MessageType.Text
    }
    const execute = async ({ name }: z.infer<typeof paramsSchema>) => {
        response.data = RuntimeDataCtx.get(name)
        return response
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}