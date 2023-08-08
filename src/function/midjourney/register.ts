import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { config } from '../../config.js';
import DBUtils from '../../data.js';
import { FunctionResponse, MessageType, MidjourneyAction } from '../../interface.js';

const LAST_TASK_ID = "lastTaskId"

export function createMidjourney() {
    const paramsSchema = z.object({
        username: z.string(),
        prompt: z.string(),
    });

    const name = 'midjourney';
    const description = "Midjourney,mj,ai 画图,图片";
    let response: FunctionResponse = {
        msgType: MessageType.Image
    }
    const execute = async ({ username, prompt }: z.infer<typeof paramsSchema>) => {
        try {
            let url = `https://${config.mjApiHost}/mj/submit/imagine`
            const api = await fetch(url, {
                body: JSON.stringify({ "prompt": prompt }),
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "mj-api-secret": config.mjApiKey
                }
            });

            const res = await api.json()
            const { code, result, description } = res

            if (code == 1) {
                DBUtils.addRuntimeData(username, { name: LAST_TASK_ID, data: result }, true)
                let taskUrl = `https://${config.mjApiHost}/mj/task/${result}/fetch`
                response.data = await getMjResult(taskUrl)
                return response
            }

            throw Error(`任务：${result} ${description}`)
        } catch (error: any) {
            console.log(error)
            response.data = error.message
            response.msgType = MessageType.RuntimeError
            return response
        }

    };

    return new Tool(paramsSchema, name, description, execute).tool;
}



export function createMidjourneyChange() {
    const paramsSchema = z.object({
        username: z.string(),
        taskId: z.string({ description: "if null just null,don't try to make up the value" }),
        action: z.nativeEnum(MidjourneyAction).default(MidjourneyAction.UPSCALE),
        index: z.number({ description: "序号(1~4), action为UPSCALE,VARIATION时必传" })
    });

    const name = 'midjourneyChange';
    const description = "放大、 变换、 重新生成";
    let response: FunctionResponse = {
        msgType: MessageType.Image
    }
    const execute = async ({ username, taskId, action, index }: z.infer<typeof paramsSchema>) => {
        try {
            let url = `https://${config.mjApiHost}/mj/submit/change`

            taskId = (taskId && Number.isFinite(taskId)) || DBUtils.getRuntimeData(username, LAST_TASK_ID)?.data
            if (!taskId) throw Error(`未找到可以操作的图片，重新生成一张试试吧~`)

            const api = await fetch(url, {
                body: JSON.stringify({ action, taskId, index }),
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "mj-api-secret": config.mjApiKey
                }
            });

            const res = await api.json()
            const { code, result, description } = res

            if (code == 1) {
                DBUtils.addRuntimeData(username, { name: LAST_TASK_ID, data: result }, true)
                let taskUrl = `https://${config.mjApiHost}/mj/task/${result}/fetch`
                response.data = await getMjResult(taskUrl)
                return response
            }

            throw Error(`任务：${result} ${description}`)
        } catch (error: any) {
            console.log(error)
            response.data = error.message
            response.msgType = MessageType.RuntimeError
            return response
        }

    };

    return new Tool(paramsSchema, name, description, execute).tool;
}



async function getMjResult(url: string): Promise<string> {
    const api = await fetch(url, {
        method: "get",
        // @ts-ignore
        headers: { "mj-api-secret": config.mjApiKey }
    });
    const { status, imageUrl, failReason, progress } = await api.json()
    console.log(`status:${status} progress:${progress} url:${url}`)
    if (status == "FAILURE") throw Error(failReason)
    if (status != 'SUCCESS') {
        await sleep(3000)
        return await getMjResult(url)
    }
    return imageUrl
}



export function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
