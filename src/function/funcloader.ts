import { createAmapTraffic } from "./amap/register.js";
import { createCaiyunWeather } from "./caiyunweather/register.js";
import { createDuckduckgoSearch } from "./duckduckgo/regsiter.js";

import {
    createEwelinkAirConditionerSetPower,
    createEwelinkGetDevices,
    createEwelinkLoginInfo,
    createEwelinkSetTemperature
} from "./ewelink/register.js";
import { createMidjourney, createMidjourneyChange } from "./midjourney/register.js";
import { createText2Voice } from "./voice/regsiter.js";

export function functionLoader() {
    const [amapTraffic, amapTrafficSchema] = createAmapTraffic()
    const [midjourney, midjourneySchema] = createMidjourney()
    const [midjourneyChange, midjourneyChangeSchema] = createMidjourneyChange()
    const [ewelinkGetDevices, ewelinkDevicesSchema] = createEwelinkGetDevices()
    const [ewelinkGetLoginInfo, ewelinkLoginInfoSchema] = createEwelinkLoginInfo()
    const [ewelinkSetTemperature, ewelinkSetTemperatureSchema] = createEwelinkSetTemperature()
    const [ewelinkSetAirConditionerPower, ewelinkSetAirConditionerPowerSchema] = createEwelinkAirConditionerSetPower()
    const [duckduckgoSearch, duckduckgoSearchSchema] = createDuckduckgoSearch()
    const [text2Voice, text2VoiceSchema] = createText2Voice()
    const [caiyunWeather, caiyunWeatherSchema] = createCaiyunWeather()



    const functionsSchema = [
        amapTrafficSchema,
        midjourneySchema,
        midjourneyChangeSchema,
        ewelinkDevicesSchema,
        ewelinkLoginInfoSchema,
        ewelinkSetTemperatureSchema,
        ewelinkSetAirConditionerPowerSchema,
        duckduckgoSearchSchema,
        text2VoiceSchema,
        caiyunWeatherSchema,
    ];

    const functions = {
        amapTraffic,
        midjourney,
        midjourneyChange,
        ewelinkGetDevices,
        ewelinkGetLoginInfo,
        ewelinkSetTemperature,
        ewelinkSetAirConditionerPower,
        duckduckgoSearch,
        text2Voice,
        caiyunWeather,
    }

    return { functions, functionsSchema }
}