import { config } from "../../config.js"

export async function address2geocode(address: string): Promise<string> {
    const url = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&key=${config.amapApiKey}`
    const api = await fetch(url, { method: "get" })
    const res = await api.json()
    return res.geocodes[0].location
}