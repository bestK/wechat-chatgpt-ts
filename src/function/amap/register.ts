import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { config } from '../../config.js';
import { FunctionResponse, MessageType } from '../../interface.js';

export function createAmapTraffic() {
    const paramsSchema = z.object({
        city: z.string().default("深圳"),
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
