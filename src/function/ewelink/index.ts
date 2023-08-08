import ewelink from "ewelink-api";
import WebSocketAsPromised from 'websocket-as-promised';
import { config } from "../../config.js";
import { EwelinkStateMgr } from "./state.js";


let ewelinkMgr: EwelinkStateMgr

export function getMgr() {
    if (ewelinkMgr?.connection) return ewelinkMgr

    const connection = new ewelink({
        // @ts-ignore
        phoneNumber: config.ewelinkName,
        password: config.ewelinkPassword,
        region: config.ewelinkRegion,
        APP_ID: "4s1FXKC9FaGfoqXhmXSJneb3qcm1gOak",
        APP_SECRET: "oKvCM06gvwkRbfetd6qWRrbC3rFrbIpV"
    });

    ewelinkMgr = new EwelinkStateMgr(connection)
    return ewelinkMgr
}


export async function getLoginInfo() {
    const loginInfo = ewelinkMgr?.loginInfo || await getMgr().connection?.login()
    ewelinkMgr.loginInfo = loginInfo
    return loginInfo
}

export async function getDevices() {
    const devices = ewelinkMgr?.devices || await getMgr().connection?.getDevices()
    ewelinkMgr.devices = devices
    return devices
}


export async function setTemperature(temperature: number, deviceId: string, apikey: string, selfApikey: string) {
    const payload = JSON.stringify({
        ...basePayload(deviceId, apikey, selfApikey),
        'params': { temperature }
    })
    try {
        await (await getEwelinkMgrSocket()).send(payload)
        return true
    } catch (error: any) {
        console.error(`setTemperature error:${error.message}`)
        return false
    }

}


export async function airConditionerSetPower(power: string, deviceId: string, apikey: string, selfApikey: string) {
    const payload = JSON.stringify({
        ...basePayload(deviceId, apikey, selfApikey),
        'params': { power }
    })

    try {
        await (await getEwelinkMgrSocket()).send(payload)
        return true
    } catch (error: any) {
        console.error(`airConditionerSetPower error:${error.message}`)
        return false
    }
}


const basePayload = (deviceId: string, apikey: string, selfApikey: string) => {
    return {
        'action': 'update',
        'apikey': apikey,
        'selfApikey': selfApikey,
        'deviceid': deviceId,
        'userAgent': 'app',
        'sequence': new Date().getTime(),
        'ts': 0,
    }
}


async function getEwelinkMgrSocket(): Promise<WebSocketAsPromised> {
    let socket: any = null

    if (getMgr().socket) {
        socket = getMgr().socket
    } else {
        socket = await getMgr().connection?.openWebSocket(async data => {
            // data is the message from eWeLink
            console.log(`ewelink message:${JSON.stringify(data)}`)

        });

        ewelinkMgr.socket = socket
    }

    return socket
}
