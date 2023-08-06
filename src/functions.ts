import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { config } from './config.js';
import { FunctionResponse, MessageType } from './interface.js';

export function createAmapTraffic() {
    const paramsSchema = z.object({
        city: z.string(),
        road: z.string(),
    });

    const name = 'amapTraffic';
    const description = "高德地图路况，实时交通态势，交通情况";
    let response: FunctionResponse = {
        msgType: MessageType.Text
    }
    const execute = async ({ city, road }: z.infer<typeof paramsSchema>) => {
        const url = `https://restapi.amap.com/v3/traffic/status/road?city=${encodeURIComponent(city)}&name=${encodeURIComponent(road)}&key=${config.amapApiKey}`
        const api = await fetch(url, { method: "get" })
        const res = await api.json()
        const { trafficinfo } = res
        response.data = trafficinfo
        return response;
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}


export function createMidjourney() {
    const paramsSchema = z.object({
        prompt: z.string(),
    });

    const name = 'midjourney';
    const description = "Midjourney,mj,ai 画图";
    let response: FunctionResponse = {
        msgType: MessageType.Image
    }
    const execute = async ({ prompt }: z.infer<typeof paramsSchema>) => {
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
                let taskUrl = `https://${config.mjApiHost}/mj/task/${result}/fetch`
                response.data = await getMjResult(taskUrl)
                return response
            }

            throw Error(`任务：${result} ${description}`)
        } catch (error: any) {
            console.log(error)
            response.data = `https://raster.shields.io/badge/server-${encodeURI(error.message)}-red`
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
    console.log(`progress:${progress} url:${url}`)
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

