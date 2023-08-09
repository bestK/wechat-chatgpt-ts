import { Tool } from "openai-function-calling-tools";
import { z } from "zod";
import { FunctionResponse, MessageType } from "../../interface.js";
import { airConditionerSetPower, allowUsers, getDevices, getLoginInfo, setTemperature } from "./index.js";

export function createEwelinkGetDevices() {
    const paramsSchema = z.object({
        username: z.string()
    });

    const name = 'ewelinkGetDevices';
    const description = "获取 ewelink 绑定设备";
    let response: FunctionResponse = {
        msgType: MessageType.Text,
        save: false
    }
    const execute = async ({ username }: z.infer<typeof paramsSchema>) => {
        assertAllowUser(username)
        const devices = await getDevices()
        response.data = devices
        return response;
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}



export function createEwelinkLoginInfo() {
    const paramsSchema = z.object({
        username: z.string()
    });

    const name = 'ewelinkGetLoginInfo';
    const description = "获取 ewelink 登录信息";
    let response: FunctionResponse = {
        msgType: MessageType.Text
    }
    const execute = async ({ username }: z.infer<typeof paramsSchema>) => {
        assertAllowUser(username)
        const loginInfo = await getLoginInfo()
        response.data = loginInfo
        return response;
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

export function createEwelinkSetTemperature() {
    const paramsSchema = z.object({
        temperature: z.number(),
        deviceId: z.string(),
        apikey: z.string(),
        selfApikey: z.string(),
        username: z.string()
    });

    const name = 'ewelinkSetTemperature';
    const description = "利用 ewelink 控制空调温度 set temperature";
    let response: FunctionResponse = {
        msgType: MessageType.Text,
        save: true
    }
    const execute = async ({ temperature, deviceId, apikey, selfApikey, username }: z.infer<typeof paramsSchema>) => {
        assertAllowUser(username)
        const result = await setTemperature(temperature, deviceId, apikey, selfApikey)
        response.data = result
        return response;
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}


export function createEwelinkAirConditionerSetPower() {
    const paramsSchema = z.object({
        power: z.string({ description: "this field value is on or off" }),
        deviceId: z.string(),
        apikey: z.string(),
        selfApikey: z.string(),
        username: z.string()
    });

    const name = 'ewelinkSetAirConditionerPower';
    const description = "利用 ewelink 控制空调开启关闭";
    let response: FunctionResponse = {
        msgType: MessageType.Text,
        save: true
    }
    const execute = async ({ power, deviceId, apikey, selfApikey, username }: z.infer<typeof paramsSchema>) => {
        assertAllowUser(username)
        const result = await airConditionerSetPower(power, deviceId, apikey, selfApikey)
        response.data = result
        return response;
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

function assertAllowUser(username: string) {
    if (!allowUsers.includes(username)) {
        throw new Error("🔒你无权进行此操作！");
    }
}