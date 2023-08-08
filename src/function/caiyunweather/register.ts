import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { FunctionResponse, MessageType } from '../../interface.js';
import { address2geocode } from '../amap/index.js';


export function createCaiyunWeather() {
    const paramsSchema = z.object({
        city: z.string().default("深圳"),
    });

    const name = 'caiyunWeather';
    const description = "彩云天气 获取天气预报";
    let response: FunctionResponse = {
        msgType: MessageType.Text
    }
    const execute = async ({ city }: z.infer<typeof paramsSchema>) => {
        const location = await address2geocode(city)
        const url = `https://api.caiyunapp.com/v2.5/TAkhjf8d1nlSlspN/${location}/weather.json`
        const api = await fetch(url, { method: "get" })
        const res = await api.json()
        response.data = res.result.forecast_keypoint
        return response;
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}


function getLatitudeLongitudeByCity(city: string): string {
    const adcode = ADCODE.find(item => item.city.includes(city))
    return `${adcode?.longitude},${adcode?.latitude}`
}



const ADCODE = [
    {
        "adcode": 110000,
        "city": "北京市",
        "longitude": 116.407526,
        "latitude": 39.90403
    },
    {
        "adcode": 110100,
        "city": "北京市市辖区",
        "longitude": 116.407526,
        "latitude": 39.90403
    },
    {
        "adcode": 110101,
        "city": "北京市东城区",
        "longitude": 116.416357,
        "latitude": 39.928353
    },
    {
        "adcode": 110102,
        "city": "北京市西城区",
        "longitude": 116.365868,
        "latitude": 39.912289
    },
    {
        "adcode": 110105,
        "city": "北京市朝阳区",
        "longitude": 116.601144,
        "latitude": 39.948574
    },
    {
        "adcode": 110106,
        "city": "北京市丰台区",
        "longitude": 116.287149,
        "latitude": 39.858427
    },
    {
        "adcode": 110107,
        "city": "北京市石景山区",
        "longitude": 116.222982,
        "latitude": 39.906611
    },
    {
        "adcode": 110108,
        "city": "北京市海淀区",
        "longitude": 116.329519,
        "latitude": 39.972134
    },
    {
        "adcode": 110109,
        "city": "北京市门头沟区",
        "longitude": 116.102009,
        "latitude": 39.940646
    },
    {
        "adcode": 110111,
        "city": "北京市房山区",
        "longitude": 116.143267,
        "latitude": 39.749144
    },
    {
        "adcode": 110112,
        "city": "北京市通州区",
        "longitude": 116.656435,
        "latitude": 39.909946
    },
    {
        "adcode": 110113,
        "city": "北京市顺义区",
        "longitude": 116.654561,
        "latitude": 40.130347
    },
    {
        "adcode": 110114,
        "city": "北京市昌平区",
        "longitude": 116.231204,
        "latitude": 40.22066
    },
    {
        "adcode": 110115,
        "city": "北京市大兴区",
        "longitude": 116.341014,
        "latitude": 39.784747
    },
    {
        "adcode": 110116,
        "city": "北京市怀柔区",
        "longitude": 116.642349,
        "latitude": 40.315704
    },
    {
        "adcode": 110117,
        "city": "北京市平谷区",
        "longitude": 117.121383,
        "latitude": 40.140701
    },
    {
        "adcode": 110118,
        "city": "北京市密云区",
        "longitude": 116.843177,
        "latitude": 40.376834
    },
    {
        "adcode": 110119,
        "city": "北京市延庆区",
        "longitude": 115.974848,
        "latitude": 40.456951
    },
    {
        "adcode": 120000,
        "city": "天津市",
        "longitude": 117.200983,
        "latitude": 39.084158
    },
    {
        "adcode": 120100,
        "city": "天津市市辖区",
        "longitude": 117.200983,
        "latitude": 39.084158
    },
    {
        "adcode": 120101,
        "city": "天津市和平区",
        "longitude": 117.208125,
        "latitude": 39.118897
    },
    {
        "adcode": 120102,
        "city": "天津市河东区",
        "longitude": 117.251587,
        "latitude": 39.128291
    },
    {
        "adcode": 120103,
        "city": "天津市河西区",
        "longitude": 117.223372,
        "latitude": 39.109563
    },
    {
        "adcode": 120104,
        "city": "天津市南开区",
        "longitude": 117.150738,
        "latitude": 39.138203
    },
    {
        "adcode": 120105,
        "city": "天津市河北区",
        "longitude": 117.196648,
        "latitude": 39.147869
    },
    {
        "adcode": 120106,
        "city": "天津市红桥区",
        "longitude": 117.151533,
        "latitude": 39.167345
    },
    {
        "adcode": 120110,
        "city": "天津市东丽区",
        "longitude": 117.314324,
        "latitude": 39.086569
    },
    {
        "adcode": 120111,
        "city": "天津市西青区",
        "longitude": 117.013949,
        "latitude": 39.141591
    },
    {
        "adcode": 120112,
        "city": "天津市津南区",
        "longitude": 117.391976,
        "latitude": 38.984526
    },
    {
        "adcode": 120113,
        "city": "天津市北辰区",
        "longitude": 117.139343,
        "latitude": 39.217817
    },
    {
        "adcode": 120114,
        "city": "天津市武清区",
        "longitude": 117.044388,
        "latitude": 39.384119
    },
    {
        "adcode": 120115,
        "city": "天津市宝坻区",
        "longitude": 117.309863,
        "latitude": 39.717379
    },
    {
        "adcode": 120116,
        "city": "天津市滨海新区",
        "longitude": 117.78067,
        "latitude": 39.246083
    },
    {
        "adcode": 120117,
        "city": "天津市宁河区",
        "longitude": 117.826625,
        "latitude": 39.329858
    },
    {
        "adcode": 120118,
        "city": "天津市静海区",
        "longitude": 116.97413,
        "latitude": 38.947512
    },
    {
        "adcode": 120119,
        "city": "天津市蓟州区",
        "longitude": 117.408307,
        "latitude": 40.04606
    },
    {
        "adcode": 130000,
        "city": "河北省",
        "longitude": 114.468664,
        "latitude": 38.037057
    },
    {
        "adcode": 130100,
        "city": "河北省石家庄市",
        "longitude": 114.514859,
        "latitude": 38.042306
    },
    {
        "adcode": 130101,
        "city": "河北省石家庄市市辖区",
        "longitude": 114.514859,
        "latitude": 38.042306
    },
    {
        "adcode": 130102,
        "city": "河北省石家庄市长安区",
        "longitude": 114.53906,
        "latitude": 38.036654
    },
    {
        "adcode": 130104,
        "city": "河北省石家庄市桥西区",
        "longitude": 114.461154,
        "latitude": 38.004043
    },
    {
        "adcode": 130105,
        "city": "河北省石家庄市新华区",
        "longitude": 114.463347,
        "latitude": 38.05106
    },
    {
        "adcode": 130107,
        "city": "河北省石家庄市井陉矿区",
        "longitude": 114.058178,
        "latitude": 38.069748
    },
    {
        "adcode": 130108,
        "city": "河北省石家庄市裕华区",
        "longitude": 114.531362,
        "latitude": 38.006453
    },
    {
        "adcode": 130109,
        "city": "河北省石家庄市藁城区",
        "longitude": 114.847075,
        "latitude": 38.021567
    },
    {
        "adcode": 130110,
        "city": "河北省石家庄市鹿泉区",
        "longitude": 114.313724,
        "latitude": 38.085958
    },
    {
        "adcode": 130111,
        "city": "河北省石家庄市栾城区",
        "longitude": 114.648318,
        "latitude": 37.9002
    },
    {
        "adcode": 130121,
        "city": "河北省石家庄市井陉县",
        "longitude": 114.14524,
        "latitude": 38.032148
    },
    {
        "adcode": 130123,
        "city": "河北省石家庄市正定县",
        "longitude": 114.570941,
        "latitude": 38.146445
    },
    {
        "adcode": 130125,
        "city": "河北省石家庄市行唐县",
        "longitude": 114.552737,
        "latitude": 38.438411
    },
    {
        "adcode": 130126,
        "city": "河北省石家庄市灵寿县",
        "longitude": 114.37614,
        "latitude": 38.30611
    },
    {
        "adcode": 130127,
        "city": "河北省石家庄市高邑县",
        "longitude": 114.611433,
        "latitude": 37.615159
    },
    {
        "adcode": 130128,
        "city": "河北省石家庄市深泽县",
        "longitude": 115.20091,
        "latitude": 38.184072
    },
    {
        "adcode": 130129,
        "city": "河北省石家庄市赞皇县",
        "longitude": 114.386155,
        "latitude": 37.665576
    },
    {
        "adcode": 130130,
        "city": "河北省石家庄市无极县",
        "longitude": 114.976337,
        "latitude": 38.179141
    },
    {
        "adcode": 130131,
        "city": "河北省石家庄市平山县",
        "longitude": 114.199134,
        "latitude": 38.247144
    },
    {
        "adcode": 130132,
        "city": "河北省石家庄市元氏县",
        "longitude": 114.52558,
        "latitude": 37.766651
    },
    {
        "adcode": 130133,
        "city": "河北省石家庄市赵县",
        "longitude": 114.776187,
        "latitude": 37.756498
    },
    {
        "adcode": 130181,
        "city": "河北省石家庄市辛集市",
        "longitude": 115.218057,
        "latitude": 37.943315
    },
    {
        "adcode": 130183,
        "city": "河北省石家庄市晋州市",
        "longitude": 115.044185,
        "latitude": 38.033629
    },
    {
        "adcode": 130184,
        "city": "河北省石家庄市新乐市",
        "longitude": 114.684014,
        "latitude": 38.343296
    },
    {
        "adcode": 130200,
        "city": "河北省唐山市",
        "longitude": 118.180193,
        "latitude": 39.630867
    },
    {
        "adcode": 130201,
        "city": "河北省唐山市市辖区",
        "longitude": 118.180193,
        "latitude": 39.630867
    },
    {
        "adcode": 130202,
        "city": "河北省唐山市路南区",
        "longitude": 118.154354,
        "latitude": 39.625059
    },
    {
        "adcode": 130203,
        "city": "河北省唐山市路北区",
        "longitude": 118.200692,
        "latitude": 39.624437
    },
    {
        "adcode": 130204,
        "city": "河北省唐山市古冶区",
        "longitude": 118.447635,
        "latitude": 39.733578
    },
    {
        "adcode": 130205,
        "city": "河北省唐山市开平区",
        "longitude": 118.261842,
        "latitude": 39.671001
    },
    {
        "adcode": 130207,
        "city": "河北省唐山市丰南区",
        "longitude": 118.085169,
        "latitude": 39.576031
    },
    {
        "adcode": 130208,
        "city": "河北省唐山市丰润区",
        "longitude": 118.162216,
        "latitude": 39.832582
    },
    {
        "adcode": 130209,
        "city": "河北省唐山市曹妃甸区",
        "longitude": 118.460379,
        "latitude": 39.27307
    },
    {
        "adcode": 130224,
        "city": "河北省唐山市滦南县",
        "longitude": 118.682379,
        "latitude": 39.518997
    },
    {
        "adcode": 130225,
        "city": "河北省唐山市乐亭县",
        "longitude": 118.912571,
        "latitude": 39.425608
    },
    {
        "adcode": 130227,
        "city": "河北省唐山市迁西县",
        "longitude": 118.314715,
        "latitude": 40.1415
    },
    {
        "adcode": 130229,
        "city": "河北省唐山市玉田县",
        "longitude": 117.738658,
        "latitude": 39.900401
    },
    {
        "adcode": 130281,
        "city": "河北省唐山市遵化市",
        "longitude": 117.965892,
        "latitude": 40.189202
    },
    {
        "adcode": 130283,
        "city": "河北省唐山市迁安市",
        "longitude": 118.701144,
        "latitude": 39.999175
    },
    {
        "adcode": 130284,
        "city": "河北省唐山市滦县滦州",
        "longitude": 118.689775,
        "latitude": 39.74038
    },
    {
        "adcode": 130300,
        "city": "河北省秦皇岛市",
        "longitude": 119.600492,
        "latitude": 39.935385
    },
    {
        "adcode": 130301,
        "city": "河北省秦皇岛市市辖区",
        "longitude": 119.600492,
        "latitude": 39.935385
    },
    {
        "adcode": 130302,
        "city": "河北省秦皇岛市海港区",
        "longitude": 119.564962,
        "latitude": 39.94756
    },
    {
        "adcode": 130303,
        "city": "河北省秦皇岛市山海关区",
        "longitude": 119.775799,
        "latitude": 39.978849
    },
    {
        "adcode": 130304,
        "city": "河北省秦皇岛市北戴河区",
        "longitude": 119.488914,
        "latitude": 39.834751
    },
    {
        "adcode": 130306,
        "city": "河北省秦皇岛市抚宁区",
        "longitude": 119.235739,
        "latitude": 39.889241
    },
    {
        "adcode": 130321,
        "city": "河北省秦皇岛市青龙满族自治县",
        "longitude": 118.949684,
        "latitude": 40.407578
    },
    {
        "adcode": 130322,
        "city": "河北省秦皇岛市昌黎县",
        "longitude": 119.162694,
        "latitude": 39.712813
    },
    {
        "adcode": 130324,
        "city": "河北省秦皇岛市卢龙县",
        "longitude": 118.892986,
        "latitude": 39.891947
    },
    {
        "adcode": 130400,
        "city": "河北省邯郸市",
        "longitude": 114.538961,
        "latitude": 36.625657
    },
    {
        "adcode": 130401,
        "city": "河北省邯郸市市辖区",
        "longitude": 114.538961,
        "latitude": 36.625657
    },
    {
        "adcode": 130402,
        "city": "河北省邯郸市邯山区",
        "longitude": 114.490431,
        "latitude": 36.580358
    },
    {
        "adcode": 130403,
        "city": "河北省邯郸市丛台区",
        "longitude": 114.492897,
        "latitude": 36.63641
    },
    {
        "adcode": 130404,
        "city": "河北省邯郸市复兴区",
        "longitude": 114.462058,
        "latitude": 36.639022
    },
    {
        "adcode": 130406,
        "city": "河北省邯郸市峰峰矿区",
        "longitude": 114.209936,
        "latitude": 36.420487
    },
    {
        "adcode": 130407,
        "city": "河北省邯郸市肥乡区",
        "longitude": 114.800166,
        "latitude": 36.548132
    },
    {
        "adcode": 130408,
        "city": "河北省邯郸市永年区",
        "longitude": 114.5438,
        "latitude": 36.7441
    },
    {
        "adcode": 130423,
        "city": "河北省邯郸市临漳县",
        "longitude": 114.619544,
        "latitude": 36.3353
    },
    {
        "adcode": 130424,
        "city": "河北省邯郸市成安县",
        "longitude": 114.670032,
        "latitude": 36.444407
    },
    {
        "adcode": 130425,
        "city": "河北省邯郸市大名县",
        "longitude": 115.147814,
        "latitude": 36.285616
    },
    {
        "adcode": 130426,
        "city": "河北省邯郸市涉县",
        "longitude": 113.691401,
        "latitude": 36.584995
    },
    {
        "adcode": 130427,
        "city": "河北省邯郸市磁县",
        "longitude": 114.373947,
        "latitude": 36.374012
    },
    {
        "adcode": 130430,
        "city": "河北省邯郸市邱县",
        "longitude": 115.186792,
        "latitude": 36.811133
    },
    {
        "adcode": 130431,
        "city": "河北省邯郸市鸡泽县",
        "longitude": 114.878299,
        "latitude": 36.92035
    },
    {
        "adcode": 130432,
        "city": "河北省邯郸市广平县",
        "longitude": 114.948607,
        "latitude": 36.483484
    },
    {
        "adcode": 130433,
        "city": "河北省邯郸市馆陶县",
        "longitude": 115.282468,
        "latitude": 36.547557
    },
    {
        "adcode": 130434,
        "city": "河北省邯郸市魏县",
        "longitude": 114.938976,
        "latitude": 36.359861
    },
    {
        "adcode": 130435,
        "city": "河北省邯郸市曲周县",
        "longitude": 114.945131,
        "latitude": 36.78017
    },
    {
        "adcode": 130481,
        "city": "河北省邯郸市武安市",
        "longitude": 114.203697,
        "latitude": 36.696506
    },
    {
        "adcode": 130500,
        "city": "河北省邢台市",
        "longitude": 114.504844,
        "latitude": 37.070589
    },
    {
        "adcode": 130501,
        "city": "河北省邢台市市辖区",
        "longitude": 114.504844,
        "latitude": 37.070589
    },
    {
        "adcode": 130502,
        "city": "河北省邢台市桥东区",
        "longitude": 114.492019,
        "latitude": 37.061614
    },
    {
        "adcode": 130503,
        "city": "河北省邢台市桥西区",
        "longitude": 114.468435,
        "latitude": 37.059882
    },
    {
        "adcode": 130521,
        "city": "河北省邢台市桥东区",
        "longitude": 114.507416,
        "latitude": 37.072954
    },
    {
        "adcode": 130522,
        "city": "河北省邢台市临城县",
        "longitude": 114.498762,
        "latitude": 37.444499
    },
    {
        "adcode": 130523,
        "city": "河北省邢台市内丘县",
        "longitude": 114.512128,
        "latitude": 37.286669
    },
    {
        "adcode": 130524,
        "city": "河北省邢台市柏乡县",
        "longitude": 114.693426,
        "latitude": 37.482423
    },
    {
        "adcode": 130525,
        "city": "河北省邢台市隆尧县",
        "longitude": 114.770419,
        "latitude": 37.350173
    },
    {
        "adcode": 130526,
        "city": "河北省邢台市任县",
        "longitude": 114.671936,
        "latitude": 37.120983
    },
    {
        "adcode": 130527,
        "city": "河北省邢台市南和县",
        "longitude": 114.683762,
        "latitude": 37.005041
    },
    {
        "adcode": 130528,
        "city": "河北省邢台市宁晋县",
        "longitude": 114.919301,
        "latitude": 37.619886
    },
    {
        "adcode": 130529,
        "city": "河北省邢台市巨鹿县",
        "longitude": 115.037478,
        "latitude": 37.221112
    },
    {
        "adcode": 130530,
        "city": "河北省邢台市新河县",
        "longitude": 115.242014,
        "latitude": 37.528712
    },
    {
        "adcode": 130531,
        "city": "河北省邢台市广宗县",
        "longitude": 115.142607,
        "latitude": 37.07466
    },
    {
        "adcode": 130532,
        "city": "河北省邢台市平乡县",
        "longitude": 115.030076,
        "latitude": 37.063148
    },
    {
        "adcode": 130533,
        "city": "河北省邢台市威县",
        "longitude": 115.266783,
        "latitude": 36.975321
    },
    {
        "adcode": 130534,
        "city": "河北省邢台市清河县",
        "longitude": 115.667576,
        "latitude": 37.040087
    },
    {
        "adcode": 130535,
        "city": "河北省邢台市临西县",
        "longitude": 115.501048,
        "latitude": 36.870813
    },
    {
        "adcode": 130581,
        "city": "河北省邢台市南宫市",
        "longitude": 115.408748,
        "latitude": 37.359264
    },
    {
        "adcode": 130582,
        "city": "河北省邢台市沙河市",
        "longitude": 114.503335,
        "latitude": 36.854922
    },
    {
        "adcode": 130600,
        "city": "河北省保定市",
        "longitude": 115.464806,
        "latitude": 38.873891
    },
    {
        "adcode": 130601,
        "city": "河北省保定市市辖区",
        "longitude": 115.464806,
        "latitude": 38.873891
    },
    {
        "adcode": 130602,
        "city": "河北省保定市竞秀区",
        "longitude": 115.458669,
        "latitude": 38.877561
    },
    {
        "adcode": 130606,
        "city": "河北省保定市莲池区",
        "longitude": 115.497342,
        "latitude": 38.883209
    },
    {
        "adcode": 130607,
        "city": "河北省保定市满城区",
        "longitude": 115.322351,
        "latitude": 38.948955
    },
    {
        "adcode": 130608,
        "city": "河北省保定市清苑区",
        "longitude": 115.489968,
        "latitude": 38.765041
    },
    {
        "adcode": 130609,
        "city": "河北省保定市徐水区",
        "longitude": 115.62441,
        "latitude": 39.026233
    },
    {
        "adcode": 130623,
        "city": "河北省保定市涞水县",
        "longitude": 115.713905,
        "latitude": 39.394317
    },
    {
        "adcode": 130624,
        "city": "河北省保定市阜平县",
        "longitude": 114.195104,
        "latitude": 38.849152
    },
    {
        "adcode": 130626,
        "city": "河北省保定市定兴县",
        "longitude": 115.808175,
        "latitude": 39.263018
    },
    {
        "adcode": 130627,
        "city": "河北省保定市唐县",
        "longitude": 114.982972,
        "latitude": 38.748204
    },
    {
        "adcode": 130628,
        "city": "河北省保定市高阳县",
        "longitude": 115.778965,
        "latitude": 38.700088
    },
    {
        "adcode": 130629,
        "city": "河北省保定市容城县",
        "longitude": 115.861657,
        "latitude": 39.042784
    },
    {
        "adcode": 130630,
        "city": "河北省保定市涞源县",
        "longitude": 114.694284,
        "latitude": 39.360247
    },
    {
        "adcode": 130631,
        "city": "河北省保定市望都县",
        "longitude": 115.154511,
        "latitude": 38.695736
    },
    {
        "adcode": 130632,
        "city": "河北省保定市安新县",
        "longitude": 115.935553,
        "latitude": 38.935364
    },
    {
        "adcode": 130633,
        "city": "河北省保定市易县",
        "longitude": 115.497509,
        "latitude": 39.349398
    },
    {
        "adcode": 130634,
        "city": "河北省保定市曲阳县",
        "longitude": 114.74497,
        "latitude": 38.622242
    },
    {
        "adcode": 130635,
        "city": "河北省保定市蠡县",
        "longitude": 115.583855,
        "latitude": 38.488056
    },
    {
        "adcode": 130636,
        "city": "河北省保定市顺平县",
        "longitude": 115.13547,
        "latitude": 38.837487
    },
    {
        "adcode": 130637,
        "city": "河北省保定市博野县",
        "longitude": 115.46438,
        "latitude": 38.457364
    },
    {
        "adcode": 130638,
        "city": "河北省保定市雄县",
        "longitude": 116.10865,
        "latitude": 38.99455
    },
    {
        "adcode": 130681,
        "city": "河北省保定市涿州市",
        "longitude": 115.974422,
        "latitude": 39.485283
    },
    {
        "adcode": 130682,
        "city": "河北省保定市定州市",
        "longitude": 114.990159,
        "latitude": 38.516174
    },
    {
        "adcode": 130683,
        "city": "河北省保定市安国市",
        "longitude": 115.326647,
        "latitude": 38.41844
    },
    {
        "adcode": 130684,
        "city": "河北省保定市高碑店市",
        "longitude": 115.873758,
        "latitude": 39.326521
    },
    {
        "adcode": 130700,
        "city": "河北省张家口市",
        "longitude": 114.887543,
        "latitude": 40.824418
    },
    {
        "adcode": 130701,
        "city": "河北省张家口市市辖区",
        "longitude": 114.887543,
        "latitude": 40.824418
    },
    {
        "adcode": 130702,
        "city": "河北省张家口市桥东区",
        "longitude": 114.894341,
        "latitude": 40.788457
    },
    {
        "adcode": 130703,
        "city": "河北省张家口市桥西区",
        "longitude": 114.869407,
        "latitude": 40.819564
    },
    {
        "adcode": 130705,
        "city": "河北省张家口市宣化区",
        "longitude": 115.09951,
        "latitude": 40.608726
    },
    {
        "adcode": 130706,
        "city": "河北省张家口市下花园区",
        "longitude": 115.287352,
        "latitude": 40.502652
    },
    {
        "adcode": 130708,
        "city": "河北省张家口市万全区",
        "longitude": 114.74056,
        "latitude": 40.766898
    },
    {
        "adcode": 130709,
        "city": "河北省张家口市崇礼区",
        "longitude": 115.282669,
        "latitude": 40.974676
    },
    {
        "adcode": 130722,
        "city": "河北省张家口市张北县",
        "longitude": 114.720086,
        "latitude": 41.158557
    },
    {
        "adcode": 130723,
        "city": "河北省张家口市康保县",
        "longitude": 114.600404,
        "latitude": 41.852368
    },
    {
        "adcode": 130724,
        "city": "河北省张家口市沽源县",
        "longitude": 115.688692,
        "latitude": 41.669668
    },
    {
        "adcode": 130725,
        "city": "河北省张家口市尚义县",
        "longitude": 113.969619,
        "latitude": 41.076227
    },
    {
        "adcode": 130726,
        "city": "河北省张家口市蔚县",
        "longitude": 114.588903,
        "latitude": 39.840843
    },
    {
        "adcode": 130727,
        "city": "河北省张家口市阳原县",
        "longitude": 114.150388,
        "latitude": 40.103742
    },
    {
        "adcode": 130728,
        "city": "河北省张家口市怀安县",
        "longitude": 114.385791,
        "latitude": 40.674193
    },
    {
        "adcode": 130730,
        "city": "河北省张家口市怀来县",
        "longitude": 115.517862,
        "latitude": 40.415343
    },
    {
        "adcode": 130731,
        "city": "河北省张家口市涿鹿县",
        "longitude": 115.205345,
        "latitude": 40.379563
    },
    {
        "adcode": 130732,
        "city": "河北省张家口市赤城县",
        "longitude": 115.831499,
        "latitude": 40.912921
    },
    {
        "adcode": 130800,
        "city": "河北省承德市",
        "longitude": 117.96241,
        "latitude": 40.954071
    },
    {
        "adcode": 130801,
        "city": "河北省承德市市辖区",
        "longitude": 117.96241,
        "latitude": 40.954071
    },
    {
        "adcode": 130802,
        "city": "河北省承德市双桥区",
        "longitude": 117.943348,
        "latitude": 40.97465
    },
    {
        "adcode": 130803,
        "city": "河北省承德市双滦区",
        "longitude": 117.799912,
        "latitude": 40.959196
    },
    {
        "adcode": 130804,
        "city": "河北省承德市鹰手营子矿区",
        "longitude": 117.661156,
        "latitude": 40.546956
    },
    {
        "adcode": 130821,
        "city": "河北省承德市承德县",
        "longitude": 118.173825,
        "latitude": 40.768238
    },
    {
        "adcode": 130822,
        "city": "河北省承德市兴隆县",
        "longitude": 117.500558,
        "latitude": 40.417358
    },
    {
        "adcode": 130824,
        "city": "河北省承德市滦平县",
        "longitude": 117.332801,
        "latitude": 40.941482
    },
    {
        "adcode": 130825,
        "city": "河北省承德市隆化县",
        "longitude": 117.738938,
        "latitude": 41.313791
    },
    {
        "adcode": 130826,
        "city": "河北省承德市丰宁满族自治县",
        "longitude": 116.645988,
        "latitude": 41.208949
    },
    {
        "adcode": 130827,
        "city": "河北省承德市宽城满族自治县",
        "longitude": 118.485313,
        "latitude": 40.611391
    },
    {
        "adcode": 130828,
        "city": "河北省承德市围场满族蒙古族自治县",
        "longitude": 117.760159,
        "latitude": 41.938529
    },
    {
        "adcode": 130881,
        "city": "河北省承德市平泉市",
        "longitude": 114.5919465,
        "latitude": 36.0586155
    },
    {
        "adcode": 130900,
        "city": "河北省沧州市",
        "longitude": 116.838834,
        "latitude": 38.304477
    },
    {
        "adcode": 130901,
        "city": "河北省沧州市市辖区",
        "longitude": 116.838834,
        "latitude": 38.304477
    },
    {
        "adcode": 130902,
        "city": "河北省沧州市新华区",
        "longitude": 116.866284,
        "latitude": 38.314416
    },
    {
        "adcode": 130903,
        "city": "河北省沧州市运河区",
        "longitude": 116.832276,
        "latitude": 38.310143
    },
    {
        "adcode": 130921,
        "city": "河北省沧州市沧县",
        "longitude": 117.007478,
        "latitude": 38.219856
    },
    {
        "adcode": 130922,
        "city": "河北省沧州市青县",
        "longitude": 116.804306,
        "latitude": 38.583021
    },
    {
        "adcode": 130923,
        "city": "河北省沧州市东光县",
        "longitude": 116.537067,
        "latitude": 37.888248
    },
    {
        "adcode": 130924,
        "city": "河北省沧州市海兴县",
        "longitude": 117.496606,
        "latitude": 38.141582
    },
    {
        "adcode": 130925,
        "city": "河北省沧州市盐山县",
        "longitude": 117.230603,
        "latitude": 38.058088
    },
    {
        "adcode": 130926,
        "city": "河北省沧州市肃宁县",
        "longitude": 115.829758,
        "latitude": 38.422802
    },
    {
        "adcode": 130927,
        "city": "河北省沧州市南皮县",
        "longitude": 116.708104,
        "latitude": 38.038584
    },
    {
        "adcode": 130928,
        "city": "河北省沧州市吴桥县",
        "longitude": 116.391508,
        "latitude": 37.627661
    },
    {
        "adcode": 130929,
        "city": "河北省沧州市献县",
        "longitude": 116.122802,
        "latitude": 38.190144
    },
    {
        "adcode": 130930,
        "city": "河北省沧州市孟村回族自治县",
        "longitude": 117.104298,
        "latitude": 38.053409
    },
    {
        "adcode": 130981,
        "city": "河北省沧州市泊头市",
        "longitude": 116.578368,
        "latitude": 38.083437
    },
    {
        "adcode": 130982,
        "city": "河北省沧州市任丘市",
        "longitude": 116.082918,
        "latitude": 38.683592
    },
    {
        "adcode": 130983,
        "city": "河北省沧州市黄骅市",
        "longitude": 117.330048,
        "latitude": 38.371383
    },
    {
        "adcode": 130984,
        "city": "河北省沧州市河间市",
        "longitude": 116.099518,
        "latitude": 38.446624
    },
    {
        "adcode": 131000,
        "city": "河北省廊坊市",
        "longitude": 116.683752,
        "latitude": 39.538047
    },
    {
        "adcode": 131001,
        "city": "河北省廊坊市市辖区",
        "longitude": 116.683752,
        "latitude": 39.538047
    },
    {
        "adcode": 131002,
        "city": "河北省廊坊市安次区",
        "longitude": 116.694544,
        "latitude": 39.502569
    },
    {
        "adcode": 131003,
        "city": "河北省廊坊市广阳区",
        "longitude": 116.71069,
        "latitude": 39.522786
    },
    {
        "adcode": 131022,
        "city": "河北省廊坊市固安县",
        "longitude": 116.298657,
        "latitude": 39.438214
    },
    {
        "adcode": 131023,
        "city": "河北省廊坊市永清县",
        "longitude": 116.499028,
        "latitude": 39.321794
    },
    {
        "adcode": 131024,
        "city": "河北省廊坊市香河县",
        "longitude": 117.006093,
        "latitude": 39.761424
    },
    {
        "adcode": 131025,
        "city": "河北省廊坊市大城县",
        "longitude": 116.653794,
        "latitude": 38.705449
    },
    {
        "adcode": 131026,
        "city": "河北省廊坊市文安县",
        "longitude": 116.457858,
        "latitude": 38.873281
    },
    {
        "adcode": 131028,
        "city": "河北省廊坊市大厂回族自治县",
        "longitude": 116.989574,
        "latitude": 39.886547
    },
    {
        "adcode": 131081,
        "city": "河北省廊坊市霸州市",
        "longitude": 116.391386,
        "latitude": 39.125898
    },
    {
        "adcode": 131082,
        "city": "河北省廊坊市三河市",
        "longitude": 117.078295,
        "latitude": 39.982718
    },
    {
        "adcode": 131100,
        "city": "河北省衡水市",
        "longitude": 115.670177,
        "latitude": 37.73892
    },
    {
        "adcode": 131101,
        "city": "河北省衡水市市辖区",
        "longitude": 115.670177,
        "latitude": 37.73892
    },
    {
        "adcode": 131102,
        "city": "河北省衡水市桃城区",
        "longitude": 115.675422,
        "latitude": 37.735369
    },
    {
        "adcode": 131103,
        "city": "河北省衡水市冀州区",
        "longitude": 115.579334,
        "latitude": 37.550821
    },
    {
        "adcode": 131121,
        "city": "河北省衡水市枣强县",
        "longitude": 115.72426,
        "latitude": 37.513417
    },
    {
        "adcode": 131122,
        "city": "河北省衡水市武邑县",
        "longitude": 115.887655,
        "latitude": 37.801658
    },
    {
        "adcode": 131123,
        "city": "河北省衡水市武强县",
        "longitude": 115.982461,
        "latitude": 38.041368
    },
    {
        "adcode": 131124,
        "city": "河北省衡水市饶阳县",
        "longitude": 115.725833,
        "latitude": 38.235892
    },
    {
        "adcode": 131125,
        "city": "河北省衡水市安平县",
        "longitude": 115.519216,
        "latitude": 38.23451
    },
    {
        "adcode": 131126,
        "city": "河北省衡水市故城县",
        "longitude": 115.965874,
        "latitude": 37.34741
    },
    {
        "adcode": 131127,
        "city": "河北省衡水市景县",
        "longitude": 116.270648,
        "latitude": 37.69229
    },
    {
        "adcode": 131128,
        "city": "河北省衡水市阜城县",
        "longitude": 116.144418,
        "latitude": 37.868872
    },
    {
        "adcode": 131182,
        "city": "河北省衡水市深州市",
        "longitude": 115.559574,
        "latitude": 38.001536
    },
    {
        "adcode": 140000,
        "city": "山西省",
        "longitude": 112.562398,
        "latitude": 37.873531
    },
    {
        "adcode": 140100,
        "city": "山西省太原市",
        "longitude": 112.548879,
        "latitude": 37.87059
    },
    {
        "adcode": 140101,
        "city": "山西省太原市市辖区",
        "longitude": 112.548879,
        "latitude": 37.87059
    },
    {
        "adcode": 140105,
        "city": "山西省太原市小店区",
        "longitude": 112.564306,
        "latitude": 37.742941
    },
    {
        "adcode": 140106,
        "city": "山西省太原市迎泽区",
        "longitude": 112.5634,
        "latitude": 37.863451
    },
    {
        "adcode": 140107,
        "city": "山西省太原市杏花岭区",
        "longitude": 112.570605,
        "latitude": 37.893955
    },
    {
        "adcode": 140108,
        "city": "山西省太原市尖草坪区",
        "longitude": 112.486691,
        "latitude": 37.940387
    },
    {
        "adcode": 140109,
        "city": "山西省太原市万柏林区",
        "longitude": 112.515748,
        "latitude": 37.859447
    },
    {
        "adcode": 140110,
        "city": "山西省太原市晋源区",
        "longitude": 112.47794,
        "latitude": 37.715193
    },
    {
        "adcode": 140121,
        "city": "山西省太原市清徐县",
        "longitude": 112.358667,
        "latitude": 37.607443
    },
    {
        "adcode": 140122,
        "city": "山西省太原市阳曲县",
        "longitude": 112.672953,
        "latitude": 38.058489
    },
    {
        "adcode": 140123,
        "city": "山西省太原市娄烦县",
        "longitude": 111.797083,
        "latitude": 38.067932
    },
    {
        "adcode": 140181,
        "city": "山西省太原市古交市",
        "longitude": 112.175875,
        "latitude": 37.907109
    },
    {
        "adcode": 140200,
        "city": "山西省大同市",
        "longitude": 113.300129,
        "latitude": 40.076762
    },
    {
        "adcode": 140201,
        "city": "山西省大同市市辖区",
        "longitude": 113.300129,
        "latitude": 40.076762
    },
    {
        "adcode": 140212,
        "city": "山西省大同市新荣区",
        "longitude": 113.140005,
        "latitude": 40.255866
    },
    {
        "adcode": 140213,
        "city": "山西省大同市平城区",
        "longitude": 113.2988855,
        "latitude": 40.075708
    },
    {
        "adcode": 140214,
        "city": "山西省大同市南郊区云冈",
        "longitude": 113.130769,
        "latitude": 40.109395
    },
    {
        "adcode": 140215,
        "city": "山西省大同市云州区",
        "longitude": 113.2988855,
        "latitude": 40.075708
    },
    {
        "adcode": 140221,
        "city": "山西省大同市阳高县",
        "longitude": 113.748945,
        "latitude": 40.36106
    },
    {
        "adcode": 140222,
        "city": "山西省大同市天镇县",
        "longitude": 114.090867,
        "latitude": 40.420237
    },
    {
        "adcode": 140223,
        "city": "山西省大同市广灵县",
        "longitude": 114.274025,
        "latitude": 39.761749
    },
    {
        "adcode": 140224,
        "city": "山西省大同市灵丘县",
        "longitude": 114.23435,
        "latitude": 39.442406
    },
    {
        "adcode": 140225,
        "city": "山西省大同市浑源县",
        "longitude": 113.699475,
        "latitude": 39.693407
    },
    {
        "adcode": 140226,
        "city": "山西省大同市左云县",
        "longitude": 112.703008,
        "latitude": 40.013442
    },
    {
        "adcode": 140300,
        "city": "山西省阳泉市",
        "longitude": 113.580519,
        "latitude": 37.856971
    },
    {
        "adcode": 140301,
        "city": "山西省阳泉市市辖区",
        "longitude": 113.580519,
        "latitude": 37.856971
    },
    {
        "adcode": 140302,
        "city": "山西省阳泉市城区",
        "longitude": 113.60067,
        "latitude": 37.847437
    },
    {
        "adcode": 140303,
        "city": "山西省阳泉市矿区",
        "longitude": 113.580519,
        "latitude": 37.856971
    },
    {
        "adcode": 140311,
        "city": "山西省阳泉市郊区",
        "longitude": 113.594164,
        "latitude": 37.944679
    },
    {
        "adcode": 140321,
        "city": "山西省阳泉市平定县",
        "longitude": 113.657841,
        "latitude": 37.786653
    },
    {
        "adcode": 140322,
        "city": "山西省阳泉市盂县",
        "longitude": 113.41233,
        "latitude": 38.085619
    },
    {
        "adcode": 140400,
        "city": "山西省长治市",
        "longitude": 113.116255,
        "latitude": 36.195386
    },
    {
        "adcode": 140401,
        "city": "山西省长治市市辖区",
        "longitude": 113.116255,
        "latitude": 36.195386
    },
    {
        "adcode": 140403,
        "city": "山西省长治市潞州区",
        "longitude": 113.6132985,
        "latitude": 40.0403365
    },
    {
        "adcode": 140404,
        "city": "山西省长治市城区上党",
        "longitude": 113.11121,
        "latitude": 36.187185
    },
    {
        "adcode": 140405,
        "city": "山西省长治市屯留区",
        "longitude": 113.1237605,
        "latitude": 36.2034125
    },
    {
        "adcode": 140406,
        "city": "山西省长治市潞城区",
        "longitude": 112.8930095,
        "latitude": 36.3159725
    },
    {
        "adcode": 140423,
        "city": "山西省长治市襄垣县",
        "longitude": 113.051491,
        "latitude": 36.535817
    },
    {
        "adcode": 140425,
        "city": "山西省长治市平顺县",
        "longitude": 113.435961,
        "latitude": 36.200179
    },
    {
        "adcode": 140426,
        "city": "山西省长治市黎城县",
        "longitude": 113.386544,
        "latitude": 36.503621
    },
    {
        "adcode": 140427,
        "city": "山西省长治市壶关县",
        "longitude": 113.207049,
        "latitude": 36.115449
    },
    {
        "adcode": 140428,
        "city": "山西省长治市长子县",
        "longitude": 112.8779,
        "latitude": 36.122334
    },
    {
        "adcode": 140429,
        "city": "山西省长治市武乡县",
        "longitude": 112.864562,
        "latitude": 36.837625
    },
    {
        "adcode": 140430,
        "city": "山西省长治市沁县",
        "longitude": 112.699226,
        "latitude": 36.756064
    },
    {
        "adcode": 140431,
        "city": "山西省长治市沁源县",
        "longitude": 112.337446,
        "latitude": 36.5002
    },
    {
        "adcode": 140500,
        "city": "山西省晋城市",
        "longitude": 112.851831,
        "latitude": 35.490701
    },
    {
        "adcode": 140501,
        "city": "山西省晋城市市辖区",
        "longitude": 112.851831,
        "latitude": 35.490701
    },
    {
        "adcode": 140502,
        "city": "山西省晋城市城区",
        "longitude": 112.853555,
        "latitude": 35.501572
    },
    {
        "adcode": 140521,
        "city": "山西省晋城市沁水县",
        "longitude": 112.186739,
        "latitude": 35.690141
    },
    {
        "adcode": 140522,
        "city": "山西省晋城市阳城县",
        "longitude": 112.414738,
        "latitude": 35.486029
    },
    {
        "adcode": 140524,
        "city": "山西省晋城市陵川县",
        "longitude": 113.280688,
        "latitude": 35.775685
    },
    {
        "adcode": 140525,
        "city": "山西省晋城市泽州县",
        "longitude": 112.899137,
        "latitude": 35.617221
    },
    {
        "adcode": 140581,
        "city": "山西省晋城市高平市",
        "longitude": 112.92392,
        "latitude": 35.797997
    },
    {
        "adcode": 140600,
        "city": "山西省朔州市",
        "longitude": 112.432825,
        "latitude": 39.331595
    },
    {
        "adcode": 140601,
        "city": "山西省朔州市市辖区",
        "longitude": 112.432825,
        "latitude": 39.331595
    },
    {
        "adcode": 140602,
        "city": "山西省朔州市朔城区",
        "longitude": 112.43225,
        "latitude": 39.31894
    },
    {
        "adcode": 140603,
        "city": "山西省朔州市平鲁区",
        "longitude": 112.288331,
        "latitude": 39.512155
    },
    {
        "adcode": 140621,
        "city": "山西省朔州市山阴县",
        "longitude": 112.8166,
        "latitude": 39.526227
    },
    {
        "adcode": 140622,
        "city": "山西省朔州市应县",
        "longitude": 113.191099,
        "latitude": 39.554247
    },
    {
        "adcode": 140623,
        "city": "山西省朔州市右玉县",
        "longitude": 112.466989,
        "latitude": 39.989064
    },
    {
        "adcode": 140681,
        "city": "山西省朔州市怀仁县怀仁",
        "longitude": 113.118504,
        "latitude": 39.810401
    },
    {
        "adcode": 140700,
        "city": "山西省晋中市",
        "longitude": 112.752694,
        "latitude": 37.687024
    },
    {
        "adcode": 140701,
        "city": "山西省晋中市市辖区",
        "longitude": 112.752694,
        "latitude": 37.687024
    },
    {
        "adcode": 140702,
        "city": "山西省晋中市榆次区",
        "longitude": 112.708241,
        "latitude": 37.697792
    },
    {
        "adcode": 140703,
        "city": "山西省晋中市太谷区",
        "longitude": 112.551357,
        "latitude": 37.421308
    },
    {
        "adcode": 140721,
        "city": "山西省晋中市榆社县",
        "longitude": 112.975287,
        "latitude": 37.070788
    },
    {
        "adcode": 140722,
        "city": "山西省晋中市左权县",
        "longitude": 113.379372,
        "latitude": 37.082681
    },
    {
        "adcode": 140723,
        "city": "山西省晋中市和顺县",
        "longitude": 113.570438,
        "latitude": 37.329664
    },
    {
        "adcode": 140724,
        "city": "山西省晋中市昔阳县",
        "longitude": 113.706875,
        "latitude": 37.61121
    },
    {
        "adcode": 140725,
        "city": "山西省晋中市寿阳县",
        "longitude": 113.176434,
        "latitude": 37.895325
    },
    {
        "adcode": 140726,
        "city": "山西省晋中市太谷县",
        "longitude": 112.551357,
        "latitude": 37.421308
    },
    {
        "adcode": 140727,
        "city": "山西省晋中市祁县",
        "longitude": 112.335297,
        "latitude": 37.358317
    },
    {
        "adcode": 140728,
        "city": "山西省晋中市平遥县",
        "longitude": 112.176273,
        "latitude": 37.189559
    },
    {
        "adcode": 140729,
        "city": "山西省晋中市灵石县",
        "longitude": 111.778685,
        "latitude": 36.84786
    },
    {
        "adcode": 140781,
        "city": "山西省晋中市介休市",
        "longitude": 111.916712,
        "latitude": 37.026945
    },
    {
        "adcode": 140800,
        "city": "山西省运城市",
        "longitude": 111.007528,
        "latitude": 35.026412
    },
    {
        "adcode": 140801,
        "city": "山西省运城市市辖区",
        "longitude": 111.007528,
        "latitude": 35.026412
    },
    {
        "adcode": 140802,
        "city": "山西省运城市盐湖区",
        "longitude": 110.998272,
        "latitude": 35.015101
    },
    {
        "adcode": 140821,
        "city": "山西省运城市临猗县",
        "longitude": 110.774547,
        "latitude": 35.144277
    },
    {
        "adcode": 140822,
        "city": "山西省运城市万荣县",
        "longitude": 110.838024,
        "latitude": 35.415254
    },
    {
        "adcode": 140823,
        "city": "山西省运城市闻喜县",
        "longitude": 111.22472,
        "latitude": 35.356644
    },
    {
        "adcode": 140824,
        "city": "山西省运城市稷山县",
        "longitude": 110.983333,
        "latitude": 35.604025
    },
    {
        "adcode": 140825,
        "city": "山西省运城市新绛县",
        "longitude": 111.224778,
        "latitude": 35.616288
    },
    {
        "adcode": 140826,
        "city": "山西省运城市绛县",
        "longitude": 111.568236,
        "latitude": 35.49119
    },
    {
        "adcode": 140827,
        "city": "山西省运城市垣曲县",
        "longitude": 111.669917,
        "latitude": 35.29762
    },
    {
        "adcode": 140828,
        "city": "山西省运城市夏县",
        "longitude": 111.220456,
        "latitude": 35.141363
    },
    {
        "adcode": 140829,
        "city": "山西省运城市平陆县",
        "longitude": 111.194133,
        "latitude": 34.82926
    },
    {
        "adcode": 140830,
        "city": "山西省运城市芮城县",
        "longitude": 110.694369,
        "latitude": 34.69358
    },
    {
        "adcode": 140881,
        "city": "山西省运城市永济市",
        "longitude": 110.447549,
        "latitude": 34.86705
    },
    {
        "adcode": 140882,
        "city": "山西省运城市河津市",
        "longitude": 110.712063,
        "latitude": 35.596383
    },
    {
        "adcode": 140900,
        "city": "山西省忻州市",
        "longitude": 112.734174,
        "latitude": 38.416663
    },
    {
        "adcode": 140901,
        "city": "山西省忻州市市辖区",
        "longitude": 112.734174,
        "latitude": 38.416663
    },
    {
        "adcode": 140902,
        "city": "山西省忻州市忻府区",
        "longitude": 112.746046,
        "latitude": 38.404243
    },
    {
        "adcode": 140921,
        "city": "山西省忻州市定襄县",
        "longitude": 112.957215,
        "latitude": 38.473548
    },
    {
        "adcode": 140922,
        "city": "山西省忻州市五台县",
        "longitude": 113.255309,
        "latitude": 38.728315
    },
    {
        "adcode": 140923,
        "city": "山西省忻州市代县",
        "longitude": 112.960282,
        "latitude": 39.066917
    },
    {
        "adcode": 140924,
        "city": "山西省忻州市繁峙县",
        "longitude": 113.265564,
        "latitude": 39.188811
    },
    {
        "adcode": 140925,
        "city": "山西省忻州市宁武县",
        "longitude": 112.304722,
        "latitude": 39.001524
    },
    {
        "adcode": 140926,
        "city": "山西省忻州市静乐县",
        "longitude": 111.93944,
        "latitude": 38.359036
    },
    {
        "adcode": 140927,
        "city": "山西省忻州市神池县",
        "longitude": 112.211297,
        "latitude": 39.090553
    },
    {
        "adcode": 140928,
        "city": "山西省忻州市五寨县",
        "longitude": 111.846905,
        "latitude": 38.910726
    },
    {
        "adcode": 140929,
        "city": "山西省忻州市岢岚县",
        "longitude": 111.57285,
        "latitude": 38.70418
    },
    {
        "adcode": 140930,
        "city": "山西省忻州市河曲县",
        "longitude": 111.138472,
        "latitude": 39.384482
    },
    {
        "adcode": 140931,
        "city": "山西省忻州市保德县",
        "longitude": 111.086564,
        "latitude": 39.022488
    },
    {
        "adcode": 140932,
        "city": "山西省忻州市偏关县",
        "longitude": 111.508831,
        "latitude": 39.436306
    },
    {
        "adcode": 140981,
        "city": "山西省忻州市原平市",
        "longitude": 112.711059,
        "latitude": 38.731402
    },
    {
        "adcode": 141000,
        "city": "山西省临汾市",
        "longitude": 111.518976,
        "latitude": 36.088005
    },
    {
        "adcode": 141001,
        "city": "山西省临汾市市辖区",
        "longitude": 111.518976,
        "latitude": 36.088005
    },
    {
        "adcode": 141002,
        "city": "山西省临汾市尧都区",
        "longitude": 111.579554,
        "latitude": 36.078841
    },
    {
        "adcode": 141021,
        "city": "山西省临汾市曲沃县",
        "longitude": 111.475861,
        "latitude": 35.641087
    },
    {
        "adcode": 141022,
        "city": "山西省临汾市翼城县",
        "longitude": 111.718951,
        "latitude": 35.738576
    },
    {
        "adcode": 141023,
        "city": "山西省临汾市襄汾县",
        "longitude": 111.441725,
        "latitude": 35.876293
    },
    {
        "adcode": 141024,
        "city": "山西省临汾市洪洞县",
        "longitude": 111.674966,
        "latitude": 36.253748
    },
    {
        "adcode": 141025,
        "city": "山西省临汾市古县",
        "longitude": 111.920466,
        "latitude": 36.266914
    },
    {
        "adcode": 141026,
        "city": "山西省临汾市安泽县",
        "longitude": 112.250144,
        "latitude": 36.147787
    },
    {
        "adcode": 141027,
        "city": "山西省临汾市浮山县",
        "longitude": 111.848883,
        "latitude": 35.968124
    },
    {
        "adcode": 141028,
        "city": "山西省临汾市吉县",
        "longitude": 110.681763,
        "latitude": 36.098188
    },
    {
        "adcode": 141029,
        "city": "山西省临汾市乡宁县",
        "longitude": 110.847021,
        "latitude": 35.970389
    },
    {
        "adcode": 141030,
        "city": "山西省临汾市大宁县",
        "longitude": 110.752903,
        "latitude": 36.465133
    },
    {
        "adcode": 141031,
        "city": "山西省临汾市隰县",
        "longitude": 110.940638,
        "latitude": 36.693331
    },
    {
        "adcode": 141032,
        "city": "山西省临汾市永和县",
        "longitude": 110.632007,
        "latitude": 36.759507
    },
    {
        "adcode": 141033,
        "city": "山西省临汾市蒲县",
        "longitude": 111.096439,
        "latitude": 36.411827
    },
    {
        "adcode": 141034,
        "city": "山西省临汾市汾西县",
        "longitude": 111.563951,
        "latitude": 36.652854
    },
    {
        "adcode": 141081,
        "city": "山西省临汾市侯马市",
        "longitude": 111.372002,
        "latitude": 35.619105
    },
    {
        "adcode": 141082,
        "city": "山西省临汾市霍州市",
        "longitude": 111.755398,
        "latitude": 36.568931
    },
    {
        "adcode": 141100,
        "city": "山西省吕梁市",
        "longitude": 111.144319,
        "latitude": 37.518314
    },
    {
        "adcode": 141101,
        "city": "山西省吕梁市市辖区",
        "longitude": 111.144319,
        "latitude": 37.518314
    },
    {
        "adcode": 141102,
        "city": "山西省吕梁市离石区",
        "longitude": 111.150733,
        "latitude": 37.517641
    },
    {
        "adcode": 141121,
        "city": "山西省吕梁市文水县",
        "longitude": 112.028866,
        "latitude": 37.438102
    },
    {
        "adcode": 141122,
        "city": "山西省吕梁市交城县",
        "longitude": 112.155841,
        "latitude": 37.55197
    },
    {
        "adcode": 141123,
        "city": "山西省吕梁市兴县",
        "longitude": 111.127668,
        "latitude": 38.46239
    },
    {
        "adcode": 141124,
        "city": "山西省吕梁市临县",
        "longitude": 110.992094,
        "latitude": 37.950758
    },
    {
        "adcode": 141125,
        "city": "山西省吕梁市柳林县",
        "longitude": 110.889071,
        "latitude": 37.429832
    },
    {
        "adcode": 141126,
        "city": "山西省吕梁市石楼县",
        "longitude": 110.834561,
        "latitude": 36.997412
    },
    {
        "adcode": 141127,
        "city": "山西省吕梁市岚县",
        "longitude": 111.671917,
        "latitude": 38.279299
    },
    {
        "adcode": 141128,
        "city": "山西省吕梁市方山县",
        "longitude": 111.244098,
        "latitude": 37.894631
    },
    {
        "adcode": 141129,
        "city": "山西省吕梁市中阳县",
        "longitude": 111.179657,
        "latitude": 37.357058
    },
    {
        "adcode": 141130,
        "city": "山西省吕梁市交口县",
        "longitude": 111.181151,
        "latitude": 36.982186
    },
    {
        "adcode": 141181,
        "city": "山西省吕梁市孝义市",
        "longitude": 111.778818,
        "latitude": 37.146294
    },
    {
        "adcode": 141182,
        "city": "山西省吕梁市汾阳市",
        "longitude": 111.769894,
        "latitude": 37.261564
    },
    {
        "adcode": 150000,
        "city": "内蒙古自治区",
        "longitude": 111.765617,
        "latitude": 40.817498
    },
    {
        "adcode": 150100,
        "city": "内蒙古自治区呼和浩特市",
        "longitude": 111.74918,
        "latitude": 40.842585
    },
    {
        "adcode": 150101,
        "city": "内蒙古自治区呼和浩特市市辖区",
        "longitude": 111.74918,
        "latitude": 40.842585
    },
    {
        "adcode": 150102,
        "city": "内蒙古自治区呼和浩特市新城区",
        "longitude": 111.665544,
        "latitude": 40.858289
    },
    {
        "adcode": 150103,
        "city": "内蒙古自治区呼和浩特市回民区",
        "longitude": 111.623692,
        "latitude": 40.808608
    },
    {
        "adcode": 150104,
        "city": "内蒙古自治区呼和浩特市玉泉区",
        "longitude": 111.673881,
        "latitude": 40.753655
    },
    {
        "adcode": 150105,
        "city": "内蒙古自治区呼和浩特市赛罕区",
        "longitude": 111.701857,
        "latitude": 40.792097
    },
    {
        "adcode": 150121,
        "city": "内蒙古自治区呼和浩特市土默特左旗",
        "longitude": 111.163902,
        "latitude": 40.729573
    },
    {
        "adcode": 150122,
        "city": "内蒙古自治区呼和浩特市托克托县",
        "longitude": 111.194313,
        "latitude": 40.277431
    },
    {
        "adcode": 150123,
        "city": "内蒙古自治区呼和浩特市和林格尔县",
        "longitude": 111.821843,
        "latitude": 40.378787
    },
    {
        "adcode": 150124,
        "city": "内蒙古自治区呼和浩特市清水河县",
        "longitude": 111.647609,
        "latitude": 39.921095
    },
    {
        "adcode": 150125,
        "city": "内蒙古自治区呼和浩特市武川县",
        "longitude": 111.451303,
        "latitude": 41.096471
    },
    {
        "adcode": 150200,
        "city": "内蒙古自治区包头市",
        "longitude": 109.840347,
        "latitude": 40.657449
    },
    {
        "adcode": 150201,
        "city": "内蒙古自治区包头市市辖区",
        "longitude": 109.840347,
        "latitude": 40.657449
    },
    {
        "adcode": 150202,
        "city": "内蒙古自治区包头市东河区",
        "longitude": 110.044142,
        "latitude": 40.575948
    },
    {
        "adcode": 150203,
        "city": "内蒙古自治区包头市昆都仑区",
        "longitude": 109.838178,
        "latitude": 40.642236
    },
    {
        "adcode": 150204,
        "city": "内蒙古自治区包头市青山区",
        "longitude": 109.901572,
        "latitude": 40.643246
    },
    {
        "adcode": 150205,
        "city": "内蒙古自治区包头市石拐区",
        "longitude": 110.060686,
        "latitude": 40.676645
    },
    {
        "adcode": 150206,
        "city": "内蒙古自治区包头市白云鄂博矿区",
        "longitude": 109.97016,
        "latitude": 41.769246
    },
    {
        "adcode": 150207,
        "city": "内蒙古自治区包头市九原区",
        "longitude": 109.968122,
        "latitude": 40.600581
    },
    {
        "adcode": 150221,
        "city": "内蒙古自治区包头市土默特右旗",
        "longitude": 110.524263,
        "latitude": 40.569426
    },
    {
        "adcode": 150222,
        "city": "内蒙古自治区包头市固阳县",
        "longitude": 110.060514,
        "latitude": 41.034106
    },
    {
        "adcode": 150223,
        "city": "内蒙古自治区包头市达尔罕茂明安联合旗",
        "longitude": 110.432626,
        "latitude": 41.698992
    },
    {
        "adcode": 150300,
        "city": "内蒙古自治区乌海市",
        "longitude": 106.794249,
        "latitude": 39.655388
    },
    {
        "adcode": 150301,
        "city": "内蒙古自治区乌海市市辖区",
        "longitude": 106.794249,
        "latitude": 39.655388
    },
    {
        "adcode": 150302,
        "city": "内蒙古自治区乌海市海勃湾区",
        "longitude": 106.822779,
        "latitude": 39.691156
    },
    {
        "adcode": 150303,
        "city": "内蒙古自治区乌海市海南区",
        "longitude": 106.891424,
        "latitude": 39.441364
    },
    {
        "adcode": 150304,
        "city": "内蒙古自治区乌海市乌达区",
        "longitude": 106.726099,
        "latitude": 39.505925
    },
    {
        "adcode": 150400,
        "city": "内蒙古自治区赤峰市",
        "longitude": 118.886856,
        "latitude": 42.257817
    },
    {
        "adcode": 150401,
        "city": "内蒙古自治区赤峰市市辖区",
        "longitude": 118.886856,
        "latitude": 42.257817
    },
    {
        "adcode": 150402,
        "city": "内蒙古自治区赤峰市红山区",
        "longitude": 118.967296,
        "latitude": 42.271963
    },
    {
        "adcode": 150403,
        "city": "内蒙古自治区赤峰市元宝山区",
        "longitude": 119.288611,
        "latitude": 42.038902
    },
    {
        "adcode": 150404,
        "city": "内蒙古自治区赤峰市松山区",
        "longitude": 118.933235,
        "latitude": 42.284008
    },
    {
        "adcode": 150421,
        "city": "内蒙古自治区赤峰市阿鲁科尔沁旗",
        "longitude": 120.0657,
        "latitude": 43.872299
    },
    {
        "adcode": 150422,
        "city": "内蒙古自治区赤峰市巴林左旗",
        "longitude": 119.37949,
        "latitude": 43.971126
    },
    {
        "adcode": 150423,
        "city": "内蒙古自治区赤峰市巴林右旗",
        "longitude": 118.66518,
        "latitude": 43.534414
    },
    {
        "adcode": 150424,
        "city": "内蒙古自治区赤峰市林西县",
        "longitude": 118.05545,
        "latitude": 43.61812
    },
    {
        "adcode": 150425,
        "city": "内蒙古自治区赤峰市克什克腾旗",
        "longitude": 117.545798,
        "latitude": 43.264989
    },
    {
        "adcode": 150426,
        "city": "内蒙古自治区赤峰市翁牛特旗",
        "longitude": 119.00658,
        "latitude": 42.936188
    },
    {
        "adcode": 150428,
        "city": "内蒙古自治区赤峰市喀喇沁旗",
        "longitude": 118.701938,
        "latitude": 41.927364
    },
    {
        "adcode": 150429,
        "city": "内蒙古自治区赤峰市宁城县",
        "longitude": 118.557602,
        "latitude": 41.415477
    },
    {
        "adcode": 150430,
        "city": "内蒙古自治区赤峰市敖汉旗",
        "longitude": 119.921604,
        "latitude": 42.290782
    },
    {
        "adcode": 150500,
        "city": "内蒙古自治区通辽市",
        "longitude": 122.243444,
        "latitude": 43.65289
    },
    {
        "adcode": 150501,
        "city": "内蒙古自治区通辽市市辖区",
        "longitude": 122.243444,
        "latitude": 43.65289
    },
    {
        "adcode": 150502,
        "city": "内蒙古自治区通辽市科尔沁区",
        "longitude": 122.255675,
        "latitude": 43.623077
    },
    {
        "adcode": 150521,
        "city": "内蒙古自治区通辽市科尔沁左翼中旗",
        "longitude": 123.312265,
        "latitude": 44.126626
    },
    {
        "adcode": 150522,
        "city": "内蒙古自治区通辽市科尔沁左翼后旗",
        "longitude": 122.356749,
        "latitude": 42.935159
    },
    {
        "adcode": 150523,
        "city": "内蒙古自治区通辽市开鲁县",
        "longitude": 121.319309,
        "latitude": 43.601244
    },
    {
        "adcode": 150524,
        "city": "内蒙古自治区通辽市库伦旗",
        "longitude": 121.810701,
        "latitude": 42.735657
    },
    {
        "adcode": 150525,
        "city": "内蒙古自治区通辽市奈曼旗",
        "longitude": 120.662419,
        "latitude": 42.845455
    },
    {
        "adcode": 150526,
        "city": "内蒙古自治区通辽市扎鲁特旗",
        "longitude": 120.911676,
        "latitude": 44.556389
    },
    {
        "adcode": 150581,
        "city": "内蒙古自治区通辽市霍林郭勒市",
        "longitude": 119.663534,
        "latitude": 45.531726
    },
    {
        "adcode": 150600,
        "city": "内蒙古自治区鄂尔多斯市",
        "longitude": 109.781327,
        "latitude": 39.608266
    },
    {
        "adcode": 150601,
        "city": "内蒙古自治区鄂尔多斯市市辖区",
        "longitude": 109.781327,
        "latitude": 39.608266
    },
    {
        "adcode": 150602,
        "city": "内蒙古自治区鄂尔多斯市东胜区",
        "longitude": 109.963339,
        "latitude": 39.822507
    },
    {
        "adcode": 150603,
        "city": "内蒙古自治区鄂尔多斯市康巴什区",
        "longitude": 113.2297105,
        "latitude": 36.3341475
    },
    {
        "adcode": 150621,
        "city": "内蒙古自治区鄂尔多斯市达拉特旗",
        "longitude": 110.033833,
        "latitude": 40.412438
    },
    {
        "adcode": 150622,
        "city": "内蒙古自治区鄂尔多斯市准格尔旗",
        "longitude": 111.240171,
        "latitude": 39.864362
    },
    {
        "adcode": 150623,
        "city": "内蒙古自治区鄂尔多斯市鄂托克前旗",
        "longitude": 107.477515,
        "latitude": 38.182362
    },
    {
        "adcode": 150624,
        "city": "内蒙古自治区鄂尔多斯市鄂托克旗",
        "longitude": 107.976161,
        "latitude": 39.08965
    },
    {
        "adcode": 150625,
        "city": "内蒙古自治区鄂尔多斯市杭锦旗",
        "longitude": 108.736208,
        "latitude": 39.833309
    },
    {
        "adcode": 150626,
        "city": "内蒙古自治区鄂尔多斯市乌审旗",
        "longitude": 108.817607,
        "latitude": 38.604136
    },
    {
        "adcode": 150627,
        "city": "内蒙古自治区鄂尔多斯市伊金霍洛旗",
        "longitude": 109.74774,
        "latitude": 39.56466
    },
    {
        "adcode": 150700,
        "city": "内蒙古自治区呼伦贝尔市",
        "longitude": 119.765744,
        "latitude": 49.211574
    },
    {
        "adcode": 150701,
        "city": "内蒙古自治区呼伦贝尔市市辖区",
        "longitude": 119.765744,
        "latitude": 49.211574
    },
    {
        "adcode": 150702,
        "city": "内蒙古自治区呼伦贝尔市海拉尔区",
        "longitude": 119.736279,
        "latitude": 49.212189
    },
    {
        "adcode": 150703,
        "city": "内蒙古自治区呼伦贝尔市扎赉诺尔区",
        "longitude": 117.670248,
        "latitude": 49.510375
    },
    {
        "adcode": 150721,
        "city": "内蒙古自治区呼伦贝尔市阿荣旗",
        "longitude": 123.45905,
        "latitude": 48.126585
    },
    {
        "adcode": 150722,
        "city": "内蒙古自治区呼伦贝尔市莫力达瓦达斡尔族自治旗",
        "longitude": 124.519023,
        "latitude": 48.477729
    },
    {
        "adcode": 150723,
        "city": "内蒙古自治区呼伦贝尔市鄂伦春自治旗",
        "longitude": 123.726201,
        "latitude": 50.591842
    },
    {
        "adcode": 150724,
        "city": "内蒙古自治区呼伦贝尔市鄂温克族自治旗",
        "longitude": 119.755213,
        "latitude": 49.146588
    },
    {
        "adcode": 150725,
        "city": "内蒙古自治区呼伦贝尔市陈巴尔虎旗",
        "longitude": 119.424026,
        "latitude": 49.328916
    },
    {
        "adcode": 150726,
        "city": "内蒙古自治区呼伦贝尔市新巴尔虎左旗",
        "longitude": 118.26982,
        "latitude": 48.218241
    },
    {
        "adcode": 150727,
        "city": "内蒙古自治区呼伦贝尔市新巴尔虎右旗",
        "longitude": 116.82369,
        "latitude": 48.672101
    },
    {
        "adcode": 150781,
        "city": "内蒙古自治区呼伦贝尔市满洲里市",
        "longitude": 117.37853,
        "latitude": 49.597841
    },
    {
        "adcode": 150782,
        "city": "内蒙古自治区呼伦贝尔市牙克石市",
        "longitude": 120.735775,
        "latitude": 49.293222
    },
    {
        "adcode": 150783,
        "city": "内蒙古自治区呼伦贝尔市扎兰屯市",
        "longitude": 122.737467,
        "latitude": 48.013733
    },
    {
        "adcode": 150784,
        "city": "内蒙古自治区呼伦贝尔市额尔古纳市",
        "longitude": 120.180506,
        "latitude": 50.243102
    },
    {
        "adcode": 150785,
        "city": "内蒙古自治区呼伦贝尔市根河市",
        "longitude": 121.520388,
        "latitude": 50.780345
    },
    {
        "adcode": 150800,
        "city": "内蒙古自治区巴彦淖尔市",
        "longitude": 107.387657,
        "latitude": 40.743213
    },
    {
        "adcode": 150801,
        "city": "内蒙古自治区巴彦淖尔市市辖区",
        "longitude": 107.387657,
        "latitude": 40.743213
    },
    {
        "adcode": 150802,
        "city": "内蒙古自治区巴彦淖尔市临河区",
        "longitude": 107.363919,
        "latitude": 40.751187
    },
    {
        "adcode": 150821,
        "city": "内蒙古自治区巴彦淖尔市五原县",
        "longitude": 108.267562,
        "latitude": 41.088422
    },
    {
        "adcode": 150822,
        "city": "内蒙古自治区巴彦淖尔市磴口县",
        "longitude": 107.008248,
        "latitude": 40.330524
    },
    {
        "adcode": 150823,
        "city": "内蒙古自治区巴彦淖尔市乌拉特前旗",
        "longitude": 108.652119,
        "latitude": 40.73703
    },
    {
        "adcode": 150824,
        "city": "内蒙古自治区巴彦淖尔市乌拉特中旗",
        "longitude": 108.513645,
        "latitude": 41.587732
    },
    {
        "adcode": 150825,
        "city": "内蒙古自治区巴彦淖尔市乌拉特后旗",
        "longitude": 107.074621,
        "latitude": 41.084283
    },
    {
        "adcode": 150826,
        "city": "内蒙古自治区巴彦淖尔市杭锦后旗",
        "longitude": 107.150909,
        "latitude": 40.885896
    },
    {
        "adcode": 150900,
        "city": "内蒙古自治区乌兰察布市",
        "longitude": 113.132585,
        "latitude": 40.994785
    },
    {
        "adcode": 150901,
        "city": "内蒙古自治区乌兰察布市市辖区",
        "longitude": 113.132585,
        "latitude": 40.994785
    },
    {
        "adcode": 150902,
        "city": "内蒙古自治区乌兰察布市集宁区",
        "longitude": 113.123779,
        "latitude": 40.990689
    },
    {
        "adcode": 150921,
        "city": "内蒙古自治区乌兰察布市卓资县",
        "longitude": 112.577528,
        "latitude": 40.894692
    },
    {
        "adcode": 150922,
        "city": "内蒙古自治区乌兰察布市化德县",
        "longitude": 114.010438,
        "latitude": 41.90456
    },
    {
        "adcode": 150923,
        "city": "内蒙古自治区乌兰察布市商都县",
        "longitude": 113.577816,
        "latitude": 41.562113
    },
    {
        "adcode": 150924,
        "city": "内蒙古自治区乌兰察布市兴和县",
        "longitude": 113.834173,
        "latitude": 40.872301
    },
    {
        "adcode": 150925,
        "city": "内蒙古自治区乌兰察布市凉城县",
        "longitude": 112.503971,
        "latitude": 40.531555
    },
    {
        "adcode": 150926,
        "city": "内蒙古自治区乌兰察布市察哈尔右翼前旗",
        "longitude": 113.214733,
        "latitude": 40.785631
    },
    {
        "adcode": 150927,
        "city": "内蒙古自治区乌兰察布市察哈尔右翼中旗",
        "longitude": 112.635577,
        "latitude": 41.277462
    },
    {
        "adcode": 150928,
        "city": "内蒙古自治区乌兰察布市察哈尔右翼后旗",
        "longitude": 113.191035,
        "latitude": 41.436069
    },
    {
        "adcode": 150929,
        "city": "内蒙古自治区乌兰察布市四子王旗",
        "longitude": 111.706618,
        "latitude": 41.533462
    },
    {
        "adcode": 150981,
        "city": "内蒙古自治区乌兰察布市丰镇市",
        "longitude": 113.109892,
        "latitude": 40.436983
    },
    {
        "adcode": 152200,
        "city": "内蒙古自治区兴安盟",
        "longitude": 122.067042,
        "latitude": 46.077561
    },
    {
        "adcode": 152201,
        "city": "内蒙古自治区兴安盟乌兰浩特市",
        "longitude": 122.093123,
        "latitude": 46.072732
    },
    {
        "adcode": 152202,
        "city": "内蒙古自治区兴安盟阿尔山市",
        "longitude": 119.943575,
        "latitude": 47.17744
    },
    {
        "adcode": 152221,
        "city": "内蒙古自治区兴安盟科尔沁右翼前旗",
        "longitude": 121.95255,
        "latitude": 46.07981
    },
    {
        "adcode": 152222,
        "city": "内蒙古自治区兴安盟科尔沁右翼中旗",
        "longitude": 121.47653,
        "latitude": 45.060837
    },
    {
        "adcode": 152223,
        "city": "内蒙古自治区兴安盟扎赉特旗",
        "longitude": 122.899656,
        "latitude": 46.723237
    },
    {
        "adcode": 152224,
        "city": "内蒙古自治区兴安盟突泉县",
        "longitude": 121.593799,
        "latitude": 45.38193
    },
    {
        "adcode": 152500,
        "city": "内蒙古自治区锡林郭勒盟",
        "longitude": 116.048222,
        "latitude": 43.933454
    },
    {
        "adcode": 152501,
        "city": "内蒙古自治区锡林郭勒盟二连浩特市",
        "longitude": 111.977943,
        "latitude": 43.65317
    },
    {
        "adcode": 152502,
        "city": "内蒙古自治区锡林郭勒盟锡林浩特市",
        "longitude": 116.086032,
        "latitude": 43.933411
    },
    {
        "adcode": 152522,
        "city": "内蒙古自治区锡林郭勒盟阿巴嘎旗",
        "longitude": 114.950248,
        "latitude": 44.022995
    },
    {
        "adcode": 152523,
        "city": "内蒙古自治区锡林郭勒盟苏尼特左旗",
        "longitude": 113.667248,
        "latitude": 43.85988
    },
    {
        "adcode": 152524,
        "city": "内蒙古自治区锡林郭勒盟苏尼特右旗",
        "longitude": 112.641783,
        "latitude": 42.742892
    },
    {
        "adcode": 152525,
        "city": "内蒙古自治区锡林郭勒盟东乌珠穆沁旗",
        "longitude": 116.974494,
        "latitude": 45.498221
    },
    {
        "adcode": 152526,
        "city": "内蒙古自治区锡林郭勒盟西乌珠穆沁旗",
        "longitude": 117.608911,
        "latitude": 44.587882
    },
    {
        "adcode": 152527,
        "city": "内蒙古自治区锡林郭勒盟太仆寺旗",
        "longitude": 115.282986,
        "latitude": 41.877136
    },
    {
        "adcode": 152528,
        "city": "内蒙古自治区锡林郭勒盟镶黄旗",
        "longitude": 113.847287,
        "latitude": 42.232371
    },
    {
        "adcode": 152529,
        "city": "内蒙古自治区锡林郭勒盟正镶白旗",
        "longitude": 115.029849,
        "latitude": 42.287471
    },
    {
        "adcode": 152530,
        "city": "内蒙古自治区锡林郭勒盟正蓝旗",
        "longitude": 115.99247,
        "latitude": 42.241638
    },
    {
        "adcode": 152531,
        "city": "内蒙古自治区锡林郭勒盟多伦县",
        "longitude": 116.485556,
        "latitude": 42.203591
    },
    {
        "adcode": 152900,
        "city": "内蒙古自治区阿拉善盟",
        "longitude": 105.728969,
        "latitude": 38.851892
    },
    {
        "adcode": 152921,
        "city": "内蒙古自治区阿拉善盟阿拉善左旗",
        "longitude": 105.666293,
        "latitude": 38.833411
    },
    {
        "adcode": 152922,
        "city": "内蒙古自治区阿拉善盟阿拉善右旗",
        "longitude": 101.666917,
        "latitude": 39.216186
    },
    {
        "adcode": 152923,
        "city": "内蒙古自治区阿拉善盟额济纳旗",
        "longitude": 101.05559,
        "latitude": 41.954347
    },
    {
        "adcode": 210000,
        "city": "辽宁省",
        "longitude": 123.42944,
        "latitude": 41.835441
    },
    {
        "adcode": 210100,
        "city": "辽宁省沈阳市",
        "longitude": 123.431474,
        "latitude": 41.805698
    },
    {
        "adcode": 210101,
        "city": "辽宁省沈阳市市辖区",
        "longitude": 123.431474,
        "latitude": 41.805698
    },
    {
        "adcode": 210102,
        "city": "辽宁省沈阳市和平区",
        "longitude": 123.39568,
        "latitude": 41.78945
    },
    {
        "adcode": 210103,
        "city": "辽宁省沈阳市沈河区",
        "longitude": 123.458897,
        "latitude": 41.795655
    },
    {
        "adcode": 210104,
        "city": "辽宁省沈阳市大东区",
        "longitude": 123.508858,
        "latitude": 41.81317
    },
    {
        "adcode": 210105,
        "city": "辽宁省沈阳市皇姑区",
        "longitude": 123.44197,
        "latitude": 41.824796
    },
    {
        "adcode": 210106,
        "city": "辽宁省沈阳市铁西区",
        "longitude": 123.376301,
        "latitude": 41.802914
    },
    {
        "adcode": 210111,
        "city": "辽宁省沈阳市苏家屯区",
        "longitude": 123.344031,
        "latitude": 41.664757
    },
    {
        "adcode": 210112,
        "city": "辽宁省沈阳市浑南区",
        "longitude": 123.449715,
        "latitude": 41.714914
    },
    {
        "adcode": 210113,
        "city": "辽宁省沈阳市沈北新区",
        "longitude": 123.583197,
        "latitude": 41.912487
    },
    {
        "adcode": 210114,
        "city": "辽宁省沈阳市于洪区",
        "longitude": 123.308136,
        "latitude": 41.793743
    },
    {
        "adcode": 210115,
        "city": "辽宁省沈阳市辽中区",
        "longitude": 122.765409,
        "latitude": 41.516827
    },
    {
        "adcode": 210123,
        "city": "辽宁省沈阳市康平县",
        "longitude": 123.355701,
        "latitude": 42.741005
    },
    {
        "adcode": 210124,
        "city": "辽宁省沈阳市法库县",
        "longitude": 123.440495,
        "latitude": 42.50073
    },
    {
        "adcode": 210181,
        "city": "辽宁省沈阳市新民市",
        "longitude": 122.725537,
        "latitude": 41.932648
    },
    {
        "adcode": 210200,
        "city": "辽宁省大连市",
        "longitude": 121.614682,
        "latitude": 38.914003
    },
    {
        "adcode": 210201,
        "city": "辽宁省大连市市辖区",
        "longitude": 121.614682,
        "latitude": 38.914003
    },
    {
        "adcode": 210202,
        "city": "辽宁省大连市中山区",
        "longitude": 121.644927,
        "latitude": 38.918574
    },
    {
        "adcode": 210203,
        "city": "辽宁省大连市西岗区",
        "longitude": 121.612325,
        "latitude": 38.914687
    },
    {
        "adcode": 210204,
        "city": "辽宁省大连市沙河口区",
        "longitude": 121.5942,
        "latitude": 38.904808
    },
    {
        "adcode": 210211,
        "city": "辽宁省大连市甘井子区",
        "longitude": 121.525461,
        "latitude": 38.953351
    },
    {
        "adcode": 210212,
        "city": "辽宁省大连市旅顺口区",
        "longitude": 121.261953,
        "latitude": 38.851705
    },
    {
        "adcode": 210213,
        "city": "辽宁省大连市金州区",
        "longitude": 121.782769,
        "latitude": 39.05046
    },
    {
        "adcode": 210214,
        "city": "辽宁省大连市普兰店区",
        "longitude": 122.26177,
        "latitude": 39.741886
    },
    {
        "adcode": 210224,
        "city": "辽宁省大连市长海县",
        "longitude": 122.588494,
        "latitude": 39.272728
    },
    {
        "adcode": 210281,
        "city": "辽宁省大连市瓦房店市",
        "longitude": 121.979603,
        "latitude": 39.627114
    },
    {
        "adcode": 210283,
        "city": "辽宁省大连市庄河市",
        "longitude": 122.967328,
        "latitude": 39.680811
    },
    {
        "adcode": 210300,
        "city": "辽宁省鞍山市",
        "longitude": 122.994329,
        "latitude": 41.108647
    },
    {
        "adcode": 210301,
        "city": "辽宁省鞍山市市辖区",
        "longitude": 122.994329,
        "latitude": 41.108647
    },
    {
        "adcode": 210302,
        "city": "辽宁省鞍山市铁东区",
        "longitude": 122.991052,
        "latitude": 41.089933
    },
    {
        "adcode": 210303,
        "city": "辽宁省鞍山市铁西区",
        "longitude": 122.96963,
        "latitude": 41.119885
    },
    {
        "adcode": 210304,
        "city": "辽宁省鞍山市立山区",
        "longitude": 123.029091,
        "latitude": 41.150401
    },
    {
        "adcode": 210311,
        "city": "辽宁省鞍山市千山区",
        "longitude": 122.949298,
        "latitude": 41.068909
    },
    {
        "adcode": 210321,
        "city": "辽宁省鞍山市台安县",
        "longitude": 122.436196,
        "latitude": 41.412768
    },
    {
        "adcode": 210323,
        "city": "辽宁省鞍山市岫岩满族自治县",
        "longitude": 123.280935,
        "latitude": 40.29088
    },
    {
        "adcode": 210381,
        "city": "辽宁省鞍山市海城市",
        "longitude": 122.685217,
        "latitude": 40.882377
    },
    {
        "adcode": 210400,
        "city": "辽宁省抚顺市",
        "longitude": 123.957208,
        "latitude": 41.880872
    },
    {
        "adcode": 210401,
        "city": "辽宁省抚顺市市辖区",
        "longitude": 123.957208,
        "latitude": 41.880872
    },
    {
        "adcode": 210402,
        "city": "辽宁省抚顺市新抚区",
        "longitude": 123.912861,
        "latitude": 41.86208
    },
    {
        "adcode": 210403,
        "city": "辽宁省抚顺市东洲区",
        "longitude": 124.038685,
        "latitude": 41.853192
    },
    {
        "adcode": 210404,
        "city": "辽宁省抚顺市望花区",
        "longitude": 123.784206,
        "latitude": 41.853646
    },
    {
        "adcode": 210411,
        "city": "辽宁省抚顺市顺城区",
        "longitude": 123.94504,
        "latitude": 41.883375
    },
    {
        "adcode": 210421,
        "city": "辽宁省抚顺市抚顺县",
        "longitude": 124.097979,
        "latitude": 41.922644
    },
    {
        "adcode": 210422,
        "city": "辽宁省抚顺市新宾满族自治县",
        "longitude": 125.039978,
        "latitude": 41.734256
    },
    {
        "adcode": 210423,
        "city": "辽宁省抚顺市清原满族自治县",
        "longitude": 124.924083,
        "latitude": 42.100539
    },
    {
        "adcode": 210500,
        "city": "辽宁省本溪市",
        "longitude": 123.766485,
        "latitude": 41.294175
    },
    {
        "adcode": 210501,
        "city": "辽宁省本溪市市辖区",
        "longitude": 123.766485,
        "latitude": 41.294175
    },
    {
        "adcode": 210502,
        "city": "辽宁省本溪市平山区",
        "longitude": 123.768926,
        "latitude": 41.299702
    },
    {
        "adcode": 210503,
        "city": "辽宁省本溪市溪湖区",
        "longitude": 123.767647,
        "latitude": 41.329219
    },
    {
        "adcode": 210504,
        "city": "辽宁省本溪市明山区",
        "longitude": 123.817212,
        "latitude": 41.30871
    },
    {
        "adcode": 210505,
        "city": "辽宁省本溪市南芬区",
        "longitude": 123.744802,
        "latitude": 41.100445
    },
    {
        "adcode": 210521,
        "city": "辽宁省本溪市本溪满族自治县",
        "longitude": 124.120436,
        "latitude": 41.301892
    },
    {
        "adcode": 210522,
        "city": "辽宁省本溪市桓仁满族自治县",
        "longitude": 125.361007,
        "latitude": 41.267128
    },
    {
        "adcode": 210600,
        "city": "辽宁省丹东市",
        "longitude": 124.354706,
        "latitude": 40.000499
    },
    {
        "adcode": 210601,
        "city": "辽宁省丹东市市辖区",
        "longitude": 124.354706,
        "latitude": 40.000499
    },
    {
        "adcode": 210602,
        "city": "辽宁省丹东市元宝区",
        "longitude": 124.395757,
        "latitude": 40.13652
    },
    {
        "adcode": 210603,
        "city": "辽宁省丹东市振兴区",
        "longitude": 124.360264,
        "latitude": 40.105194
    },
    {
        "adcode": 210604,
        "city": "辽宁省丹东市振安区",
        "longitude": 124.428162,
        "latitude": 40.158267
    },
    {
        "adcode": 210624,
        "city": "辽宁省丹东市宽甸满族自治县",
        "longitude": 124.78366,
        "latitude": 40.731317
    },
    {
        "adcode": 210681,
        "city": "辽宁省丹东市东港市",
        "longitude": 124.152705,
        "latitude": 39.863008
    },
    {
        "adcode": 210682,
        "city": "辽宁省丹东市凤城市",
        "longitude": 124.066919,
        "latitude": 40.452298
    },
    {
        "adcode": 210700,
        "city": "辽宁省锦州市",
        "longitude": 121.127003,
        "latitude": 41.095119
    },
    {
        "adcode": 210701,
        "city": "辽宁省锦州市市辖区",
        "longitude": 121.127003,
        "latitude": 41.095119
    },
    {
        "adcode": 210702,
        "city": "辽宁省锦州市古塔区",
        "longitude": 121.128279,
        "latitude": 41.117245
    },
    {
        "adcode": 210703,
        "city": "辽宁省锦州市凌河区",
        "longitude": 121.150877,
        "latitude": 41.11499
    },
    {
        "adcode": 210711,
        "city": "辽宁省锦州市太和区",
        "longitude": 121.103892,
        "latitude": 41.109147
    },
    {
        "adcode": 210726,
        "city": "辽宁省锦州市黑山县",
        "longitude": 122.123443,
        "latitude": 41.666028
    },
    {
        "adcode": 210727,
        "city": "辽宁省锦州市义县",
        "longitude": 121.23908,
        "latitude": 41.533087
    },
    {
        "adcode": 210781,
        "city": "辽宁省锦州市凌海市",
        "longitude": 121.35773,
        "latitude": 41.1734
    },
    {
        "adcode": 210782,
        "city": "辽宁省锦州市北镇市",
        "longitude": 121.795962,
        "latitude": 41.598764
    },
    {
        "adcode": 210800,
        "city": "辽宁省营口市",
        "longitude": 122.235417,
        "latitude": 40.667012
    },
    {
        "adcode": 210801,
        "city": "辽宁省营口市市辖区",
        "longitude": 122.235417,
        "latitude": 40.667012
    },
    {
        "adcode": 210802,
        "city": "辽宁省营口市站前区",
        "longitude": 122.258961,
        "latitude": 40.67267
    },
    {
        "adcode": 210803,
        "city": "辽宁省营口市西市区",
        "longitude": 122.206414,
        "latitude": 40.666408
    },
    {
        "adcode": 210804,
        "city": "辽宁省营口市鲅鱼圈区",
        "longitude": 122.107814,
        "latitude": 40.230636
    },
    {
        "adcode": 210811,
        "city": "辽宁省营口市老边区",
        "longitude": 122.379967,
        "latitude": 40.680303
    },
    {
        "adcode": 210881,
        "city": "辽宁省营口市盖州市",
        "longitude": 122.348936,
        "latitude": 40.400611
    },
    {
        "adcode": 210882,
        "city": "辽宁省营口市大石桥市",
        "longitude": 122.509131,
        "latitude": 40.644622
    },
    {
        "adcode": 210900,
        "city": "辽宁省阜新市",
        "longitude": 121.670323,
        "latitude": 42.021619
    },
    {
        "adcode": 210901,
        "city": "辽宁省阜新市市辖区",
        "longitude": 121.670323,
        "latitude": 42.021619
    },
    {
        "adcode": 210902,
        "city": "辽宁省阜新市海州区",
        "longitude": 121.656255,
        "latitude": 42.013242
    },
    {
        "adcode": 210903,
        "city": "辽宁省阜新市新邱区",
        "longitude": 121.792535,
        "latitude": 42.087632
    },
    {
        "adcode": 210904,
        "city": "辽宁省阜新市太平区",
        "longitude": 121.678512,
        "latitude": 42.0106
    },
    {
        "adcode": 210905,
        "city": "辽宁省阜新市清河门区",
        "longitude": 121.416105,
        "latitude": 41.7831
    },
    {
        "adcode": 210911,
        "city": "辽宁省阜新市细河区",
        "longitude": 121.68054,
        "latitude": 42.025495
    },
    {
        "adcode": 210921,
        "city": "辽宁省阜新市阜新蒙古族自治县",
        "longitude": 121.757901,
        "latitude": 42.065175
    },
    {
        "adcode": 210922,
        "city": "辽宁省阜新市彰武县",
        "longitude": 122.538793,
        "latitude": 42.386544
    },
    {
        "adcode": 211000,
        "city": "辽宁省辽阳市",
        "longitude": 123.236944,
        "latitude": 41.267244
    },
    {
        "adcode": 211001,
        "city": "辽宁省辽阳市市辖区",
        "longitude": 123.236944,
        "latitude": 41.267244
    },
    {
        "adcode": 211002,
        "city": "辽宁省辽阳市白塔区",
        "longitude": 123.174325,
        "latitude": 41.270347
    },
    {
        "adcode": 211003,
        "city": "辽宁省辽阳市白塔区",
        "longitude": 123.185386,
        "latitude": 41.262608
    },
    {
        "adcode": 211004,
        "city": "辽宁省辽阳市宏伟区",
        "longitude": 123.196672,
        "latitude": 41.217649
    },
    {
        "adcode": 211005,
        "city": "辽宁省辽阳市弓长岭区",
        "longitude": 123.419804,
        "latitude": 41.151847
    },
    {
        "adcode": 211011,
        "city": "辽宁省辽阳市白塔区",
        "longitude": 123.181782,
        "latitude": 41.253277
    },
    {
        "adcode": 211021,
        "city": "辽宁省辽阳市辽阳县",
        "longitude": 123.105695,
        "latitude": 41.205329
    },
    {
        "adcode": 211081,
        "city": "辽宁省辽阳市灯塔市",
        "longitude": 123.339312,
        "latitude": 41.426372
    },
    {
        "adcode": 211100,
        "city": "辽宁省盘锦市",
        "longitude": 122.070714,
        "latitude": 41.119997
    },
    {
        "adcode": 211101,
        "city": "辽宁省盘锦市市辖区",
        "longitude": 122.070714,
        "latitude": 41.119997
    },
    {
        "adcode": 211102,
        "city": "辽宁省盘锦市双台子区",
        "longitude": 122.060112,
        "latitude": 41.190606
    },
    {
        "adcode": 211103,
        "city": "辽宁省盘锦市兴隆台区",
        "longitude": 122.069897,
        "latitude": 41.158678
    },
    {
        "adcode": 211104,
        "city": "辽宁省盘锦市大洼区",
        "longitude": 114.3507745,
        "latitude": 22.7087745
    },
    {
        "adcode": 211122,
        "city": "辽宁省盘锦市盘山县",
        "longitude": 121.996499,
        "latitude": 41.242873
    },
    {
        "adcode": 211200,
        "city": "辽宁省铁岭市",
        "longitude": 123.726166,
        "latitude": 42.223769
    },
    {
        "adcode": 211201,
        "city": "辽宁省铁岭市市辖区",
        "longitude": 123.726166,
        "latitude": 42.223769
    },
    {
        "adcode": 211202,
        "city": "辽宁省铁岭市银州区",
        "longitude": 123.842305,
        "latitude": 42.28613
    },
    {
        "adcode": 211204,
        "city": "辽宁省铁岭市清河区",
        "longitude": 124.14896,
        "latitude": 42.542978
    },
    {
        "adcode": 211221,
        "city": "辽宁省铁岭市铁岭县",
        "longitude": 123.729004,
        "latitude": 42.223383
    },
    {
        "adcode": 211223,
        "city": "辽宁省铁岭市西丰县",
        "longitude": 124.727393,
        "latitude": 42.73803
    },
    {
        "adcode": 211224,
        "city": "辽宁省铁岭市昌图县",
        "longitude": 124.1111,
        "latitude": 42.785791
    },
    {
        "adcode": 211281,
        "city": "辽宁省铁岭市调兵山市",
        "longitude": 123.567117,
        "latitude": 42.467521
    },
    {
        "adcode": 211282,
        "city": "辽宁省铁岭市开原市",
        "longitude": 124.038268,
        "latitude": 42.546307
    },
    {
        "adcode": 211300,
        "city": "辽宁省朝阳市",
        "longitude": 120.450372,
        "latitude": 41.573734
    },
    {
        "adcode": 211301,
        "city": "辽宁省朝阳市市辖区",
        "longitude": 120.450372,
        "latitude": 41.573734
    },
    {
        "adcode": 211302,
        "city": "辽宁省朝阳市双塔区",
        "longitude": 120.453744,
        "latitude": 41.565628
    },
    {
        "adcode": 211303,
        "city": "辽宁省朝阳市龙城区",
        "longitude": 120.413376,
        "latitude": 41.576749
    },
    {
        "adcode": 211321,
        "city": "辽宁省朝阳市朝阳县",
        "longitude": 120.389862,
        "latitude": 41.497767
    },
    {
        "adcode": 211322,
        "city": "辽宁省朝阳市建平县",
        "longitude": 119.64328,
        "latitude": 41.403128
    },
    {
        "adcode": 211324,
        "city": "辽宁省朝阳市喀喇沁左翼蒙古族自治县",
        "longitude": 119.741223,
        "latitude": 41.12815
    },
    {
        "adcode": 211381,
        "city": "辽宁省朝阳市北票市",
        "longitude": 120.77073,
        "latitude": 41.800684
    },
    {
        "adcode": 211382,
        "city": "辽宁省朝阳市凌源市",
        "longitude": 119.401574,
        "latitude": 41.245445
    },
    {
        "adcode": 211400,
        "city": "辽宁省葫芦岛市",
        "longitude": 120.836932,
        "latitude": 40.711052
    },
    {
        "adcode": 211401,
        "city": "辽宁省葫芦岛市市辖区",
        "longitude": 120.836932,
        "latitude": 40.711052
    },
    {
        "adcode": 211402,
        "city": "辽宁省葫芦岛市连山区",
        "longitude": 120.869231,
        "latitude": 40.774461
    },
    {
        "adcode": 211403,
        "city": "辽宁省葫芦岛市龙港区",
        "longitude": 120.893786,
        "latitude": 40.735519
    },
    {
        "adcode": 211404,
        "city": "辽宁省葫芦岛市南票区",
        "longitude": 120.749728,
        "latitude": 41.107108
    },
    {
        "adcode": 211421,
        "city": "辽宁省葫芦岛市绥中县",
        "longitude": 120.344229,
        "latitude": 40.325659
    },
    {
        "adcode": 211422,
        "city": "辽宁省葫芦岛市建昌县",
        "longitude": 119.837124,
        "latitude": 40.824368
    },
    {
        "adcode": 211481,
        "city": "辽宁省葫芦岛市兴城市",
        "longitude": 120.72831,
        "latitude": 40.614762
    },
    {
        "adcode": 220000,
        "city": "吉林省",
        "longitude": 125.32599,
        "latitude": 43.896536
    },
    {
        "adcode": 220100,
        "city": "吉林省长春市",
        "longitude": 125.323544,
        "latitude": 43.817071
    },
    {
        "adcode": 220101,
        "city": "吉林省长春市市辖区",
        "longitude": 125.323544,
        "latitude": 43.817071
    },
    {
        "adcode": 220102,
        "city": "吉林省长春市南关区",
        "longitude": 125.350173,
        "latitude": 43.863989
    },
    {
        "adcode": 220103,
        "city": "吉林省长春市宽城区",
        "longitude": 125.326578,
        "latitude": 43.943614
    },
    {
        "adcode": 220104,
        "city": "吉林省长春市朝阳区",
        "longitude": 125.288319,
        "latitude": 43.833513
    },
    {
        "adcode": 220105,
        "city": "吉林省长春市二道区",
        "longitude": 125.374217,
        "latitude": 43.865596
    },
    {
        "adcode": 220106,
        "city": "吉林省长春市绿园区",
        "longitude": 125.256136,
        "latitude": 43.880975
    },
    {
        "adcode": 220112,
        "city": "吉林省长春市双阳区",
        "longitude": 125.664662,
        "latitude": 43.525311
    },
    {
        "adcode": 220113,
        "city": "吉林省长春市九台区",
        "longitude": 125.839574,
        "latitude": 44.151742
    },
    {
        "adcode": 220122,
        "city": "吉林省长春市农安县",
        "longitude": 125.184742,
        "latitude": 44.432889
    },
    {
        "adcode": 220182,
        "city": "吉林省长春市榆树市",
        "longitude": 126.533146,
        "latitude": 44.840288
    },
    {
        "adcode": 220183,
        "city": "吉林省长春市德惠市",
        "longitude": 125.72862,
        "latitude": 44.521785
    },
    {
        "adcode": 220200,
        "city": "吉林市",
        "longitude": 126.549576,
        "latitude": 43.837883
    },
    {
        "adcode": 220201,
        "city": "吉林市市辖区",
        "longitude": 126.549576,
        "latitude": 43.837883
    },
    {
        "adcode": 220202,
        "city": "吉林省吉林市昌邑区",
        "longitude": 126.57471,
        "latitude": 43.881818
    },
    {
        "adcode": 220203,
        "city": "吉林省吉林市龙潭区",
        "longitude": 126.562197,
        "latitude": 43.910803
    },
    {
        "adcode": 220204,
        "city": "吉林省吉林市船营区",
        "longitude": 126.540966,
        "latitude": 43.833445
    },
    {
        "adcode": 220211,
        "city": "吉林省吉林市丰满区",
        "longitude": 126.562274,
        "latitude": 43.821601
    },
    {
        "adcode": 220221,
        "city": "吉林省吉林市永吉县",
        "longitude": 126.497741,
        "latitude": 43.672582
    },
    {
        "adcode": 220281,
        "city": "吉林省吉林市蛟河市",
        "longitude": 127.344501,
        "latitude": 43.723713
    },
    {
        "adcode": 220282,
        "city": "吉林省吉林市桦甸市",
        "longitude": 126.74631,
        "latitude": 42.972097
    },
    {
        "adcode": 220283,
        "city": "吉林省吉林市舒兰市",
        "longitude": 126.965607,
        "latitude": 44.406106
    },
    {
        "adcode": 220284,
        "city": "吉林省吉林市磐石市",
        "longitude": 126.060427,
        "latitude": 42.946285
    },
    {
        "adcode": 220300,
        "city": "吉林省四平市",
        "longitude": 124.350398,
        "latitude": 43.166419
    },
    {
        "adcode": 220301,
        "city": "吉林省四平市市辖区",
        "longitude": 124.350398,
        "latitude": 43.166419
    },
    {
        "adcode": 220302,
        "city": "吉林省四平市铁西区",
        "longitude": 124.345722,
        "latitude": 43.146155
    },
    {
        "adcode": 220303,
        "city": "吉林省四平市铁东区",
        "longitude": 124.409622,
        "latitude": 43.162048
    },
    {
        "adcode": 220322,
        "city": "吉林省四平市梨树县",
        "longitude": 124.33539,
        "latitude": 43.30706
    },
    {
        "adcode": 220323,
        "city": "吉林省四平市伊通满族自治县",
        "longitude": 125.305394,
        "latitude": 43.345754
    },
    {
        "adcode": 220381,
        "city": "吉林省四平市公主岭市",
        "longitude": 124.82283,
        "latitude": 43.504687
    },
    {
        "adcode": 220382,
        "city": "吉林省四平市双辽市",
        "longitude": 123.502724,
        "latitude": 43.518302
    },
    {
        "adcode": 220400,
        "city": "吉林省辽源市",
        "longitude": 125.143532,
        "latitude": 42.887918
    },
    {
        "adcode": 220401,
        "city": "吉林省辽源市市辖区",
        "longitude": 125.143532,
        "latitude": 42.887918
    },
    {
        "adcode": 220402,
        "city": "吉林省辽源市龙山区",
        "longitude": 125.136452,
        "latitude": 42.901534
    },
    {
        "adcode": 220403,
        "city": "吉林省辽源市西安区",
        "longitude": 125.149283,
        "latitude": 42.927265
    },
    {
        "adcode": 220421,
        "city": "吉林省辽源市东丰县",
        "longitude": 125.530991,
        "latitude": 42.676935
    },
    {
        "adcode": 220422,
        "city": "吉林省辽源市东辽县",
        "longitude": 124.991521,
        "latitude": 42.926331
    },
    {
        "adcode": 220500,
        "city": "吉林省通化市",
        "longitude": 125.939697,
        "latitude": 41.728401
    },
    {
        "adcode": 220501,
        "city": "吉林省通化市市辖区",
        "longitude": 125.939697,
        "latitude": 41.728401
    },
    {
        "adcode": 220502,
        "city": "吉林省通化市东昌区",
        "longitude": 125.955102,
        "latitude": 41.728498
    },
    {
        "adcode": 220503,
        "city": "吉林省通化市二道江区",
        "longitude": 126.042535,
        "latitude": 41.774053
    },
    {
        "adcode": 220521,
        "city": "吉林省通化市通化县",
        "longitude": 125.759259,
        "latitude": 41.679808
    },
    {
        "adcode": 220523,
        "city": "吉林省通化市辉南县",
        "longitude": 126.046912,
        "latitude": 42.684993
    },
    {
        "adcode": 220524,
        "city": "吉林省通化市柳河县",
        "longitude": 125.744735,
        "latitude": 42.284606
    },
    {
        "adcode": 220581,
        "city": "吉林省通化市梅河口市",
        "longitude": 125.683832,
        "latitude": 42.530341
    },
    {
        "adcode": 220582,
        "city": "吉林省通化市集安市",
        "longitude": 126.194031,
        "latitude": 41.125307
    },
    {
        "adcode": 220600,
        "city": "吉林省白山市",
        "longitude": 126.423587,
        "latitude": 41.939994
    },
    {
        "adcode": 220601,
        "city": "吉林省白山市市辖区",
        "longitude": 126.423587,
        "latitude": 41.939994
    },
    {
        "adcode": 220602,
        "city": "吉林省白山市浑江区",
        "longitude": 126.416094,
        "latitude": 41.945409
    },
    {
        "adcode": 220605,
        "city": "吉林省白山市江源区",
        "longitude": 126.591144,
        "latitude": 42.056773
    },
    {
        "adcode": 220621,
        "city": "吉林省白山市抚松县",
        "longitude": 127.449764,
        "latitude": 42.221208
    },
    {
        "adcode": 220622,
        "city": "吉林省白山市靖宇县",
        "longitude": 126.813625,
        "latitude": 42.38876
    },
    {
        "adcode": 220623,
        "city": "吉林省白山市长白朝鲜族自治县",
        "longitude": 128.200789,
        "latitude": 41.420018
    },
    {
        "adcode": 220681,
        "city": "吉林省白山市临江市",
        "longitude": 126.918087,
        "latitude": 41.811979
    },
    {
        "adcode": 220700,
        "city": "吉林省松原市",
        "longitude": 124.825117,
        "latitude": 45.141789
    },
    {
        "adcode": 220701,
        "city": "吉林省松原市市辖区",
        "longitude": 124.825117,
        "latitude": 45.141789
    },
    {
        "adcode": 220702,
        "city": "吉林省松原市宁江区",
        "longitude": 124.817054,
        "latitude": 45.171792
    },
    {
        "adcode": 220721,
        "city": "吉林省松原市前郭尔罗斯蒙古族自治县",
        "longitude": 124.823242,
        "latitude": 45.11803
    },
    {
        "adcode": 220722,
        "city": "吉林省松原市长岭县",
        "longitude": 123.967484,
        "latitude": 44.275895
    },
    {
        "adcode": 220723,
        "city": "吉林省松原市乾安县",
        "longitude": 124.041139,
        "latitude": 45.003774
    },
    {
        "adcode": 220781,
        "city": "吉林省松原市扶余市",
        "longitude": 126.049774,
        "latitude": 44.988449
    },
    {
        "adcode": 220800,
        "city": "吉林省白城市",
        "longitude": 122.839024,
        "latitude": 45.619641
    },
    {
        "adcode": 220801,
        "city": "吉林省白城市市辖区",
        "longitude": 122.839024,
        "latitude": 45.619641
    },
    {
        "adcode": 220802,
        "city": "吉林省白城市洮北区",
        "longitude": 122.851029,
        "latitude": 45.621716
    },
    {
        "adcode": 220821,
        "city": "吉林省白城市镇赉县",
        "longitude": 123.19989,
        "latitude": 45.847435
    },
    {
        "adcode": 220822,
        "city": "吉林省白城市通榆县",
        "longitude": 123.088239,
        "latitude": 44.812911
    },
    {
        "adcode": 220881,
        "city": "吉林省白城市洮南市",
        "longitude": 122.783779,
        "latitude": 45.339113
    },
    {
        "adcode": 220882,
        "city": "吉林省白城市大安市",
        "longitude": 124.292626,
        "latitude": 45.506996
    },
    {
        "adcode": 222400,
        "city": "吉林省延边朝鲜族自治州",
        "longitude": 129.508946,
        "latitude": 42.891253
    },
    {
        "adcode": 222401,
        "city": "吉林省延边朝鲜族自治州延吉市",
        "longitude": 129.508946,
        "latitude": 42.891255
    },
    {
        "adcode": 222402,
        "city": "吉林省延边朝鲜族自治州图们市",
        "longitude": 129.84371,
        "latitude": 42.968044
    },
    {
        "adcode": 222403,
        "city": "吉林省延边朝鲜族自治州敦化市",
        "longitude": 128.232013,
        "latitude": 43.372413
    },
    {
        "adcode": 222404,
        "city": "吉林省延边朝鲜族自治州珲春市",
        "longitude": 130.366036,
        "latitude": 42.862821
    },
    {
        "adcode": 222405,
        "city": "吉林省延边朝鲜族自治州龙井市",
        "longitude": 129.427066,
        "latitude": 42.766311
    },
    {
        "adcode": 222406,
        "city": "吉林省延边朝鲜族自治州和龙市",
        "longitude": 129.010106,
        "latitude": 42.546675
    },
    {
        "adcode": 222424,
        "city": "吉林省延边朝鲜族自治州汪清县",
        "longitude": 129.771607,
        "latitude": 43.312522
    },
    {
        "adcode": 222426,
        "city": "吉林省延边朝鲜族自治州安图县",
        "longitude": 128.899807,
        "latitude": 43.111964
    },
    {
        "adcode": 230000,
        "city": "黑龙江省",
        "longitude": 126.661669,
        "latitude": 45.742347
    },
    {
        "adcode": 230100,
        "city": "黑龙江省哈尔滨市",
        "longitude": 126.534967,
        "latitude": 45.803775
    },
    {
        "adcode": 230101,
        "city": "黑龙江省哈尔滨市市辖区",
        "longitude": 126.534967,
        "latitude": 45.803775
    },
    {
        "adcode": 230102,
        "city": "黑龙江省哈尔滨市道里区",
        "longitude": 126.616957,
        "latitude": 45.755777
    },
    {
        "adcode": 230103,
        "city": "黑龙江省哈尔滨市南岗区",
        "longitude": 126.668788,
        "latitude": 45.75997
    },
    {
        "adcode": 230104,
        "city": "黑龙江省哈尔滨市道外区",
        "longitude": 126.649451,
        "latitude": 45.792113
    },
    {
        "adcode": 230108,
        "city": "黑龙江省哈尔滨市平房区",
        "longitude": 126.629257,
        "latitude": 45.605567
    },
    {
        "adcode": 230109,
        "city": "黑龙江省哈尔滨市松北区",
        "longitude": 126.510275,
        "latitude": 45.802756
    },
    {
        "adcode": 230110,
        "city": "黑龙江省哈尔滨市香坊区",
        "longitude": 126.662593,
        "latitude": 45.707716
    },
    {
        "adcode": 230111,
        "city": "黑龙江省哈尔滨市呼兰区",
        "longitude": 126.587709,
        "latitude": 45.889427
    },
    {
        "adcode": 230112,
        "city": "黑龙江省哈尔滨市阿城区",
        "longitude": 126.958098,
        "latitude": 45.54867
    },
    {
        "adcode": 230113,
        "city": "黑龙江省哈尔滨市双城区",
        "longitude": 126.312745,
        "latitude": 45.383263
    },
    {
        "adcode": 230123,
        "city": "黑龙江省哈尔滨市依兰县",
        "longitude": 129.567985,
        "latitude": 46.324534
    },
    {
        "adcode": 230124,
        "city": "黑龙江省哈尔滨市方正县",
        "longitude": 128.829536,
        "latitude": 45.851695
    },
    {
        "adcode": 230125,
        "city": "黑龙江省哈尔滨市宾县",
        "longitude": 127.466634,
        "latitude": 45.745918
    },
    {
        "adcode": 230126,
        "city": "黑龙江省哈尔滨市巴彦县",
        "longitude": 127.403182,
        "latitude": 46.085379
    },
    {
        "adcode": 230127,
        "city": "黑龙江省哈尔滨市木兰县",
        "longitude": 128.043466,
        "latitude": 45.950582
    },
    {
        "adcode": 230128,
        "city": "黑龙江省哈尔滨市通河县",
        "longitude": 128.749352,
        "latitude": 45.972425
    },
    {
        "adcode": 230129,
        "city": "黑龙江省哈尔滨市延寿县",
        "longitude": 128.331644,
        "latitude": 45.451897
    },
    {
        "adcode": 230183,
        "city": "黑龙江省哈尔滨市尚志市",
        "longitude": 128.009895,
        "latitude": 45.209586
    },
    {
        "adcode": 230184,
        "city": "黑龙江省哈尔滨市五常市",
        "longitude": 127.167619,
        "latitude": 44.931992
    },
    {
        "adcode": 230200,
        "city": "黑龙江省齐齐哈尔市",
        "longitude": 123.918186,
        "latitude": 47.354348
    },
    {
        "adcode": 230201,
        "city": "黑龙江省齐齐哈尔市市辖区",
        "longitude": 123.918186,
        "latitude": 47.354348
    },
    {
        "adcode": 230202,
        "city": "黑龙江省齐齐哈尔市龙沙区",
        "longitude": 123.957531,
        "latitude": 47.317309
    },
    {
        "adcode": 230203,
        "city": "黑龙江省齐齐哈尔市建华区",
        "longitude": 123.955464,
        "latitude": 47.354364
    },
    {
        "adcode": 230204,
        "city": "黑龙江省齐齐哈尔市铁锋区",
        "longitude": 123.978293,
        "latitude": 47.340518
    },
    {
        "adcode": 230205,
        "city": "黑龙江省齐齐哈尔市昂昂溪区",
        "longitude": 123.822401,
        "latitude": 47.15516
    },
    {
        "adcode": 230206,
        "city": "黑龙江省齐齐哈尔市富拉尔基区",
        "longitude": 123.62919,
        "latitude": 47.208843
    },
    {
        "adcode": 230207,
        "city": "黑龙江省齐齐哈尔市碾子山区",
        "longitude": 122.887775,
        "latitude": 47.516872
    },
    {
        "adcode": 230208,
        "city": "黑龙江省齐齐哈尔市梅里斯达斡尔族区",
        "longitude": 123.75291,
        "latitude": 47.309537
    },
    {
        "adcode": 230221,
        "city": "黑龙江省齐齐哈尔市龙江县",
        "longitude": 123.205323,
        "latitude": 47.338665
    },
    {
        "adcode": 230223,
        "city": "黑龙江省齐齐哈尔市依安县",
        "longitude": 125.306279,
        "latitude": 47.893548
    },
    {
        "adcode": 230224,
        "city": "黑龙江省齐齐哈尔市泰来县",
        "longitude": 123.416631,
        "latitude": 46.393694
    },
    {
        "adcode": 230225,
        "city": "黑龙江省齐齐哈尔市甘南县",
        "longitude": 123.507429,
        "latitude": 47.922406
    },
    {
        "adcode": 230227,
        "city": "黑龙江省齐齐哈尔市富裕县",
        "longitude": 124.473924,
        "latitude": 47.77455
    },
    {
        "adcode": 230229,
        "city": "黑龙江省齐齐哈尔市克山县",
        "longitude": 125.875705,
        "latitude": 48.037031
    },
    {
        "adcode": 230230,
        "city": "黑龙江省齐齐哈尔市克东县",
        "longitude": 126.248721,
        "latitude": 48.04206
    },
    {
        "adcode": 230231,
        "city": "黑龙江省齐齐哈尔市拜泉县",
        "longitude": 126.100213,
        "latitude": 47.595851
    },
    {
        "adcode": 230281,
        "city": "黑龙江省齐齐哈尔市讷河市",
        "longitude": 124.884244,
        "latitude": 48.484099
    },
    {
        "adcode": 230300,
        "city": "黑龙江省鸡西市",
        "longitude": 130.969333,
        "latitude": 45.295075
    },
    {
        "adcode": 230301,
        "city": "黑龙江省鸡西市市辖区",
        "longitude": 130.969333,
        "latitude": 45.295075
    },
    {
        "adcode": 230302,
        "city": "黑龙江省鸡西市鸡冠区",
        "longitude": 130.980894,
        "latitude": 45.304073
    },
    {
        "adcode": 230303,
        "city": "黑龙江省鸡西市恒山区",
        "longitude": 130.904963,
        "latitude": 45.210668
    },
    {
        "adcode": 230304,
        "city": "黑龙江省鸡西市滴道区",
        "longitude": 130.843613,
        "latitude": 45.348764
    },
    {
        "adcode": 230305,
        "city": "黑龙江省鸡西市梨树区",
        "longitude": 130.69699,
        "latitude": 45.092046
    },
    {
        "adcode": 230306,
        "city": "黑龙江省鸡西市城子河区",
        "longitude": 131.011304,
        "latitude": 45.33697
    },
    {
        "adcode": 230307,
        "city": "黑龙江省鸡西市麻山区",
        "longitude": 130.478187,
        "latitude": 45.212088
    },
    {
        "adcode": 230321,
        "city": "黑龙江省鸡西市鸡东县",
        "longitude": 131.12408,
        "latitude": 45.260412
    },
    {
        "adcode": 230381,
        "city": "黑龙江省鸡西市虎林市",
        "longitude": 132.93721,
        "latitude": 45.762686
    },
    {
        "adcode": 230382,
        "city": "黑龙江省鸡西市密山市",
        "longitude": 131.846636,
        "latitude": 45.529775
    },
    {
        "adcode": 230400,
        "city": "黑龙江省鹤岗市",
        "longitude": 130.297964,
        "latitude": 47.349916
    },
    {
        "adcode": 230401,
        "city": "黑龙江省鹤岗市市辖区",
        "longitude": 130.297964,
        "latitude": 47.349916
    },
    {
        "adcode": 230402,
        "city": "黑龙江省鹤岗市向阳区",
        "longitude": 130.294309,
        "latitude": 47.342478
    },
    {
        "adcode": 230403,
        "city": "黑龙江省鹤岗市工农区",
        "longitude": 130.274684,
        "latitude": 47.318781
    },
    {
        "adcode": 230404,
        "city": "黑龙江省鹤岗市南山区",
        "longitude": 130.287057,
        "latitude": 47.315127
    },
    {
        "adcode": 230405,
        "city": "黑龙江省鹤岗市兴安区",
        "longitude": 130.239245,
        "latitude": 47.25285
    },
    {
        "adcode": 230406,
        "city": "黑龙江省鹤岗市东山区",
        "longitude": 130.317062,
        "latitude": 47.338535
    },
    {
        "adcode": 230407,
        "city": "黑龙江省鹤岗市兴山区",
        "longitude": 130.303574,
        "latitude": 47.357666
    },
    {
        "adcode": 230421,
        "city": "黑龙江省鹤岗市萝北县",
        "longitude": 130.828626,
        "latitude": 47.577495
    },
    {
        "adcode": 230422,
        "city": "黑龙江省鹤岗市绥滨县",
        "longitude": 131.852759,
        "latitude": 47.289116
    },
    {
        "adcode": 230500,
        "city": "黑龙江省双鸭山市",
        "longitude": 131.159133,
        "latitude": 46.646508
    },
    {
        "adcode": 230501,
        "city": "黑龙江省双鸭山市市辖区",
        "longitude": 131.159133,
        "latitude": 46.646508
    },
    {
        "adcode": 230502,
        "city": "黑龙江省双鸭山市尖山区",
        "longitude": 131.158416,
        "latitude": 46.64635
    },
    {
        "adcode": 230503,
        "city": "黑龙江省双鸭山市岭东区",
        "longitude": 131.164724,
        "latitude": 46.592721
    },
    {
        "adcode": 230505,
        "city": "黑龙江省双鸭山市四方台区",
        "longitude": 131.334503,
        "latitude": 46.594316
    },
    {
        "adcode": 230506,
        "city": "黑龙江省双鸭山市宝山区",
        "longitude": 131.401589,
        "latitude": 46.577167
    },
    {
        "adcode": 230521,
        "city": "黑龙江省双鸭山市集贤县",
        "longitude": 131.140483,
        "latitude": 46.728377
    },
    {
        "adcode": 230522,
        "city": "黑龙江省双鸭山市友谊县",
        "longitude": 131.808064,
        "latitude": 46.767299
    },
    {
        "adcode": 230523,
        "city": "黑龙江省双鸭山市宝清县",
        "longitude": 132.197243,
        "latitude": 46.326925
    },
    {
        "adcode": 230524,
        "city": "黑龙江省双鸭山市饶河县",
        "longitude": 134.013872,
        "latitude": 46.798164
    },
    {
        "adcode": 230600,
        "city": "黑龙江省大庆市",
        "longitude": 125.103784,
        "latitude": 46.589309
    },
    {
        "adcode": 230601,
        "city": "黑龙江省大庆市市辖区",
        "longitude": 125.103784,
        "latitude": 46.589309
    },
    {
        "adcode": 230602,
        "city": "黑龙江省大庆市萨尔图区",
        "longitude": 125.114643,
        "latitude": 46.596356
    },
    {
        "adcode": 230603,
        "city": "黑龙江省大庆市龙凤区",
        "longitude": 125.135326,
        "latitude": 46.562247
    },
    {
        "adcode": 230604,
        "city": "黑龙江省大庆市让胡路区",
        "longitude": 124.870597,
        "latitude": 46.652358
    },
    {
        "adcode": 230605,
        "city": "黑龙江省大庆市红岗区",
        "longitude": 124.891039,
        "latitude": 46.398418
    },
    {
        "adcode": 230606,
        "city": "黑龙江省大庆市大同区",
        "longitude": 124.812364,
        "latitude": 46.039828
    },
    {
        "adcode": 230621,
        "city": "黑龙江省大庆市肇州县",
        "longitude": 125.268643,
        "latitude": 45.699066
    },
    {
        "adcode": 230622,
        "city": "黑龙江省大庆市肇源县",
        "longitude": 125.078223,
        "latitude": 45.51932
    },
    {
        "adcode": 230623,
        "city": "黑龙江省大庆市林甸县",
        "longitude": 124.863603,
        "latitude": 47.171717
    },
    {
        "adcode": 230624,
        "city": "黑龙江省大庆市杜尔伯特蒙古族自治县",
        "longitude": 124.442572,
        "latitude": 46.862817
    },
    {
        "adcode": 230700,
        "city": "黑龙江省伊春市",
        "longitude": 128.841147,
        "latitude": 47.727536
    },
    {
        "adcode": 230701,
        "city": "黑龙江省伊春市市辖区",
        "longitude": 128.841147,
        "latitude": 47.727536
    },
    {
        "adcode": 230702,
        "city": "黑龙江省伊春市伊春区",
        "longitude": 128.907303,
        "latitude": 47.728171
    },
    {
        "adcode": 230703,
        "city": "黑龙江省伊春市南岔区",
        "longitude": 129.283467,
        "latitude": 47.138035
    },
    {
        "adcode": 230704,
        "city": "黑龙江省伊春市友好区",
        "longitude": 128.84075,
        "latitude": 47.853778
    },
    {
        "adcode": 230705,
        "city": "黑龙江省伊春市西林区",
        "longitude": 129.312851,
        "latitude": 47.480735
    },
    {
        "adcode": 230706,
        "city": "黑龙江省伊春市翠峦区",
        "longitude": 128.669859,
        "latitude": 47.726728
    },
    {
        "adcode": 230707,
        "city": "黑龙江省伊春市新青区",
        "longitude": 129.5336,
        "latitude": 48.290455
    },
    {
        "adcode": 230708,
        "city": "黑龙江省伊春市美溪区",
        "longitude": 129.129314,
        "latitude": 47.63509
    },
    {
        "adcode": 230709,
        "city": "黑龙江省伊春市金山屯区",
        "longitude": 129.429117,
        "latitude": 47.413074
    },
    {
        "adcode": 230710,
        "city": "黑龙江省伊春市五营区",
        "longitude": 129.245344,
        "latitude": 48.10791
    },
    {
        "adcode": 230711,
        "city": "黑龙江省伊春市乌马河区",
        "longitude": 128.799478,
        "latitude": 47.727687
    },
    {
        "adcode": 230712,
        "city": "黑龙江省伊春市汤旺河区",
        "longitude": 129.571108,
        "latitude": 48.454651
    },
    {
        "adcode": 230713,
        "city": "黑龙江省伊春市带岭区",
        "longitude": 129.020793,
        "latitude": 47.028397
    },
    {
        "adcode": 230714,
        "city": "黑龙江省伊春市乌伊岭区",
        "longitude": 129.43792,
        "latitude": 48.590323
    },
    {
        "adcode": 230715,
        "city": "黑龙江省伊春市红星区",
        "longitude": 129.390983,
        "latitude": 48.239432
    },
    {
        "adcode": 230716,
        "city": "黑龙江省伊春市上甘岭区",
        "longitude": 129.02426,
        "latitude": 47.974708
    },
    {
        "adcode": 230722,
        "city": "黑龙江省伊春市嘉荫县",
        "longitude": 130.403564,
        "latitude": 48.889109
    },
    {
        "adcode": 230781,
        "city": "黑龙江省伊春市铁力市",
        "longitude": 128.032422,
        "latitude": 46.98664
    },
    {
        "adcode": 230800,
        "city": "黑龙江省佳木斯市",
        "longitude": 130.318917,
        "latitude": 46.799922
    },
    {
        "adcode": 230801,
        "city": "黑龙江省佳木斯市市辖区",
        "longitude": 130.318917,
        "latitude": 46.799922
    },
    {
        "adcode": 230803,
        "city": "黑龙江省佳木斯市向阳区",
        "longitude": 130.365346,
        "latitude": 46.80779
    },
    {
        "adcode": 230804,
        "city": "黑龙江省佳木斯市前进区",
        "longitude": 130.375063,
        "latitude": 46.814103
    },
    {
        "adcode": 230805,
        "city": "黑龙江省佳木斯市东风区",
        "longitude": 130.403664,
        "latitude": 46.822572
    },
    {
        "adcode": 230811,
        "city": "黑龙江省佳木斯市郊区",
        "longitude": 130.327195,
        "latitude": 46.810086
    },
    {
        "adcode": 230822,
        "city": "黑龙江省佳木斯市桦南县",
        "longitude": 130.553343,
        "latitude": 46.239185
    },
    {
        "adcode": 230826,
        "city": "黑龙江省佳木斯市桦川县",
        "longitude": 130.719081,
        "latitude": 47.023001
    },
    {
        "adcode": 230828,
        "city": "黑龙江省佳木斯市汤原县",
        "longitude": 129.905072,
        "latitude": 46.730706
    },
    {
        "adcode": 230881,
        "city": "黑龙江省佳木斯市同江市",
        "longitude": 132.510919,
        "latitude": 47.642707
    },
    {
        "adcode": 230882,
        "city": "黑龙江省佳木斯市富锦市",
        "longitude": 132.037686,
        "latitude": 47.250108
    },
    {
        "adcode": 230883,
        "city": "黑龙江省佳木斯市抚远市",
        "longitude": 134.307884,
        "latitude": 48.364687
    },
    {
        "adcode": 230900,
        "city": "黑龙江省七台河市",
        "longitude": 131.003138,
        "latitude": 45.771726
    },
    {
        "adcode": 230901,
        "city": "黑龙江省七台河市市辖区",
        "longitude": 131.003138,
        "latitude": 45.771726
    },
    {
        "adcode": 230902,
        "city": "黑龙江省七台河市新兴区",
        "longitude": 130.932143,
        "latitude": 45.81593
    },
    {
        "adcode": 230903,
        "city": "黑龙江省七台河市桃山区",
        "longitude": 131.020275,
        "latitude": 45.765594
    },
    {
        "adcode": 230904,
        "city": "黑龙江省七台河市茄子河区",
        "longitude": 131.068075,
        "latitude": 45.785215
    },
    {
        "adcode": 230921,
        "city": "黑龙江省七台河市勃利县",
        "longitude": 130.592093,
        "latitude": 45.755507
    },
    {
        "adcode": 231000,
        "city": "黑龙江省牡丹江市",
        "longitude": 129.633168,
        "latitude": 44.551653
    },
    {
        "adcode": 231001,
        "city": "黑龙江省牡丹江市市辖区",
        "longitude": 129.633168,
        "latitude": 44.551653
    },
    {
        "adcode": 231002,
        "city": "黑龙江省牡丹江市东安区",
        "longitude": 129.626642,
        "latitude": 44.58136
    },
    {
        "adcode": 231003,
        "city": "黑龙江省牡丹江市阳明区",
        "longitude": 129.635615,
        "latitude": 44.596104
    },
    {
        "adcode": 231004,
        "city": "黑龙江省牡丹江市爱民区",
        "longitude": 129.591657,
        "latitude": 44.596053
    },
    {
        "adcode": 231005,
        "city": "黑龙江省牡丹江市西安区",
        "longitude": 129.616121,
        "latitude": 44.577625
    },
    {
        "adcode": 231025,
        "city": "黑龙江省牡丹江市林口县",
        "longitude": 130.284033,
        "latitude": 45.278046
    },
    {
        "adcode": 231081,
        "city": "黑龙江省牡丹江市绥芬河市",
        "longitude": 131.152546,
        "latitude": 44.412309
    },
    {
        "adcode": 231083,
        "city": "黑龙江省牡丹江市海林市",
        "longitude": 129.380482,
        "latitude": 44.594213
    },
    {
        "adcode": 231084,
        "city": "黑龙江省牡丹江市宁安市",
        "longitude": 129.482851,
        "latitude": 44.34072
    },
    {
        "adcode": 231085,
        "city": "黑龙江省牡丹江市穆棱市",
        "longitude": 130.524437,
        "latitude": 44.918813
    },
    {
        "adcode": 231086,
        "city": "黑龙江省牡丹江市东宁市",
        "longitude": 131.122915,
        "latitude": 44.087585
    },
    {
        "adcode": 231100,
        "city": "黑龙江省黑河市",
        "longitude": 127.52856,
        "latitude": 50.245329
    },
    {
        "adcode": 231101,
        "city": "黑龙江省黑河市市辖区",
        "longitude": 127.52856,
        "latitude": 50.245329
    },
    {
        "adcode": 231102,
        "city": "黑龙江省黑河市爱辉区",
        "longitude": 127.500451,
        "latitude": 50.252106
    },
    {
        "adcode": 231121,
        "city": "黑龙江省黑河市嫩江县",
        "longitude": 125.221192,
        "latitude": 49.185766
    },
    {
        "adcode": 231123,
        "city": "黑龙江省黑河市逊克县",
        "longitude": 128.47875,
        "latitude": 49.564252
    },
    {
        "adcode": 231124,
        "city": "黑龙江省黑河市孙吴县",
        "longitude": 127.336304,
        "latitude": 49.425652
    },
    {
        "adcode": 231181,
        "city": "黑龙江省黑河市北安市",
        "longitude": 126.491199,
        "latitude": 48.241374
    },
    {
        "adcode": 231182,
        "city": "黑龙江省黑河市五大连池市",
        "longitude": 126.205516,
        "latitude": 48.517257
    },
    {
        "adcode": 231200,
        "city": "黑龙江省绥化市",
        "longitude": 126.968887,
        "latitude": 46.653845
    },
    {
        "adcode": 231201,
        "city": "黑龙江省绥化市市辖区",
        "longitude": 126.968887,
        "latitude": 46.653845
    },
    {
        "adcode": 231202,
        "city": "黑龙江省绥化市北林区",
        "longitude": 126.985593,
        "latitude": 46.637344
    },
    {
        "adcode": 231221,
        "city": "黑龙江省绥化市望奎县",
        "longitude": 126.486076,
        "latitude": 46.832719
    },
    {
        "adcode": 231222,
        "city": "黑龙江省绥化市兰西县",
        "longitude": 126.288113,
        "latitude": 46.252447
    },
    {
        "adcode": 231223,
        "city": "黑龙江省绥化市青冈县",
        "longitude": 126.11386,
        "latitude": 46.689671
    },
    {
        "adcode": 231224,
        "city": "黑龙江省绥化市庆安县",
        "longitude": 127.507825,
        "latitude": 46.880102
    },
    {
        "adcode": 231225,
        "city": "黑龙江省绥化市明水县",
        "longitude": 125.906301,
        "latitude": 47.173426
    },
    {
        "adcode": 231226,
        "city": "黑龙江省绥化市绥棱县",
        "longitude": 127.114832,
        "latitude": 47.236015
    },
    {
        "adcode": 231281,
        "city": "黑龙江省绥化市安达市",
        "longitude": 125.352188,
        "latitude": 46.423508
    },
    {
        "adcode": 231282,
        "city": "黑龙江省绥化市肇东市",
        "longitude": 125.961814,
        "latitude": 46.051126
    },
    {
        "adcode": 231283,
        "city": "黑龙江省绥化市海伦市",
        "longitude": 126.973143,
        "latitude": 47.461971
    },
    {
        "adcode": 232700,
        "city": "黑龙江省大兴安岭地区",
        "longitude": 124.71108,
        "latitude": 52.335206
    },
    {
        "adcode": 232701,
        "city": "黑龙江省大兴安岭地区漠河县漠河",
        "longitude": 122.529619,
        "latitude": 52.970721
    },
    {
        "adcode": 232718,
        "city": "黑龙江省大兴安岭地区加格达奇区",
        "longitude": 124.139584,
        "latitude": 50.408724
    },
    {
        "adcode": 232721,
        "city": "黑龙江省大兴安岭地区呼玛县",
        "longitude": 126.665319,
        "latitude": 51.725637
    },
    {
        "adcode": 232722,
        "city": "黑龙江省大兴安岭地区塔河县",
        "longitude": 124.709996,
        "latitude": 52.334457
    },
    {
        "adcode": 310000,
        "city": "上海市",
        "longitude": 121.473701,
        "latitude": 31.230416
    },
    {
        "adcode": 310100,
        "city": "上海市市辖区",
        "longitude": 121.473701,
        "latitude": 31.230416
    },
    {
        "adcode": 310101,
        "city": "上海市黄浦区",
        "longitude": 121.46924,
        "latitude": 31.22986
    },
    {
        "adcode": 310104,
        "city": "上海市徐汇区",
        "longitude": 121.437866,
        "latitude": 31.19919
    },
    {
        "adcode": 310105,
        "city": "上海市长宁区",
        "longitude": 121.424624,
        "latitude": 31.220367
    },
    {
        "adcode": 310106,
        "city": "上海市静安区",
        "longitude": 121.459384,
        "latitude": 31.247105
    },
    {
        "adcode": 310107,
        "city": "上海市普陀区",
        "longitude": 121.395555,
        "latitude": 31.24984
    },
    {
        "adcode": 310109,
        "city": "上海市虹口区",
        "longitude": 121.505133,
        "latitude": 31.2646
    },
    {
        "adcode": 310110,
        "city": "上海市杨浦区",
        "longitude": 121.526077,
        "latitude": 31.259541
    },
    {
        "adcode": 310112,
        "city": "上海市闵行区",
        "longitude": 121.381709,
        "latitude": 31.112813
    },
    {
        "adcode": 310113,
        "city": "上海市宝山区",
        "longitude": 121.489612,
        "latitude": 31.405457
    },
    {
        "adcode": 310114,
        "city": "上海市嘉定区",
        "longitude": 121.2653,
        "latitude": 31.375602
    },
    {
        "adcode": 310115,
        "city": "上海市浦东新区",
        "longitude": 121.544379,
        "latitude": 31.221517
    },
    {
        "adcode": 310116,
        "city": "上海市金山区",
        "longitude": 121.34197,
        "latitude": 30.741991
    },
    {
        "adcode": 310117,
        "city": "上海市松江区",
        "longitude": 121.227747,
        "latitude": 31.032243
    },
    {
        "adcode": 310118,
        "city": "上海市青浦区",
        "longitude": 121.124178,
        "latitude": 31.150681
    },
    {
        "adcode": 310120,
        "city": "上海市奉贤区",
        "longitude": 121.474042,
        "latitude": 30.917795
    },
    {
        "adcode": 310151,
        "city": "上海市崇明区",
        "longitude": 121.397417,
        "latitude": 31.623587
    },
    {
        "adcode": 320000,
        "city": "江苏省",
        "longitude": 118.763232,
        "latitude": 32.061707
    },
    {
        "adcode": 320100,
        "city": "江苏省南京市",
        "longitude": 118.796877,
        "latitude": 32.060255
    },
    {
        "adcode": 320101,
        "city": "江苏省南京市市辖区",
        "longitude": 118.796877,
        "latitude": 32.060255
    },
    {
        "adcode": 320102,
        "city": "江苏省南京市玄武区",
        "longitude": 118.797861,
        "latitude": 32.048687
    },
    {
        "adcode": 320104,
        "city": "江苏省南京市秦淮区",
        "longitude": 118.794744,
        "latitude": 32.039133
    },
    {
        "adcode": 320105,
        "city": "江苏省南京市建邺区",
        "longitude": 118.731694,
        "latitude": 32.003552
    },
    {
        "adcode": 320106,
        "city": "江苏省南京市鼓楼区",
        "longitude": 118.76979,
        "latitude": 32.066336
    },
    {
        "adcode": 320111,
        "city": "江苏省南京市浦口区",
        "longitude": 118.627895,
        "latitude": 32.059093
    },
    {
        "adcode": 320113,
        "city": "江苏省南京市栖霞区",
        "longitude": 118.909246,
        "latitude": 32.096228
    },
    {
        "adcode": 320114,
        "city": "江苏省南京市雨花台区",
        "longitude": 118.779073,
        "latitude": 31.991347
    },
    {
        "adcode": 320115,
        "city": "江苏省南京市江宁区",
        "longitude": 118.839685,
        "latitude": 31.953702
    },
    {
        "adcode": 320116,
        "city": "江苏省南京市六合区",
        "longitude": 118.821401,
        "latitude": 32.322247
    },
    {
        "adcode": 320117,
        "city": "江苏省南京市溧水区",
        "longitude": 119.02828,
        "latitude": 31.651133
    },
    {
        "adcode": 320118,
        "city": "江苏省南京市高淳区",
        "longitude": 118.892085,
        "latitude": 31.328471
    },
    {
        "adcode": 320200,
        "city": "江苏省无锡市",
        "longitude": 120.31191,
        "latitude": 31.491169
    },
    {
        "adcode": 320201,
        "city": "江苏省无锡市市辖区",
        "longitude": 120.31191,
        "latitude": 31.491169
    },
    {
        "adcode": 320205,
        "city": "江苏省无锡市锡山区",
        "longitude": 120.357858,
        "latitude": 31.589715
    },
    {
        "adcode": 320206,
        "city": "江苏省无锡市惠山区",
        "longitude": 120.2985,
        "latitude": 31.681012
    },
    {
        "adcode": 320211,
        "city": "江苏省无锡市滨湖区",
        "longitude": 120.27175,
        "latitude": 31.470483
    },
    {
        "adcode": 320213,
        "city": "江苏省无锡市梁溪区",
        "longitude": 120.296591,
        "latitude": 31.575719
    },
    {
        "adcode": 320214,
        "city": "江苏省无锡市新吴区",
        "longitude": 120.352778,
        "latitude": 31.550957
    },
    {
        "adcode": 320281,
        "city": "江苏省无锡市江阴市",
        "longitude": 120.284939,
        "latitude": 31.920658
    },
    {
        "adcode": 320282,
        "city": "江苏省无锡市宜兴市",
        "longitude": 119.823308,
        "latitude": 31.340637
    },
    {
        "adcode": 320300,
        "city": "江苏省徐州市",
        "longitude": 117.284124,
        "latitude": 34.205768
    },
    {
        "adcode": 320301,
        "city": "江苏省徐州市市辖区",
        "longitude": 117.284124,
        "latitude": 34.205768
    },
    {
        "adcode": 320302,
        "city": "江苏省徐州市鼓楼区",
        "longitude": 117.185591,
        "latitude": 34.288511
    },
    {
        "adcode": 320303,
        "city": "江苏省徐州市云龙区",
        "longitude": 117.25156,
        "latitude": 34.253167
    },
    {
        "adcode": 320305,
        "city": "江苏省徐州市贾汪区",
        "longitude": 117.466687,
        "latitude": 34.435506
    },
    {
        "adcode": 320311,
        "city": "江苏省徐州市泉山区",
        "longitude": 117.193805,
        "latitude": 34.244258
    },
    {
        "adcode": 320312,
        "city": "江苏省徐州市铜山区",
        "longitude": 117.169421,
        "latitude": 34.1807
    },
    {
        "adcode": 320321,
        "city": "江苏省徐州市丰县",
        "longitude": 116.595391,
        "latitude": 34.693906
    },
    {
        "adcode": 320322,
        "city": "江苏省徐州市沛县",
        "longitude": 116.937532,
        "latitude": 34.721656
    },
    {
        "adcode": 320324,
        "city": "江苏省徐州市睢宁县",
        "longitude": 117.941563,
        "latitude": 33.912598
    },
    {
        "adcode": 320381,
        "city": "江苏省徐州市新沂市",
        "longitude": 118.354537,
        "latitude": 34.36958
    },
    {
        "adcode": 320382,
        "city": "江苏省徐州市邳州市",
        "longitude": 118.012531,
        "latitude": 34.338888
    },
    {
        "adcode": 320400,
        "city": "江苏省常州市",
        "longitude": 119.973987,
        "latitude": 31.810689
    },
    {
        "adcode": 320401,
        "city": "江苏省常州市市辖区",
        "longitude": 119.973987,
        "latitude": 31.810689
    },
    {
        "adcode": 320402,
        "city": "江苏省常州市天宁区",
        "longitude": 119.974991,
        "latitude": 31.779619
    },
    {
        "adcode": 320404,
        "city": "江苏省常州市钟楼区",
        "longitude": 119.902112,
        "latitude": 31.802192
    },
    {
        "adcode": 320411,
        "city": "江苏省常州市新北区",
        "longitude": 119.972182,
        "latitude": 31.830641
    },
    {
        "adcode": 320412,
        "city": "江苏省常州市武进区",
        "longitude": 119.942437,
        "latitude": 31.701188
    },
    {
        "adcode": 320413,
        "city": "江苏省常州市金坛区",
        "longitude": 119.597897,
        "latitude": 31.723247
    },
    {
        "adcode": 320481,
        "city": "江苏省常州市溧阳市",
        "longitude": 119.484211,
        "latitude": 31.416911
    },
    {
        "adcode": 320500,
        "city": "江苏省苏州市",
        "longitude": 120.585315,
        "latitude": 31.298886
    },
    {
        "adcode": 320501,
        "city": "江苏省苏州市市辖区",
        "longitude": 120.585315,
        "latitude": 31.298886
    },
    {
        "adcode": 320505,
        "city": "江苏省苏州市虎丘区",
        "longitude": 120.566833,
        "latitude": 31.294845
    },
    {
        "adcode": 320506,
        "city": "江苏省苏州市吴中区",
        "longitude": 120.631898,
        "latitude": 31.264212
    },
    {
        "adcode": 320507,
        "city": "江苏省苏州市相城区",
        "longitude": 120.642663,
        "latitude": 31.369088
    },
    {
        "adcode": 320508,
        "city": "江苏省苏州市姑苏区",
        "longitude": 120.617296,
        "latitude": 31.336392
    },
    {
        "adcode": 320509,
        "city": "江苏省苏州市吴江区",
        "longitude": 120.645158,
        "latitude": 31.138677
    },
    {
        "adcode": 320571,
        "city": "江苏省苏州市吴中区苏州工业园区",
        "longitude": 120.80712,
        "latitude": 31.351219
    },
    {
        "adcode": 320581,
        "city": "江苏省苏州市常熟市",
        "longitude": 120.752481,
        "latitude": 31.654376
    },
    {
        "adcode": 320582,
        "city": "江苏省苏州市张家港市",
        "longitude": 120.479033,
        "latitude": 31.899861
    },
    {
        "adcode": 320583,
        "city": "江苏省苏州市昆山市",
        "longitude": 120.980737,
        "latitude": 31.385598
    },
    {
        "adcode": 320585,
        "city": "江苏省苏州市太仓市",
        "longitude": 121.13055,
        "latitude": 31.457735
    },
    {
        "adcode": 320600,
        "city": "江苏省南通市",
        "longitude": 120.894291,
        "latitude": 31.980171
    },
    {
        "adcode": 320601,
        "city": "江苏省南通市市辖区",
        "longitude": 120.894291,
        "latitude": 31.980171
    },
    {
        "adcode": 320602,
        "city": "江苏省南通市崇川区",
        "longitude": 120.857434,
        "latitude": 32.009875
    },
    {
        "adcode": 320611,
        "city": "江苏省南通市港闸区",
        "longitude": 120.818527,
        "latitude": 32.032442
    },
    {
        "adcode": 320612,
        "city": "江苏省南通市通州区",
        "longitude": 121.075087,
        "latitude": 32.064161
    },
    {
        "adcode": 320623,
        "city": "江苏省南通市如东县",
        "longitude": 121.185201,
        "latitude": 32.331766
    },
    {
        "adcode": 320681,
        "city": "江苏省南通市启东市",
        "longitude": 121.657441,
        "latitude": 31.808026
    },
    {
        "adcode": 320682,
        "city": "江苏省南通市如皋市",
        "longitude": 120.574946,
        "latitude": 32.370557
    },
    {
        "adcode": 320684,
        "city": "江苏省南通市海门市",
        "longitude": 121.181615,
        "latitude": 31.871173
    },
    {
        "adcode": 320685,
        "city": "江苏省南通市海安县海安",
        "longitude": 120.429119,
        "latitude": 32.540848
    },
    {
        "adcode": 320700,
        "city": "江苏省连云港市",
        "longitude": 119.221611,
        "latitude": 34.596653
    },
    {
        "adcode": 320701,
        "city": "江苏省连云港市市辖区",
        "longitude": 119.221611,
        "latitude": 34.596653
    },
    {
        "adcode": 320703,
        "city": "江苏省连云港市连云区",
        "longitude": 119.338788,
        "latitude": 34.760249
    },
    {
        "adcode": 320706,
        "city": "江苏省连云港市海州区",
        "longitude": 119.19371,
        "latitude": 34.606756
    },
    {
        "adcode": 320707,
        "city": "江苏省连云港市赣榆区",
        "longitude": 119.173331,
        "latitude": 34.841349
    },
    {
        "adcode": 320722,
        "city": "江苏省连云港市东海县",
        "longitude": 118.752842,
        "latitude": 34.542309
    },
    {
        "adcode": 320723,
        "city": "江苏省连云港市灌云县",
        "longitude": 119.239381,
        "latitude": 34.284381
    },
    {
        "adcode": 320724,
        "city": "江苏省连云港市灌南县",
        "longitude": 119.315651,
        "latitude": 34.087135
    },
    {
        "adcode": 320800,
        "city": "江苏省淮安市",
        "longitude": 119.015285,
        "latitude": 33.610353
    },
    {
        "adcode": 320801,
        "city": "江苏省淮安市市辖区",
        "longitude": 119.015285,
        "latitude": 33.610353
    },
    {
        "adcode": 320803,
        "city": "江苏省淮安市淮安区",
        "longitude": 119.141099,
        "latitude": 33.502869
    },
    {
        "adcode": 320804,
        "city": "江苏省淮安市淮阴区",
        "longitude": 119.034725,
        "latitude": 33.631893
    },
    {
        "adcode": 320812,
        "city": "江苏省淮安市清江浦区",
        "longitude": 119.033,
        "latitude": 33.5059
    },
    {
        "adcode": 320813,
        "city": "江苏省淮安市洪泽区",
        "longitude": 118.873138,
        "latitude": 33.294223
    },
    {
        "adcode": 320826,
        "city": "江苏省淮安市涟水县",
        "longitude": 119.260335,
        "latitude": 33.78096
    },
    {
        "adcode": 320830,
        "city": "江苏省淮安市盱眙县",
        "longitude": 118.54436,
        "latitude": 33.011971
    },
    {
        "adcode": 320831,
        "city": "江苏省淮安市金湖县",
        "longitude": 119.020585,
        "latitude": 33.025433
    },
    {
        "adcode": 320900,
        "city": "江苏省盐城市",
        "longitude": 120.163561,
        "latitude": 33.347382
    },
    {
        "adcode": 320901,
        "city": "江苏省盐城市市辖区",
        "longitude": 120.163561,
        "latitude": 33.347382
    },
    {
        "adcode": 320902,
        "city": "江苏省盐城市亭湖区",
        "longitude": 120.197358,
        "latitude": 33.390536
    },
    {
        "adcode": 320903,
        "city": "江苏省盐城市盐都区",
        "longitude": 120.153898,
        "latitude": 33.338094
    },
    {
        "adcode": 320904,
        "city": "江苏省盐城市大丰区",
        "longitude": 120.500858,
        "latitude": 33.200331
    },
    {
        "adcode": 320921,
        "city": "江苏省盐城市响水县",
        "longitude": 119.578364,
        "latitude": 34.199479
    },
    {
        "adcode": 320922,
        "city": "江苏省盐城市滨海县",
        "longitude": 119.820831,
        "latitude": 33.990334
    },
    {
        "adcode": 320923,
        "city": "江苏省盐城市阜宁县",
        "longitude": 119.802527,
        "latitude": 33.759325
    },
    {
        "adcode": 320924,
        "city": "江苏省盐城市射阳县",
        "longitude": 120.258053,
        "latitude": 33.774806
    },
    {
        "adcode": 320925,
        "city": "江苏省盐城市建湖县",
        "longitude": 119.798581,
        "latitude": 33.464204
    },
    {
        "adcode": 320981,
        "city": "江苏省盐城市东台市",
        "longitude": 120.320331,
        "latitude": 32.86844
    },
    {
        "adcode": 321000,
        "city": "江苏省扬州市",
        "longitude": 119.412966,
        "latitude": 32.39421
    },
    {
        "adcode": 321001,
        "city": "江苏省扬州市市辖区",
        "longitude": 119.412966,
        "latitude": 32.39421
    },
    {
        "adcode": 321002,
        "city": "江苏省扬州市广陵区",
        "longitude": 119.431849,
        "latitude": 32.39472
    },
    {
        "adcode": 321003,
        "city": "江苏省扬州市邗江区",
        "longitude": 119.398015,
        "latitude": 32.377528
    },
    {
        "adcode": 321012,
        "city": "江苏省扬州市江都区",
        "longitude": 119.569989,
        "latitude": 32.434672
    },
    {
        "adcode": 321023,
        "city": "江苏省扬州市宝应县",
        "longitude": 119.360729,
        "latitude": 33.240392
    },
    {
        "adcode": 321081,
        "city": "江苏省扬州市仪征市",
        "longitude": 119.184766,
        "latitude": 32.272258
    },
    {
        "adcode": 321084,
        "city": "江苏省扬州市高邮市",
        "longitude": 119.459161,
        "latitude": 32.781659
    },
    {
        "adcode": 321100,
        "city": "江苏省镇江市",
        "longitude": 119.425836,
        "latitude": 32.187849
    },
    {
        "adcode": 321101,
        "city": "江苏省镇江市市辖区",
        "longitude": 119.425836,
        "latitude": 32.187849
    },
    {
        "adcode": 321102,
        "city": "江苏省镇江市京口区",
        "longitude": 119.47016,
        "latitude": 32.19828
    },
    {
        "adcode": 321111,
        "city": "江苏省镇江市润州区",
        "longitude": 119.411945,
        "latitude": 32.195333
    },
    {
        "adcode": 321112,
        "city": "江苏省镇江市丹徒区",
        "longitude": 119.433854,
        "latitude": 32.131962
    },
    {
        "adcode": 321181,
        "city": "江苏省镇江市丹阳市",
        "longitude": 119.606536,
        "latitude": 32.010117
    },
    {
        "adcode": 321182,
        "city": "江苏省镇江市扬中市",
        "longitude": 119.797635,
        "latitude": 32.234831
    },
    {
        "adcode": 321183,
        "city": "江苏省镇江市句容市",
        "longitude": 119.168695,
        "latitude": 31.944999
    },
    {
        "adcode": 321200,
        "city": "江苏省泰州市",
        "longitude": 119.923116,
        "latitude": 32.455778
    },
    {
        "adcode": 321201,
        "city": "江苏省泰州市市辖区",
        "longitude": 119.923116,
        "latitude": 32.455778
    },
    {
        "adcode": 321202,
        "city": "江苏省泰州市海陵区",
        "longitude": 119.919425,
        "latitude": 32.491016
    },
    {
        "adcode": 321203,
        "city": "江苏省泰州市高港区",
        "longitude": 119.881717,
        "latitude": 32.318822
    },
    {
        "adcode": 321204,
        "city": "江苏省泰州市姜堰区",
        "longitude": 120.127934,
        "latitude": 32.509155
    },
    {
        "adcode": 321281,
        "city": "江苏省泰州市兴化市",
        "longitude": 119.852541,
        "latitude": 32.910459
    },
    {
        "adcode": 321282,
        "city": "江苏省泰州市靖江市",
        "longitude": 120.277138,
        "latitude": 31.982751
    },
    {
        "adcode": 321283,
        "city": "江苏省泰州市泰兴市",
        "longitude": 120.051744,
        "latitude": 32.171854
    },
    {
        "adcode": 321300,
        "city": "江苏省宿迁市",
        "longitude": 118.275198,
        "latitude": 33.963232
    },
    {
        "adcode": 321301,
        "city": "江苏省宿迁市市辖区",
        "longitude": 118.275198,
        "latitude": 33.963232
    },
    {
        "adcode": 321302,
        "city": "江苏省宿迁市宿城区",
        "longitude": 118.242534,
        "latitude": 33.963029
    },
    {
        "adcode": 321311,
        "city": "江苏省宿迁市宿豫区",
        "longitude": 118.330782,
        "latitude": 33.946822
    },
    {
        "adcode": 321322,
        "city": "江苏省宿迁市沭阳县",
        "longitude": 118.804784,
        "latitude": 34.111022
    },
    {
        "adcode": 321323,
        "city": "江苏省宿迁市泗阳县",
        "longitude": 118.703038,
        "latitude": 33.72314
    },
    {
        "adcode": 321324,
        "city": "江苏省宿迁市泗洪县",
        "longitude": 118.223591,
        "latitude": 33.476051
    },
    {
        "adcode": 330000,
        "city": "浙江省",
        "longitude": 120.152791,
        "latitude": 30.267446
    },
    {
        "adcode": 330100,
        "city": "浙江省杭州市",
        "longitude": 120.15507,
        "latitude": 30.274084
    },
    {
        "adcode": 330101,
        "city": "浙江省杭州市市辖区",
        "longitude": 120.15507,
        "latitude": 30.274084
    },
    {
        "adcode": 330102,
        "city": "浙江省杭州市上城区",
        "longitude": 120.184349,
        "latitude": 30.25446
    },
    {
        "adcode": 330103,
        "city": "浙江省杭州市下城区",
        "longitude": 120.180895,
        "latitude": 30.281714
    },
    {
        "adcode": 330104,
        "city": "浙江省杭州市江干区",
        "longitude": 120.213843,
        "latitude": 30.262661
    },
    {
        "adcode": 330105,
        "city": "浙江省杭州市拱墅区",
        "longitude": 120.141406,
        "latitude": 30.319037
    },
    {
        "adcode": 330106,
        "city": "浙江省杭州市西湖区",
        "longitude": 120.130203,
        "latitude": 30.259324
    },
    {
        "adcode": 330108,
        "city": "浙江省杭州市滨江区",
        "longitude": 120.146505,
        "latitude": 30.16245
    },
    {
        "adcode": 330109,
        "city": "浙江省杭州市萧山区",
        "longitude": 120.493286,
        "latitude": 30.28333
    },
    {
        "adcode": 330110,
        "city": "浙江省杭州市余杭区",
        "longitude": 120.245433,
        "latitude": 30.409974
    },
    {
        "adcode": 330111,
        "city": "浙江省杭州市富阳区",
        "longitude": 119.960076,
        "latitude": 30.048692
    },
    {
        "adcode": 330112,
        "city": "浙江省杭州市临安区",
        "longitude": 119.718891,
        "latitude": 30.237881
    },
    {
        "adcode": 330122,
        "city": "浙江省杭州市桐庐县",
        "longitude": 119.691434,
        "latitude": 29.793535
    },
    {
        "adcode": 330127,
        "city": "浙江省杭州市淳安县",
        "longitude": 119.041864,
        "latitude": 29.608772
    },
    {
        "adcode": 330182,
        "city": "浙江省杭州市建德市",
        "longitude": 119.281213,
        "latitude": 29.474884
    },
    {
        "adcode": 330200,
        "city": "浙江省宁波市",
        "longitude": 121.550357,
        "latitude": 29.874556
    },
    {
        "adcode": 330201,
        "city": "浙江省宁波市市辖区",
        "longitude": 121.550357,
        "latitude": 29.874556
    },
    {
        "adcode": 330203,
        "city": "浙江省宁波市海曙区",
        "longitude": 121.551066,
        "latitude": 29.859772
    },
    {
        "adcode": 330205,
        "city": "浙江省宁波市江北区",
        "longitude": 121.555227,
        "latitude": 29.886757
    },
    {
        "adcode": 330206,
        "city": "浙江省宁波市北仑区",
        "longitude": 121.844618,
        "latitude": 29.899044
    },
    {
        "adcode": 330211,
        "city": "浙江省宁波市镇海区",
        "longitude": 121.71654,
        "latitude": 29.948998
    },
    {
        "adcode": 330212,
        "city": "浙江省宁波市鄞州区",
        "longitude": 121.546603,
        "latitude": 29.816511
    },
    {
        "adcode": 330213,
        "city": "浙江省宁波市奉化区",
        "longitude": 121.517574,
        "latitude": 29.569578
    },
    {
        "adcode": 330225,
        "city": "浙江省宁波市象山县",
        "longitude": 121.869339,
        "latitude": 29.476705
    },
    {
        "adcode": 330226,
        "city": "浙江省宁波市宁海县",
        "longitude": 121.429477,
        "latitude": 29.287939
    },
    {
        "adcode": 330281,
        "city": "浙江省宁波市余姚市",
        "longitude": 121.154594,
        "latitude": 30.037858
    },
    {
        "adcode": 330282,
        "city": "浙江省宁波市慈溪市",
        "longitude": 121.266579,
        "latitude": 30.169665
    },
    {
        "adcode": 330300,
        "city": "浙江省温州市",
        "longitude": 120.699366,
        "latitude": 27.994267
    },
    {
        "adcode": 330301,
        "city": "浙江省温州市市辖区",
        "longitude": 120.699366,
        "latitude": 27.994267
    },
    {
        "adcode": 330302,
        "city": "浙江省温州市鹿城区",
        "longitude": 120.655135,
        "latitude": 28.015455
    },
    {
        "adcode": 330303,
        "city": "浙江省温州市龙湾区",
        "longitude": 120.811213,
        "latitude": 27.932747
    },
    {
        "adcode": 330304,
        "city": "浙江省温州市瓯海区",
        "longitude": 120.708827,
        "latitude": 27.914241
    },
    {
        "adcode": 330305,
        "city": "浙江省温州市洞头区",
        "longitude": 121.157249,
        "latitude": 27.836154
    },
    {
        "adcode": 330324,
        "city": "浙江省温州市永嘉县",
        "longitude": 120.682144,
        "latitude": 28.150591
    },
    {
        "adcode": 330326,
        "city": "浙江省温州市平阳县",
        "longitude": 120.565793,
        "latitude": 27.661918
    },
    {
        "adcode": 330327,
        "city": "浙江省温州市苍南县",
        "longitude": 120.425766,
        "latitude": 27.51828
    },
    {
        "adcode": 330328,
        "city": "浙江省温州市文成县",
        "longitude": 120.091498,
        "latitude": 27.786996
    },
    {
        "adcode": 330329,
        "city": "浙江省温州市泰顺县",
        "longitude": 119.717649,
        "latitude": 27.556884
    },
    {
        "adcode": 330381,
        "city": "浙江省温州市瑞安市",
        "longitude": 120.655148,
        "latitude": 27.778657
    },
    {
        "adcode": 330382,
        "city": "浙江省温州市乐清市",
        "longitude": 120.967147,
        "latitude": 28.116083
    },
    {
        "adcode": 330400,
        "city": "浙江省嘉兴市",
        "longitude": 120.755486,
        "latitude": 30.746129
    },
    {
        "adcode": 330401,
        "city": "浙江省嘉兴市市辖区",
        "longitude": 120.755486,
        "latitude": 30.746129
    },
    {
        "adcode": 330402,
        "city": "浙江省嘉兴市南湖区",
        "longitude": 120.783025,
        "latitude": 30.747842
    },
    {
        "adcode": 330411,
        "city": "浙江省嘉兴市秀洲区",
        "longitude": 120.709018,
        "latitude": 30.765168
    },
    {
        "adcode": 330421,
        "city": "浙江省嘉兴市嘉善县",
        "longitude": 120.92585,
        "latitude": 30.830898
    },
    {
        "adcode": 330424,
        "city": "浙江省嘉兴市海盐县",
        "longitude": 120.946263,
        "latitude": 30.526436
    },
    {
        "adcode": 330481,
        "city": "浙江省嘉兴市海宁市",
        "longitude": 120.680757,
        "latitude": 30.510659
    },
    {
        "adcode": 330482,
        "city": "浙江省嘉兴市平湖市",
        "longitude": 121.015142,
        "latitude": 30.677233
    },
    {
        "adcode": 330483,
        "city": "浙江省嘉兴市桐乡市",
        "longitude": 120.565099,
        "latitude": 30.630173
    },
    {
        "adcode": 330500,
        "city": "浙江省湖州市",
        "longitude": 120.086823,
        "latitude": 30.894348
    },
    {
        "adcode": 330501,
        "city": "浙江省湖州市市辖区",
        "longitude": 120.086823,
        "latitude": 30.894348
    },
    {
        "adcode": 330502,
        "city": "浙江省湖州市吴兴区",
        "longitude": 120.185838,
        "latitude": 30.857151
    },
    {
        "adcode": 330503,
        "city": "浙江省湖州市南浔区",
        "longitude": 120.418512,
        "latitude": 30.84969
    },
    {
        "adcode": 330521,
        "city": "浙江省湖州市德清县",
        "longitude": 119.977401,
        "latitude": 30.54251
    },
    {
        "adcode": 330522,
        "city": "浙江省湖州市长兴县",
        "longitude": 119.910952,
        "latitude": 31.026666
    },
    {
        "adcode": 330523,
        "city": "浙江省湖州市安吉县",
        "longitude": 119.680353,
        "latitude": 30.638675
    },
    {
        "adcode": 330600,
        "city": "浙江省绍兴市",
        "longitude": 120.580232,
        "latitude": 30.029752
    },
    {
        "adcode": 330601,
        "city": "浙江省绍兴市市辖区",
        "longitude": 120.580232,
        "latitude": 30.029752
    },
    {
        "adcode": 330602,
        "city": "浙江省绍兴市越城区",
        "longitude": 120.582633,
        "latitude": 29.988245
    },
    {
        "adcode": 330603,
        "city": "浙江省绍兴市柯桥区",
        "longitude": 120.495065,
        "latitude": 30.081942
    },
    {
        "adcode": 330604,
        "city": "浙江省绍兴市上虞区",
        "longitude": 120.868122,
        "latitude": 30.033121
    },
    {
        "adcode": 330624,
        "city": "浙江省绍兴市新昌县",
        "longitude": 120.903866,
        "latitude": 29.499832
    },
    {
        "adcode": 330681,
        "city": "浙江省绍兴市诸暨市",
        "longitude": 120.246863,
        "latitude": 29.708692
    },
    {
        "adcode": 330683,
        "city": "浙江省绍兴市嵊州市",
        "longitude": 120.831025,
        "latitude": 29.56141
    },
    {
        "adcode": 330700,
        "city": "浙江省金华市",
        "longitude": 119.647444,
        "latitude": 29.079059
    },
    {
        "adcode": 330701,
        "city": "浙江省金华市市辖区",
        "longitude": 119.647444,
        "latitude": 29.079059
    },
    {
        "adcode": 330702,
        "city": "浙江省金华市婺城区",
        "longitude": 119.571633,
        "latitude": 29.086221
    },
    {
        "adcode": 330703,
        "city": "浙江省金华市金东区",
        "longitude": 119.692862,
        "latitude": 29.099122
    },
    {
        "adcode": 330723,
        "city": "浙江省金华市武义县",
        "longitude": 119.816318,
        "latitude": 28.892721
    },
    {
        "adcode": 330726,
        "city": "浙江省金华市浦江县",
        "longitude": 119.892222,
        "latitude": 29.452477
    },
    {
        "adcode": 330727,
        "city": "浙江省金华市磐安县",
        "longitude": 120.450178,
        "latitude": 29.054048
    },
    {
        "adcode": 330781,
        "city": "浙江省金华市兰溪市",
        "longitude": 119.460526,
        "latitude": 29.208919
    },
    {
        "adcode": 330782,
        "city": "浙江省金华市义乌市",
        "longitude": 120.075058,
        "latitude": 29.306841
    },
    {
        "adcode": 330783,
        "city": "浙江省金华市东阳市",
        "longitude": 120.241566,
        "latitude": 29.289648
    },
    {
        "adcode": 330784,
        "city": "浙江省金华市永康市",
        "longitude": 120.047651,
        "latitude": 28.888555
    },
    {
        "adcode": 330800,
        "city": "浙江省衢州市",
        "longitude": 118.859457,
        "latitude": 28.970079
    },
    {
        "adcode": 330801,
        "city": "浙江省衢州市市辖区",
        "longitude": 118.859457,
        "latitude": 28.970079
    },
    {
        "adcode": 330802,
        "city": "浙江省衢州市柯城区",
        "longitude": 118.871333,
        "latitude": 28.968504
    },
    {
        "adcode": 330803,
        "city": "浙江省衢州市衢江区",
        "longitude": 118.95946,
        "latitude": 28.97978
    },
    {
        "adcode": 330822,
        "city": "浙江省衢州市常山县",
        "longitude": 118.511249,
        "latitude": 28.901463
    },
    {
        "adcode": 330824,
        "city": "浙江省衢州市开化县",
        "longitude": 118.415495,
        "latitude": 29.137337
    },
    {
        "adcode": 330825,
        "city": "浙江省衢州市龙游县",
        "longitude": 119.172304,
        "latitude": 29.028319
    },
    {
        "adcode": 330881,
        "city": "浙江省衢州市江山市",
        "longitude": 118.626926,
        "latitude": 28.737245
    },
    {
        "adcode": 330900,
        "city": "浙江省舟山市",
        "longitude": 122.207215,
        "latitude": 29.985295
    },
    {
        "adcode": 330901,
        "city": "浙江省舟山市市辖区",
        "longitude": 122.207215,
        "latitude": 29.985295
    },
    {
        "adcode": 330902,
        "city": "浙江省舟山市定海区",
        "longitude": 122.106773,
        "latitude": 30.019858
    },
    {
        "adcode": 330903,
        "city": "浙江省舟山市普陀区",
        "longitude": 122.323867,
        "latitude": 29.97176
    },
    {
        "adcode": 330921,
        "city": "浙江省舟山市岱山县",
        "longitude": 122.226237,
        "latitude": 30.264139
    },
    {
        "adcode": 330922,
        "city": "浙江省舟山市嵊泗县",
        "longitude": 122.451382,
        "latitude": 30.725686
    },
    {
        "adcode": 331000,
        "city": "浙江省台州市",
        "longitude": 121.420757,
        "latitude": 28.656386
    },
    {
        "adcode": 331001,
        "city": "浙江省台州市市辖区",
        "longitude": 121.420757,
        "latitude": 28.656386
    },
    {
        "adcode": 331002,
        "city": "浙江省台州市椒江区",
        "longitude": 121.442676,
        "latitude": 28.673726
    },
    {
        "adcode": 331003,
        "city": "浙江省台州市黄岩区",
        "longitude": 121.261893,
        "latitude": 28.650117
    },
    {
        "adcode": 331004,
        "city": "浙江省台州市路桥区",
        "longitude": 121.365123,
        "latitude": 28.582655
    },
    {
        "adcode": 331022,
        "city": "浙江省台州市三门县",
        "longitude": 121.395777,
        "latitude": 29.104873
    },
    {
        "adcode": 331023,
        "city": "浙江省台州市天台县",
        "longitude": 121.006725,
        "latitude": 29.144079
    },
    {
        "adcode": 331024,
        "city": "浙江省台州市仙居县",
        "longitude": 120.735081,
        "latitude": 28.849213
    },
    {
        "adcode": 331081,
        "city": "浙江省台州市温岭市",
        "longitude": 121.385604,
        "latitude": 28.372506
    },
    {
        "adcode": 331082,
        "city": "浙江省台州市临海市",
        "longitude": 121.145047,
        "latitude": 28.858457
    },
    {
        "adcode": 331083,
        "city": "浙江省台州市玉环市",
        "longitude": 121.231805,
        "latitude": 28.13593
    },
    {
        "adcode": 331100,
        "city": "浙江省丽水市",
        "longitude": 119.922796,
        "latitude": 28.46763
    },
    {
        "adcode": 331101,
        "city": "浙江省丽水市市辖区",
        "longitude": 119.922796,
        "latitude": 28.46763
    },
    {
        "adcode": 331102,
        "city": "浙江省丽水市莲都区",
        "longitude": 119.912612,
        "latitude": 28.445836
    },
    {
        "adcode": 331121,
        "city": "浙江省丽水市青田县",
        "longitude": 120.282989,
        "latitude": 28.134088
    },
    {
        "adcode": 331122,
        "city": "浙江省丽水市缙云县",
        "longitude": 120.091573,
        "latitude": 28.659279
    },
    {
        "adcode": 331123,
        "city": "浙江省丽水市遂昌县",
        "longitude": 119.276104,
        "latitude": 28.592119
    },
    {
        "adcode": 331124,
        "city": "浙江省丽水市松阳县",
        "longitude": 119.482015,
        "latitude": 28.449171
    },
    {
        "adcode": 331125,
        "city": "浙江省丽水市云和县",
        "longitude": 119.573397,
        "latitude": 28.11579
    },
    {
        "adcode": 331126,
        "city": "浙江省丽水市庆元县",
        "longitude": 119.06259,
        "latitude": 27.61922
    },
    {
        "adcode": 331127,
        "city": "浙江省丽水市景宁畲族自治县",
        "longitude": 119.635697,
        "latitude": 27.973312
    },
    {
        "adcode": 331181,
        "city": "浙江省丽水市龙泉市",
        "longitude": 119.141461,
        "latitude": 28.074623
    },
    {
        "adcode": 340000,
        "city": "安徽省",
        "longitude": 117.284922,
        "latitude": 31.861184
    },
    {
        "adcode": 340100,
        "city": "安徽省合肥市",
        "longitude": 117.227239,
        "latitude": 31.820586
    },
    {
        "adcode": 340101,
        "city": "安徽省合肥市市辖区",
        "longitude": 117.227239,
        "latitude": 31.820586
    },
    {
        "adcode": 340102,
        "city": "安徽省合肥市瑶海区",
        "longitude": 117.309229,
        "latitude": 31.858048
    },
    {
        "adcode": 340103,
        "city": "安徽省合肥市庐阳区",
        "longitude": 117.264595,
        "latitude": 31.878641
    },
    {
        "adcode": 340104,
        "city": "安徽省合肥市蜀山区",
        "longitude": 117.260536,
        "latitude": 31.851158
    },
    {
        "adcode": 340111,
        "city": "安徽省合肥市包河区",
        "longitude": 117.309658,
        "latitude": 31.793093
    },
    {
        "adcode": 340121,
        "city": "安徽省合肥市长丰县",
        "longitude": 117.167564,
        "latitude": 32.478018
    },
    {
        "adcode": 340122,
        "city": "安徽省合肥市肥东县",
        "longitude": 117.469383,
        "latitude": 31.88794
    },
    {
        "adcode": 340123,
        "city": "安徽省合肥市肥西县",
        "longitude": 117.157981,
        "latitude": 31.70681
    },
    {
        "adcode": 340124,
        "city": "安徽省合肥市庐江县",
        "longitude": 117.2878,
        "latitude": 31.25555
    },
    {
        "adcode": 340181,
        "city": "安徽省合肥市巢湖市",
        "longitude": 117.8618,
        "latitude": 31.598628
    },
    {
        "adcode": 340200,
        "city": "安徽省芜湖市",
        "longitude": 118.432941,
        "latitude": 31.352859
    },
    {
        "adcode": 340201,
        "city": "安徽省芜湖市市辖区",
        "longitude": 118.432941,
        "latitude": 31.352859
    },
    {
        "adcode": 340202,
        "city": "安徽省芜湖市镜湖区",
        "longitude": 118.385146,
        "latitude": 31.340404
    },
    {
        "adcode": 340203,
        "city": "安徽省芜湖市弋江区",
        "longitude": 118.372655,
        "latitude": 31.311757
    },
    {
        "adcode": 340207,
        "city": "安徽省芜湖市鸠江区",
        "longitude": 118.391734,
        "latitude": 31.369373
    },
    {
        "adcode": 340208,
        "city": "安徽省芜湖市三山区",
        "longitude": 118.268101,
        "latitude": 31.219568
    },
    {
        "adcode": 340221,
        "city": "安徽省芜湖市芜湖县",
        "longitude": 118.576124,
        "latitude": 31.134809
    },
    {
        "adcode": 340222,
        "city": "安徽省芜湖市繁昌县",
        "longitude": 118.201349,
        "latitude": 31.080896
    },
    {
        "adcode": 340223,
        "city": "安徽省芜湖市南陵县",
        "longitude": 118.33436,
        "latitude": 30.914923
    },
    {
        "adcode": 340225,
        "city": "安徽省芜湖市无为县",
        "longitude": 117.902366,
        "latitude": 31.303168
    },
    {
        "adcode": 340300,
        "city": "安徽省蚌埠市",
        "longitude": 117.389719,
        "latitude": 32.916287
    },
    {
        "adcode": 340301,
        "city": "安徽省蚌埠市市辖区",
        "longitude": 117.389719,
        "latitude": 32.916287
    },
    {
        "adcode": 340302,
        "city": "安徽省蚌埠市龙子湖区",
        "longitude": 117.39379,
        "latitude": 32.943014
    },
    {
        "adcode": 340303,
        "city": "安徽省蚌埠市蚌山区",
        "longitude": 117.367614,
        "latitude": 32.944198
    },
    {
        "adcode": 340304,
        "city": "安徽省蚌埠市禹会区",
        "longitude": 117.342451,
        "latitude": 32.929711
    },
    {
        "adcode": 340311,
        "city": "安徽省蚌埠市淮上区",
        "longitude": 117.359331,
        "latitude": 32.965435
    },
    {
        "adcode": 340321,
        "city": "安徽省蚌埠市怀远县",
        "longitude": 117.205234,
        "latitude": 32.970031
    },
    {
        "adcode": 340322,
        "city": "安徽省蚌埠市五河县",
        "longitude": 117.879486,
        "latitude": 33.127823
    },
    {
        "adcode": 340323,
        "city": "安徽省蚌埠市固镇县",
        "longitude": 117.316955,
        "latitude": 33.316899
    },
    {
        "adcode": 340400,
        "city": "安徽省淮南市",
        "longitude": 116.999932,
        "latitude": 32.625478
    },
    {
        "adcode": 340401,
        "city": "安徽省淮南市市辖区",
        "longitude": 116.999932,
        "latitude": 32.625478
    },
    {
        "adcode": 340402,
        "city": "安徽省淮南市大通区",
        "longitude": 117.053273,
        "latitude": 32.631533
    },
    {
        "adcode": 340403,
        "city": "安徽省淮南市田家庵区",
        "longitude": 117.017409,
        "latitude": 32.647155
    },
    {
        "adcode": 340404,
        "city": "安徽省淮南市谢家集区",
        "longitude": 116.859048,
        "latitude": 32.599901
    },
    {
        "adcode": 340405,
        "city": "安徽省淮南市谢家集区",
        "longitude": 116.83349,
        "latitude": 32.631379
    },
    {
        "adcode": 340406,
        "city": "安徽省淮南市潘集区",
        "longitude": 116.834716,
        "latitude": 32.77208
    },
    {
        "adcode": 340421,
        "city": "安徽省淮南市凤台县",
        "longitude": 116.711051,
        "latitude": 32.709445
    },
    {
        "adcode": 340422,
        "city": "安徽省淮南市寿县",
        "longitude": 116.787141,
        "latitude": 32.573306
    },
    {
        "adcode": 340500,
        "city": "安徽省马鞍山市",
        "longitude": 118.506759,
        "latitude": 31.670452
    },
    {
        "adcode": 340501,
        "city": "安徽省马鞍山市市辖区",
        "longitude": 118.506759,
        "latitude": 31.670452
    },
    {
        "adcode": 340503,
        "city": "安徽省马鞍山市花山区",
        "longitude": 118.492562,
        "latitude": 31.71971
    },
    {
        "adcode": 340504,
        "city": "安徽省马鞍山市雨山区",
        "longitude": 118.49856,
        "latitude": 31.682208
    },
    {
        "adcode": 340506,
        "city": "安徽省马鞍山市博望区",
        "longitude": 118.844538,
        "latitude": 31.558471
    },
    {
        "adcode": 340521,
        "city": "安徽省马鞍山市当涂县",
        "longitude": 118.497972,
        "latitude": 31.571213
    },
    {
        "adcode": 340522,
        "city": "安徽省马鞍山市含山县",
        "longitude": 118.101421,
        "latitude": 31.735599
    },
    {
        "adcode": 340523,
        "city": "安徽省马鞍山市和县",
        "longitude": 118.351405,
        "latitude": 31.741794
    },
    {
        "adcode": 340600,
        "city": "安徽省淮北市",
        "longitude": 116.798265,
        "latitude": 33.955844
    },
    {
        "adcode": 340601,
        "city": "安徽省淮北市市辖区",
        "longitude": 116.798265,
        "latitude": 33.955844
    },
    {
        "adcode": 340602,
        "city": "安徽省淮北市杜集区",
        "longitude": 116.828134,
        "latitude": 33.991451
    },
    {
        "adcode": 340603,
        "city": "安徽省淮北市相山区",
        "longitude": 116.794345,
        "latitude": 33.959893
    },
    {
        "adcode": 340604,
        "city": "安徽省淮北市烈山区",
        "longitude": 116.813042,
        "latitude": 33.895139
    },
    {
        "adcode": 340621,
        "city": "安徽省淮北市濉溪县",
        "longitude": 116.766299,
        "latitude": 33.915477
    },
    {
        "adcode": 340700,
        "city": "安徽省铜陵市",
        "longitude": 117.812079,
        "latitude": 30.945429
    },
    {
        "adcode": 340701,
        "city": "安徽省铜陵市市辖区",
        "longitude": 117.812079,
        "latitude": 30.945429
    },
    {
        "adcode": 340705,
        "city": "安徽省铜陵市铜官区",
        "longitude": 117.816174,
        "latitude": 30.927608
    },
    {
        "adcode": 340706,
        "city": "安徽省铜陵市义安区",
        "longitude": 122.08244,
        "latitude": 41.0023195
    },
    {
        "adcode": 340711,
        "city": "安徽省铜陵市郊区",
        "longitude": 117.80707,
        "latitude": 30.908927
    },
    {
        "adcode": 340722,
        "city": "安徽省铜陵市枞阳县",
        "longitude": 117.250622,
        "latitude": 30.705963
    },
    {
        "adcode": 340800,
        "city": "安徽省安庆市",
        "longitude": 117.063754,
        "latitude": 30.543494
    },
    {
        "adcode": 340801,
        "city": "安徽省安庆市市辖区",
        "longitude": 117.063754,
        "latitude": 30.543494
    },
    {
        "adcode": 340802,
        "city": "安徽省安庆市迎江区",
        "longitude": 117.09115,
        "latitude": 30.511548
    },
    {
        "adcode": 340803,
        "city": "安徽省安庆市大观区",
        "longitude": 117.02167,
        "latitude": 30.553957
    },
    {
        "adcode": 340811,
        "city": "安徽省安庆市宜秀区",
        "longitude": 117.070003,
        "latitude": 30.541323
    },
    {
        "adcode": 340822,
        "city": "安徽省安庆市怀宁县",
        "longitude": 116.829475,
        "latitude": 30.733825
    },
    {
        "adcode": 340825,
        "city": "安徽省安庆市太湖县",
        "longitude": 116.308795,
        "latitude": 30.45422
    },
    {
        "adcode": 340826,
        "city": "安徽省安庆市宿松县",
        "longitude": 116.129105,
        "latitude": 30.153746
    },
    {
        "adcode": 340827,
        "city": "安徽省安庆市望江县",
        "longitude": 116.694183,
        "latitude": 30.124428
    },
    {
        "adcode": 340828,
        "city": "安徽省安庆市岳西县",
        "longitude": 116.359921,
        "latitude": 30.849442
    },
    {
        "adcode": 340881,
        "city": "安徽省安庆市桐城市",
        "longitude": 116.97412,
        "latitude": 31.0358
    },
    {
        "adcode": 340882,
        "city": "安徽省安庆市潜山县潜山",
        "longitude": 116.57677,
        "latitude": 30.628638
    },
    {
        "adcode": 341000,
        "city": "安徽省黄山市",
        "longitude": 118.337481,
        "latitude": 29.714655
    },
    {
        "adcode": 341001,
        "city": "安徽省黄山市市辖区",
        "longitude": 118.337481,
        "latitude": 29.714655
    },
    {
        "adcode": 341002,
        "city": "安徽省黄山市屯溪区",
        "longitude": 118.315329,
        "latitude": 29.696109
    },
    {
        "adcode": 341003,
        "city": "安徽省黄山市黄山区",
        "longitude": 118.141568,
        "latitude": 30.272942
    },
    {
        "adcode": 341004,
        "city": "安徽省黄山市徽州区",
        "longitude": 118.336751,
        "latitude": 29.827279
    },
    {
        "adcode": 341021,
        "city": "安徽省黄山市歙县",
        "longitude": 118.415356,
        "latitude": 29.861308
    },
    {
        "adcode": 341022,
        "city": "安徽省黄山市休宁县",
        "longitude": 118.199179,
        "latitude": 29.789095
    },
    {
        "adcode": 341023,
        "city": "安徽省黄山市黟县",
        "longitude": 117.938373,
        "latitude": 29.924805
    },
    {
        "adcode": 341024,
        "city": "安徽省黄山市祁门县",
        "longitude": 117.717396,
        "latitude": 29.854055
    },
    {
        "adcode": 341100,
        "city": "安徽省滁州市",
        "longitude": 118.317106,
        "latitude": 32.301556
    },
    {
        "adcode": 341101,
        "city": "安徽省滁州市市辖区",
        "longitude": 118.317106,
        "latitude": 32.301556
    },
    {
        "adcode": 341102,
        "city": "安徽省滁州市琅琊区",
        "longitude": 118.305843,
        "latitude": 32.29453
    },
    {
        "adcode": 341103,
        "city": "安徽省滁州市琅琊区",
        "longitude": 118.296955,
        "latitude": 32.329842
    },
    {
        "adcode": 341122,
        "city": "安徽省滁州市来安县",
        "longitude": 118.435749,
        "latitude": 32.452167
    },
    {
        "adcode": 341124,
        "city": "安徽省滁州市全椒县",
        "longitude": 118.27309,
        "latitude": 32.085407
    },
    {
        "adcode": 341125,
        "city": "安徽省滁州市定远县",
        "longitude": 117.698563,
        "latitude": 32.530982
    },
    {
        "adcode": 341126,
        "city": "安徽省滁州市凤阳县",
        "longitude": 117.531623,
        "latitude": 32.874735
    },
    {
        "adcode": 341181,
        "city": "安徽省滁州市天长市",
        "longitude": 119.004817,
        "latitude": 32.667571
    },
    {
        "adcode": 341182,
        "city": "安徽省滁州市明光市",
        "longitude": 118.018276,
        "latitude": 32.781995
    },
    {
        "adcode": 341200,
        "city": "安徽省阜阳市",
        "longitude": 115.814204,
        "latitude": 32.890124
    },
    {
        "adcode": 341201,
        "city": "安徽省阜阳市市辖区",
        "longitude": 115.814204,
        "latitude": 32.890124
    },
    {
        "adcode": 341202,
        "city": "安徽省阜阳市颍州区",
        "longitude": 115.806942,
        "latitude": 32.883468
    },
    {
        "adcode": 341203,
        "city": "安徽省阜阳市颍东区",
        "longitude": 115.856735,
        "latitude": 32.91248
    },
    {
        "adcode": 341204,
        "city": "安徽省阜阳市颍泉区",
        "longitude": 115.808327,
        "latitude": 32.924918
    },
    {
        "adcode": 341221,
        "city": "安徽省阜阳市临泉县",
        "longitude": 115.261473,
        "latitude": 33.040261
    },
    {
        "adcode": 341222,
        "city": "安徽省阜阳市太和县",
        "longitude": 115.621934,
        "latitude": 33.160326
    },
    {
        "adcode": 341225,
        "city": "安徽省阜阳市阜南县",
        "longitude": 115.595644,
        "latitude": 32.658297
    },
    {
        "adcode": 341226,
        "city": "安徽省阜阳市颍上县",
        "longitude": 116.256789,
        "latitude": 32.653255
    },
    {
        "adcode": 341282,
        "city": "安徽省阜阳市界首市",
        "longitude": 115.374564,
        "latitude": 33.257013
    },
    {
        "adcode": 341300,
        "city": "安徽省宿州市",
        "longitude": 116.964356,
        "latitude": 33.646373
    },
    {
        "adcode": 341301,
        "city": "安徽省宿州市市辖区",
        "longitude": 116.964356,
        "latitude": 33.646373
    },
    {
        "adcode": 341302,
        "city": "安徽省宿州市埇桥区",
        "longitude": 116.977463,
        "latitude": 33.640061
    },
    {
        "adcode": 341321,
        "city": "安徽省宿州市砀山县",
        "longitude": 116.367095,
        "latitude": 34.442561
    },
    {
        "adcode": 341322,
        "city": "安徽省宿州市萧县",
        "longitude": 116.94729,
        "latitude": 34.188728
    },
    {
        "adcode": 341323,
        "city": "安徽省宿州市灵璧县",
        "longitude": 117.552462,
        "latitude": 33.552998
    },
    {
        "adcode": 341324,
        "city": "安徽省宿州市泗县",
        "longitude": 117.910629,
        "latitude": 33.482982
    },
    {
        "adcode": 341500,
        "city": "安徽省六安市",
        "longitude": 116.521854,
        "latitude": 31.733699
    },
    {
        "adcode": 341501,
        "city": "安徽省六安市市辖区",
        "longitude": 116.521854,
        "latitude": 31.733699
    },
    {
        "adcode": 341502,
        "city": "安徽省六安市金安区",
        "longitude": 116.539679,
        "latitude": 31.749265
    },
    {
        "adcode": 341503,
        "city": "安徽省六安市裕安区",
        "longitude": 116.47992,
        "latitude": 31.737813
    },
    {
        "adcode": 341504,
        "city": "安徽省六安市叶集区",
        "longitude": 115.908504,
        "latitude": 31.849165
    },
    {
        "adcode": 341522,
        "city": "安徽省六安市霍邱县",
        "longitude": 116.277912,
        "latitude": 32.353038
    },
    {
        "adcode": 341523,
        "city": "安徽省六安市舒城县",
        "longitude": 116.948623,
        "latitude": 31.462027
    },
    {
        "adcode": 341524,
        "city": "安徽省六安市金寨县",
        "longitude": 115.934366,
        "latitude": 31.72717
    },
    {
        "adcode": 341525,
        "city": "安徽省六安市霍山县",
        "longitude": 116.332951,
        "latitude": 31.392786
    },
    {
        "adcode": 341600,
        "city": "安徽省亳州市",
        "longitude": 115.778676,
        "latitude": 33.844582
    },
    {
        "adcode": 341601,
        "city": "安徽省亳州市市辖区",
        "longitude": 115.778676,
        "latitude": 33.844582
    },
    {
        "adcode": 341602,
        "city": "安徽省亳州市谯城区",
        "longitude": 115.779025,
        "latitude": 33.876235
    },
    {
        "adcode": 341621,
        "city": "安徽省亳州市涡阳县",
        "longitude": 116.215665,
        "latitude": 33.492921
    },
    {
        "adcode": 341622,
        "city": "安徽省亳州市蒙城县",
        "longitude": 116.564248,
        "latitude": 33.265831
    },
    {
        "adcode": 341623,
        "city": "安徽省亳州市利辛县",
        "longitude": 116.208635,
        "latitude": 33.144724
    },
    {
        "adcode": 341700,
        "city": "安徽省池州市",
        "longitude": 117.491568,
        "latitude": 30.6648
    },
    {
        "adcode": 341701,
        "city": "安徽省池州市市辖区",
        "longitude": 117.491568,
        "latitude": 30.6648
    },
    {
        "adcode": 341702,
        "city": "安徽省池州市贵池区",
        "longitude": 117.567379,
        "latitude": 30.687181
    },
    {
        "adcode": 341721,
        "city": "安徽省池州市东至县",
        "longitude": 117.027533,
        "latitude": 30.111182
    },
    {
        "adcode": 341722,
        "city": "安徽省池州市石台县",
        "longitude": 117.486306,
        "latitude": 30.210313
    },
    {
        "adcode": 341723,
        "city": "安徽省池州市青阳县",
        "longitude": 117.847362,
        "latitude": 30.63923
    },
    {
        "adcode": 341800,
        "city": "安徽省宣城市",
        "longitude": 118.758816,
        "latitude": 30.940718
    },
    {
        "adcode": 341801,
        "city": "安徽省宣城市市辖区",
        "longitude": 118.758816,
        "latitude": 30.940718
    },
    {
        "adcode": 341802,
        "city": "安徽省宣城市宣州区",
        "longitude": 118.756328,
        "latitude": 30.946319
    },
    {
        "adcode": 341821,
        "city": "安徽省宣城市郎溪县",
        "longitude": 119.179657,
        "latitude": 31.126412
    },
    {
        "adcode": 341822,
        "city": "安徽省宣城市广德县",
        "longitude": 119.420935,
        "latitude": 30.877555
    },
    {
        "adcode": 341823,
        "city": "安徽省宣城市泾县",
        "longitude": 118.419864,
        "latitude": 30.688578
    },
    {
        "adcode": 341824,
        "city": "安徽省宣城市绩溪县",
        "longitude": 118.578519,
        "latitude": 30.067533
    },
    {
        "adcode": 341825,
        "city": "安徽省宣城市旌德县",
        "longitude": 118.540487,
        "latitude": 30.28635
    },
    {
        "adcode": 341881,
        "city": "安徽省宣城市宁国市",
        "longitude": 118.982915,
        "latitude": 30.633571
    },
    {
        "adcode": 350000,
        "city": "福建省",
        "longitude": 119.295144,
        "latitude": 26.100779
    },
    {
        "adcode": 350100,
        "city": "福建省福州市",
        "longitude": 119.296494,
        "latitude": 26.074507
    },
    {
        "adcode": 350101,
        "city": "福建省福州市市辖区",
        "longitude": 119.296494,
        "latitude": 26.074507
    },
    {
        "adcode": 350102,
        "city": "福建省福州市鼓楼区",
        "longitude": 119.303822,
        "latitude": 26.082294
    },
    {
        "adcode": 350103,
        "city": "福建省福州市台江区",
        "longitude": 119.314054,
        "latitude": 26.052842
    },
    {
        "adcode": 350104,
        "city": "福建省福州市仓山区",
        "longitude": 119.273546,
        "latitude": 26.046744
    },
    {
        "adcode": 350105,
        "city": "福建省福州市马尾区",
        "longitude": 119.455589,
        "latitude": 25.9895
    },
    {
        "adcode": 350111,
        "city": "福建省福州市晋安区",
        "longitude": 119.328515,
        "latitude": 26.082105
    },
    {
        "adcode": 350112,
        "city": "福建省福州市长乐区长乐",
        "longitude": 119.5045,
        "latitude": 25.9605
    },
    {
        "adcode": 350121,
        "city": "福建省福州市闽侯县",
        "longitude": 119.131725,
        "latitude": 26.150047
    },
    {
        "adcode": 350122,
        "city": "福建省福州市连江县",
        "longitude": 119.539704,
        "latitude": 26.197364
    },
    {
        "adcode": 350123,
        "city": "福建省福州市罗源县",
        "longitude": 119.549776,
        "latitude": 26.489559
    },
    {
        "adcode": 350124,
        "city": "福建省福州市闽清县",
        "longitude": 118.863361,
        "latitude": 26.221198
    },
    {
        "adcode": 350125,
        "city": "福建省福州市永泰县",
        "longitude": 118.932592,
        "latitude": 25.866695
    },
    {
        "adcode": 350128,
        "city": "福建省福州市平潭县",
        "longitude": 119.790168,
        "latitude": 25.49872
    },
    {
        "adcode": 350181,
        "city": "福建省福州市福清市",
        "longitude": 119.384334,
        "latitude": 25.721143
    },
    {
        "adcode": 350200,
        "city": "福建省厦门市",
        "longitude": 118.089425,
        "latitude": 24.479833
    },
    {
        "adcode": 350201,
        "city": "福建省厦门市市辖区",
        "longitude": 118.089425,
        "latitude": 24.479833
    },
    {
        "adcode": 350203,
        "city": "福建省厦门市思明区",
        "longitude": 118.082658,
        "latitude": 24.445567
    },
    {
        "adcode": 350205,
        "city": "福建省厦门市海沧区",
        "longitude": 118.032818,
        "latitude": 24.484503
    },
    {
        "adcode": 350206,
        "city": "福建省厦门市湖里区",
        "longitude": 118.146769,
        "latitude": 24.512905
    },
    {
        "adcode": 350211,
        "city": "福建省厦门市集美区",
        "longitude": 118.097337,
        "latitude": 24.57597
    },
    {
        "adcode": 350212,
        "city": "福建省厦门市同安区",
        "longitude": 118.152149,
        "latitude": 24.722747
    },
    {
        "adcode": 350213,
        "city": "福建省厦门市翔安区",
        "longitude": 118.248034,
        "latitude": 24.618544
    },
    {
        "adcode": 350300,
        "city": "福建省莆田市",
        "longitude": 119.007777,
        "latitude": 25.454084
    },
    {
        "adcode": 350301,
        "city": "福建省莆田市市辖区",
        "longitude": 119.007777,
        "latitude": 25.454084
    },
    {
        "adcode": 350302,
        "city": "福建省莆田市城厢区",
        "longitude": 118.993885,
        "latitude": 25.419319
    },
    {
        "adcode": 350303,
        "city": "福建省莆田市涵江区",
        "longitude": 119.11629,
        "latitude": 25.45872
    },
    {
        "adcode": 350304,
        "city": "福建省莆田市荔城区",
        "longitude": 119.015123,
        "latitude": 25.431979
    },
    {
        "adcode": 350305,
        "city": "福建省莆田市秀屿区",
        "longitude": 119.105528,
        "latitude": 25.318672
    },
    {
        "adcode": 350322,
        "city": "福建省莆田市仙游县",
        "longitude": 118.691601,
        "latitude": 25.362094
    },
    {
        "adcode": 350400,
        "city": "福建省三明市",
        "longitude": 117.638678,
        "latitude": 26.263406
    },
    {
        "adcode": 350401,
        "city": "福建省三明市市辖区",
        "longitude": 117.638678,
        "latitude": 26.263406
    },
    {
        "adcode": 350402,
        "city": "福建省三明市梅列区",
        "longitude": 117.645856,
        "latitude": 26.271711
    },
    {
        "adcode": 350403,
        "city": "福建省三明市三元区",
        "longitude": 117.608045,
        "latitude": 26.23402
    },
    {
        "adcode": 350421,
        "city": "福建省三明市明溪县",
        "longitude": 117.201847,
        "latitude": 26.357379
    },
    {
        "adcode": 350423,
        "city": "福建省三明市清流县",
        "longitude": 116.816909,
        "latitude": 26.177797
    },
    {
        "adcode": 350424,
        "city": "福建省三明市宁化县",
        "longitude": 116.654365,
        "latitude": 26.261754
    },
    {
        "adcode": 350425,
        "city": "福建省三明市大田县",
        "longitude": 117.847115,
        "latitude": 25.692699
    },
    {
        "adcode": 350426,
        "city": "福建省三明市尤溪县",
        "longitude": 118.190467,
        "latitude": 26.170171
    },
    {
        "adcode": 350427,
        "city": "福建省三明市沙县",
        "longitude": 117.79245,
        "latitude": 26.3973
    },
    {
        "adcode": 350428,
        "city": "福建省三明市将乐县",
        "longitude": 117.471373,
        "latitude": 26.728953
    },
    {
        "adcode": 350429,
        "city": "福建省三明市泰宁县",
        "longitude": 117.17574,
        "latitude": 26.900259
    },
    {
        "adcode": 350430,
        "city": "福建省三明市建宁县",
        "longitude": 116.846084,
        "latitude": 26.830902
    },
    {
        "adcode": 350481,
        "city": "福建省三明市永安市",
        "longitude": 117.374461,
        "latitude": 25.976394
    },
    {
        "adcode": 350500,
        "city": "福建省泉州市",
        "longitude": 118.675675,
        "latitude": 24.874132
    },
    {
        "adcode": 350501,
        "city": "福建省泉州市市辖区",
        "longitude": 118.675675,
        "latitude": 24.874132
    },
    {
        "adcode": 350502,
        "city": "福建省泉州市鲤城区",
        "longitude": 118.586884,
        "latitude": 24.907581
    },
    {
        "adcode": 350503,
        "city": "福建省泉州市丰泽区",
        "longitude": 118.668527,
        "latitude": 24.871018
    },
    {
        "adcode": 350504,
        "city": "福建省泉州市洛江区",
        "longitude": 118.671193,
        "latitude": 24.939751
    },
    {
        "adcode": 350505,
        "city": "福建省泉州市泉港区",
        "longitude": 118.916309,
        "latitude": 25.119815
    },
    {
        "adcode": 350521,
        "city": "福建省泉州市惠安县",
        "longitude": 118.796605,
        "latitude": 25.030781
    },
    {
        "adcode": 350524,
        "city": "福建省泉州市安溪县",
        "longitude": 118.186289,
        "latitude": 25.055955
    },
    {
        "adcode": 350525,
        "city": "福建省泉州市永春县",
        "longitude": 118.294048,
        "latitude": 25.321565
    },
    {
        "adcode": 350526,
        "city": "福建省泉州市德化县",
        "longitude": 118.241094,
        "latitude": 25.491494
    },
    {
        "adcode": 350527,
        "city": "福建省泉州市金门县",
        "longitude": 118.317089,
        "latitude": 24.432706
    },
    {
        "adcode": 350581,
        "city": "福建省泉州市石狮市",
        "longitude": 118.648066,
        "latitude": 24.732204
    },
    {
        "adcode": 350582,
        "city": "福建省泉州市晋江市",
        "longitude": 118.552365,
        "latitude": 24.781681
    },
    {
        "adcode": 350583,
        "city": "福建省泉州市南安市",
        "longitude": 118.386279,
        "latitude": 24.960385
    },
    {
        "adcode": 350600,
        "city": "福建省漳州市",
        "longitude": 117.647481,
        "latitude": 24.512948
    },
    {
        "adcode": 350601,
        "city": "福建省漳州市市辖区",
        "longitude": 117.647481,
        "latitude": 24.512948
    },
    {
        "adcode": 350602,
        "city": "福建省漳州市芗城区",
        "longitude": 117.653975,
        "latitude": 24.5109
    },
    {
        "adcode": 350603,
        "city": "福建省漳州市龙文区",
        "longitude": 117.709755,
        "latitude": 24.503113
    },
    {
        "adcode": 350622,
        "city": "福建省漳州市云霄县",
        "longitude": 117.339573,
        "latitude": 23.957936
    },
    {
        "adcode": 350623,
        "city": "福建省漳州市漳浦县",
        "longitude": 117.613808,
        "latitude": 24.117102
    },
    {
        "adcode": 350624,
        "city": "福建省漳州市诏安县",
        "longitude": 117.175185,
        "latitude": 23.711579
    },
    {
        "adcode": 350625,
        "city": "福建省漳州市长泰县",
        "longitude": 117.759153,
        "latitude": 24.625449
    },
    {
        "adcode": 350626,
        "city": "福建省漳州市东山县",
        "longitude": 117.430061,
        "latitude": 23.701262
    },
    {
        "adcode": 350627,
        "city": "福建省漳州市南靖县",
        "longitude": 117.357321,
        "latitude": 24.514654
    },
    {
        "adcode": 350628,
        "city": "福建省漳州市平和县",
        "longitude": 117.314891,
        "latitude": 24.363437
    },
    {
        "adcode": 350629,
        "city": "福建省漳州市华安县",
        "longitude": 117.534103,
        "latitude": 25.004425
    },
    {
        "adcode": 350681,
        "city": "福建省漳州市龙海市",
        "longitude": 117.818197,
        "latitude": 24.446706
    },
    {
        "adcode": 350700,
        "city": "福建省南平市",
        "longitude": 118.177708,
        "latitude": 26.641768
    },
    {
        "adcode": 350701,
        "city": "福建省南平市市辖区",
        "longitude": 118.177708,
        "latitude": 26.641768
    },
    {
        "adcode": 350702,
        "city": "福建省南平市延平区",
        "longitude": 118.181894,
        "latitude": 26.637457
    },
    {
        "adcode": 350703,
        "city": "福建省南平市建阳区",
        "longitude": 118.120464,
        "latitude": 27.331876
    },
    {
        "adcode": 350721,
        "city": "福建省南平市顺昌县",
        "longitude": 117.810357,
        "latitude": 26.793288
    },
    {
        "adcode": 350722,
        "city": "福建省南平市浦城县",
        "longitude": 118.541256,
        "latitude": 27.917263
    },
    {
        "adcode": 350723,
        "city": "福建省南平市光泽县",
        "longitude": 117.334106,
        "latitude": 27.540988
    },
    {
        "adcode": 350724,
        "city": "福建省南平市松溪县",
        "longitude": 118.785468,
        "latitude": 27.526232
    },
    {
        "adcode": 350725,
        "city": "福建省南平市政和县",
        "longitude": 118.857642,
        "latitude": 27.366104
    },
    {
        "adcode": 350781,
        "city": "福建省南平市邵武市",
        "longitude": 117.492534,
        "latitude": 27.340327
    },
    {
        "adcode": 350782,
        "city": "福建省南平市武夷山市",
        "longitude": 118.03531,
        "latitude": 27.756648
    },
    {
        "adcode": 350783,
        "city": "福建省南平市建瓯市",
        "longitude": 118.304988,
        "latitude": 27.022727
    },
    {
        "adcode": 350800,
        "city": "福建省龙岩市",
        "longitude": 117.017536,
        "latitude": 25.075123
    },
    {
        "adcode": 350801,
        "city": "福建省龙岩市市辖区",
        "longitude": 117.017536,
        "latitude": 25.075123
    },
    {
        "adcode": 350802,
        "city": "福建省龙岩市新罗区",
        "longitude": 117.037264,
        "latitude": 25.098292
    },
    {
        "adcode": 350803,
        "city": "福建省龙岩市永定区",
        "longitude": 116.732092,
        "latitude": 24.723962
    },
    {
        "adcode": 350821,
        "city": "福建省龙岩市长汀县",
        "longitude": 116.357581,
        "latitude": 25.833531
    },
    {
        "adcode": 350823,
        "city": "福建省龙岩市上杭县",
        "longitude": 116.420099,
        "latitude": 25.049518
    },
    {
        "adcode": 350824,
        "city": "福建省龙岩市武平县",
        "longitude": 116.100408,
        "latitude": 25.095298
    },
    {
        "adcode": 350825,
        "city": "福建省龙岩市连城县",
        "longitude": 116.754473,
        "latitude": 25.710539
    },
    {
        "adcode": 350881,
        "city": "福建省龙岩市漳平市",
        "longitude": 117.419998,
        "latitude": 25.290185
    },
    {
        "adcode": 350900,
        "city": "福建省宁德市",
        "longitude": 119.547932,
        "latitude": 26.665617
    },
    {
        "adcode": 350901,
        "city": "福建省宁德市市辖区",
        "longitude": 119.547932,
        "latitude": 26.665617
    },
    {
        "adcode": 350902,
        "city": "福建省宁德市蕉城区",
        "longitude": 119.526299,
        "latitude": 26.660611
    },
    {
        "adcode": 350921,
        "city": "福建省宁德市霞浦县",
        "longitude": 120.005643,
        "latitude": 26.885204
    },
    {
        "adcode": 350922,
        "city": "福建省宁德市古田县",
        "longitude": 118.746284,
        "latitude": 26.577837
    },
    {
        "adcode": 350923,
        "city": "福建省宁德市屏南县",
        "longitude": 118.985895,
        "latitude": 26.908276
    },
    {
        "adcode": 350924,
        "city": "福建省宁德市寿宁县",
        "longitude": 119.514987,
        "latitude": 27.454479
    },
    {
        "adcode": 350925,
        "city": "福建省宁德市周宁县",
        "longitude": 119.339025,
        "latitude": 27.104591
    },
    {
        "adcode": 350926,
        "city": "福建省宁德市柘荣县",
        "longitude": 119.900609,
        "latitude": 27.233933
    },
    {
        "adcode": 350981,
        "city": "福建省宁德市福安市",
        "longitude": 119.652171,
        "latitude": 27.087184
    },
    {
        "adcode": 350982,
        "city": "福建省宁德市福鼎市",
        "longitude": 120.216978,
        "latitude": 27.324479
    },
    {
        "adcode": 360000,
        "city": "江西省",
        "longitude": 115.909228,
        "latitude": 28.675696
    },
    {
        "adcode": 360100,
        "city": "江西省南昌市",
        "longitude": 115.858197,
        "latitude": 28.682892
    },
    {
        "adcode": 360101,
        "city": "江西省南昌市市辖区",
        "longitude": 115.858197,
        "latitude": 28.682892
    },
    {
        "adcode": 360102,
        "city": "江西省南昌市东湖区",
        "longitude": 115.899262,
        "latitude": 28.685085
    },
    {
        "adcode": 360103,
        "city": "江西省南昌市西湖区",
        "longitude": 115.877233,
        "latitude": 28.657595
    },
    {
        "adcode": 360104,
        "city": "江西省南昌市青云谱区",
        "longitude": 115.925749,
        "latitude": 28.621169
    },
    {
        "adcode": 360105,
        "city": "江西省南昌市湾里区",
        "longitude": 115.730847,
        "latitude": 28.714796
    },
    {
        "adcode": 360111,
        "city": "江西省南昌市青山湖区",
        "longitude": 115.962144,
        "latitude": 28.682985
    },
    {
        "adcode": 360112,
        "city": "江西省南昌市新建区",
        "longitude": 115.815278,
        "latitude": 28.692864
    },
    {
        "adcode": 360121,
        "city": "江西省南昌市南昌县",
        "longitude": 115.944304,
        "latitude": 28.545602
    },
    {
        "adcode": 360123,
        "city": "江西省南昌市安义县",
        "longitude": 115.549247,
        "latitude": 28.844507
    },
    {
        "adcode": 360124,
        "city": "江西省南昌市进贤县",
        "longitude": 116.26948,
        "latitude": 28.366913
    },
    {
        "adcode": 360200,
        "city": "江西省景德镇市",
        "longitude": 117.178419,
        "latitude": 29.268835
    },
    {
        "adcode": 360201,
        "city": "江西省景德镇市市辖区",
        "longitude": 117.178419,
        "latitude": 29.268835
    },
    {
        "adcode": 360202,
        "city": "江西省景德镇市昌江区",
        "longitude": 117.183748,
        "latitude": 29.273435
    },
    {
        "adcode": 360203,
        "city": "江西省景德镇市珠山区",
        "longitude": 117.202893,
        "latitude": 29.299923
    },
    {
        "adcode": 360222,
        "city": "江西省景德镇市浮梁县",
        "longitude": 117.215086,
        "latitude": 29.351681
    },
    {
        "adcode": 360281,
        "city": "江西省景德镇市乐平市",
        "longitude": 117.151796,
        "latitude": 28.97844
    },
    {
        "adcode": 360300,
        "city": "江西省萍乡市",
        "longitude": 113.854556,
        "latitude": 27.622768
    },
    {
        "adcode": 360301,
        "city": "江西省萍乡市市辖区",
        "longitude": 113.854556,
        "latitude": 27.622768
    },
    {
        "adcode": 360302,
        "city": "江西省萍乡市安源区",
        "longitude": 113.87073,
        "latitude": 27.615202
    },
    {
        "adcode": 360313,
        "city": "江西省萍乡市湘东区",
        "longitude": 113.733047,
        "latitude": 27.640075
    },
    {
        "adcode": 360321,
        "city": "江西省萍乡市莲花县",
        "longitude": 113.961516,
        "latitude": 27.127658
    },
    {
        "adcode": 360322,
        "city": "江西省萍乡市上栗县",
        "longitude": 113.795311,
        "latitude": 27.880302
    },
    {
        "adcode": 360323,
        "city": "江西省萍乡市芦溪县",
        "longitude": 114.029828,
        "latitude": 27.630806
    },
    {
        "adcode": 360400,
        "city": "江西省九江市",
        "longitude": 116.00193,
        "latitude": 29.705077
    },
    {
        "adcode": 360401,
        "city": "江西省九江市市辖区",
        "longitude": 116.00193,
        "latitude": 29.705077
    },
    {
        "adcode": 360402,
        "city": "江西省九江市濂溪区",
        "longitude": 115.989197,
        "latitude": 29.671694
    },
    {
        "adcode": 360403,
        "city": "江西省九江市浔阳区",
        "longitude": 115.990301,
        "latitude": 29.727593
    },
    {
        "adcode": 360404,
        "city": "江西省九江市柴桑区柴桑区",
        "longitude": 115.911323,
        "latitude": 29.608431
    },
    {
        "adcode": 360423,
        "city": "江西省九江市武宁县",
        "longitude": 115.100578,
        "latitude": 29.256323
    },
    {
        "adcode": 360424,
        "city": "江西省九江市修水县",
        "longitude": 114.546702,
        "latitude": 29.026022
    },
    {
        "adcode": 360425,
        "city": "江西省九江市永修县",
        "longitude": 115.832453,
        "latitude": 29.012297
    },
    {
        "adcode": 360426,
        "city": "江西省九江市德安县",
        "longitude": 115.767484,
        "latitude": 29.298738
    },
    {
        "adcode": 360428,
        "city": "江西省九江市都昌县",
        "longitude": 116.204099,
        "latitude": 29.273194
    },
    {
        "adcode": 360429,
        "city": "江西省九江市湖口县",
        "longitude": 116.251947,
        "latitude": 29.731101
    },
    {
        "adcode": 360430,
        "city": "江西省九江市彭泽县",
        "longitude": 116.549359,
        "latitude": 29.896061
    },
    {
        "adcode": 360481,
        "city": "江西省九江市瑞昌市",
        "longitude": 115.681337,
        "latitude": 29.675874
    },
    {
        "adcode": 360482,
        "city": "江西省九江市共青城市",
        "longitude": 115.808844,
        "latitude": 29.248317
    },
    {
        "adcode": 360483,
        "city": "江西省九江市庐山市",
        "longitude": 116.04506,
        "latitude": 29.448128
    },
    {
        "adcode": 360500,
        "city": "江西省新余市",
        "longitude": 114.917346,
        "latitude": 27.817808
    },
    {
        "adcode": 360501,
        "city": "江西省新余市市辖区",
        "longitude": 114.917346,
        "latitude": 27.817808
    },
    {
        "adcode": 360502,
        "city": "江西省新余市渝水区",
        "longitude": 114.944646,
        "latitude": 27.800387
    },
    {
        "adcode": 360521,
        "city": "江西省新余市分宜县",
        "longitude": 114.69205,
        "latitude": 27.814758
    },
    {
        "adcode": 360600,
        "city": "江西省鹰潭市",
        "longitude": 117.069202,
        "latitude": 28.260189
    },
    {
        "adcode": 360601,
        "city": "江西省鹰潭市市辖区",
        "longitude": 117.069202,
        "latitude": 28.260189
    },
    {
        "adcode": 360602,
        "city": "江西省鹰潭市月湖区",
        "longitude": 117.037137,
        "latitude": 28.239153
    },
    {
        "adcode": 360603,
        "city": "江西省鹰潭市月湖区余江",
        "longitude": 117.013288,
        "latitude": 28.20601
    },
    {
        "adcode": 360681,
        "city": "江西省鹰潭市贵溪市",
        "longitude": 117.245497,
        "latitude": 28.292519
    },
    {
        "adcode": 360700,
        "city": "江西省赣州市",
        "longitude": 114.935029,
        "latitude": 25.831829
    },
    {
        "adcode": 360701,
        "city": "江西省赣州市市辖区",
        "longitude": 114.935029,
        "latitude": 25.831829
    },
    {
        "adcode": 360702,
        "city": "江西省赣州市章贡区",
        "longitude": 114.921171,
        "latitude": 25.817816
    },
    {
        "adcode": 360703,
        "city": "江西省赣州市南康区",
        "longitude": 114.968751,
        "latitude": 25.8757135
    },
    {
        "adcode": 360704,
        "city": "江西省赣州市赣县区",
        "longitude": 119.0765445,
        "latitude": 33.4163705
    },
    {
        "adcode": 360722,
        "city": "江西省赣州市信丰县",
        "longitude": 114.92283,
        "latitude": 25.386704
    },
    {
        "adcode": 360723,
        "city": "江西省赣州市大余县",
        "longitude": 114.362112,
        "latitude": 25.401314
    },
    {
        "adcode": 360724,
        "city": "江西省赣州市上犹县",
        "longitude": 114.551138,
        "latitude": 25.785172
    },
    {
        "adcode": 360725,
        "city": "江西省赣州市崇义县",
        "longitude": 114.308267,
        "latitude": 25.681784
    },
    {
        "adcode": 360726,
        "city": "江西省赣州市安远县",
        "longitude": 115.393922,
        "latitude": 25.136927
    },
    {
        "adcode": 360727,
        "city": "江西省赣州市龙南县",
        "longitude": 114.789873,
        "latitude": 24.911069
    },
    {
        "adcode": 360728,
        "city": "江西省赣州市定南县",
        "longitude": 115.027845,
        "latitude": 24.78441
    },
    {
        "adcode": 360729,
        "city": "江西省赣州市全南县",
        "longitude": 114.530125,
        "latitude": 24.742403
    },
    {
        "adcode": 360730,
        "city": "江西省赣州市宁都县",
        "longitude": 116.013621,
        "latitude": 26.470996
    },
    {
        "adcode": 360731,
        "city": "江西省赣州市于都县",
        "longitude": 115.415508,
        "latitude": 25.952069
    },
    {
        "adcode": 360732,
        "city": "江西省赣州市兴国县",
        "longitude": 115.36319,
        "latitude": 26.337937
    },
    {
        "adcode": 360733,
        "city": "江西省赣州市会昌县",
        "longitude": 115.786057,
        "latitude": 25.600272
    },
    {
        "adcode": 360734,
        "city": "江西省赣州市寻乌县",
        "longitude": 115.646636,
        "latitude": 24.963371
    },
    {
        "adcode": 360735,
        "city": "江西省赣州市石城县",
        "longitude": 116.346995,
        "latitude": 26.314775
    },
    {
        "adcode": 360781,
        "city": "江西省赣州市瑞金市",
        "longitude": 116.027135,
        "latitude": 25.885555
    },
    {
        "adcode": 360800,
        "city": "江西省吉安市",
        "longitude": 114.992509,
        "latitude": 27.113443
    },
    {
        "adcode": 360801,
        "city": "江西省吉安市市辖区",
        "longitude": 114.992509,
        "latitude": 27.113443
    },
    {
        "adcode": 360802,
        "city": "江西省吉安市吉州区",
        "longitude": 114.994764,
        "latitude": 27.143801
    },
    {
        "adcode": 360803,
        "city": "江西省吉安市青原区",
        "longitude": 115.014812,
        "latitude": 27.081977
    },
    {
        "adcode": 360821,
        "city": "江西省吉安市吉安县",
        "longitude": 114.907733,
        "latitude": 27.03989
    },
    {
        "adcode": 360822,
        "city": "江西省吉安市吉水县",
        "longitude": 115.135507,
        "latitude": 27.229632
    },
    {
        "adcode": 360823,
        "city": "江西省吉安市峡江县",
        "longitude": 115.316566,
        "latitude": 27.582901
    },
    {
        "adcode": 360824,
        "city": "江西省吉安市新干县",
        "longitude": 115.387052,
        "latitude": 27.740192
    },
    {
        "adcode": 360825,
        "city": "江西省吉安市永丰县",
        "longitude": 115.44432,
        "latitude": 27.318852
    },
    {
        "adcode": 360826,
        "city": "江西省吉安市泰和县",
        "longitude": 114.908869,
        "latitude": 26.78996
    },
    {
        "adcode": 360827,
        "city": "江西省吉安市遂川县",
        "longitude": 114.520537,
        "latitude": 26.313737
    },
    {
        "adcode": 360828,
        "city": "江西省吉安市万安县",
        "longitude": 114.786182,
        "latitude": 26.458254
    },
    {
        "adcode": 360829,
        "city": "江西省吉安市安福县",
        "longitude": 114.619893,
        "latitude": 27.392874
    },
    {
        "adcode": 360830,
        "city": "江西省吉安市永新县",
        "longitude": 114.243096,
        "latitude": 26.945002
    },
    {
        "adcode": 360881,
        "city": "江西省吉安市井冈山市",
        "longitude": 114.289228,
        "latitude": 26.748081
    },
    {
        "adcode": 360900,
        "city": "江西省宜春市",
        "longitude": 114.416778,
        "latitude": 27.815619
    },
    {
        "adcode": 360901,
        "city": "江西省宜春市市辖区",
        "longitude": 114.416778,
        "latitude": 27.815619
    },
    {
        "adcode": 360902,
        "city": "江西省宜春市袁州区",
        "longitude": 114.424657,
        "latitude": 27.798846
    },
    {
        "adcode": 360921,
        "city": "江西省宜春市奉新县",
        "longitude": 115.400491,
        "latitude": 28.688423
    },
    {
        "adcode": 360922,
        "city": "江西省宜春市万载县",
        "longitude": 114.445523,
        "latitude": 28.106004
    },
    {
        "adcode": 360923,
        "city": "江西省宜春市上高县",
        "longitude": 114.947831,
        "latitude": 28.238876
    },
    {
        "adcode": 360924,
        "city": "江西省宜春市宜丰县",
        "longitude": 114.803515,
        "latitude": 28.393666
    },
    {
        "adcode": 360925,
        "city": "江西省宜春市靖安县",
        "longitude": 115.362629,
        "latitude": 28.861479
    },
    {
        "adcode": 360926,
        "city": "江西省宜春市铜鼓县",
        "longitude": 114.371172,
        "latitude": 28.52077
    },
    {
        "adcode": 360981,
        "city": "江西省宜春市丰城市",
        "longitude": 115.771094,
        "latitude": 28.159142
    },
    {
        "adcode": 360982,
        "city": "江西省宜春市樟树市",
        "longitude": 115.546385,
        "latitude": 28.054814
    },
    {
        "adcode": 360983,
        "city": "江西省宜春市高安市",
        "longitude": 115.375616,
        "latitude": 28.417255
    },
    {
        "adcode": 361000,
        "city": "江西省抚州市",
        "longitude": 116.358181,
        "latitude": 27.949217
    },
    {
        "adcode": 361001,
        "city": "江西省抚州市市辖区",
        "longitude": 116.358181,
        "latitude": 27.949217
    },
    {
        "adcode": 361002,
        "city": "江西省抚州市临川区",
        "longitude": 116.371066,
        "latitude": 27.970596
    },
    {
        "adcode": 361003,
        "city": "江西省抚州市东乡区",
        "longitude": 116.60356,
        "latitude": 28.247697
    },
    {
        "adcode": 361021,
        "city": "江西省抚州市南城县",
        "longitude": 116.63704,
        "latitude": 27.569678
    },
    {
        "adcode": 361022,
        "city": "江西省抚州市黎川县",
        "longitude": 116.907681,
        "latitude": 27.282333
    },
    {
        "adcode": 361023,
        "city": "江西省抚州市南丰县",
        "longitude": 116.525725,
        "latitude": 27.218445
    },
    {
        "adcode": 361024,
        "city": "江西省抚州市崇仁县",
        "longitude": 116.061101,
        "latitude": 27.764394
    },
    {
        "adcode": 361025,
        "city": "江西省抚州市乐安县",
        "longitude": 115.830481,
        "latitude": 27.428765
    },
    {
        "adcode": 361026,
        "city": "江西省抚州市宜黄县",
        "longitude": 116.222128,
        "latitude": 27.546146
    },
    {
        "adcode": 361027,
        "city": "江西省抚州市金溪县",
        "longitude": 116.755058,
        "latitude": 27.918959
    },
    {
        "adcode": 361028,
        "city": "江西省抚州市资溪县",
        "longitude": 117.060264,
        "latitude": 27.706102
    },
    {
        "adcode": 361030,
        "city": "江西省抚州市广昌县",
        "longitude": 116.325757,
        "latitude": 26.837267
    },
    {
        "adcode": 361100,
        "city": "江西省上饶市",
        "longitude": 117.943433,
        "latitude": 28.454863
    },
    {
        "adcode": 361101,
        "city": "江西省上饶市市辖区",
        "longitude": 117.943433,
        "latitude": 28.454863
    },
    {
        "adcode": 361102,
        "city": "江西省上饶市信州区",
        "longitude": 117.96646,
        "latitude": 28.431002
    },
    {
        "adcode": 361103,
        "city": "江西省上饶市广丰区",
        "longitude": 118.19124,
        "latitude": 28.436286
    },
    {
        "adcode": 361121,
        "city": "江西省上饶市广信区",
        "longitude": 117.90785,
        "latitude": 28.448983
    },
    {
        "adcode": 361123,
        "city": "江西省上饶市玉山县",
        "longitude": 118.245124,
        "latitude": 28.682055
    },
    {
        "adcode": 361124,
        "city": "江西省上饶市铅山县",
        "longitude": 117.709451,
        "latitude": 28.315217
    },
    {
        "adcode": 361125,
        "city": "江西省上饶市横峰县",
        "longitude": 117.596452,
        "latitude": 28.407118
    },
    {
        "adcode": 361126,
        "city": "江西省上饶市弋阳县",
        "longitude": 117.449588,
        "latitude": 28.378044
    },
    {
        "adcode": 361127,
        "city": "江西省上饶市余干县",
        "longitude": 116.695647,
        "latitude": 28.702302
    },
    {
        "adcode": 361128,
        "city": "江西省上饶市鄱阳县",
        "longitude": 116.699746,
        "latitude": 29.011699
    },
    {
        "adcode": 361129,
        "city": "江西省上饶市万年县",
        "longitude": 117.058445,
        "latitude": 28.694582
    },
    {
        "adcode": 361130,
        "city": "江西省上饶市婺源县",
        "longitude": 117.861798,
        "latitude": 29.248086
    },
    {
        "adcode": 361181,
        "city": "江西省上饶市德兴市",
        "longitude": 117.578713,
        "latitude": 28.946464
    },
    {
        "adcode": 370000,
        "city": "山东省",
        "longitude": 117.020359,
        "latitude": 36.66853
    },
    {
        "adcode": 370100,
        "city": "山东省济南市",
        "longitude": 117.119999,
        "latitude": 36.651216
    },
    {
        "adcode": 370101,
        "city": "山东省济南市市辖区",
        "longitude": 117.119999,
        "latitude": 36.651216
    },
    {
        "adcode": 370102,
        "city": "山东省济南市历下区",
        "longitude": 117.076455,
        "latitude": 36.666412
    },
    {
        "adcode": 370103,
        "city": "山东省济南市市中区",
        "longitude": 116.997777,
        "latitude": 36.651474
    },
    {
        "adcode": 370104,
        "city": "山东省济南市槐荫区",
        "longitude": 116.901224,
        "latitude": 36.651441
    },
    {
        "adcode": 370105,
        "city": "山东省济南市天桥区",
        "longitude": 116.987492,
        "latitude": 36.678016
    },
    {
        "adcode": 370112,
        "city": "山东省济南市历城区",
        "longitude": 117.065237,
        "latitude": 36.680017
    },
    {
        "adcode": 370113,
        "city": "山东省济南市长清区",
        "longitude": 116.751937,
        "latitude": 36.553571
    },
    {
        "adcode": 370114,
        "city": "山东省济南市章丘区",
        "longitude": 117.526228,
        "latitude": 36.681259
    },
    {
        "adcode": 370115,
        "city": "山东省济南市历城区济阳",
        "longitude": 117.042516,
        "latitude": 36.726342
    },
    {
        "adcode": 370116,
        "city": "山东省济南市莱芜区",
        "longitude": 116.4956035,
        "latitude": 39.989314
    },
    {
        "adcode": 370117,
        "city": "山东省济南市钢城区",
        "longitude": 117.6867965,
        "latitude": 36.2148525
    },
    {
        "adcode": 370124,
        "city": "山东省济南市平阴县",
        "longitude": 116.456187,
        "latitude": 36.289265
    },
    {
        "adcode": 370126,
        "city": "山东省济南市商河县",
        "longitude": 117.157207,
        "latitude": 37.30905
    },
    {
        "adcode": 370200,
        "city": "山东省青岛市",
        "longitude": 120.382639,
        "latitude": 36.067082
    },
    {
        "adcode": 370201,
        "city": "山东省青岛市市辖区",
        "longitude": 120.382639,
        "latitude": 36.067082
    },
    {
        "adcode": 370202,
        "city": "山东省青岛市市南区",
        "longitude": 120.385649,
        "latitude": 36.080305
    },
    {
        "adcode": 370203,
        "city": "山东省青岛市市北区",
        "longitude": 120.374731,
        "latitude": 36.087609
    },
    {
        "adcode": 370211,
        "city": "山东省青岛市黄岛区",
        "longitude": 120.04619,
        "latitude": 35.872664
    },
    {
        "adcode": 370212,
        "city": "山东省青岛市崂山区",
        "longitude": 120.468956,
        "latitude": 36.107538
    },
    {
        "adcode": 370213,
        "city": "山东省青岛市李沧区",
        "longitude": 120.432697,
        "latitude": 36.145463
    },
    {
        "adcode": 370214,
        "city": "山东省青岛市城阳区",
        "longitude": 120.39631,
        "latitude": 36.307064
    },
    {
        "adcode": 370215,
        "city": "山东省青岛市即墨区即墨",
        "longitude": 120.453079,
        "latitude": 36.388599
    },
    {
        "adcode": 370281,
        "city": "山东省青岛市胶州市",
        "longitude": 120.033382,
        "latitude": 36.26468
    },
    {
        "adcode": 370283,
        "city": "山东省青岛市平度市",
        "longitude": 119.988454,
        "latitude": 36.776875
    },
    {
        "adcode": 370285,
        "city": "山东省青岛市莱西市",
        "longitude": 120.51769,
        "latitude": 36.889084
    },
    {
        "adcode": 370300,
        "city": "山东省淄博市",
        "longitude": 118.054927,
        "latitude": 36.813487
    },
    {
        "adcode": 370301,
        "city": "山东省淄博市市辖区",
        "longitude": 118.054927,
        "latitude": 36.813487
    },
    {
        "adcode": 370302,
        "city": "山东省淄博市淄川区",
        "longitude": 117.966723,
        "latitude": 36.643452
    },
    {
        "adcode": 370303,
        "city": "山东省淄博市张店区",
        "longitude": 118.017913,
        "latitude": 36.806674
    },
    {
        "adcode": 370304,
        "city": "山东省淄博市博山区",
        "longitude": 117.861677,
        "latitude": 36.494721
    },
    {
        "adcode": 370305,
        "city": "山东省淄博市临淄区",
        "longitude": 118.309118,
        "latitude": 36.826981
    },
    {
        "adcode": 370306,
        "city": "山东省淄博市周村区",
        "longitude": 117.869886,
        "latitude": 36.803072
    },
    {
        "adcode": 370321,
        "city": "山东省淄博市桓台县",
        "longitude": 118.097923,
        "latitude": 36.959804
    },
    {
        "adcode": 370322,
        "city": "山东省淄博市高青县",
        "longitude": 117.826916,
        "latitude": 37.171063
    },
    {
        "adcode": 370323,
        "city": "山东省淄博市沂源县",
        "longitude": 118.170856,
        "latitude": 36.185038
    },
    {
        "adcode": 370400,
        "city": "山东省枣庄市",
        "longitude": 117.323725,
        "latitude": 34.810487
    },
    {
        "adcode": 370401,
        "city": "山东省枣庄市市辖区",
        "longitude": 117.323725,
        "latitude": 34.810487
    },
    {
        "adcode": 370402,
        "city": "山东省枣庄市市中区",
        "longitude": 117.556123,
        "latitude": 34.864114
    },
    {
        "adcode": 370403,
        "city": "山东省枣庄市薛城区",
        "longitude": 117.263164,
        "latitude": 34.795063
    },
    {
        "adcode": 370404,
        "city": "山东省枣庄市峄城区",
        "longitude": 117.590816,
        "latitude": 34.773263
    },
    {
        "adcode": 370405,
        "city": "山东省枣庄市台儿庄区",
        "longitude": 117.733832,
        "latitude": 34.562528
    },
    {
        "adcode": 370406,
        "city": "山东省枣庄市山亭区",
        "longitude": 117.461517,
        "latitude": 35.099528
    },
    {
        "adcode": 370481,
        "city": "山东省枣庄市滕州市",
        "longitude": 117.165824,
        "latitude": 35.114156
    },
    {
        "adcode": 370500,
        "city": "山东省东营市",
        "longitude": 118.674767,
        "latitude": 37.434751
    },
    {
        "adcode": 370501,
        "city": "山东省东营市市辖区",
        "longitude": 118.674767,
        "latitude": 37.434751
    },
    {
        "adcode": 370502,
        "city": "山东省东营市东营区",
        "longitude": 118.582184,
        "latitude": 37.448963
    },
    {
        "adcode": 370503,
        "city": "山东省东营市河口区",
        "longitude": 118.525543,
        "latitude": 37.886162
    },
    {
        "adcode": 370505,
        "city": "",
        "longitude": 0,
        "latitude": 0
    },
    {
        "adcode": 370522,
        "city": "山东省东营市利津县",
        "longitude": 118.255273,
        "latitude": 37.49026
    },
    {
        "adcode": 370523,
        "city": "山东省东营市广饶县",
        "longitude": 118.407107,
        "latitude": 37.053555
    },
    {
        "adcode": 370600,
        "city": "山东省烟台市",
        "longitude": 121.447935,
        "latitude": 37.463822
    },
    {
        "adcode": 370601,
        "city": "山东省烟台市市辖区",
        "longitude": 121.447935,
        "latitude": 37.463822
    },
    {
        "adcode": 370602,
        "city": "山东省烟台市芝罘区",
        "longitude": 121.400031,
        "latitude": 37.540687
    },
    {
        "adcode": 370611,
        "city": "山东省烟台市福山区",
        "longitude": 121.267741,
        "latitude": 37.498246
    },
    {
        "adcode": 370612,
        "city": "山东省烟台市牟平区",
        "longitude": 121.600512,
        "latitude": 37.386901
    },
    {
        "adcode": 370613,
        "city": "山东省烟台市莱山区",
        "longitude": 121.445151,
        "latitude": 37.511361
    },
    {
        "adcode": 370634,
        "city": "山东省烟台市长岛县",
        "longitude": 120.73658,
        "latitude": 37.921368
    },
    {
        "adcode": 370681,
        "city": "山东省烟台市龙口市",
        "longitude": 120.477813,
        "latitude": 37.646108
    },
    {
        "adcode": 370682,
        "city": "山东省烟台市莱阳市",
        "longitude": 120.711673,
        "latitude": 36.978941
    },
    {
        "adcode": 370683,
        "city": "山东省烟台市莱州市",
        "longitude": 119.942327,
        "latitude": 37.177017
    },
    {
        "adcode": 370684,
        "city": "山东省烟台市蓬莱市",
        "longitude": 120.758848,
        "latitude": 37.810661
    },
    {
        "adcode": 370685,
        "city": "山东省烟台市招远市",
        "longitude": 120.434072,
        "latitude": 37.355469
    },
    {
        "adcode": 370686,
        "city": "山东省烟台市栖霞市",
        "longitude": 120.849675,
        "latitude": 37.335123
    },
    {
        "adcode": 370687,
        "city": "山东省烟台市海阳市",
        "longitude": 121.158434,
        "latitude": 36.776378
    },
    {
        "adcode": 370700,
        "city": "山东省潍坊市",
        "longitude": 119.161755,
        "latitude": 36.706774
    },
    {
        "adcode": 370701,
        "city": "山东省潍坊市市辖区",
        "longitude": 119.161755,
        "latitude": 36.706774
    },
    {
        "adcode": 370702,
        "city": "山东省潍坊市潍城区",
        "longitude": 119.024836,
        "latitude": 36.7281
    },
    {
        "adcode": 370703,
        "city": "山东省潍坊市寒亭区",
        "longitude": 119.219734,
        "latitude": 36.775491
    },
    {
        "adcode": 370704,
        "city": "山东省潍坊市坊子区",
        "longitude": 119.166485,
        "latitude": 36.654448
    },
    {
        "adcode": 370705,
        "city": "山东省潍坊市奎文区",
        "longitude": 119.132486,
        "latitude": 36.707676
    },
    {
        "adcode": 370724,
        "city": "山东省潍坊市临朐县",
        "longitude": 118.542982,
        "latitude": 36.512506
    },
    {
        "adcode": 370725,
        "city": "山东省潍坊市昌乐县",
        "longitude": 118.829996,
        "latitude": 36.706938
    },
    {
        "adcode": 370781,
        "city": "山东省潍坊市青州市",
        "longitude": 118.479636,
        "latitude": 36.6846
    },
    {
        "adcode": 370782,
        "city": "山东省潍坊市诸城市",
        "longitude": 119.410103,
        "latitude": 35.995654
    },
    {
        "adcode": 370783,
        "city": "山东省潍坊市寿光市",
        "longitude": 118.790652,
        "latitude": 36.85548
    },
    {
        "adcode": 370784,
        "city": "山东省潍坊市安丘市",
        "longitude": 119.218843,
        "latitude": 36.478494
    },
    {
        "adcode": 370785,
        "city": "山东省潍坊市高密市",
        "longitude": 119.755597,
        "latitude": 36.382595
    },
    {
        "adcode": 370786,
        "city": "山东省潍坊市昌邑市",
        "longitude": 119.398525,
        "latitude": 36.85882
    },
    {
        "adcode": 370800,
        "city": "山东省济宁市",
        "longitude": 116.587098,
        "latitude": 35.414921
    },
    {
        "adcode": 370801,
        "city": "山东省济宁市市辖区",
        "longitude": 116.587098,
        "latitude": 35.414921
    },
    {
        "adcode": 370811,
        "city": "山东省济宁市任城区",
        "longitude": 116.59505,
        "latitude": 35.406596
    },
    {
        "adcode": 370812,
        "city": "山东省济宁市兖州区",
        "longitude": 116.783834,
        "latitude": 35.553144
    },
    {
        "adcode": 370826,
        "city": "山东省济宁市微山县",
        "longitude": 117.128828,
        "latitude": 34.806554
    },
    {
        "adcode": 370827,
        "city": "山东省济宁市鱼台县",
        "longitude": 116.650608,
        "latitude": 35.012749
    },
    {
        "adcode": 370828,
        "city": "山东省济宁市金乡县",
        "longitude": 116.311532,
        "latitude": 35.06662
    },
    {
        "adcode": 370829,
        "city": "山东省济宁市嘉祥县",
        "longitude": 116.342442,
        "latitude": 35.407829
    },
    {
        "adcode": 370830,
        "city": "山东省济宁市汶上县",
        "longitude": 116.489043,
        "latitude": 35.732799
    },
    {
        "adcode": 370831,
        "city": "山东省济宁市泗水县",
        "longitude": 117.251195,
        "latitude": 35.664323
    },
    {
        "adcode": 370832,
        "city": "山东省济宁市梁山县",
        "longitude": 116.096044,
        "latitude": 35.802306
    },
    {
        "adcode": 370881,
        "city": "山东省济宁市曲阜市",
        "longitude": 116.986503,
        "latitude": 35.580996
    },
    {
        "adcode": 370883,
        "city": "山东省济宁市邹城市",
        "longitude": 117.003743,
        "latitude": 35.405185
    },
    {
        "adcode": 370900,
        "city": "山东省泰安市",
        "longitude": 117.087614,
        "latitude": 36.200252
    },
    {
        "adcode": 370901,
        "city": "山东省泰安市市辖区",
        "longitude": 117.087614,
        "latitude": 36.200252
    },
    {
        "adcode": 370902,
        "city": "山东省泰安市泰山区",
        "longitude": 117.135354,
        "latitude": 36.192084
    },
    {
        "adcode": 370911,
        "city": "山东省泰安市岱岳区",
        "longitude": 117.041582,
        "latitude": 36.18799
    },
    {
        "adcode": 370921,
        "city": "山东省泰安市宁阳县",
        "longitude": 116.805797,
        "latitude": 35.758787
    },
    {
        "adcode": 370923,
        "city": "山东省泰安市东平县",
        "longitude": 116.470304,
        "latitude": 35.937102
    },
    {
        "adcode": 370982,
        "city": "山东省泰安市新泰市",
        "longitude": 117.767953,
        "latitude": 35.909032
    },
    {
        "adcode": 370983,
        "city": "山东省泰安市肥城市",
        "longitude": 116.768358,
        "latitude": 36.182572
    },
    {
        "adcode": 371000,
        "city": "山东省威海市",
        "longitude": 122.120419,
        "latitude": 37.513068
    },
    {
        "adcode": 371001,
        "city": "山东省威海市市辖区",
        "longitude": 122.120419,
        "latitude": 37.513068
    },
    {
        "adcode": 371002,
        "city": "山东省威海市环翠区",
        "longitude": 122.123444,
        "latitude": 37.501991
    },
    {
        "adcode": 371003,
        "city": "山东省威海市文登区",
        "longitude": 122.057941,
        "latitude": 37.193886
    },
    {
        "adcode": 371082,
        "city": "山东省威海市荣成市",
        "longitude": 122.486658,
        "latitude": 37.16516
    },
    {
        "adcode": 371083,
        "city": "山东省威海市乳山市",
        "longitude": 121.539765,
        "latitude": 36.919816
    },
    {
        "adcode": 371100,
        "city": "山东省日照市",
        "longitude": 119.526888,
        "latitude": 35.416377
    },
    {
        "adcode": 371101,
        "city": "山东省日照市市辖区",
        "longitude": 119.526888,
        "latitude": 35.416377
    },
    {
        "adcode": 371102,
        "city": "山东省日照市东港区",
        "longitude": 119.462249,
        "latitude": 35.42547
    },
    {
        "adcode": 371103,
        "city": "山东省日照市岚山区",
        "longitude": 119.318929,
        "latitude": 35.121884
    },
    {
        "adcode": 371121,
        "city": "山东省日照市五莲县",
        "longitude": 119.206763,
        "latitude": 35.751927
    },
    {
        "adcode": 371122,
        "city": "山东省日照市莒县",
        "longitude": 118.837064,
        "latitude": 35.579868
    },
    {
        "adcode": 371300,
        "city": "山东省临沂市",
        "longitude": 118.356448,
        "latitude": 35.104672
    },
    {
        "adcode": 371301,
        "city": "山东省临沂市市辖区",
        "longitude": 118.356448,
        "latitude": 35.104672
    },
    {
        "adcode": 371302,
        "city": "山东省临沂市兰山区",
        "longitude": 118.347731,
        "latitude": 35.051734
    },
    {
        "adcode": 371311,
        "city": "山东省临沂市罗庄区",
        "longitude": 118.284786,
        "latitude": 34.996741
    },
    {
        "adcode": 371312,
        "city": "山东省临沂市河东区",
        "longitude": 118.402893,
        "latitude": 35.089917
    },
    {
        "adcode": 371321,
        "city": "山东省临沂市沂南县",
        "longitude": 118.465213,
        "latitude": 35.549976
    },
    {
        "adcode": 371322,
        "city": "山东省临沂市郯城县",
        "longitude": 118.367263,
        "latitude": 34.613557
    },
    {
        "adcode": 371323,
        "city": "山东省临沂市沂水县",
        "longitude": 118.627918,
        "latitude": 35.79045
    },
    {
        "adcode": 371324,
        "city": "山东省临沂市兰陵县",
        "longitude": 118.07065,
        "latitude": 34.857149
    },
    {
        "adcode": 371325,
        "city": "山东省临沂市费县",
        "longitude": 117.977325,
        "latitude": 35.265961
    },
    {
        "adcode": 371326,
        "city": "山东省临沂市平邑县",
        "longitude": 117.640352,
        "latitude": 35.505943
    },
    {
        "adcode": 371327,
        "city": "山东省临沂市莒南县",
        "longitude": 118.835163,
        "latitude": 35.174846
    },
    {
        "adcode": 371328,
        "city": "山东省临沂市蒙阴县",
        "longitude": 117.945085,
        "latitude": 35.710032
    },
    {
        "adcode": 371329,
        "city": "山东省临沂市临沭县",
        "longitude": 118.650782,
        "latitude": 34.919852
    },
    {
        "adcode": 371400,
        "city": "山东省德州市",
        "longitude": 116.357464,
        "latitude": 37.434092
    },
    {
        "adcode": 371401,
        "city": "山东省德州市市辖区",
        "longitude": 116.357464,
        "latitude": 37.434092
    },
    {
        "adcode": 371402,
        "city": "山东省德州市德城区",
        "longitude": 116.299471,
        "latitude": 37.450805
    },
    {
        "adcode": 371403,
        "city": "山东省德州市陵城区",
        "longitude": 116.576092,
        "latitude": 37.335794
    },
    {
        "adcode": 371422,
        "city": "山东省德州市宁津县",
        "longitude": 116.800306,
        "latitude": 37.65219
    },
    {
        "adcode": 371423,
        "city": "山东省德州市庆云县",
        "longitude": 117.385257,
        "latitude": 37.77535
    },
    {
        "adcode": 371424,
        "city": "山东省德州市临邑县",
        "longitude": 116.8668,
        "latitude": 37.189798
    },
    {
        "adcode": 371425,
        "city": "山东省德州市齐河县",
        "longitude": 116.76281,
        "latitude": 36.783415
    },
    {
        "adcode": 371426,
        "city": "山东省德州市平原县",
        "longitude": 116.434056,
        "latitude": 37.165314
    },
    {
        "adcode": 371427,
        "city": "山东省德州市夏津县",
        "longitude": 116.001726,
        "latitude": 36.948371
    },
    {
        "adcode": 371428,
        "city": "山东省德州市武城县",
        "longitude": 116.069302,
        "latitude": 37.213311
    },
    {
        "adcode": 371481,
        "city": "山东省德州市乐陵市",
        "longitude": 117.231935,
        "latitude": 37.729907
    },
    {
        "adcode": 371482,
        "city": "山东省德州市禹城市",
        "longitude": 116.638327,
        "latitude": 36.933812
    },
    {
        "adcode": 371500,
        "city": "山东省聊城市",
        "longitude": 115.985371,
        "latitude": 36.456703
    },
    {
        "adcode": 371501,
        "city": "山东省聊城市市辖区",
        "longitude": 115.985371,
        "latitude": 36.456703
    },
    {
        "adcode": 371502,
        "city": "山东省聊城市东昌府区",
        "longitude": 115.988491,
        "latitude": 36.434645
    },
    {
        "adcode": 371521,
        "city": "山东省聊城市阳谷县",
        "longitude": 115.79182,
        "latitude": 36.114392
    },
    {
        "adcode": 371522,
        "city": "山东省聊城市莘县",
        "longitude": 115.671191,
        "latitude": 36.233598
    },
    {
        "adcode": 371523,
        "city": "山东省聊城市茌平县",
        "longitude": 116.25527,
        "latitude": 36.580689
    },
    {
        "adcode": 371524,
        "city": "山东省聊城市东阿县",
        "longitude": 116.24758,
        "latitude": 36.334917
    },
    {
        "adcode": 371525,
        "city": "山东省聊城市冠县",
        "longitude": 115.44274,
        "latitude": 36.484009
    },
    {
        "adcode": 371526,
        "city": "山东省聊城市高唐县",
        "longitude": 116.230158,
        "latitude": 36.846755
    },
    {
        "adcode": 371581,
        "city": "山东省聊城市临清市",
        "longitude": 115.704881,
        "latitude": 36.838277
    },
    {
        "adcode": 371600,
        "city": "山东省滨州市",
        "longitude": 117.970703,
        "latitude": 37.38199
    },
    {
        "adcode": 371601,
        "city": "山东省滨州市市辖区",
        "longitude": 117.970703,
        "latitude": 37.38199
    },
    {
        "adcode": 371602,
        "city": "山东省滨州市滨城区",
        "longitude": 118.019326,
        "latitude": 37.430724
    },
    {
        "adcode": 371603,
        "city": "山东省滨州市沾化区",
        "longitude": 118.098902,
        "latitude": 37.69926
    },
    {
        "adcode": 371621,
        "city": "山东省滨州市惠民县",
        "longitude": 117.509921,
        "latitude": 37.489877
    },
    {
        "adcode": 371622,
        "city": "山东省滨州市阳信县",
        "longitude": 117.578262,
        "latitude": 37.641106
    },
    {
        "adcode": 371623,
        "city": "山东省滨州市无棣县",
        "longitude": 117.625696,
        "latitude": 37.77026
    },
    {
        "adcode": 371625,
        "city": "山东省滨州市博兴县",
        "longitude": 118.131815,
        "latitude": 37.150226
    },
    {
        "adcode": 371681,
        "city": "山东省滨州市邹平县邹平",
        "longitude": 117.766654,
        "latitude": 36.874334
    },
    {
        "adcode": 371700,
        "city": "山东省菏泽市",
        "longitude": 115.480656,
        "latitude": 35.23375
    },
    {
        "adcode": 371701,
        "city": "山东省菏泽市市辖区",
        "longitude": 115.480656,
        "latitude": 35.23375
    },
    {
        "adcode": 371702,
        "city": "山东省菏泽市牡丹区",
        "longitude": 115.417827,
        "latitude": 35.252512
    },
    {
        "adcode": 371703,
        "city": "山东省菏泽市定陶区",
        "longitude": 115.569619,
        "latitude": 35.072701
    },
    {
        "adcode": 371721,
        "city": "山东省菏泽市曹县",
        "longitude": 115.542328,
        "latitude": 34.825508
    },
    {
        "adcode": 371722,
        "city": "山东省菏泽市单县",
        "longitude": 116.107428,
        "latitude": 34.778808
    },
    {
        "adcode": 371723,
        "city": "山东省菏泽市成武县",
        "longitude": 115.889765,
        "latitude": 34.952459
    },
    {
        "adcode": 371724,
        "city": "山东省菏泽市巨野县",
        "longitude": 116.065396,
        "latitude": 35.387374
    },
    {
        "adcode": 371725,
        "city": "山东省菏泽市郓城县",
        "longitude": 115.943613,
        "latitude": 35.599758
    },
    {
        "adcode": 371726,
        "city": "山东省菏泽市鄄城县",
        "longitude": 115.510193,
        "latitude": 35.563408
    },
    {
        "adcode": 371728,
        "city": "山东省菏泽市东明县",
        "longitude": 115.089905,
        "latitude": 35.289368
    },
    {
        "adcode": 410000,
        "city": "河南省",
        "longitude": 113.753602,
        "latitude": 34.765515
    },
    {
        "adcode": 410100,
        "city": "河南省郑州市",
        "longitude": 113.625368,
        "latitude": 34.746599
    },
    {
        "adcode": 410101,
        "city": "河南省郑州市市辖区",
        "longitude": 113.625368,
        "latitude": 34.746599
    },
    {
        "adcode": 410102,
        "city": "河南省郑州市中原区",
        "longitude": 113.61285,
        "latitude": 34.748257
    },
    {
        "adcode": 410103,
        "city": "河南省郑州市二七区",
        "longitude": 113.640179,
        "latitude": 34.72393
    },
    {
        "adcode": 410104,
        "city": "河南省郑州市管城回族区",
        "longitude": 113.677548,
        "latitude": 34.7545
    },
    {
        "adcode": 410105,
        "city": "河南省郑州市金水区",
        "longitude": 113.660555,
        "latitude": 34.800156
    },
    {
        "adcode": 410106,
        "city": "河南省郑州市上街区",
        "longitude": 113.308961,
        "latitude": 34.80278
    },
    {
        "adcode": 410108,
        "city": "河南省郑州市惠济区",
        "longitude": 113.616901,
        "latitude": 34.867458
    },
    {
        "adcode": 410122,
        "city": "河南省郑州市中牟县",
        "longitude": 113.976181,
        "latitude": 34.71895
    },
    {
        "adcode": 410181,
        "city": "河南省郑州市巩义市",
        "longitude": 113.022497,
        "latitude": 34.747834
    },
    {
        "adcode": 410182,
        "city": "河南省郑州市荥阳市",
        "longitude": 113.440457,
        "latitude": 34.745585
    },
    {
        "adcode": 410183,
        "city": "河南省郑州市新密市",
        "longitude": 113.390891,
        "latitude": 34.539443
    },
    {
        "adcode": 410184,
        "city": "河南省郑州市新郑市",
        "longitude": 113.740529,
        "latitude": 34.395562
    },
    {
        "adcode": 410185,
        "city": "河南省郑州市登封市",
        "longitude": 113.050492,
        "latitude": 34.453667
    },
    {
        "adcode": 410200,
        "city": "河南省开封市",
        "longitude": 114.307581,
        "latitude": 34.797239
    },
    {
        "adcode": 410201,
        "city": "河南省开封市市辖区",
        "longitude": 114.307581,
        "latitude": 34.797239
    },
    {
        "adcode": 410202,
        "city": "河南省开封市龙亭区",
        "longitude": 114.35473,
        "latitude": 34.815784
    },
    {
        "adcode": 410203,
        "city": "河南省开封市顺河回族区",
        "longitude": 114.364875,
        "latitude": 34.800459
    },
    {
        "adcode": 410204,
        "city": "河南省开封市鼓楼区",
        "longitude": 114.348307,
        "latitude": 34.788561
    },
    {
        "adcode": 410205,
        "city": "河南省开封市禹王台区",
        "longitude": 114.34817,
        "latitude": 34.777104
    },
    {
        "adcode": 410212,
        "city": "河南省开封市祥符区",
        "longitude": 114.441327,
        "latitude": 34.756921
    },
    {
        "adcode": 410221,
        "city": "河南省开封市杞县",
        "longitude": 114.783041,
        "latitude": 34.549166
    },
    {
        "adcode": 410222,
        "city": "河南省开封市通许县",
        "longitude": 114.467467,
        "latitude": 34.480433
    },
    {
        "adcode": 410223,
        "city": "河南省开封市尉氏县",
        "longitude": 114.193081,
        "latitude": 34.411494
    },
    {
        "adcode": 410225,
        "city": "河南省开封市兰考县",
        "longitude": 114.821348,
        "latitude": 34.822211
    },
    {
        "adcode": 410300,
        "city": "河南省洛阳市",
        "longitude": 112.45404,
        "latitude": 34.619682
    },
    {
        "adcode": 410301,
        "city": "河南省洛阳市市辖区",
        "longitude": 112.45404,
        "latitude": 34.619682
    },
    {
        "adcode": 410302,
        "city": "河南省洛阳市老城区",
        "longitude": 112.469024,
        "latitude": 34.683646
    },
    {
        "adcode": 410303,
        "city": "河南省洛阳市西工区",
        "longitude": 112.428413,
        "latitude": 34.6599
    },
    {
        "adcode": 410304,
        "city": "河南省洛阳市瀍河回族区",
        "longitude": 112.500205,
        "latitude": 34.67985
    },
    {
        "adcode": 410305,
        "city": "河南省洛阳市涧西区",
        "longitude": 112.395756,
        "latitude": 34.658034
    },
    {
        "adcode": 410306,
        "city": "河南省洛阳市吉利区",
        "longitude": 112.589052,
        "latitude": 34.900889
    },
    {
        "adcode": 410311,
        "city": "河南省洛阳市洛龙区",
        "longitude": 112.464173,
        "latitude": 34.619404
    },
    {
        "adcode": 410322,
        "city": "河南省洛阳市孟津县",
        "longitude": 112.445252,
        "latitude": 34.825307
    },
    {
        "adcode": 410323,
        "city": "河南省洛阳市新安县",
        "longitude": 112.132488,
        "latitude": 34.728584
    },
    {
        "adcode": 410324,
        "city": "河南省洛阳市栾川县",
        "longitude": 111.615769,
        "latitude": 33.785698
    },
    {
        "adcode": 410325,
        "city": "河南省洛阳市嵩县",
        "longitude": 112.085634,
        "latitude": 34.134517
    },
    {
        "adcode": 410326,
        "city": "河南省洛阳市汝阳县",
        "longitude": 112.473139,
        "latitude": 34.15394
    },
    {
        "adcode": 410327,
        "city": "河南省洛阳市宜阳县",
        "longitude": 112.179238,
        "latitude": 34.514645
    },
    {
        "adcode": 410328,
        "city": "河南省洛阳市洛宁县",
        "longitude": 111.653039,
        "latitude": 34.389414
    },
    {
        "adcode": 410329,
        "city": "河南省洛阳市伊川县",
        "longitude": 112.425651,
        "latitude": 34.42146
    },
    {
        "adcode": 410381,
        "city": "河南省洛阳市偃师市",
        "longitude": 112.789535,
        "latitude": 34.72722
    },
    {
        "adcode": 410400,
        "city": "河南省平顶山市",
        "longitude": 113.192661,
        "latitude": 33.766169
    },
    {
        "adcode": 410401,
        "city": "河南省平顶山市市辖区",
        "longitude": 113.192661,
        "latitude": 33.766169
    },
    {
        "adcode": 410402,
        "city": "河南省平顶山市新华区",
        "longitude": 113.293999,
        "latitude": 33.737365
    },
    {
        "adcode": 410403,
        "city": "河南省平顶山市卫东区",
        "longitude": 113.335193,
        "latitude": 33.734707
    },
    {
        "adcode": 410404,
        "city": "河南省平顶山市石龙区",
        "longitude": 112.898818,
        "latitude": 33.898713
    },
    {
        "adcode": 410411,
        "city": "河南省平顶山市湛河区",
        "longitude": 113.320873,
        "latitude": 33.725681
    },
    {
        "adcode": 410421,
        "city": "河南省平顶山市宝丰县",
        "longitude": 113.054754,
        "latitude": 33.868441
    },
    {
        "adcode": 410422,
        "city": "河南省平顶山市叶县",
        "longitude": 113.357239,
        "latitude": 33.626731
    },
    {
        "adcode": 410423,
        "city": "河南省平顶山市鲁山县",
        "longitude": 112.908023,
        "latitude": 33.738518
    },
    {
        "adcode": 410425,
        "city": "河南省平顶山市郏县",
        "longitude": 113.212609,
        "latitude": 33.971787
    },
    {
        "adcode": 410481,
        "city": "河南省平顶山市舞钢市",
        "longitude": 113.524794,
        "latitude": 33.307776
    },
    {
        "adcode": 410482,
        "city": "河南省平顶山市汝州市",
        "longitude": 112.844517,
        "latitude": 34.16703
    },
    {
        "adcode": 410500,
        "city": "河南省安阳市",
        "longitude": 114.392392,
        "latitude": 36.097577
    },
    {
        "adcode": 410501,
        "city": "河南省安阳市市辖区",
        "longitude": 114.392392,
        "latitude": 36.097577
    },
    {
        "adcode": 410502,
        "city": "河南省安阳市文峰区",
        "longitude": 114.357082,
        "latitude": 36.090468
    },
    {
        "adcode": 410503,
        "city": "河南省安阳市北关区",
        "longitude": 114.355822,
        "latitude": 36.107255
    },
    {
        "adcode": 410505,
        "city": "河南省安阳市殷都区",
        "longitude": 114.30341,
        "latitude": 36.10989
    },
    {
        "adcode": 410506,
        "city": "河南省安阳市龙安区",
        "longitude": 114.323522,
        "latitude": 36.095568
    },
    {
        "adcode": 410522,
        "city": "河南省安阳市安阳县",
        "longitude": 114.130207,
        "latitude": 36.130585
    },
    {
        "adcode": 410523,
        "city": "河南省安阳市汤阴县",
        "longitude": 114.357763,
        "latitude": 35.924515
    },
    {
        "adcode": 410526,
        "city": "河南省安阳市滑县",
        "longitude": 114.518997,
        "latitude": 35.575002
    },
    {
        "adcode": 410527,
        "city": "河南省安阳市内黄县",
        "longitude": 114.901492,
        "latitude": 35.971653
    },
    {
        "adcode": 410581,
        "city": "河南省安阳市林州市",
        "longitude": 113.82013,
        "latitude": 36.083047
    },
    {
        "adcode": 410600,
        "city": "河南省鹤壁市",
        "longitude": 114.297272,
        "latitude": 35.747225
    },
    {
        "adcode": 410601,
        "city": "河南省鹤壁市市辖区",
        "longitude": 114.297272,
        "latitude": 35.747225
    },
    {
        "adcode": 410602,
        "city": "河南省鹤壁市鹤山区",
        "longitude": 114.163367,
        "latitude": 35.954582
    },
    {
        "adcode": 410603,
        "city": "河南省鹤壁市山城区",
        "longitude": 114.184428,
        "latitude": 35.897703
    },
    {
        "adcode": 410611,
        "city": "河南省鹤壁市淇滨区",
        "longitude": 114.298694,
        "latitude": 35.741296
    },
    {
        "adcode": 410621,
        "city": "河南省鹤壁市浚县",
        "longitude": 114.550813,
        "latitude": 35.67624
    },
    {
        "adcode": 410622,
        "city": "河南省鹤壁市淇县",
        "longitude": 114.197651,
        "latitude": 35.607762
    },
    {
        "adcode": 410700,
        "city": "河南省新乡市",
        "longitude": 113.9268,
        "latitude": 35.303004
    },
    {
        "adcode": 410701,
        "city": "河南省新乡市市辖区",
        "longitude": 113.9268,
        "latitude": 35.303004
    },
    {
        "adcode": 410702,
        "city": "河南省新乡市红旗区",
        "longitude": 113.875245,
        "latitude": 35.303851
    },
    {
        "adcode": 410703,
        "city": "河南省新乡市卫滨区",
        "longitude": 113.86578,
        "latitude": 35.302117
    },
    {
        "adcode": 410704,
        "city": "河南省新乡市凤泉区",
        "longitude": 113.915184,
        "latitude": 35.383978
    },
    {
        "adcode": 410711,
        "city": "河南省新乡市牧野区",
        "longitude": 113.908772,
        "latitude": 35.315039
    },
    {
        "adcode": 410721,
        "city": "河南省新乡市新乡县",
        "longitude": 113.805205,
        "latitude": 35.190836
    },
    {
        "adcode": 410724,
        "city": "河南省新乡市获嘉县",
        "longitude": 113.657433,
        "latitude": 35.259808
    },
    {
        "adcode": 410725,
        "city": "河南省新乡市原阳县",
        "longitude": 113.940115,
        "latitude": 35.065587
    },
    {
        "adcode": 410726,
        "city": "河南省新乡市延津县",
        "longitude": 114.205197,
        "latitude": 35.141956
    },
    {
        "adcode": 410727,
        "city": "河南省新乡市封丘县",
        "longitude": 114.418882,
        "latitude": 35.041198
    },
    {
        "adcode": 410728,
        "city": "河南省新乡市长垣县",
        "longitude": 114.668936,
        "latitude": 35.201548
    },
    {
        "adcode": 410781,
        "city": "河南省新乡市卫辉市",
        "longitude": 114.064907,
        "latitude": 35.398494
    },
    {
        "adcode": 410782,
        "city": "河南省新乡市辉县市",
        "longitude": 113.805468,
        "latitude": 35.462313
    },
    {
        "adcode": 410800,
        "city": "河南省焦作市",
        "longitude": 113.241823,
        "latitude": 35.215892
    },
    {
        "adcode": 410801,
        "city": "河南省焦作市市辖区",
        "longitude": 113.241823,
        "latitude": 35.215892
    },
    {
        "adcode": 410802,
        "city": "河南省焦作市解放区",
        "longitude": 113.230817,
        "latitude": 35.240282
    },
    {
        "adcode": 410803,
        "city": "河南省焦作市中站区",
        "longitude": 113.182946,
        "latitude": 35.23682
    },
    {
        "adcode": 410804,
        "city": "河南省焦作市马村区",
        "longitude": 113.322332,
        "latitude": 35.256108
    },
    {
        "adcode": 410811,
        "city": "河南省焦作市山阳区",
        "longitude": 113.254881,
        "latitude": 35.214507
    },
    {
        "adcode": 410821,
        "city": "河南省焦作市修武县",
        "longitude": 113.447755,
        "latitude": 35.223514
    },
    {
        "adcode": 410822,
        "city": "河南省焦作市博爱县",
        "longitude": 113.069211,
        "latitude": 35.166061
    },
    {
        "adcode": 410823,
        "city": "河南省焦作市武陟县",
        "longitude": 113.401679,
        "latitude": 35.099378
    },
    {
        "adcode": 410825,
        "city": "河南省焦作市温县",
        "longitude": 113.08053,
        "latitude": 34.940189
    },
    {
        "adcode": 410882,
        "city": "河南省焦作市沁阳市",
        "longitude": 112.943069,
        "latitude": 35.090604
    },
    {
        "adcode": 410883,
        "city": "河南省焦作市孟州市",
        "longitude": 112.789612,
        "latitude": 34.90797
    },
    {
        "adcode": 410900,
        "city": "河南省濮阳市",
        "longitude": 115.029215,
        "latitude": 35.761829
    },
    {
        "adcode": 410901,
        "city": "河南省濮阳市市辖区",
        "longitude": 115.029215,
        "latitude": 35.761829
    },
    {
        "adcode": 410902,
        "city": "河南省濮阳市华龙区",
        "longitude": 115.074151,
        "latitude": 35.777346
    },
    {
        "adcode": 410922,
        "city": "河南省濮阳市清丰县",
        "longitude": 115.104389,
        "latitude": 35.88518
    },
    {
        "adcode": 410923,
        "city": "河南省濮阳市南乐县",
        "longitude": 115.204752,
        "latitude": 36.069664
    },
    {
        "adcode": 410926,
        "city": "河南省濮阳市范县",
        "longitude": 115.504201,
        "latitude": 35.851907
    },
    {
        "adcode": 410927,
        "city": "河南省濮阳市台前县",
        "longitude": 115.871906,
        "latitude": 35.96939
    },
    {
        "adcode": 410928,
        "city": "河南省濮阳市濮阳县",
        "longitude": 115.029078,
        "latitude": 35.712193
    },
    {
        "adcode": 411000,
        "city": "河南省许昌市",
        "longitude": 113.85264,
        "latitude": 34.035506
    },
    {
        "adcode": 411001,
        "city": "河南省许昌市市辖区",
        "longitude": 113.85264,
        "latitude": 34.035506
    },
    {
        "adcode": 411002,
        "city": "河南省许昌市魏都区",
        "longitude": 113.822647,
        "latitude": 34.025342
    },
    {
        "adcode": 411003,
        "city": "河南省许昌市建安区",
        "longitude": 113.822989,
        "latitude": 34.124669
    },
    {
        "adcode": 411024,
        "city": "河南省许昌市鄢陵县",
        "longitude": 114.1774,
        "latitude": 34.102332
    },
    {
        "adcode": 411025,
        "city": "河南省许昌市襄城县",
        "longitude": 113.488847,
        "latitude": 33.866442
    },
    {
        "adcode": 411081,
        "city": "河南省许昌市禹州市",
        "longitude": 113.488478,
        "latitude": 34.140701
    },
    {
        "adcode": 411082,
        "city": "河南省许昌市长葛市",
        "longitude": 113.819888,
        "latitude": 34.194136
    },
    {
        "adcode": 411100,
        "city": "河南省漯河市",
        "longitude": 114.016539,
        "latitude": 33.581412
    },
    {
        "adcode": 411101,
        "city": "河南省漯河市市辖区",
        "longitude": 114.016539,
        "latitude": 33.581412
    },
    {
        "adcode": 411102,
        "city": "河南省漯河市源汇区",
        "longitude": 113.91071,
        "latitude": 33.58219
    },
    {
        "adcode": 411103,
        "city": "河南省漯河市郾城区",
        "longitude": 114.006944,
        "latitude": 33.587409
    },
    {
        "adcode": 411104,
        "city": "河南省漯河市召陵区",
        "longitude": 114.093902,
        "latitude": 33.586565
    },
    {
        "adcode": 411121,
        "city": "河南省漯河市舞阳县",
        "longitude": 113.609286,
        "latitude": 33.437877
    },
    {
        "adcode": 411122,
        "city": "河南省漯河市临颍县",
        "longitude": 113.931203,
        "latitude": 33.827304
    },
    {
        "adcode": 411200,
        "city": "河南省三门峡市",
        "longitude": 111.200135,
        "latitude": 34.772493
    },
    {
        "adcode": 411201,
        "city": "河南省三门峡市市辖区",
        "longitude": 111.200135,
        "latitude": 34.772493
    },
    {
        "adcode": 411202,
        "city": "河南省三门峡市湖滨区",
        "longitude": 111.188398,
        "latitude": 34.770886
    },
    {
        "adcode": 411203,
        "city": "河南省三门峡市陕州区",
        "longitude": 111.103563,
        "latitude": 34.720548
    },
    {
        "adcode": 411221,
        "city": "河南省三门峡市渑池县",
        "longitude": 111.761504,
        "latitude": 34.767244
    },
    {
        "adcode": 411224,
        "city": "河南省三门峡市卢氏县",
        "longitude": 111.047858,
        "latitude": 34.054324
    },
    {
        "adcode": 411281,
        "city": "河南省三门峡市义马市",
        "longitude": 111.874393,
        "latitude": 34.747129
    },
    {
        "adcode": 411282,
        "city": "河南省三门峡市灵宝市",
        "longitude": 110.89422,
        "latitude": 34.516828
    },
    {
        "adcode": 411300,
        "city": "河南省南阳市",
        "longitude": 112.528321,
        "latitude": 32.990833
    },
    {
        "adcode": 411301,
        "city": "河南省南阳市市辖区",
        "longitude": 112.528321,
        "latitude": 32.990833
    },
    {
        "adcode": 411302,
        "city": "河南省南阳市宛城区",
        "longitude": 112.539559,
        "latitude": 33.003784
    },
    {
        "adcode": 411303,
        "city": "河南省南阳市卧龙区",
        "longitude": 112.528789,
        "latitude": 32.989877
    },
    {
        "adcode": 411321,
        "city": "河南省南阳市南召县",
        "longitude": 112.429133,
        "latitude": 33.489877
    },
    {
        "adcode": 411322,
        "city": "河南省南阳市方城县",
        "longitude": 113.012494,
        "latitude": 33.254391
    },
    {
        "adcode": 411323,
        "city": "河南省南阳市西峡县",
        "longitude": 111.47353,
        "latitude": 33.307294
    },
    {
        "adcode": 411324,
        "city": "河南省南阳市镇平县",
        "longitude": 112.234698,
        "latitude": 33.034111
    },
    {
        "adcode": 411325,
        "city": "河南省南阳市内乡县",
        "longitude": 111.849392,
        "latitude": 33.044865
    },
    {
        "adcode": 411326,
        "city": "河南省南阳市淅川县",
        "longitude": 111.490964,
        "latitude": 33.13782
    },
    {
        "adcode": 411327,
        "city": "河南省南阳市社旗县",
        "longitude": 112.948245,
        "latitude": 33.056109
    },
    {
        "adcode": 411328,
        "city": "河南省南阳市唐河县",
        "longitude": 112.807637,
        "latitude": 32.681335
    },
    {
        "adcode": 411329,
        "city": "河南省南阳市新野县",
        "longitude": 112.360026,
        "latitude": 32.520805
    },
    {
        "adcode": 411330,
        "city": "河南省南阳市桐柏县",
        "longitude": 113.428287,
        "latitude": 32.380073
    },
    {
        "adcode": 411381,
        "city": "河南省南阳市邓州市",
        "longitude": 112.087278,
        "latitude": 32.687938
    },
    {
        "adcode": 411400,
        "city": "河南省商丘市",
        "longitude": 115.65637,
        "latitude": 34.414172
    },
    {
        "adcode": 411401,
        "city": "河南省商丘市市辖区",
        "longitude": 115.65637,
        "latitude": 34.414172
    },
    {
        "adcode": 411402,
        "city": "河南省商丘市梁园区",
        "longitude": 115.613965,
        "latitude": 34.443893
    },
    {
        "adcode": 411403,
        "city": "河南省商丘市睢阳区",
        "longitude": 115.653302,
        "latitude": 34.38839
    },
    {
        "adcode": 411421,
        "city": "河南省商丘市民权县",
        "longitude": 115.179594,
        "latitude": 34.647758
    },
    {
        "adcode": 411422,
        "city": "河南省商丘市睢县",
        "longitude": 115.071879,
        "latitude": 34.445656
    },
    {
        "adcode": 411423,
        "city": "河南省商丘市宁陵县",
        "longitude": 115.31369,
        "latitude": 34.460232
    },
    {
        "adcode": 411424,
        "city": "河南省商丘市柘城县",
        "longitude": 115.305843,
        "latitude": 34.091045
    },
    {
        "adcode": 411425,
        "city": "河南省商丘市虞城县",
        "longitude": 115.840511,
        "latitude": 34.402512
    },
    {
        "adcode": 411426,
        "city": "河南省商丘市夏邑县",
        "longitude": 116.131447,
        "latitude": 34.237554
    },
    {
        "adcode": 411481,
        "city": "河南省商丘市永城市",
        "longitude": 116.4495,
        "latitude": 33.929291
    },
    {
        "adcode": 411500,
        "city": "河南省信阳市",
        "longitude": 114.091023,
        "latitude": 32.146983
    },
    {
        "adcode": 411501,
        "city": "河南省信阳市市辖区",
        "longitude": 114.091023,
        "latitude": 32.146983
    },
    {
        "adcode": 411502,
        "city": "河南省信阳市浉河区",
        "longitude": 114.058713,
        "latitude": 32.116803
    },
    {
        "adcode": 411503,
        "city": "河南省信阳市平桥区",
        "longitude": 114.125656,
        "latitude": 32.101031
    },
    {
        "adcode": 411521,
        "city": "河南省信阳市罗山县",
        "longitude": 114.513012,
        "latitude": 32.203073
    },
    {
        "adcode": 411522,
        "city": "河南省信阳市光山县",
        "longitude": 114.919033,
        "latitude": 32.011103
    },
    {
        "adcode": 411523,
        "city": "河南省信阳市新县",
        "longitude": 114.879239,
        "latitude": 31.643918
    },
    {
        "adcode": 411524,
        "city": "河南省信阳市商城县",
        "longitude": 115.406862,
        "latitude": 31.798378
    },
    {
        "adcode": 411525,
        "city": "河南省信阳市固始县",
        "longitude": 115.654482,
        "latitude": 32.168137
    },
    {
        "adcode": 411526,
        "city": "河南省信阳市潢川县",
        "longitude": 115.051808,
        "latitude": 32.131383
    },
    {
        "adcode": 411527,
        "city": "河南省信阳市淮滨县",
        "longitude": 115.419538,
        "latitude": 32.473258
    },
    {
        "adcode": 411528,
        "city": "河南省信阳市息县",
        "longitude": 114.740456,
        "latitude": 32.342792
    },
    {
        "adcode": 411600,
        "city": "河南省周口市",
        "longitude": 114.696951,
        "latitude": 33.626149
    },
    {
        "adcode": 411601,
        "city": "河南省周口市市辖区",
        "longitude": 114.696951,
        "latitude": 33.626149
    },
    {
        "adcode": 411602,
        "city": "河南省周口市川汇区",
        "longitude": 114.650628,
        "latitude": 33.647598
    },
    {
        "adcode": 411621,
        "city": "河南省周口市扶沟县",
        "longitude": 114.394915,
        "latitude": 34.059862
    },
    {
        "adcode": 411622,
        "city": "河南省周口市西华县",
        "longitude": 114.425451,
        "latitude": 33.808682
    },
    {
        "adcode": 411623,
        "city": "河南省周口市商水县",
        "longitude": 114.611596,
        "latitude": 33.54248
    },
    {
        "adcode": 411624,
        "city": "河南省周口市沈丘县",
        "longitude": 115.098583,
        "latitude": 33.409369
    },
    {
        "adcode": 411625,
        "city": "河南省周口市郸城县",
        "longitude": 115.177189,
        "latitude": 33.644743
    },
    {
        "adcode": 411626,
        "city": "河南省周口市淮阳县",
        "longitude": 114.886154,
        "latitude": 33.731561
    },
    {
        "adcode": 411627,
        "city": "河南省周口市太康县",
        "longitude": 114.837887,
        "latitude": 34.063798
    },
    {
        "adcode": 411628,
        "city": "河南省周口市鹿邑县",
        "longitude": 115.484454,
        "latitude": 33.86
    },
    {
        "adcode": 411681,
        "city": "河南省周口市项城市",
        "longitude": 114.875333,
        "latitude": 33.465838
    },
    {
        "adcode": 411700,
        "city": "河南省驻马店市",
        "longitude": 114.022298,
        "latitude": 33.011529
    },
    {
        "adcode": 411701,
        "city": "河南省驻马店市市辖区",
        "longitude": 114.022298,
        "latitude": 33.011529
    },
    {
        "adcode": 411702,
        "city": "河南省驻马店市驿城区",
        "longitude": 113.993914,
        "latitude": 32.973054
    },
    {
        "adcode": 411721,
        "city": "河南省驻马店市西平县",
        "longitude": 114.021539,
        "latitude": 33.387685
    },
    {
        "adcode": 411722,
        "city": "河南省驻马店市上蔡县",
        "longitude": 114.264381,
        "latitude": 33.262439
    },
    {
        "adcode": 411723,
        "city": "河南省驻马店市平舆县",
        "longitude": 114.619159,
        "latitude": 32.96271
    },
    {
        "adcode": 411724,
        "city": "河南省驻马店市正阳县",
        "longitude": 114.392774,
        "latitude": 32.605697
    },
    {
        "adcode": 411725,
        "city": "河南省驻马店市确山县",
        "longitude": 114.02643,
        "latitude": 32.802065
    },
    {
        "adcode": 411726,
        "city": "河南省驻马店市泌阳县",
        "longitude": 113.327144,
        "latitude": 32.723975
    },
    {
        "adcode": 411727,
        "city": "河南省驻马店市汝南县",
        "longitude": 114.362379,
        "latitude": 33.006729
    },
    {
        "adcode": 411728,
        "city": "河南省驻马店市遂平县",
        "longitude": 114.013182,
        "latitude": 33.145649
    },
    {
        "adcode": 411729,
        "city": "河南省驻马店市新蔡县",
        "longitude": 114.920983,
        "latitude": 32.81148
    },
    {
        "adcode": 419001,
        "city": "河南省济源市",
        "longitude": 112.602344,
        "latitude": 35.06903
    },
    {
        "adcode": 420000,
        "city": "湖北省",
        "longitude": 114.341861,
        "latitude": 30.546498
    },
    {
        "adcode": 420100,
        "city": "湖北省武汉市",
        "longitude": 114.305392,
        "latitude": 30.593098
    },
    {
        "adcode": 420101,
        "city": "湖北省武汉市市辖区",
        "longitude": 114.305392,
        "latitude": 30.593098
    },
    {
        "adcode": 420102,
        "city": "湖北省武汉市江岸区",
        "longitude": 114.27876,
        "latitude": 30.592688
    },
    {
        "adcode": 420103,
        "city": "湖北省武汉市江汉区",
        "longitude": 114.270871,
        "latitude": 30.60143
    },
    {
        "adcode": 420104,
        "city": "湖北省武汉市硚口区",
        "longitude": 114.26583,
        "latitude": 30.571236
    },
    {
        "adcode": 420105,
        "city": "湖北省武汉市汉阳区",
        "longitude": 114.218724,
        "latitude": 30.553905
    },
    {
        "adcode": 420106,
        "city": "湖北省武汉市武昌区",
        "longitude": 114.316223,
        "latitude": 30.554235
    },
    {
        "adcode": 420107,
        "city": "湖北省武汉市青山区",
        "longitude": 114.385539,
        "latitude": 30.63963
    },
    {
        "adcode": 420111,
        "city": "湖北省武汉市洪山区",
        "longitude": 114.343913,
        "latitude": 30.500317
    },
    {
        "adcode": 420112,
        "city": "湖北省武汉市东西湖区",
        "longitude": 114.136886,
        "latitude": 30.62002
    },
    {
        "adcode": 420113,
        "city": "湖北省武汉市汉南区",
        "longitude": 114.084445,
        "latitude": 30.308856
    },
    {
        "adcode": 420114,
        "city": "湖北省武汉市蔡甸区",
        "longitude": 114.029328,
        "latitude": 30.582271
    },
    {
        "adcode": 420115,
        "city": "湖北省武汉市江夏区",
        "longitude": 114.321551,
        "latitude": 30.375748
    },
    {
        "adcode": 420116,
        "city": "湖北省武汉市黄陂区",
        "longitude": 114.375743,
        "latitude": 30.882557
    },
    {
        "adcode": 420117,
        "city": "湖北省武汉市新洲区",
        "longitude": 114.801107,
        "latitude": 30.841544
    },
    {
        "adcode": 420200,
        "city": "湖北省黄石市",
        "longitude": 115.03852,
        "latitude": 30.199652
    },
    {
        "adcode": 420201,
        "city": "湖北省黄石市市辖区",
        "longitude": 115.03852,
        "latitude": 30.199652
    },
    {
        "adcode": 420202,
        "city": "湖北省黄石市黄石港区",
        "longitude": 115.065978,
        "latitude": 30.223003
    },
    {
        "adcode": 420203,
        "city": "湖北省黄石市西塞山区",
        "longitude": 115.109955,
        "latitude": 30.204924
    },
    {
        "adcode": 420204,
        "city": "湖北省黄石市下陆区",
        "longitude": 114.961327,
        "latitude": 30.173913
    },
    {
        "adcode": 420205,
        "city": "湖北省黄石市铁山区",
        "longitude": 114.901412,
        "latitude": 30.206592
    },
    {
        "adcode": 420222,
        "city": "湖北省黄石市阳新县",
        "longitude": 115.215227,
        "latitude": 29.830258
    },
    {
        "adcode": 420281,
        "city": "湖北省黄石市大冶市",
        "longitude": 114.979875,
        "latitude": 30.095643
    },
    {
        "adcode": 420300,
        "city": "湖北省十堰市",
        "longitude": 110.79799,
        "latitude": 32.629397
    },
    {
        "adcode": 420301,
        "city": "湖北省十堰市市辖区",
        "longitude": 110.79799,
        "latitude": 32.629397
    },
    {
        "adcode": 420302,
        "city": "湖北省十堰市茅箭区",
        "longitude": 110.813621,
        "latitude": 32.591929
    },
    {
        "adcode": 420303,
        "city": "湖北省十堰市张湾区",
        "longitude": 110.769133,
        "latitude": 32.652297
    },
    {
        "adcode": 420304,
        "city": "湖北省十堰市郧阳区",
        "longitude": 110.812044,
        "latitude": 32.834802
    },
    {
        "adcode": 420322,
        "city": "湖北省十堰市郧西县",
        "longitude": 110.425983,
        "latitude": 32.993182
    },
    {
        "adcode": 420323,
        "city": "湖北省十堰市竹山县",
        "longitude": 110.228694,
        "latitude": 32.224875
    },
    {
        "adcode": 420324,
        "city": "湖北省十堰市竹溪县",
        "longitude": 109.715304,
        "latitude": 32.318255
    },
    {
        "adcode": 420325,
        "city": "湖北省十堰市房县",
        "longitude": 110.72667,
        "latitude": 32.040085
    },
    {
        "adcode": 420381,
        "city": "湖北省十堰市丹江口市",
        "longitude": 111.513127,
        "latitude": 32.540157
    },
    {
        "adcode": 420500,
        "city": "湖北省宜昌市",
        "longitude": 111.286471,
        "latitude": 30.691967
    },
    {
        "adcode": 420501,
        "city": "湖北省宜昌市市辖区",
        "longitude": 111.286471,
        "latitude": 30.691967
    },
    {
        "adcode": 420502,
        "city": "湖北省宜昌市西陵区",
        "longitude": 111.285646,
        "latitude": 30.710782
    },
    {
        "adcode": 420503,
        "city": "湖北省宜昌市伍家岗区",
        "longitude": 111.361037,
        "latitude": 30.644334
    },
    {
        "adcode": 420504,
        "city": "湖北省宜昌市点军区",
        "longitude": 111.26812,
        "latitude": 30.693247
    },
    {
        "adcode": 420505,
        "city": "湖北省宜昌市猇亭区",
        "longitude": 111.43462,
        "latitude": 30.530903
    },
    {
        "adcode": 420506,
        "city": "湖北省宜昌市夷陵区",
        "longitude": 111.32638,
        "latitude": 30.770006
    },
    {
        "adcode": 420525,
        "city": "湖北省宜昌市远安县",
        "longitude": 111.640508,
        "latitude": 31.060869
    },
    {
        "adcode": 420526,
        "city": "湖北省宜昌市兴山县",
        "longitude": 110.746805,
        "latitude": 31.348196
    },
    {
        "adcode": 420527,
        "city": "湖北省宜昌市秭归县",
        "longitude": 110.977711,
        "latitude": 30.825897
    },
    {
        "adcode": 420528,
        "city": "湖北省宜昌市长阳土家族自治县",
        "longitude": 111.207242,
        "latitude": 30.472763
    },
    {
        "adcode": 420529,
        "city": "湖北省宜昌市五峰土家族自治县",
        "longitude": 110.674706,
        "latitude": 30.199688
    },
    {
        "adcode": 420581,
        "city": "湖北省宜昌市宜都市",
        "longitude": 111.450006,
        "latitude": 30.378327
    },
    {
        "adcode": 420582,
        "city": "湖北省宜昌市当阳市",
        "longitude": 111.788312,
        "latitude": 30.821266
    },
    {
        "adcode": 420583,
        "city": "湖北省宜昌市枝江市",
        "longitude": 111.76053,
        "latitude": 30.42594
    },
    {
        "adcode": 420600,
        "city": "湖北省襄阳市",
        "longitude": 112.122414,
        "latitude": 32.008986
    },
    {
        "adcode": 420601,
        "city": "湖北省襄阳市市辖区",
        "longitude": 112.122414,
        "latitude": 32.008986
    },
    {
        "adcode": 420602,
        "city": "湖北省襄阳市襄城区",
        "longitude": 112.133974,
        "latitude": 32.010351
    },
    {
        "adcode": 420606,
        "city": "湖北省襄阳市樊城区",
        "longitude": 112.135684,
        "latitude": 32.044833
    },
    {
        "adcode": 420607,
        "city": "湖北省襄阳市襄州区",
        "longitude": 112.211899,
        "latitude": 32.087298
    },
    {
        "adcode": 420624,
        "city": "湖北省襄阳市南漳县",
        "longitude": 111.838905,
        "latitude": 31.774636
    },
    {
        "adcode": 420625,
        "city": "湖北省襄阳市谷城县",
        "longitude": 111.652982,
        "latitude": 32.263849
    },
    {
        "adcode": 420626,
        "city": "湖北省襄阳市保康县",
        "longitude": 111.261309,
        "latitude": 31.87831
    },
    {
        "adcode": 420682,
        "city": "湖北省襄阳市老河口市",
        "longitude": 111.683861,
        "latitude": 32.359068
    },
    {
        "adcode": 420683,
        "city": "湖北省襄阳市枣阳市",
        "longitude": 112.771959,
        "latitude": 32.128818
    },
    {
        "adcode": 420684,
        "city": "湖北省襄阳市宜城市",
        "longitude": 112.257788,
        "latitude": 31.719806
    },
    {
        "adcode": 420700,
        "city": "湖北省鄂州市",
        "longitude": 114.894843,
        "latitude": 30.39194
    },
    {
        "adcode": 420701,
        "city": "湖北省鄂州市市辖区",
        "longitude": 114.894843,
        "latitude": 30.39194
    },
    {
        "adcode": 420702,
        "city": "湖北省鄂州市梁子湖区",
        "longitude": 114.684731,
        "latitude": 30.100141
    },
    {
        "adcode": 420703,
        "city": "湖北省鄂州市华容区",
        "longitude": 114.729878,
        "latitude": 30.53431
    },
    {
        "adcode": 420704,
        "city": "湖北省鄂州市鄂城区",
        "longitude": 114.891615,
        "latitude": 30.400572
    },
    {
        "adcode": 420800,
        "city": "湖北省荆门市",
        "longitude": 112.199265,
        "latitude": 31.035423
    },
    {
        "adcode": 420801,
        "city": "湖北省荆门市市辖区",
        "longitude": 112.199265,
        "latitude": 31.035423
    },
    {
        "adcode": 420802,
        "city": "湖北省荆门市东宝区",
        "longitude": 112.201493,
        "latitude": 31.051852
    },
    {
        "adcode": 420804,
        "city": "湖北省荆门市掇刀区",
        "longitude": 112.207833,
        "latitude": 30.973431
    },
    {
        "adcode": 420822,
        "city": "湖北省荆门市沙洋县",
        "longitude": 112.588581,
        "latitude": 30.709221
    },
    {
        "adcode": 420881,
        "city": "湖北省荆门市钟祥市",
        "longitude": 112.588121,
        "latitude": 31.16782
    },
    {
        "adcode": 420882,
        "city": "湖北省荆门市京山县京山",
        "longitude": 113.119566,
        "latitude": 31.018457
    },
    {
        "adcode": 420900,
        "city": "湖北省孝感市",
        "longitude": 113.916902,
        "latitude": 30.924568
    },
    {
        "adcode": 420901,
        "city": "湖北省孝感市市辖区",
        "longitude": 113.916902,
        "latitude": 30.924568
    },
    {
        "adcode": 420902,
        "city": "湖北省孝感市孝南区",
        "longitude": 113.910958,
        "latitude": 30.916874
    },
    {
        "adcode": 420921,
        "city": "湖北省孝感市孝昌县",
        "longitude": 113.99801,
        "latitude": 31.258159
    },
    {
        "adcode": 420922,
        "city": "湖北省孝感市大悟县",
        "longitude": 114.127022,
        "latitude": 31.561165
    },
    {
        "adcode": 420923,
        "city": "湖北省孝感市云梦县",
        "longitude": 113.753554,
        "latitude": 31.020983
    },
    {
        "adcode": 420981,
        "city": "湖北省孝感市应城市",
        "longitude": 113.562806,
        "latitude": 30.940176
    },
    {
        "adcode": 420982,
        "city": "湖北省孝感市安陆市",
        "longitude": 113.688941,
        "latitude": 31.25561
    },
    {
        "adcode": 420984,
        "city": "湖北省孝感市汉川市",
        "longitude": 113.839149,
        "latitude": 30.661244
    },
    {
        "adcode": 421000,
        "city": "湖北省荆州市",
        "longitude": 112.239741,
        "latitude": 30.335165
    },
    {
        "adcode": 421001,
        "city": "湖北省荆州市市辖区",
        "longitude": 112.239741,
        "latitude": 30.335165
    },
    {
        "adcode": 421002,
        "city": "湖北省荆州市沙市区",
        "longitude": 112.255583,
        "latitude": 30.311056
    },
    {
        "adcode": 421003,
        "city": "湖北省荆州市荆州区",
        "longitude": 112.190185,
        "latitude": 30.352832
    },
    {
        "adcode": 421022,
        "city": "湖北省荆州市公安县",
        "longitude": 112.229648,
        "latitude": 30.058336
    },
    {
        "adcode": 421023,
        "city": "湖北省荆州市监利县",
        "longitude": 112.897465,
        "latitude": 29.811574
    },
    {
        "adcode": 421024,
        "city": "湖北省荆州市江陵县",
        "longitude": 112.424664,
        "latitude": 30.041822
    },
    {
        "adcode": 421081,
        "city": "湖北省荆州市石首市",
        "longitude": 112.425454,
        "latitude": 29.720938
    },
    {
        "adcode": 421083,
        "city": "湖北省荆州市洪湖市",
        "longitude": 113.47598,
        "latitude": 29.825458
    },
    {
        "adcode": 421087,
        "city": "湖北省荆州市松滋市",
        "longitude": 111.756773,
        "latitude": 30.174522
    },
    {
        "adcode": 421100,
        "city": "湖北省黄冈市",
        "longitude": 114.872316,
        "latitude": 30.453905
    },
    {
        "adcode": 421101,
        "city": "湖北省黄冈市市辖区",
        "longitude": 114.872316,
        "latitude": 30.453905
    },
    {
        "adcode": 421102,
        "city": "湖北省黄冈市黄州区",
        "longitude": 114.879398,
        "latitude": 30.43405
    },
    {
        "adcode": 421121,
        "city": "湖北省黄冈市团风县",
        "longitude": 114.872191,
        "latitude": 30.643569
    },
    {
        "adcode": 421122,
        "city": "湖北省黄冈市红安县",
        "longitude": 114.618236,
        "latitude": 31.288153
    },
    {
        "adcode": 421123,
        "city": "湖北省黄冈市罗田县",
        "longitude": 115.399492,
        "latitude": 30.7831
    },
    {
        "adcode": 421124,
        "city": "湖北省黄冈市英山县",
        "longitude": 115.681259,
        "latitude": 30.734959
    },
    {
        "adcode": 421125,
        "city": "湖北省黄冈市浠水县",
        "longitude": 115.265535,
        "latitude": 30.451867
    },
    {
        "adcode": 421126,
        "city": "湖北省黄冈市蕲春县",
        "longitude": 115.437008,
        "latitude": 30.225964
    },
    {
        "adcode": 421127,
        "city": "湖北省黄冈市黄梅县",
        "longitude": 115.944219,
        "latitude": 30.070454
    },
    {
        "adcode": 421181,
        "city": "湖北省黄冈市麻城市",
        "longitude": 115.008163,
        "latitude": 31.17274
    },
    {
        "adcode": 421182,
        "city": "湖北省黄冈市武穴市",
        "longitude": 115.561217,
        "latitude": 29.844107
    },
    {
        "adcode": 421200,
        "city": "湖北省咸宁市",
        "longitude": 114.322492,
        "latitude": 29.841443
    },
    {
        "adcode": 421201,
        "city": "湖北省咸宁市市辖区",
        "longitude": 114.322492,
        "latitude": 29.841443
    },
    {
        "adcode": 421202,
        "city": "湖北省咸宁市咸安区",
        "longitude": 114.298711,
        "latitude": 29.852892
    },
    {
        "adcode": 421221,
        "city": "湖北省咸宁市嘉鱼县",
        "longitude": 113.939277,
        "latitude": 29.970737
    },
    {
        "adcode": 421222,
        "city": "湖北省咸宁市通城县",
        "longitude": 113.816966,
        "latitude": 29.245269
    },
    {
        "adcode": 421223,
        "city": "湖北省咸宁市崇阳县",
        "longitude": 114.039828,
        "latitude": 29.555605
    },
    {
        "adcode": 421224,
        "city": "湖北省咸宁市通山县",
        "longitude": 114.482606,
        "latitude": 29.605376
    },
    {
        "adcode": 421281,
        "city": "湖北省咸宁市赤壁市",
        "longitude": 113.900628,
        "latitude": 29.724692
    },
    {
        "adcode": 421300,
        "city": "湖北省随州市",
        "longitude": 113.382458,
        "latitude": 31.690215
    },
    {
        "adcode": 421301,
        "city": "湖北省随州市市辖区",
        "longitude": 113.382458,
        "latitude": 31.690215
    },
    {
        "adcode": 421303,
        "city": "湖北省随州市曾都区",
        "longitude": 113.371121,
        "latitude": 31.71628
    },
    {
        "adcode": 421321,
        "city": "湖北省随州市随县",
        "longitude": 113.299528,
        "latitude": 31.853833
    },
    {
        "adcode": 421381,
        "city": "湖北省随州市广水市",
        "longitude": 113.82589,
        "latitude": 31.616854
    },
    {
        "adcode": 422800,
        "city": "湖北省恩施土家族苗族自治州",
        "longitude": 109.488172,
        "latitude": 30.272156
    },
    {
        "adcode": 422801,
        "city": "湖北省恩施土家族苗族自治州",
        "longitude": 109.488172,
        "latitude": 30.272156
    },
    {
        "adcode": 422802,
        "city": "湖北省恩施土家族苗族自治州利川市",
        "longitude": 108.909996,
        "latitude": 30.210981
    },
    {
        "adcode": 422822,
        "city": "湖北省恩施土家族苗族自治州建始县",
        "longitude": 109.718202,
        "latitude": 30.596727
    },
    {
        "adcode": 422823,
        "city": "湖北省恩施土家族苗族自治州巴东县",
        "longitude": 110.340756,
        "latitude": 31.042324
    },
    {
        "adcode": 422825,
        "city": "湖北省恩施土家族苗族自治州宣恩县",
        "longitude": 109.491485,
        "latitude": 29.986899
    },
    {
        "adcode": 422826,
        "city": "湖北省恩施土家族苗族自治州咸丰县",
        "longitude": 109.139726,
        "latitude": 29.665203
    },
    {
        "adcode": 422827,
        "city": "湖北省恩施土家族苗族自治州来凤县",
        "longitude": 109.407828,
        "latitude": 29.493485
    },
    {
        "adcode": 422828,
        "city": "湖北省恩施土家族苗族自治州鹤峰县",
        "longitude": 110.033662,
        "latitude": 29.890171
    },
    {
        "adcode": 429004,
        "city": "湖北省仙桃市",
        "longitude": 113.442973,
        "latitude": 30.328407
    },
    {
        "adcode": 429005,
        "city": "湖北省潜江市",
        "longitude": 112.900287,
        "latitude": 30.401947
    },
    {
        "adcode": 429006,
        "city": "湖北省天门市",
        "longitude": 113.166558,
        "latitude": 30.66372
    },
    {
        "adcode": 429021,
        "city": "湖北省神农架林区",
        "longitude": 110.675757,
        "latitude": 31.744897
    },
    {
        "adcode": 430000,
        "city": "湖南省",
        "longitude": 112.98381,
        "latitude": 28.112444
    },
    {
        "adcode": 430100,
        "city": "湖南省长沙市",
        "longitude": 112.938814,
        "latitude": 28.228209
    },
    {
        "adcode": 430101,
        "city": "湖南省长沙市市辖区",
        "longitude": 112.938814,
        "latitude": 28.228209
    },
    {
        "adcode": 430102,
        "city": "湖南省长沙市芙蓉区",
        "longitude": 113.032539,
        "latitude": 28.185386
    },
    {
        "adcode": 430103,
        "city": "湖南省长沙市天心区",
        "longitude": 112.9962,
        "latitude": 28.14447
    },
    {
        "adcode": 430104,
        "city": "湖南省长沙市岳麓区",
        "longitude": 112.93142,
        "latitude": 28.235193
    },
    {
        "adcode": 430105,
        "city": "湖南省长沙市开福区",
        "longitude": 112.9842,
        "latitude": 28.205628
    },
    {
        "adcode": 430111,
        "city": "湖南省长沙市雨花区",
        "longitude": 113.038017,
        "latitude": 28.13771
    },
    {
        "adcode": 430112,
        "city": "湖南省长沙市望城区",
        "longitude": 112.819549,
        "latitude": 28.347458
    },
    {
        "adcode": 430121,
        "city": "湖南省长沙市长沙县",
        "longitude": 113.08081,
        "latitude": 28.24615
    },
    {
        "adcode": 430181,
        "city": "湖南省长沙市浏阳市",
        "longitude": 113.643076,
        "latitude": 28.162833
    },
    {
        "adcode": 430182,
        "city": "湖南省长沙市宁乡市",
        "longitude": 112.551885,
        "latitude": 28.277483
    },
    {
        "adcode": 430200,
        "city": "湖南省株洲市",
        "longitude": 113.134002,
        "latitude": 27.82755
    },
    {
        "adcode": 430201,
        "city": "湖南省株洲市市辖区",
        "longitude": 113.134002,
        "latitude": 27.82755
    },
    {
        "adcode": 430202,
        "city": "湖南省株洲市荷塘区",
        "longitude": 113.173487,
        "latitude": 27.855929
    },
    {
        "adcode": 430203,
        "city": "湖南省株洲市芦淞区",
        "longitude": 113.152724,
        "latitude": 27.78507
    },
    {
        "adcode": 430204,
        "city": "湖南省株洲市石峰区",
        "longitude": 113.117732,
        "latitude": 27.875445
    },
    {
        "adcode": 430211,
        "city": "湖南省株洲市天元区",
        "longitude": 113.082216,
        "latitude": 27.826867
    },
    {
        "adcode": 430212,
        "city": "湖南省株洲市株洲县渌口",
        "longitude": 113.139967,
        "latitude": 27.702526
    },
    {
        "adcode": 430223,
        "city": "湖南省株洲市攸县",
        "longitude": 113.396404,
        "latitude": 27.014607
    },
    {
        "adcode": 430224,
        "city": "湖南省株洲市茶陵县",
        "longitude": 113.53928,
        "latitude": 26.777492
    },
    {
        "adcode": 430225,
        "city": "湖南省株洲市炎陵县",
        "longitude": 113.772655,
        "latitude": 26.489902
    },
    {
        "adcode": 430281,
        "city": "湖南省株洲市醴陵市",
        "longitude": 113.496894,
        "latitude": 27.64613
    },
    {
        "adcode": 430300,
        "city": "湖南省湘潭市",
        "longitude": 112.944049,
        "latitude": 27.829738
    },
    {
        "adcode": 430301,
        "city": "湖南省湘潭市市辖区",
        "longitude": 112.944049,
        "latitude": 27.829738
    },
    {
        "adcode": 430302,
        "city": "湖南省湘潭市雨湖区",
        "longitude": 112.903317,
        "latitude": 27.854705
    },
    {
        "adcode": 430304,
        "city": "湖南省湘潭市岳塘区",
        "longitude": 112.925371,
        "latitude": 27.808646
    },
    {
        "adcode": 430321,
        "city": "湖南省湘潭市湘潭县",
        "longitude": 112.950781,
        "latitude": 27.778947
    },
    {
        "adcode": 430381,
        "city": "湖南省湘潭市湘乡市",
        "longitude": 112.550581,
        "latitude": 27.718313
    },
    {
        "adcode": 430382,
        "city": "湖南省湘潭市韶山市",
        "longitude": 112.52667,
        "latitude": 27.914958
    },
    {
        "adcode": 430400,
        "city": "湖南省衡阳市",
        "longitude": 112.571997,
        "latitude": 26.89323
    },
    {
        "adcode": 430401,
        "city": "湖南省衡阳市市辖区",
        "longitude": 112.571997,
        "latitude": 26.89323
    },
    {
        "adcode": 430405,
        "city": "湖南省衡阳市珠晖区",
        "longitude": 112.620112,
        "latitude": 26.894657
    },
    {
        "adcode": 430406,
        "city": "湖南省衡阳市雁峰区",
        "longitude": 112.616546,
        "latitude": 26.888666
    },
    {
        "adcode": 430407,
        "city": "湖南省衡阳市石鼓区",
        "longitude": 112.598089,
        "latitude": 26.943215
    },
    {
        "adcode": 430408,
        "city": "湖南省衡阳市蒸湘区",
        "longitude": 112.567064,
        "latitude": 26.911404
    },
    {
        "adcode": 430412,
        "city": "湖南省衡阳市南岳区",
        "longitude": 112.738604,
        "latitude": 27.232444
    },
    {
        "adcode": 430421,
        "city": "湖南省衡阳市衡阳县",
        "longitude": 112.370532,
        "latitude": 26.969635
    },
    {
        "adcode": 430422,
        "city": "湖南省衡阳市衡南县",
        "longitude": 112.677877,
        "latitude": 26.738248
    },
    {
        "adcode": 430423,
        "city": "湖南省衡阳市衡山县",
        "longitude": 112.868268,
        "latitude": 27.230291
    },
    {
        "adcode": 430424,
        "city": "湖南省衡阳市衡东县",
        "longitude": 112.953168,
        "latitude": 27.08117
    },
    {
        "adcode": 430426,
        "city": "湖南省衡阳市祁东县",
        "longitude": 112.090357,
        "latitude": 26.799896
    },
    {
        "adcode": 430481,
        "city": "湖南省衡阳市耒阳市",
        "longitude": 112.859795,
        "latitude": 26.422275
    },
    {
        "adcode": 430482,
        "city": "湖南省衡阳市常宁市",
        "longitude": 112.399995,
        "latitude": 26.420932
    },
    {
        "adcode": 430500,
        "city": "湖南省邵阳市",
        "longitude": 111.467791,
        "latitude": 27.238892
    },
    {
        "adcode": 430501,
        "city": "湖南省邵阳市市辖区",
        "longitude": 111.467791,
        "latitude": 27.238892
    },
    {
        "adcode": 430502,
        "city": "湖南省邵阳市双清区",
        "longitude": 111.496341,
        "latitude": 27.232708
    },
    {
        "adcode": 430503,
        "city": "湖南省邵阳市大祥区",
        "longitude": 111.439091,
        "latitude": 27.221452
    },
    {
        "adcode": 430511,
        "city": "湖南省邵阳市北塔区",
        "longitude": 111.452197,
        "latitude": 27.246489
    },
    {
        "adcode": 430521,
        "city": "湖南省邵阳市邵东县",
        "longitude": 111.744258,
        "latitude": 27.258942
    },
    {
        "adcode": 430522,
        "city": "湖南省邵阳市新邵县",
        "longitude": 111.458657,
        "latitude": 27.320918
    },
    {
        "adcode": 430523,
        "city": "湖南省邵阳市邵阳县",
        "longitude": 111.273806,
        "latitude": 26.990637
    },
    {
        "adcode": 430524,
        "city": "湖南省邵阳市隆回县",
        "longitude": 111.032438,
        "latitude": 27.113978
    },
    {
        "adcode": 430525,
        "city": "湖南省邵阳市洞口县",
        "longitude": 110.575846,
        "latitude": 27.060321
    },
    {
        "adcode": 430527,
        "city": "湖南省邵阳市绥宁县",
        "longitude": 110.155655,
        "latitude": 26.581955
    },
    {
        "adcode": 430528,
        "city": "湖南省邵阳市新宁县",
        "longitude": 110.856623,
        "latitude": 26.433418
    },
    {
        "adcode": 430529,
        "city": "湖南省邵阳市城步苗族自治县",
        "longitude": 110.32224,
        "latitude": 26.390598
    },
    {
        "adcode": 430581,
        "city": "湖南省邵阳市武冈市",
        "longitude": 110.631884,
        "latitude": 26.726599
    },
    {
        "adcode": 430600,
        "city": "湖南省岳阳市",
        "longitude": 113.128958,
        "latitude": 29.357104
    },
    {
        "adcode": 430601,
        "city": "湖南省岳阳市市辖区",
        "longitude": 113.128958,
        "latitude": 29.357104
    },
    {
        "adcode": 430602,
        "city": "湖南省岳阳市岳阳楼区",
        "longitude": 113.129702,
        "latitude": 29.371903
    },
    {
        "adcode": 430603,
        "city": "湖南省岳阳市云溪区",
        "longitude": 113.272313,
        "latitude": 29.472746
    },
    {
        "adcode": 430611,
        "city": "湖南省岳阳市君山区",
        "longitude": 113.006435,
        "latitude": 29.461106
    },
    {
        "adcode": 430621,
        "city": "湖南省岳阳市岳阳县",
        "longitude": 113.116418,
        "latitude": 29.144067
    },
    {
        "adcode": 430623,
        "city": "湖南省岳阳市华容县",
        "longitude": 112.540463,
        "latitude": 29.531057
    },
    {
        "adcode": 430624,
        "city": "湖南省岳阳市湘阴县",
        "longitude": 112.909426,
        "latitude": 28.689105
    },
    {
        "adcode": 430626,
        "city": "湖南省岳阳市平江县",
        "longitude": 113.581234,
        "latitude": 28.701868
    },
    {
        "adcode": 430681,
        "city": "湖南省岳阳市汨罗市",
        "longitude": 113.067259,
        "latitude": 28.80689
    },
    {
        "adcode": 430682,
        "city": "湖南省岳阳市临湘市",
        "longitude": 113.450423,
        "latitude": 29.476849
    },
    {
        "adcode": 430700,
        "city": "湖南省常德市",
        "longitude": 111.698497,
        "latitude": 29.031673
    },
    {
        "adcode": 430701,
        "city": "湖南省常德市市辖区",
        "longitude": 111.698497,
        "latitude": 29.031673
    },
    {
        "adcode": 430702,
        "city": "湖南省常德市武陵区",
        "longitude": 111.683153,
        "latitude": 29.055163
    },
    {
        "adcode": 430703,
        "city": "湖南省常德市鼎城区",
        "longitude": 111.680783,
        "latitude": 29.018593
    },
    {
        "adcode": 430721,
        "city": "湖南省常德市安乡县",
        "longitude": 112.171131,
        "latitude": 29.411309
    },
    {
        "adcode": 430722,
        "city": "湖南省常德市汉寿县",
        "longitude": 111.970514,
        "latitude": 28.906107
    },
    {
        "adcode": 430723,
        "city": "湖南省常德市澧县",
        "longitude": 111.758702,
        "latitude": 29.633237
    },
    {
        "adcode": 430724,
        "city": "湖南省常德市临澧县",
        "longitude": 111.647518,
        "latitude": 29.440793
    },
    {
        "adcode": 430725,
        "city": "湖南省常德市桃源县",
        "longitude": 111.488925,
        "latitude": 28.902503
    },
    {
        "adcode": 430726,
        "city": "湖南省常德市石门县",
        "longitude": 111.380014,
        "latitude": 29.584293
    },
    {
        "adcode": 430781,
        "city": "湖南省常德市津市市",
        "longitude": 111.877499,
        "latitude": 29.60548
    },
    {
        "adcode": 430800,
        "city": "湖南省张家界市",
        "longitude": 110.479191,
        "latitude": 29.117096
    },
    {
        "adcode": 430801,
        "city": "湖南省张家界市市辖区",
        "longitude": 110.479191,
        "latitude": 29.117096
    },
    {
        "adcode": 430802,
        "city": "湖南省张家界市永定区",
        "longitude": 110.537138,
        "latitude": 29.119856
    },
    {
        "adcode": 430811,
        "city": "湖南省张家界市武陵源区",
        "longitude": 110.550434,
        "latitude": 29.34573
    },
    {
        "adcode": 430821,
        "city": "湖南省张家界市慈利县",
        "longitude": 111.139711,
        "latitude": 29.429972
    },
    {
        "adcode": 430822,
        "city": "湖南省张家界市桑植县",
        "longitude": 110.204911,
        "latitude": 29.414264
    },
    {
        "adcode": 430900,
        "city": "湖南省益阳市",
        "longitude": 112.35518,
        "latitude": 28.55386
    },
    {
        "adcode": 430901,
        "city": "湖南省益阳市市辖区",
        "longitude": 112.35518,
        "latitude": 28.55386
    },
    {
        "adcode": 430902,
        "city": "湖南省益阳市资阳区",
        "longitude": 112.324322,
        "latitude": 28.590966
    },
    {
        "adcode": 430903,
        "city": "湖南省益阳市赫山区",
        "longitude": 112.374024,
        "latitude": 28.579343
    },
    {
        "adcode": 430921,
        "city": "湖南省益阳市南县",
        "longitude": 112.396241,
        "latitude": 29.361338
    },
    {
        "adcode": 430922,
        "city": "湖南省益阳市桃江县",
        "longitude": 112.155822,
        "latitude": 28.518085
    },
    {
        "adcode": 430923,
        "city": "湖南省益阳市安化县",
        "longitude": 111.212846,
        "latitude": 28.374107
    },
    {
        "adcode": 430981,
        "city": "湖南省益阳市沅江市",
        "longitude": 112.354661,
        "latitude": 28.845837
    },
    {
        "adcode": 431000,
        "city": "湖南省郴州市",
        "longitude": 113.014717,
        "latitude": 25.770509
    },
    {
        "adcode": 431001,
        "city": "湖南省郴州市市辖区",
        "longitude": 113.014717,
        "latitude": 25.770509
    },
    {
        "adcode": 431002,
        "city": "湖南省郴州市北湖区",
        "longitude": 113.011035,
        "latitude": 25.784054
    },
    {
        "adcode": 431003,
        "city": "湖南省郴州市苏仙区",
        "longitude": 113.042441,
        "latitude": 25.80037
    },
    {
        "adcode": 431021,
        "city": "湖南省郴州市桂阳县",
        "longitude": 112.734176,
        "latitude": 25.754167
    },
    {
        "adcode": 431022,
        "city": "湖南省郴州市宜章县",
        "longitude": 112.948811,
        "latitude": 25.400222
    },
    {
        "adcode": 431023,
        "city": "湖南省郴州市永兴县",
        "longitude": 113.116528,
        "latitude": 26.127151
    },
    {
        "adcode": 431024,
        "city": "湖南省郴州市嘉禾县",
        "longitude": 112.369021,
        "latitude": 25.58752
    },
    {
        "adcode": 431025,
        "city": "湖南省郴州市临武县",
        "longitude": 112.563456,
        "latitude": 25.27556
    },
    {
        "adcode": 431026,
        "city": "湖南省郴州市汝城县",
        "longitude": 113.684727,
        "latitude": 25.532816
    },
    {
        "adcode": 431027,
        "city": "湖南省郴州市桂东县",
        "longitude": 113.944614,
        "latitude": 26.077616
    },
    {
        "adcode": 431028,
        "city": "湖南省郴州市安仁县",
        "longitude": 113.269396,
        "latitude": 26.709056
    },
    {
        "adcode": 431081,
        "city": "湖南省郴州市资兴市",
        "longitude": 113.236146,
        "latitude": 25.976243
    },
    {
        "adcode": 431100,
        "city": "湖南省永州市",
        "longitude": 111.613445,
        "latitude": 26.420394
    },
    {
        "adcode": 431101,
        "city": "湖南省永州市市辖区",
        "longitude": 111.613445,
        "latitude": 26.420394
    },
    {
        "adcode": 431102,
        "city": "湖南省永州市零陵区",
        "longitude": 111.631109,
        "latitude": 26.221936
    },
    {
        "adcode": 431103,
        "city": "湖南省永州市冷水滩区",
        "longitude": 111.592143,
        "latitude": 26.461077
    },
    {
        "adcode": 431121,
        "city": "湖南省永州市祁阳县",
        "longitude": 111.840657,
        "latitude": 26.58012
    },
    {
        "adcode": 431122,
        "city": "湖南省永州市东安县",
        "longitude": 111.314117,
        "latitude": 26.394404
    },
    {
        "adcode": 431123,
        "city": "湖南省永州市双牌县",
        "longitude": 111.659967,
        "latitude": 25.96191
    },
    {
        "adcode": 431124,
        "city": "湖南省永州市道县",
        "longitude": 111.600796,
        "latitude": 25.526438
    },
    {
        "adcode": 431125,
        "city": "湖南省永州市江永县",
        "longitude": 111.343911,
        "latitude": 25.273539
    },
    {
        "adcode": 431126,
        "city": "湖南省永州市宁远县",
        "longitude": 111.945805,
        "latitude": 25.570976
    },
    {
        "adcode": 431127,
        "city": "湖南省永州市蓝山县",
        "longitude": 112.196731,
        "latitude": 25.369898
    },
    {
        "adcode": 431128,
        "city": "湖南省永州市新田县",
        "longitude": 112.203287,
        "latitude": 25.904305
    },
    {
        "adcode": 431129,
        "city": "湖南省永州市江华瑶族自治县",
        "longitude": 111.579305,
        "latitude": 25.18559
    },
    {
        "adcode": 431200,
        "city": "湖南省怀化市",
        "longitude": 109.998488,
        "latitude": 27.554978
    },
    {
        "adcode": 431201,
        "city": "湖南省怀化市市辖区",
        "longitude": 109.998488,
        "latitude": 27.554978
    },
    {
        "adcode": 431202,
        "city": "湖南省怀化市鹤城区",
        "longitude": 110.040315,
        "latitude": 27.578926
    },
    {
        "adcode": 431221,
        "city": "湖南省怀化市中方县",
        "longitude": 109.944712,
        "latitude": 27.440139
    },
    {
        "adcode": 431222,
        "city": "湖南省怀化市沅陵县",
        "longitude": 110.393844,
        "latitude": 28.452686
    },
    {
        "adcode": 431223,
        "city": "湖南省怀化市辰溪县",
        "longitude": 110.183917,
        "latitude": 28.006336
    },
    {
        "adcode": 431224,
        "city": "湖南省怀化市溆浦县",
        "longitude": 110.594972,
        "latitude": 27.908316
    },
    {
        "adcode": 431225,
        "city": "湖南省怀化市会同县",
        "longitude": 109.735661,
        "latitude": 26.887239
    },
    {
        "adcode": 431226,
        "city": "湖南省怀化市麻阳苗族自治县",
        "longitude": 109.802587,
        "latitude": 27.865548
    },
    {
        "adcode": 431227,
        "city": "湖南省怀化市新晃侗族自治县",
        "longitude": 109.174932,
        "latitude": 27.352673
    },
    {
        "adcode": 431228,
        "city": "湖南省怀化市芷江侗族自治县",
        "longitude": 109.684629,
        "latitude": 27.443499
    },
    {
        "adcode": 431229,
        "city": "湖南省怀化市靖州苗族侗族自治县",
        "longitude": 109.696311,
        "latitude": 26.575052
    },
    {
        "adcode": 431230,
        "city": "湖南省怀化市通道侗族自治县",
        "longitude": 109.784412,
        "latitude": 26.158054
    },
    {
        "adcode": 431281,
        "city": "湖南省怀化市洪江市",
        "longitude": 109.836669,
        "latitude": 27.208609
    },
    {
        "adcode": 431300,
        "city": "湖南省娄底市",
        "longitude": 111.993497,
        "latitude": 27.700062
    },
    {
        "adcode": 431301,
        "city": "湖南省娄底市市辖区",
        "longitude": 111.993497,
        "latitude": 27.700062
    },
    {
        "adcode": 431302,
        "city": "湖南省娄底市娄星区",
        "longitude": 112.001937,
        "latitude": 27.729907
    },
    {
        "adcode": 431321,
        "city": "湖南省娄底市双峰县",
        "longitude": 112.175246,
        "latitude": 27.456658
    },
    {
        "adcode": 431322,
        "city": "湖南省娄底市新化县",
        "longitude": 111.327412,
        "latitude": 27.726515
    },
    {
        "adcode": 431381,
        "city": "湖南省娄底市冷水江市",
        "longitude": 111.435623,
        "latitude": 27.68585
    },
    {
        "adcode": 431382,
        "city": "湖南省娄底市涟源市",
        "longitude": 111.664316,
        "latitude": 27.692542
    },
    {
        "adcode": 433100,
        "city": "湖南省湘西土家族苗族自治州",
        "longitude": 109.739172,
        "latitude": 28.311947
    },
    {
        "adcode": 433101,
        "city": "湖南省湘西土家族苗族自治州吉首市",
        "longitude": 109.926773,
        "latitude": 28.297201
    },
    {
        "adcode": 433122,
        "city": "湖南省湘西土家族苗族自治州泸溪县",
        "longitude": 110.21961,
        "latitude": 28.216641
    },
    {
        "adcode": 433123,
        "city": "湖南省湘西土家族苗族自治州凤凰县",
        "longitude": 109.581072,
        "latitude": 27.958062
    },
    {
        "adcode": 433124,
        "city": "湖南省湘西土家族苗族自治州花垣县",
        "longitude": 109.482078,
        "latitude": 28.57203
    },
    {
        "adcode": 433125,
        "city": "湖南省湘西土家族苗族自治州保靖县",
        "longitude": 109.660577,
        "latitude": 28.699774
    },
    {
        "adcode": 433126,
        "city": "湖南省湘西土家族苗族自治州古丈县",
        "longitude": 109.950728,
        "latitude": 28.616935
    },
    {
        "adcode": 433127,
        "city": "湖南省湘西土家族苗族自治州永顺县",
        "longitude": 109.851254,
        "latitude": 29.00144
    },
    {
        "adcode": 433130,
        "city": "湖南省湘西土家族苗族自治州龙山县",
        "longitude": 109.443939,
        "latitude": 29.457663
    },
    {
        "adcode": 440000,
        "city": "广东省",
        "longitude": 113.26653,
        "latitude": 23.132191
    },
    {
        "adcode": 440100,
        "city": "广东省广州市",
        "longitude": 113.264434,
        "latitude": 23.129162
    },
    {
        "adcode": 440101,
        "city": "广东省广州市市辖区",
        "longitude": 113.264434,
        "latitude": 23.129162
    },
    {
        "adcode": 440103,
        "city": "广东省广州市荔湾区",
        "longitude": 113.244261,
        "latitude": 23.125981
    },
    {
        "adcode": 440104,
        "city": "广东省广州市越秀区",
        "longitude": 113.266841,
        "latitude": 23.128524
    },
    {
        "adcode": 440105,
        "city": "广东省广州市海珠区",
        "longitude": 113.317388,
        "latitude": 23.083801
    },
    {
        "adcode": 440106,
        "city": "广东省广州市天河区",
        "longitude": 113.3612,
        "latitude": 23.12468
    },
    {
        "adcode": 440111,
        "city": "广东省广州市白云区",
        "longitude": 113.273289,
        "latitude": 23.15729
    },
    {
        "adcode": 440112,
        "city": "广东省广州市黄埔区",
        "longitude": 113.459749,
        "latitude": 23.106402
    },
    {
        "adcode": 440113,
        "city": "广东省广州市番禺区",
        "longitude": 113.384129,
        "latitude": 22.937244
    },
    {
        "adcode": 440114,
        "city": "广东省广州市花都区",
        "longitude": 113.220218,
        "latitude": 23.404165
    },
    {
        "adcode": 440115,
        "city": "广东省广州市南沙区",
        "longitude": 113.525165,
        "latitude": 22.801624
    },
    {
        "adcode": 440117,
        "city": "广东省广州市从化区",
        "longitude": 113.586605,
        "latitude": 23.548852
    },
    {
        "adcode": 440118,
        "city": "广东省广州市增城区",
        "longitude": 113.81086,
        "latitude": 23.261141
    },
    {
        "adcode": 440200,
        "city": "广东省韶关市",
        "longitude": 113.597522,
        "latitude": 24.810403
    },
    {
        "adcode": 440201,
        "city": "广东省韶关市市辖区",
        "longitude": 113.597522,
        "latitude": 24.810403
    },
    {
        "adcode": 440203,
        "city": "广东省韶关市武江区",
        "longitude": 113.587774,
        "latitude": 24.792924
    },
    {
        "adcode": 440204,
        "city": "广东省韶关市浈江区",
        "longitude": 113.611098,
        "latitude": 24.804381
    },
    {
        "adcode": 440205,
        "city": "广东省韶关市曲江区",
        "longitude": 113.604549,
        "latitude": 24.682728
    },
    {
        "adcode": 440222,
        "city": "广东省韶关市始兴县",
        "longitude": 114.061789,
        "latitude": 24.952977
    },
    {
        "adcode": 440224,
        "city": "广东省韶关市仁化县",
        "longitude": 113.749027,
        "latitude": 25.085621
    },
    {
        "adcode": 440229,
        "city": "广东省韶关市翁源县",
        "longitude": 114.130342,
        "latitude": 24.350347
    },
    {
        "adcode": 440232,
        "city": "广东省韶关市乳源瑶族自治县",
        "longitude": 113.275883,
        "latitude": 24.776078
    },
    {
        "adcode": 440233,
        "city": "广东省韶关市新丰县",
        "longitude": 114.206867,
        "latitude": 24.05976
    },
    {
        "adcode": 440281,
        "city": "广东省韶关市乐昌市",
        "longitude": 113.347519,
        "latitude": 25.130136
    },
    {
        "adcode": 440282,
        "city": "广东省韶关市南雄市",
        "longitude": 114.311982,
        "latitude": 25.117753
    },
    {
        "adcode": 440300,
        "city": "广东省深圳市",
        "longitude": 114.057868,
        "latitude": 22.543099
    },
    {
        "adcode": 440301,
        "city": "广东省深圳市市辖区",
        "longitude": 114.057868,
        "latitude": 22.543099
    },
    {
        "adcode": 440303,
        "city": "广东省深圳市罗湖区",
        "longitude": 114.131764,
        "latitude": 22.548171
    },
    {
        "adcode": 440304,
        "city": "广东省深圳市福田区",
        "longitude": 114.055036,
        "latitude": 22.52153
    },
    {
        "adcode": 440305,
        "city": "广东省深圳市南山区",
        "longitude": 113.923552,
        "latitude": 22.528499
    },
    {
        "adcode": 440306,
        "city": "广东省深圳市宝安区",
        "longitude": 113.88402,
        "latitude": 22.555259
    },
    {
        "adcode": 440307,
        "city": "广东省深圳市龙岗区",
        "longitude": 114.246899,
        "latitude": 22.720968
    },
    {
        "adcode": 440308,
        "city": "广东省深圳市盐田区",
        "longitude": 114.236875,
        "latitude": 22.556499
    },
    {
        "adcode": 440309,
        "city": "广东省深圳市龙华区",
        "longitude": 114.044346,
        "latitude": 22.691963
    },
    {
        "adcode": 440310,
        "city": "广东省深圳市坪山区",
        "longitude": 113.9358915,
        "latitude": 22.7488
    },
    {
        "adcode": 440311,
        "city": "广东省深圳市光明区",
        "longitude": 113.935761,
        "latitude": 22.7488655
    },
    {
        "adcode": 440400,
        "city": "广东省珠海市",
        "longitude": 113.576726,
        "latitude": 22.270715
    },
    {
        "adcode": 440401,
        "city": "广东省珠海市市辖区",
        "longitude": 113.576726,
        "latitude": 22.270715
    },
    {
        "adcode": 440402,
        "city": "广东省珠海市香洲区",
        "longitude": 113.543785,
        "latitude": 22.265811
    },
    {
        "adcode": 440403,
        "city": "广东省珠海市斗门区",
        "longitude": 113.296467,
        "latitude": 22.2092
    },
    {
        "adcode": 440404,
        "city": "广东省珠海市金湾区",
        "longitude": 113.363393,
        "latitude": 22.146874
    },
    {
        "adcode": 440500,
        "city": "广东省汕头市",
        "longitude": 116.681972,
        "latitude": 23.354091
    },
    {
        "adcode": 440501,
        "city": "广东省汕头市市辖区",
        "longitude": 116.681972,
        "latitude": 23.354091
    },
    {
        "adcode": 440507,
        "city": "广东省汕头市龙湖区",
        "longitude": 116.716534,
        "latitude": 23.371476
    },
    {
        "adcode": 440511,
        "city": "广东省汕头市金平区",
        "longitude": 116.703426,
        "latitude": 23.365613
    },
    {
        "adcode": 440512,
        "city": "广东省汕头市濠江区",
        "longitude": 116.726973,
        "latitude": 23.286079
    },
    {
        "adcode": 440513,
        "city": "广东省汕头市潮阳区",
        "longitude": 116.601515,
        "latitude": 23.264936
    },
    {
        "adcode": 440514,
        "city": "广东省汕头市潮南区",
        "longitude": 116.433017,
        "latitude": 23.250425
    },
    {
        "adcode": 440515,
        "city": "广东省汕头市澄海区",
        "longitude": 116.756092,
        "latitude": 23.46596
    },
    {
        "adcode": 440523,
        "city": "广东省汕头市南澳县",
        "longitude": 117.023374,
        "latitude": 23.421724
    },
    {
        "adcode": 440600,
        "city": "广东省佛山市",
        "longitude": 113.121416,
        "latitude": 23.021548
    },
    {
        "adcode": 440601,
        "city": "广东省佛山市市辖区",
        "longitude": 113.121416,
        "latitude": 23.021548
    },
    {
        "adcode": 440604,
        "city": "广东省佛山市禅城区",
        "longitude": 113.12244,
        "latitude": 23.009505
    },
    {
        "adcode": 440605,
        "city": "广东省佛山市南海区",
        "longitude": 113.147759,
        "latitude": 23.025412
    },
    {
        "adcode": 440606,
        "city": "广东省佛山市顺德区",
        "longitude": 113.293359,
        "latitude": 22.80524
    },
    {
        "adcode": 440607,
        "city": "广东省佛山市三水区",
        "longitude": 112.896668,
        "latitude": 23.156065
    },
    {
        "adcode": 440608,
        "city": "广东省佛山市高明区",
        "longitude": 112.892578,
        "latitude": 22.900182
    },
    {
        "adcode": 440700,
        "city": "广东省江门市",
        "longitude": 113.081901,
        "latitude": 22.578738
    },
    {
        "adcode": 440701,
        "city": "广东省江门市市辖区",
        "longitude": 113.081901,
        "latitude": 22.578738
    },
    {
        "adcode": 440703,
        "city": "广东省江门市蓬江区",
        "longitude": 113.078521,
        "latitude": 22.595149
    },
    {
        "adcode": 440704,
        "city": "广东省江门市江海区",
        "longitude": 113.111612,
        "latitude": 22.560474
    },
    {
        "adcode": 440705,
        "city": "广东省江门市新会区",
        "longitude": 113.034187,
        "latitude": 22.4583
    },
    {
        "adcode": 440781,
        "city": "广东省江门市台山市",
        "longitude": 112.79597,
        "latitude": 22.251596
    },
    {
        "adcode": 440783,
        "city": "广东省江门市开平市",
        "longitude": 112.698545,
        "latitude": 22.376395
    },
    {
        "adcode": 440784,
        "city": "广东省江门市鹤山市",
        "longitude": 112.964446,
        "latitude": 22.765392
    },
    {
        "adcode": 440785,
        "city": "广东省江门市恩平市",
        "longitude": 112.305145,
        "latitude": 22.183206
    },
    {
        "adcode": 440800,
        "city": "广东省湛江市",
        "longitude": 110.359377,
        "latitude": 21.270707
    },
    {
        "adcode": 440801,
        "city": "广东省湛江市市辖区",
        "longitude": 110.359377,
        "latitude": 21.270707
    },
    {
        "adcode": 440802,
        "city": "广东省湛江市赤坎区",
        "longitude": 110.3659,
        "latitude": 21.266119
    },
    {
        "adcode": 440803,
        "city": "广东省湛江市霞山区",
        "longitude": 110.39807,
        "latitude": 21.19172
    },
    {
        "adcode": 440804,
        "city": "广东省湛江市坡头区",
        "longitude": 110.455332,
        "latitude": 21.244721
    },
    {
        "adcode": 440811,
        "city": "广东省湛江市麻章区",
        "longitude": 110.334387,
        "latitude": 21.263443
    },
    {
        "adcode": 440823,
        "city": "广东省湛江市遂溪县",
        "longitude": 110.250124,
        "latitude": 21.377246
    },
    {
        "adcode": 440825,
        "city": "广东省湛江市徐闻县",
        "longitude": 110.17675,
        "latitude": 20.325489
    },
    {
        "adcode": 440881,
        "city": "广东省湛江市廉江市",
        "longitude": 110.286209,
        "latitude": 21.6097
    },
    {
        "adcode": 440882,
        "city": "广东省湛江市雷州市",
        "longitude": 110.096749,
        "latitude": 20.914278
    },
    {
        "adcode": 440883,
        "city": "广东省湛江市吴川市",
        "longitude": 110.778411,
        "latitude": 21.441808
    },
    {
        "adcode": 440900,
        "city": "广东省茂名市",
        "longitude": 110.925456,
        "latitude": 21.662999
    },
    {
        "adcode": 440901,
        "city": "广东省茂名市市辖区",
        "longitude": 110.925456,
        "latitude": 21.662999
    },
    {
        "adcode": 440902,
        "city": "广东省茂名市茂南区",
        "longitude": 110.918026,
        "latitude": 21.641337
    },
    {
        "adcode": 440904,
        "city": "广东省茂名市电白区",
        "longitude": 111.013556,
        "latitude": 21.514164
    },
    {
        "adcode": 440981,
        "city": "广东省茂名市高州市",
        "longitude": 110.853302,
        "latitude": 21.917982
    },
    {
        "adcode": 440982,
        "city": "广东省茂名市化州市",
        "longitude": 110.639569,
        "latitude": 21.664044
    },
    {
        "adcode": 440983,
        "city": "广东省茂名市信宜市",
        "longitude": 110.947044,
        "latitude": 22.354385
    },
    {
        "adcode": 441200,
        "city": "广东省肇庆市",
        "longitude": 112.465091,
        "latitude": 23.047191
    },
    {
        "adcode": 441201,
        "city": "广东省肇庆市市辖区",
        "longitude": 112.465091,
        "latitude": 23.047191
    },
    {
        "adcode": 441202,
        "city": "广东省肇庆市端州区",
        "longitude": 112.484848,
        "latitude": 23.052101
    },
    {
        "adcode": 441203,
        "city": "广东省肇庆市鼎湖区",
        "longitude": 112.567588,
        "latitude": 23.158447
    },
    {
        "adcode": 441204,
        "city": "广东省肇庆市高要区",
        "longitude": 112.457771,
        "latitude": 23.025668
    },
    {
        "adcode": 441223,
        "city": "广东省肇庆市广宁县",
        "longitude": 112.44069,
        "latitude": 23.634676
    },
    {
        "adcode": 441224,
        "city": "广东省肇庆市怀集县",
        "longitude": 112.184652,
        "latitude": 23.911899
    },
    {
        "adcode": 441225,
        "city": "广东省肇庆市封开县",
        "longitude": 111.512343,
        "latitude": 23.424033
    },
    {
        "adcode": 441226,
        "city": "广东省肇庆市德庆县",
        "longitude": 111.785937,
        "latitude": 23.143722
    },
    {
        "adcode": 441284,
        "city": "广东省肇庆市四会市",
        "longitude": 112.733773,
        "latitude": 23.326504
    },
    {
        "adcode": 441300,
        "city": "广东省惠州市",
        "longitude": 114.416196,
        "latitude": 23.111847
    },
    {
        "adcode": 441301,
        "city": "广东省惠州市市辖区",
        "longitude": 114.416196,
        "latitude": 23.111847
    },
    {
        "adcode": 441302,
        "city": "广东省惠州市惠城区",
        "longitude": 114.382485,
        "latitude": 23.084109
    },
    {
        "adcode": 441303,
        "city": "广东省惠州市惠阳区",
        "longitude": 114.456696,
        "latitude": 22.788734
    },
    {
        "adcode": 441322,
        "city": "广东省惠州市博罗县",
        "longitude": 114.289496,
        "latitude": 23.172899
    },
    {
        "adcode": 441323,
        "city": "广东省惠州市惠东县",
        "longitude": 114.720079,
        "latitude": 22.984975
    },
    {
        "adcode": 441324,
        "city": "广东省惠州市龙门县",
        "longitude": 114.254913,
        "latitude": 23.727732
    },
    {
        "adcode": 441400,
        "city": "广东省梅州市",
        "longitude": 116.122238,
        "latitude": 24.288615
    },
    {
        "adcode": 441401,
        "city": "广东省梅州市市辖区",
        "longitude": 116.122238,
        "latitude": 24.288615
    },
    {
        "adcode": 441402,
        "city": "广东省梅州市梅江区",
        "longitude": 116.116616,
        "latitude": 24.310384
    },
    {
        "adcode": 441403,
        "city": "广东省梅州市梅县区",
        "longitude": 116.082183,
        "latitude": 24.265312
    },
    {
        "adcode": 441422,
        "city": "广东省梅州市大埔县",
        "longitude": 116.695195,
        "latitude": 24.347783
    },
    {
        "adcode": 441423,
        "city": "广东省梅州市丰顺县",
        "longitude": 116.182299,
        "latitude": 23.739526
    },
    {
        "adcode": 441424,
        "city": "广东省梅州市五华县",
        "longitude": 115.776983,
        "latitude": 23.930769
    },
    {
        "adcode": 441426,
        "city": "广东省梅州市平远县",
        "longitude": 115.891638,
        "latitude": 24.567262
    },
    {
        "adcode": 441427,
        "city": "广东省梅州市蕉岭县",
        "longitude": 116.171356,
        "latitude": 24.6587
    },
    {
        "adcode": 441481,
        "city": "广东省梅州市兴宁市",
        "longitude": 115.723805,
        "latitude": 24.126159
    },
    {
        "adcode": 441500,
        "city": "广东省汕尾市",
        "longitude": 115.375278,
        "latitude": 22.786211
    },
    {
        "adcode": 441501,
        "city": "广东省汕尾市市辖区",
        "longitude": 115.375278,
        "latitude": 22.786211
    },
    {
        "adcode": 441502,
        "city": "广东省汕尾市城区",
        "longitude": 115.365029,
        "latitude": 22.778699
    },
    {
        "adcode": 441521,
        "city": "广东省汕尾市海丰县",
        "longitude": 115.323436,
        "latitude": 22.966586
    },
    {
        "adcode": 441523,
        "city": "广东省汕尾市陆河县",
        "longitude": 115.660143,
        "latitude": 23.301617
    },
    {
        "adcode": 441581,
        "city": "广东省汕尾市陆丰市",
        "longitude": 115.65226,
        "latitude": 22.917576
    },
    {
        "adcode": 441600,
        "city": "广东省河源市",
        "longitude": 114.700447,
        "latitude": 23.743538
    },
    {
        "adcode": 441601,
        "city": "广东省河源市市辖区",
        "longitude": 114.700447,
        "latitude": 23.743538
    },
    {
        "adcode": 441602,
        "city": "广东省河源市源城区",
        "longitude": 114.702517,
        "latitude": 23.733969
    },
    {
        "adcode": 441621,
        "city": "广东省河源市紫金县",
        "longitude": 115.184061,
        "latitude": 23.635271
    },
    {
        "adcode": 441622,
        "city": "广东省河源市龙川县",
        "longitude": 115.259872,
        "latitude": 24.100066
    },
    {
        "adcode": 441623,
        "city": "广东省河源市连平县",
        "longitude": 114.488714,
        "latitude": 24.369588
    },
    {
        "adcode": 441624,
        "city": "广东省河源市和平县",
        "longitude": 114.938684,
        "latitude": 24.44218
    },
    {
        "adcode": 441625,
        "city": "广东省河源市东源县",
        "longitude": 114.74638,
        "latitude": 23.788393
    },
    {
        "adcode": 441700,
        "city": "广东省阳江市",
        "longitude": 111.982232,
        "latitude": 21.857958
    },
    {
        "adcode": 441701,
        "city": "广东省阳江市市辖区",
        "longitude": 111.982232,
        "latitude": 21.857958
    },
    {
        "adcode": 441702,
        "city": "广东省阳江市江城区",
        "longitude": 111.955059,
        "latitude": 21.861787
    },
    {
        "adcode": 441704,
        "city": "广东省阳江市阳东区",
        "longitude": 112.006338,
        "latitude": 21.868358
    },
    {
        "adcode": 441721,
        "city": "广东省阳江市阳西县",
        "longitude": 111.617849,
        "latitude": 21.752396
    },
    {
        "adcode": 441781,
        "city": "广东省阳江市阳春市",
        "longitude": 111.791539,
        "latitude": 22.170438
    },
    {
        "adcode": 441800,
        "city": "广东省清远市",
        "longitude": 113.056031,
        "latitude": 23.681763
    },
    {
        "adcode": 441801,
        "city": "广东省清远市市辖区",
        "longitude": 113.056031,
        "latitude": 23.681763
    },
    {
        "adcode": 441802,
        "city": "广东省清远市清城区",
        "longitude": 113.062692,
        "latitude": 23.697899
    },
    {
        "adcode": 441803,
        "city": "广东省清远市清新区",
        "longitude": 113.017749,
        "latitude": 23.734673
    },
    {
        "adcode": 441821,
        "city": "广东省清远市佛冈县",
        "longitude": 113.531607,
        "latitude": 23.879192
    },
    {
        "adcode": 441823,
        "city": "广东省清远市阳山县",
        "longitude": 112.641363,
        "latitude": 24.465359
    },
    {
        "adcode": 441825,
        "city": "广东省清远市连山壮族瑶族自治县",
        "longitude": 112.093617,
        "latitude": 24.570491
    },
    {
        "adcode": 441826,
        "city": "广东省清远市连南瑶族自治县",
        "longitude": 112.287012,
        "latitude": 24.726017
    },
    {
        "adcode": 441881,
        "city": "广东省清远市英德市",
        "longitude": 113.402376,
        "latitude": 24.205024
    },
    {
        "adcode": 441882,
        "city": "广东省清远市连州市",
        "longitude": 112.377361,
        "latitude": 24.780966
    },
    {
        "adcode": 441900,
        "city": "广东省东莞市",
        "longitude": 113.751765,
        "latitude": 23.020536
    },
    {
        "adcode": 442000,
        "city": "广东省中山市",
        "longitude": 113.392782,
        "latitude": 22.517645
    },
    {
        "adcode": 442101,
        "city": "广东省东沙群岛",
        "longitude": 116.007965,
        "latitude": 21.072651
    },
    {
        "adcode": 445100,
        "city": "广东省潮州市",
        "longitude": 116.622603,
        "latitude": 23.65695
    },
    {
        "adcode": 445101,
        "city": "广东省潮州市市辖区",
        "longitude": 116.622603,
        "latitude": 23.65695
    },
    {
        "adcode": 445102,
        "city": "广东省潮州市湘桥区",
        "longitude": 116.628632,
        "latitude": 23.674536
    },
    {
        "adcode": 445103,
        "city": "广东省潮州市潮安区",
        "longitude": 116.678204,
        "latitude": 23.462613
    },
    {
        "adcode": 445122,
        "city": "广东省潮州市饶平县",
        "longitude": 117.0039,
        "latitude": 23.663824
    },
    {
        "adcode": 445200,
        "city": "广东省揭阳市",
        "longitude": 116.372831,
        "latitude": 23.549993
    },
    {
        "adcode": 445201,
        "city": "广东省揭阳市市辖区",
        "longitude": 116.372831,
        "latitude": 23.549993
    },
    {
        "adcode": 445202,
        "city": "广东省揭阳市榕城区",
        "longitude": 116.367035,
        "latitude": 23.525229
    },
    {
        "adcode": 445203,
        "city": "广东省揭阳市揭东区",
        "longitude": 116.412015,
        "latitude": 23.566127
    },
    {
        "adcode": 445222,
        "city": "广东省揭阳市揭西县",
        "longitude": 115.841838,
        "latitude": 23.431294
    },
    {
        "adcode": 445224,
        "city": "广东省揭阳市惠来县",
        "longitude": 116.29515,
        "latitude": 23.033267
    },
    {
        "adcode": 445281,
        "city": "广东省揭阳市普宁市",
        "longitude": 116.166004,
        "latitude": 23.297642
    },
    {
        "adcode": 445300,
        "city": "广东省云浮市",
        "longitude": 112.044491,
        "latitude": 22.915094
    },
    {
        "adcode": 445301,
        "city": "广东省云浮市市辖区",
        "longitude": 112.044491,
        "latitude": 22.915094
    },
    {
        "adcode": 445302,
        "city": "广东省云浮市云城区",
        "longitude": 112.043832,
        "latitude": 22.928097
    },
    {
        "adcode": 445303,
        "city": "广东省云浮市云安区",
        "longitude": 112.003209,
        "latitude": 23.07102
    },
    {
        "adcode": 445321,
        "city": "广东省云浮市新兴县",
        "longitude": 112.225335,
        "latitude": 22.69569
    },
    {
        "adcode": 445322,
        "city": "广东省云浮市郁南县",
        "longitude": 111.535249,
        "latitude": 23.234627
    },
    {
        "adcode": 445381,
        "city": "广东省云浮市罗定市",
        "longitude": 111.569667,
        "latitude": 22.768939
    },
    {
        "adcode": 450000,
        "city": "广西壮族自治区",
        "longitude": 108.327546,
        "latitude": 22.815478
    },
    {
        "adcode": 450100,
        "city": "广西壮族自治区南宁市",
        "longitude": 108.366543,
        "latitude": 22.817002
    },
    {
        "adcode": 450101,
        "city": "广西壮族自治区南宁市市辖区",
        "longitude": 108.366543,
        "latitude": 22.817002
    },
    {
        "adcode": 450102,
        "city": "广西壮族自治区南宁市兴宁区",
        "longitude": 108.368871,
        "latitude": 22.854021
    },
    {
        "adcode": 450103,
        "city": "广西壮族自治区南宁市青秀区",
        "longitude": 108.494024,
        "latitude": 22.785879
    },
    {
        "adcode": 450105,
        "city": "广西壮族自治区南宁市江南区",
        "longitude": 108.273158,
        "latitude": 22.781632
    },
    {
        "adcode": 450107,
        "city": "广西壮族自治区南宁市西乡塘区",
        "longitude": 108.306886,
        "latitude": 22.83277
    },
    {
        "adcode": 450108,
        "city": "广西壮族自治区南宁市良庆区",
        "longitude": 108.322102,
        "latitude": 22.75909
    },
    {
        "adcode": 450109,
        "city": "广西壮族自治区南宁市邕宁区",
        "longitude": 108.487369,
        "latitude": 22.75839
    },
    {
        "adcode": 450110,
        "city": "广西壮族自治区南宁市武鸣区",
        "longitude": 108.274712,
        "latitude": 23.158693
    },
    {
        "adcode": 450123,
        "city": "广西壮族自治区南宁市隆安县",
        "longitude": 107.696153,
        "latitude": 23.166028
    },
    {
        "adcode": 450124,
        "city": "广西壮族自治区南宁市马山县",
        "longitude": 108.176979,
        "latitude": 23.708192
    },
    {
        "adcode": 450125,
        "city": "广西壮族自治区南宁市上林县",
        "longitude": 108.604921,
        "latitude": 23.431936
    },
    {
        "adcode": 450126,
        "city": "广西壮族自治区南宁市宾阳县",
        "longitude": 108.810326,
        "latitude": 23.217832
    },
    {
        "adcode": 450127,
        "city": "广西壮族自治区南宁市横县",
        "longitude": 109.261384,
        "latitude": 22.679932
    },
    {
        "adcode": 450200,
        "city": "广西壮族自治区柳州市",
        "longitude": 109.415953,
        "latitude": 24.325502
    },
    {
        "adcode": 450201,
        "city": "广西壮族自治区柳州市市辖区",
        "longitude": 109.415953,
        "latitude": 24.325502
    },
    {
        "adcode": 450202,
        "city": "广西壮族自治区柳州市城中区",
        "longitude": 109.410736,
        "latitude": 24.315602
    },
    {
        "adcode": 450203,
        "city": "广西壮族自治区柳州市鱼峰区",
        "longitude": 109.452442,
        "latitude": 24.318517
    },
    {
        "adcode": 450204,
        "city": "广西壮族自治区柳州市柳南区",
        "longitude": 109.385519,
        "latitude": 24.336229
    },
    {
        "adcode": 450205,
        "city": "广西壮族自治区柳州市柳北区",
        "longitude": 109.40205,
        "latitude": 24.362691
    },
    {
        "adcode": 450206,
        "city": "广西壮族自治区柳州市柳江区",
        "longitude": 109.32638,
        "latitude": 24.254892
    },
    {
        "adcode": 450222,
        "city": "广西壮族自治区柳州市柳城县",
        "longitude": 109.24473,
        "latitude": 24.651518
    },
    {
        "adcode": 450223,
        "city": "广西壮族自治区柳州市鹿寨县",
        "longitude": 109.750638,
        "latitude": 24.472897
    },
    {
        "adcode": 450224,
        "city": "广西壮族自治区柳州市融安县",
        "longitude": 109.397538,
        "latitude": 25.22455
    },
    {
        "adcode": 450225,
        "city": "广西壮族自治区柳州市融水苗族自治县",
        "longitude": 109.256334,
        "latitude": 25.065934
    },
    {
        "adcode": 450226,
        "city": "广西壮族自治区柳州市三江侗族自治县",
        "longitude": 109.607675,
        "latitude": 25.783198
    },
    {
        "adcode": 450300,
        "city": "广西壮族自治区桂林市",
        "longitude": 110.290194,
        "latitude": 25.273566
    },
    {
        "adcode": 450301,
        "city": "广西壮族自治区桂林市市辖区",
        "longitude": 110.290194,
        "latitude": 25.273566
    },
    {
        "adcode": 450302,
        "city": "广西壮族自治区桂林市秀峰区",
        "longitude": 110.264183,
        "latitude": 25.273625
    },
    {
        "adcode": 450303,
        "city": "广西壮族自治区桂林市叠彩区",
        "longitude": 110.301723,
        "latitude": 25.314001
    },
    {
        "adcode": 450304,
        "city": "广西壮族自治区桂林市象山区",
        "longitude": 110.281082,
        "latitude": 25.261687
    },
    {
        "adcode": 450305,
        "city": "广西壮族自治区桂林市七星区",
        "longitude": 110.317826,
        "latitude": 25.252701
    },
    {
        "adcode": 450311,
        "city": "广西壮族自治区桂林市雁山区",
        "longitude": 110.28669,
        "latitude": 25.101935
    },
    {
        "adcode": 450312,
        "city": "广西壮族自治区桂林市临桂区",
        "longitude": 110.212463,
        "latitude": 25.238628
    },
    {
        "adcode": 450321,
        "city": "广西壮族自治区桂林市阳朔县",
        "longitude": 110.496593,
        "latitude": 24.778481
    },
    {
        "adcode": 450323,
        "city": "广西壮族自治区桂林市灵川县",
        "longitude": 110.325636,
        "latitude": 25.409747
    },
    {
        "adcode": 450324,
        "city": "广西壮族自治区桂林市全州县",
        "longitude": 111.072926,
        "latitude": 25.928617
    },
    {
        "adcode": 450325,
        "city": "广西壮族自治区桂林市兴安县",
        "longitude": 110.67167,
        "latitude": 25.611705
    },
    {
        "adcode": 450326,
        "city": "广西壮族自治区桂林市永福县",
        "longitude": 109.983076,
        "latitude": 24.979856
    },
    {
        "adcode": 450327,
        "city": "广西壮族自治区桂林市灌阳县",
        "longitude": 111.160851,
        "latitude": 25.489383
    },
    {
        "adcode": 450328,
        "city": "广西壮族自治区桂林市龙胜各族自治县",
        "longitude": 110.011238,
        "latitude": 25.797931
    },
    {
        "adcode": 450329,
        "city": "广西壮族自治区桂林市资源县",
        "longitude": 110.6527,
        "latitude": 26.042443
    },
    {
        "adcode": 450330,
        "city": "广西壮族自治区桂林市平乐县",
        "longitude": 110.643305,
        "latitude": 24.633362
    },
    {
        "adcode": 450332,
        "city": "广西壮族自治区桂林市恭城瑶族自治县",
        "longitude": 110.82841,
        "latitude": 24.831682
    },
    {
        "adcode": 450381,
        "city": "广西壮族自治区桂林市荔浦市",
        "longitude": 110.6150135,
        "latitude": 24.499683
    },
    {
        "adcode": 450400,
        "city": "广西壮族自治区梧州市",
        "longitude": 111.279115,
        "latitude": 23.476962
    },
    {
        "adcode": 450401,
        "city": "广西壮族自治区梧州市市辖区",
        "longitude": 111.279115,
        "latitude": 23.476962
    },
    {
        "adcode": 450403,
        "city": "广西壮族自治区梧州市万秀区",
        "longitude": 111.320542,
        "latitude": 23.472962
    },
    {
        "adcode": 450405,
        "city": "广西壮族自治区梧州市长洲区",
        "longitude": 111.274777,
        "latitude": 23.485695
    },
    {
        "adcode": 450406,
        "city": "广西壮族自治区梧州市龙圩区",
        "longitude": 111.246035,
        "latitude": 23.40996
    },
    {
        "adcode": 450421,
        "city": "广西壮族自治区梧州市苍梧县",
        "longitude": 111.544008,
        "latitude": 23.845097
    },
    {
        "adcode": 450422,
        "city": "广西壮族自治区梧州市藤县",
        "longitude": 110.914849,
        "latitude": 23.374984
    },
    {
        "adcode": 450423,
        "city": "广西壮族自治区梧州市蒙山县",
        "longitude": 110.525003,
        "latitude": 24.19357
    },
    {
        "adcode": 450481,
        "city": "广西壮族自治区梧州市岑溪市",
        "longitude": 110.994913,
        "latitude": 22.91835
    },
    {
        "adcode": 450500,
        "city": "广西壮族自治区北海市",
        "longitude": 109.119927,
        "latitude": 21.481254
    },
    {
        "adcode": 450501,
        "city": "广西壮族自治区北海市市辖区",
        "longitude": 109.119927,
        "latitude": 21.481254
    },
    {
        "adcode": 450502,
        "city": "广西壮族自治区北海市海城区",
        "longitude": 109.11721,
        "latitude": 21.475005
    },
    {
        "adcode": 450503,
        "city": "广西壮族自治区北海市银海区",
        "longitude": 109.13999,
        "latitude": 21.449219
    },
    {
        "adcode": 450512,
        "city": "广西壮族自治区北海市铁山港区",
        "longitude": 109.421581,
        "latitude": 21.529128
    },
    {
        "adcode": 450521,
        "city": "广西壮族自治区北海市合浦县",
        "longitude": 109.207336,
        "latitude": 21.660936
    },
    {
        "adcode": 450600,
        "city": "广西壮族自治区防城港市",
        "longitude": 108.353846,
        "latitude": 21.68686
    },
    {
        "adcode": 450601,
        "city": "广西壮族自治区防城港市市辖区",
        "longitude": 108.353846,
        "latitude": 21.68686
    },
    {
        "adcode": 450602,
        "city": "广西壮族自治区防城港市港口区",
        "longitude": 108.380144,
        "latitude": 21.643384
    },
    {
        "adcode": 450603,
        "city": "广西壮族自治区防城港市防城区",
        "longitude": 108.353499,
        "latitude": 21.769212
    },
    {
        "adcode": 450621,
        "city": "广西壮族自治区防城港市上思县",
        "longitude": 107.983626,
        "latitude": 22.153672
    },
    {
        "adcode": 450681,
        "city": "广西壮族自治区防城港市东兴市",
        "longitude": 107.971826,
        "latitude": 21.547822
    },
    {
        "adcode": 450700,
        "city": "广西壮族自治区钦州市",
        "longitude": 108.654146,
        "latitude": 21.979933
    },
    {
        "adcode": 450701,
        "city": "广西壮族自治区钦州市市辖区",
        "longitude": 108.654146,
        "latitude": 21.979933
    },
    {
        "adcode": 450702,
        "city": "广西壮族自治区钦州市钦南区",
        "longitude": 108.65721,
        "latitude": 21.93886
    },
    {
        "adcode": 450703,
        "city": "广西壮族自治区钦州市钦北区",
        "longitude": 108.44911,
        "latitude": 22.132761
    },
    {
        "adcode": 450721,
        "city": "广西壮族自治区钦州市灵山县",
        "longitude": 109.291007,
        "latitude": 22.416537
    },
    {
        "adcode": 450722,
        "city": "广西壮族自治区钦州市浦北县",
        "longitude": 109.556953,
        "latitude": 22.271651
    },
    {
        "adcode": 450800,
        "city": "广西壮族自治区贵港市",
        "longitude": 109.598926,
        "latitude": 23.11153
    },
    {
        "adcode": 450801,
        "city": "广西壮族自治区贵港市市辖区",
        "longitude": 109.598926,
        "latitude": 23.11153
    },
    {
        "adcode": 450802,
        "city": "广西壮族自治区贵港市港北区",
        "longitude": 109.57224,
        "latitude": 23.111531
    },
    {
        "adcode": 450803,
        "city": "广西壮族自治区贵港市港南区",
        "longitude": 109.599557,
        "latitude": 23.075573
    },
    {
        "adcode": 450804,
        "city": "广西壮族自治区贵港市覃塘区",
        "longitude": 109.452662,
        "latitude": 23.127149
    },
    {
        "adcode": 450821,
        "city": "广西壮族自治区贵港市平南县",
        "longitude": 110.392168,
        "latitude": 23.539127
    },
    {
        "adcode": 450881,
        "city": "广西壮族自治区贵港市桂平市",
        "longitude": 110.079379,
        "latitude": 23.394326
    },
    {
        "adcode": 450900,
        "city": "广西壮族自治区玉林市",
        "longitude": 110.164756,
        "latitude": 22.636379
    },
    {
        "adcode": 450901,
        "city": "广西壮族自治区玉林市市辖区",
        "longitude": 110.164756,
        "latitude": 22.636379
    },
    {
        "adcode": 450902,
        "city": "广西壮族自治区玉林市玉州区",
        "longitude": 110.151088,
        "latitude": 22.628062
    },
    {
        "adcode": 450903,
        "city": "广西壮族自治区玉林市福绵区",
        "longitude": 110.059439,
        "latitude": 22.585557
    },
    {
        "adcode": 450921,
        "city": "广西壮族自治区玉林市容县",
        "longitude": 110.557874,
        "latitude": 22.857823
    },
    {
        "adcode": 450922,
        "city": "广西壮族自治区玉林市陆川县",
        "longitude": 110.264052,
        "latitude": 22.321048
    },
    {
        "adcode": 450923,
        "city": "广西壮族自治区玉林市博白县",
        "longitude": 109.975985,
        "latitude": 22.273048
    },
    {
        "adcode": 450924,
        "city": "广西壮族自治区玉林市兴业县",
        "longitude": 109.876855,
        "latitude": 22.820746
    },
    {
        "adcode": 450981,
        "city": "广西壮族自治区玉林市北流市",
        "longitude": 110.354215,
        "latitude": 22.708311
    },
    {
        "adcode": 451000,
        "city": "广西壮族自治区百色市",
        "longitude": 106.618201,
        "latitude": 23.902333
    },
    {
        "adcode": 451001,
        "city": "广西壮族自治区百色市市辖区",
        "longitude": 106.618201,
        "latitude": 23.902333
    },
    {
        "adcode": 451002,
        "city": "广西壮族自治区百色市右江区",
        "longitude": 106.618645,
        "latitude": 23.901383
    },
    {
        "adcode": 451021,
        "city": "广西壮族自治区百色市田阳县",
        "longitude": 106.915418,
        "latitude": 23.735682
    },
    {
        "adcode": 451022,
        "city": "广西壮族自治区百色市田东县",
        "longitude": 107.126081,
        "latitude": 23.597194
    },
    {
        "adcode": 451023,
        "city": "广西壮族自治区百色市平果县",
        "longitude": 107.58981,
        "latitude": 23.329376
    },
    {
        "adcode": 451024,
        "city": "广西壮族自治区百色市德保县",
        "longitude": 106.615374,
        "latitude": 23.32345
    },
    {
        "adcode": 451026,
        "city": "广西壮族自治区百色市那坡县",
        "longitude": 105.83253,
        "latitude": 23.387441
    },
    {
        "adcode": 451027,
        "city": "广西壮族自治区百色市凌云县",
        "longitude": 106.56131,
        "latitude": 24.347557
    },
    {
        "adcode": 451028,
        "city": "广西壮族自治区百色市乐业县",
        "longitude": 106.556519,
        "latitude": 24.776827
    },
    {
        "adcode": 451029,
        "city": "广西壮族自治区百色市田林县",
        "longitude": 106.228538,
        "latitude": 24.294488
    },
    {
        "adcode": 451030,
        "city": "广西壮族自治区百色市西林县",
        "longitude": 105.093837,
        "latitude": 24.48981
    },
    {
        "adcode": 451031,
        "city": "广西壮族自治区百色市隆林各族自治县",
        "longitude": 105.34404,
        "latitude": 24.770896
    },
    {
        "adcode": 451081,
        "city": "广西壮族自治区百色市靖西市",
        "longitude": 106.417549,
        "latitude": 23.134766
    },
    {
        "adcode": 451100,
        "city": "广西壮族自治区贺州市",
        "longitude": 111.566694,
        "latitude": 24.403582
    },
    {
        "adcode": 451101,
        "city": "广西壮族自治区贺州市市辖区",
        "longitude": 111.566694,
        "latitude": 24.403582
    },
    {
        "adcode": 451102,
        "city": "广西壮族自治区贺州市八步区",
        "longitude": 111.552077,
        "latitude": 24.411811
    },
    {
        "adcode": 451103,
        "city": "广西壮族自治区贺州市平桂区",
        "longitude": 111.1092045,
        "latitude": 24.1624695
    },
    {
        "adcode": 451121,
        "city": "广西壮族自治区贺州市昭平县",
        "longitude": 110.811287,
        "latitude": 24.16948
    },
    {
        "adcode": 451122,
        "city": "广西壮族自治区贺州市钟山县",
        "longitude": 111.303111,
        "latitude": 24.526022
    },
    {
        "adcode": 451123,
        "city": "广西壮族自治区贺州市富川瑶族自治县",
        "longitude": 111.277389,
        "latitude": 24.814444
    },
    {
        "adcode": 451200,
        "city": "广西壮族自治区河池市",
        "longitude": 108.085261,
        "latitude": 24.692931
    },
    {
        "adcode": 451201,
        "city": "广西壮族自治区河池市市辖区",
        "longitude": 108.085261,
        "latitude": 24.692931
    },
    {
        "adcode": 451202,
        "city": "广西壮族自治区河池市金城江区",
        "longitude": 108.037277,
        "latitude": 24.689703
    },
    {
        "adcode": 451203,
        "city": "广西壮族自治区河池市宜州区",
        "longitude": 111.479786,
        "latitude": 24.453898
    },
    {
        "adcode": 451221,
        "city": "广西壮族自治区河池市南丹县",
        "longitude": 107.540722,
        "latitude": 24.974486
    },
    {
        "adcode": 451222,
        "city": "广西壮族自治区河池市天峨县",
        "longitude": 107.173802,
        "latitude": 24.999108
    },
    {
        "adcode": 451223,
        "city": "广西壮族自治区河池市凤山县",
        "longitude": 107.042191,
        "latitude": 24.546876
    },
    {
        "adcode": 451224,
        "city": "广西壮族自治区河池市东兰县",
        "longitude": 107.374294,
        "latitude": 24.510842
    },
    {
        "adcode": 451225,
        "city": "广西壮族自治区河池市罗城仫佬族自治县",
        "longitude": 108.904761,
        "latitude": 24.777421
    },
    {
        "adcode": 451226,
        "city": "广西壮族自治区河池市环江毛南族自治县",
        "longitude": 108.258028,
        "latitude": 24.825664
    },
    {
        "adcode": 451227,
        "city": "广西壮族自治区河池市巴马瑶族自治县",
        "longitude": 107.258588,
        "latitude": 24.142299
    },
    {
        "adcode": 451228,
        "city": "广西壮族自治区河池市都安瑶族自治县",
        "longitude": 108.105312,
        "latitude": 23.932675
    },
    {
        "adcode": 451229,
        "city": "广西壮族自治区河池市大化瑶族自治县",
        "longitude": 107.99815,
        "latitude": 23.736457
    },
    {
        "adcode": 451300,
        "city": "广西壮族自治区来宾市",
        "longitude": 109.221465,
        "latitude": 23.750306
    },
    {
        "adcode": 451301,
        "city": "广西壮族自治区来宾市市辖区",
        "longitude": 109.221465,
        "latitude": 23.750306
    },
    {
        "adcode": 451302,
        "city": "广西壮族自治区来宾市兴宾区",
        "longitude": 109.233247,
        "latitude": 23.736153
    },
    {
        "adcode": 451321,
        "city": "广西壮族自治区来宾市忻城县",
        "longitude": 108.665666,
        "latitude": 24.066235
    },
    {
        "adcode": 451322,
        "city": "广西壮族自治区来宾市象州县",
        "longitude": 109.683985,
        "latitude": 23.958528
    },
    {
        "adcode": 451323,
        "city": "广西壮族自治区来宾市武宣县",
        "longitude": 109.663207,
        "latitude": 23.59411
    },
    {
        "adcode": 451324,
        "city": "广西壮族自治区来宾市金秀瑶族自治县",
        "longitude": 110.189462,
        "latitude": 24.130374
    },
    {
        "adcode": 451381,
        "city": "广西壮族自治区来宾市合山市",
        "longitude": 108.886082,
        "latitude": 23.806536
    },
    {
        "adcode": 451400,
        "city": "广西壮族自治区崇左市",
        "longitude": 107.364711,
        "latitude": 22.376532
    },
    {
        "adcode": 451401,
        "city": "广西壮族自治区崇左市市辖区",
        "longitude": 107.364711,
        "latitude": 22.376532
    },
    {
        "adcode": 451402,
        "city": "广西壮族自治区崇左市江州区",
        "longitude": 107.353437,
        "latitude": 22.405325
    },
    {
        "adcode": 451421,
        "city": "广西壮族自治区崇左市扶绥县",
        "longitude": 107.904187,
        "latitude": 22.635013
    },
    {
        "adcode": 451422,
        "city": "广西壮族自治区崇左市宁明县",
        "longitude": 107.076457,
        "latitude": 22.140192
    },
    {
        "adcode": 451423,
        "city": "广西壮族自治区崇左市龙州县",
        "longitude": 106.854451,
        "latitude": 22.342797
    },
    {
        "adcode": 451424,
        "city": "广西壮族自治区崇左市大新县",
        "longitude": 107.200654,
        "latitude": 22.829288
    },
    {
        "adcode": 451425,
        "city": "广西壮族自治区崇左市天等县",
        "longitude": 107.143433,
        "latitude": 23.081394
    },
    {
        "adcode": 451481,
        "city": "广西壮族自治区崇左市凭祥市",
        "longitude": 106.766293,
        "latitude": 22.094485
    },
    {
        "adcode": 460000,
        "city": "海南省",
        "longitude": 110.349228,
        "latitude": 20.017377
    },
    {
        "adcode": 460100,
        "city": "海南省海口市",
        "longitude": 110.198293,
        "latitude": 20.044001
    },
    {
        "adcode": 460101,
        "city": "海南省海口市市辖区",
        "longitude": 110.198293,
        "latitude": 20.044001
    },
    {
        "adcode": 460105,
        "city": "海南省海口市秀英区",
        "longitude": 110.293561,
        "latitude": 20.007969
    },
    {
        "adcode": 460106,
        "city": "海南省海口市龙华区",
        "longitude": 110.328492,
        "latitude": 20.031007
    },
    {
        "adcode": 460107,
        "city": "海南省海口市琼山区",
        "longitude": 110.353972,
        "latitude": 20.00317
    },
    {
        "adcode": 460108,
        "city": "海南省海口市美兰区",
        "longitude": 110.366357,
        "latitude": 20.029083
    },
    {
        "adcode": 460200,
        "city": "海南省三亚市",
        "longitude": 109.511909,
        "latitude": 18.252847
    },
    {
        "adcode": 460201,
        "city": "海南省三亚市市辖区",
        "longitude": 109.511909,
        "latitude": 18.252847
    },
    {
        "adcode": 460202,
        "city": "海南省三亚市海棠区",
        "longitude": 109.760778,
        "latitude": 18.407516
    },
    {
        "adcode": 460203,
        "city": "海南省三亚市吉阳区",
        "longitude": 109.57833,
        "latitude": 18.281397
    },
    {
        "adcode": 460204,
        "city": "海南省三亚市天涯区",
        "longitude": 109.506357,
        "latitude": 18.24734
    },
    {
        "adcode": 460205,
        "city": "海南省三亚市崖州区",
        "longitude": 109.174313,
        "latitude": 18.352212
    },
    {
        "adcode": 460300,
        "city": "海南省三沙市",
        "longitude": 112.338695,
        "latitude": 16.831839
    },
    {
        "adcode": 460301,
        "city": "海南省三沙市市辖区",
        "longitude": 112.338695,
        "latitude": 16.831839
    },
    {
        "adcode": 460321,
        "city": "海南省三沙市西沙群岛西沙群岛",
        "longitude": 112.026538,
        "latitude": 16.330358
    },
    {
        "adcode": 460322,
        "city": "海南省三沙市南沙群岛",
        "longitude": 116.749998,
        "latitude": 11.471888
    },
    {
        "adcode": 460323,
        "city": "海南省三沙市中沙群岛的岛礁及其海域",
        "longitude": 117.740071,
        "latitude": 15.112856
    },
    {
        "adcode": 460400,
        "city": "海南省儋州市",
        "longitude": 109.580811,
        "latitude": 19.521134
    },
    {
        "adcode": 469001,
        "city": "海南省五指山市",
        "longitude": 109.516925,
        "latitude": 18.775146
    },
    {
        "adcode": 469002,
        "city": "海南省琼海市",
        "longitude": 110.474581,
        "latitude": 19.25914
    },
    {
        "adcode": 469005,
        "city": "海南省文昌市",
        "longitude": 110.797717,
        "latitude": 19.543422
    },
    {
        "adcode": 469006,
        "city": "海南省万宁市",
        "longitude": 110.391073,
        "latitude": 18.795143
    },
    {
        "adcode": 469007,
        "city": "海南省东方市",
        "longitude": 108.651815,
        "latitude": 19.095351
    },
    {
        "adcode": 469021,
        "city": "海南省定安县",
        "longitude": 110.358891,
        "latitude": 19.681434
    },
    {
        "adcode": 469022,
        "city": "海南省屯昌县",
        "longitude": 110.103415,
        "latitude": 19.351766
    },
    {
        "adcode": 469023,
        "city": "海南省澄迈县",
        "longitude": 110.006755,
        "latitude": 19.738521
    },
    {
        "adcode": 469024,
        "city": "海南省临高县",
        "longitude": 109.690508,
        "latitude": 19.912026
    },
    {
        "adcode": 469025,
        "city": "海南省白沙黎族自治县",
        "longitude": 109.451484,
        "latitude": 19.224823
    },
    {
        "adcode": 469026,
        "city": "海南省昌江黎族自治县",
        "longitude": 109.055724,
        "latitude": 19.298062
    },
    {
        "adcode": 469027,
        "city": "海南省乐东黎族自治县",
        "longitude": 109.173055,
        "latitude": 18.75026
    },
    {
        "adcode": 469028,
        "city": "海南省陵水黎族自治县",
        "longitude": 110.037504,
        "latitude": 18.506048
    },
    {
        "adcode": 469029,
        "city": "海南省保亭黎族苗族自治县",
        "longitude": 109.702392,
        "latitude": 18.638189
    },
    {
        "adcode": 469030,
        "city": "海南省琼中黎族苗族自治县",
        "longitude": 109.838389,
        "latitude": 19.033369
    },
    {
        "adcode": 500000,
        "city": "重庆市",
        "longitude": 106.551556,
        "latitude": 29.563009
    },
    {
        "adcode": 500100,
        "city": "重庆市市辖区",
        "longitude": 106.551556,
        "latitude": 29.563009
    },
    {
        "adcode": 500101,
        "city": "重庆市万州区",
        "longitude": 108.408661,
        "latitude": 30.807667
    },
    {
        "adcode": 500102,
        "city": "重庆市涪陵区",
        "longitude": 107.389298,
        "latitude": 29.703113
    },
    {
        "adcode": 500103,
        "city": "重庆市渝中区",
        "longitude": 106.568892,
        "latitude": 29.55275
    },
    {
        "adcode": 500104,
        "city": "重庆市大渡口区",
        "longitude": 106.482347,
        "latitude": 29.484527
    },
    {
        "adcode": 500105,
        "city": "重庆市江北区",
        "longitude": 106.574271,
        "latitude": 29.606703
    },
    {
        "adcode": 500106,
        "city": "重庆市沙坪坝区",
        "longitude": 106.456878,
        "latitude": 29.541145
    },
    {
        "adcode": 500107,
        "city": "重庆市九龙坡区",
        "longitude": 106.53192,
        "latitude": 29.51419
    },
    {
        "adcode": 500108,
        "city": "重庆市南岸区",
        "longitude": 106.644428,
        "latitude": 29.500297
    },
    {
        "adcode": 500109,
        "city": "重庆市北碚区",
        "longitude": 106.445122,
        "latitude": 29.822616
    },
    {
        "adcode": 500110,
        "city": "重庆市綦江区",
        "longitude": 106.651362,
        "latitude": 29.028067
    },
    {
        "adcode": 500111,
        "city": "重庆市大足区",
        "longitude": 105.721733,
        "latitude": 29.707032
    },
    {
        "adcode": 500112,
        "city": "重庆市渝北区",
        "longitude": 106.631187,
        "latitude": 29.718143
    },
    {
        "adcode": 500113,
        "city": "重庆市巴南区",
        "longitude": 106.53384,
        "latitude": 29.375528
    },
    {
        "adcode": 500114,
        "city": "重庆市黔江区",
        "longitude": 108.770678,
        "latitude": 29.53361
    },
    {
        "adcode": 500115,
        "city": "重庆市长寿区",
        "longitude": 107.081283,
        "latitude": 29.857996
    },
    {
        "adcode": 500116,
        "city": "重庆市江津区",
        "longitude": 106.259281,
        "latitude": 29.290069
    },
    {
        "adcode": 500117,
        "city": "重庆市合川区",
        "longitude": 106.27613,
        "latitude": 29.972084
    },
    {
        "adcode": 500118,
        "city": "重庆市永川区",
        "longitude": 105.927376,
        "latitude": 29.356117
    },
    {
        "adcode": 500119,
        "city": "重庆市南川区",
        "longitude": 107.099266,
        "latitude": 29.157891
    },
    {
        "adcode": 500120,
        "city": "重庆市璧山区",
        "longitude": 106.227305,
        "latitude": 29.592024
    },
    {
        "adcode": 500151,
        "city": "重庆市铜梁区",
        "longitude": 106.056404,
        "latitude": 29.844811
    },
    {
        "adcode": 500152,
        "city": "重庆市潼南区",
        "longitude": 105.840556,
        "latitude": 30.191013
    },
    {
        "adcode": 500153,
        "city": "重庆市荣昌区",
        "longitude": 105.594623,
        "latitude": 29.405002
    },
    {
        "adcode": 500154,
        "city": "重庆市开州区",
        "longitude": 108.393135,
        "latitude": 31.160711
    },
    {
        "adcode": 500155,
        "city": "重庆市梁平区",
        "longitude": 107.769581,
        "latitude": 30.65423
    },
    {
        "adcode": 500156,
        "city": "重庆市武隆区",
        "longitude": 107.760025,
        "latitude": 29.325601
    },
    {
        "adcode": 500200,
        "city": "重庆市",
        "longitude": 106.551556,
        "latitude": 29.563009
    },
    {
        "adcode": 500229,
        "city": "重庆市城口县",
        "longitude": 108.664214,
        "latitude": 31.947633
    },
    {
        "adcode": 500230,
        "city": "重庆市丰都县",
        "longitude": 107.730895,
        "latitude": 29.8635
    },
    {
        "adcode": 500231,
        "city": "重庆市垫江县",
        "longitude": 107.33339,
        "latitude": 30.327717
    },
    {
        "adcode": 500233,
        "city": "重庆市忠县",
        "longitude": 108.039002,
        "latitude": 30.29956
    },
    {
        "adcode": 500235,
        "city": "重庆市云阳县",
        "longitude": 108.697324,
        "latitude": 30.930613
    },
    {
        "adcode": 500236,
        "city": "重庆市奉节县",
        "longitude": 109.463987,
        "latitude": 31.018498
    },
    {
        "adcode": 500237,
        "city": "重庆市巫山县",
        "longitude": 109.879153,
        "latitude": 31.074834
    },
    {
        "adcode": 500238,
        "city": "重庆市巫溪县",
        "longitude": 109.570062,
        "latitude": 31.398604
    },
    {
        "adcode": 500240,
        "city": "重庆市石柱土家族自治县",
        "longitude": 108.114069,
        "latitude": 29.999285
    },
    {
        "adcode": 500241,
        "city": "重庆市秀山土家族苗族自治县",
        "longitude": 109.007094,
        "latitude": 28.447997
    },
    {
        "adcode": 500242,
        "city": "重庆市酉阳土家族苗族自治县",
        "longitude": 108.767747,
        "latitude": 28.841244
    },
    {
        "adcode": 500243,
        "city": "重庆市彭水苗族土家族自治县",
        "longitude": 108.165538,
        "latitude": 29.293902
    },
    {
        "adcode": 510000,
        "city": "四川省",
        "longitude": 104.075931,
        "latitude": 30.651651
    },
    {
        "adcode": 510100,
        "city": "四川省成都市",
        "longitude": 104.066541,
        "latitude": 30.572269
    },
    {
        "adcode": 510101,
        "city": "四川省成都市市辖区",
        "longitude": 104.066541,
        "latitude": 30.572269
    },
    {
        "adcode": 510104,
        "city": "四川省成都市锦江区",
        "longitude": 104.080989,
        "latitude": 30.657689
    },
    {
        "adcode": 510105,
        "city": "四川省成都市青羊区",
        "longitude": 104.062499,
        "latitude": 30.674406
    },
    {
        "adcode": 510106,
        "city": "四川省成都市金牛区",
        "longitude": 104.117422,
        "latitude": 30.763102
    },
    {
        "adcode": 510107,
        "city": "四川省成都市武侯区",
        "longitude": 104.04339,
        "latitude": 30.641982
    },
    {
        "adcode": 510108,
        "city": "四川省成都市成华区",
        "longitude": 104.101255,
        "latitude": 30.660122
    },
    {
        "adcode": 510112,
        "city": "四川省成都市龙泉驿区",
        "longitude": 104.274632,
        "latitude": 30.556507
    },
    {
        "adcode": 510113,
        "city": "四川省成都市青白江区",
        "longitude": 104.250877,
        "latitude": 30.878681
    },
    {
        "adcode": 510114,
        "city": "四川省成都市新都区",
        "longitude": 104.158705,
        "latitude": 30.823499
    },
    {
        "adcode": 510115,
        "city": "四川省成都市温江区",
        "longitude": 103.837104,
        "latitude": 30.69046
    },
    {
        "adcode": 510116,
        "city": "四川省成都市双流区",
        "longitude": 103.951908,
        "latitude": 30.333027
    },
    {
        "adcode": 510117,
        "city": "四川省成都市郫都区",
        "longitude": 103.901092,
        "latitude": 30.795854
    },
    {
        "adcode": 510121,
        "city": "四川省成都市金堂县",
        "longitude": 104.412005,
        "latitude": 30.862017
    },
    {
        "adcode": 510129,
        "city": "四川省成都市大邑县",
        "longitude": 103.511875,
        "latitude": 30.572269
    },
    {
        "adcode": 510131,
        "city": "四川省成都市蒲江县",
        "longitude": 103.506498,
        "latitude": 30.196789
    },
    {
        "adcode": 510132,
        "city": "四川省成都市新津县",
        "longitude": 103.811345,
        "latitude": 30.410222
    },
    {
        "adcode": 510181,
        "city": "四川省成都市都江堰市",
        "longitude": 103.650219,
        "latitude": 30.975943
    },
    {
        "adcode": 510182,
        "city": "四川省成都市彭州市",
        "longitude": 103.958013,
        "latitude": 30.990165
    },
    {
        "adcode": 510183,
        "city": "四川省成都市邛崃市",
        "longitude": 103.464156,
        "latitude": 30.410275
    },
    {
        "adcode": 510184,
        "city": "四川省成都市崇州市",
        "longitude": 103.673001,
        "latitude": 30.630122
    },
    {
        "adcode": 510185,
        "city": "四川省成都市简阳市",
        "longitude": 104.546773,
        "latitude": 30.410754
    },
    {
        "adcode": 510300,
        "city": "四川省自贡市",
        "longitude": 104.778442,
        "latitude": 29.33903
    },
    {
        "adcode": 510301,
        "city": "四川省自贡市市辖区",
        "longitude": 104.778442,
        "latitude": 29.33903
    },
    {
        "adcode": 510302,
        "city": "四川省自贡市自流井区",
        "longitude": 104.777191,
        "latitude": 29.33743
    },
    {
        "adcode": 510303,
        "city": "四川省自贡市贡井区",
        "longitude": 104.715117,
        "latitude": 29.345546
    },
    {
        "adcode": 510304,
        "city": "四川省自贡市大安区",
        "longitude": 104.773968,
        "latitude": 29.363634
    },
    {
        "adcode": 510311,
        "city": "四川省自贡市沿滩区",
        "longitude": 104.874073,
        "latitude": 29.272581
    },
    {
        "adcode": 510321,
        "city": "四川省自贡市荣县",
        "longitude": 104.417388,
        "latitude": 29.44541
    },
    {
        "adcode": 510322,
        "city": "四川省自贡市富顺县",
        "longitude": 104.975048,
        "latitude": 29.18143
    },
    {
        "adcode": 510400,
        "city": "四川省攀枝花市",
        "longitude": 101.718637,
        "latitude": 26.582347
    },
    {
        "adcode": 510401,
        "city": "四川省攀枝花市市辖区",
        "longitude": 101.718637,
        "latitude": 26.582347
    },
    {
        "adcode": 510402,
        "city": "四川省攀枝花市东区",
        "longitude": 101.718637,
        "latitude": 26.582347
    },
    {
        "adcode": 510403,
        "city": "四川省攀枝花市西区",
        "longitude": 101.718637,
        "latitude": 26.582347
    },
    {
        "adcode": 510411,
        "city": "四川省攀枝花市仁和区",
        "longitude": 101.738528,
        "latitude": 26.497765
    },
    {
        "adcode": 510421,
        "city": "四川省攀枝花市米易县",
        "longitude": 102.110339,
        "latitude": 26.890689
    },
    {
        "adcode": 510422,
        "city": "四川省攀枝花市盐边县",
        "longitude": 101.855071,
        "latitude": 26.683213
    },
    {
        "adcode": 510500,
        "city": "四川省泸州市",
        "longitude": 105.442258,
        "latitude": 28.871811
    },
    {
        "adcode": 510501,
        "city": "四川省泸州市市辖区",
        "longitude": 105.442258,
        "latitude": 28.871811
    },
    {
        "adcode": 510502,
        "city": "四川省泸州市江阳区",
        "longitude": 105.435009,
        "latitude": 28.878818
    },
    {
        "adcode": 510503,
        "city": "四川省泸州市纳溪区",
        "longitude": 105.371151,
        "latitude": 28.773428
    },
    {
        "adcode": 510504,
        "city": "四川省泸州市龙马潭区",
        "longitude": 105.437765,
        "latitude": 28.913221
    },
    {
        "adcode": 510521,
        "city": "四川省泸州市泸县",
        "longitude": 105.381893,
        "latitude": 29.151534
    },
    {
        "adcode": 510522,
        "city": "四川省泸州市合江县",
        "longitude": 105.831067,
        "latitude": 28.811203
    },
    {
        "adcode": 510524,
        "city": "四川省泸州市叙永县",
        "longitude": 105.444765,
        "latitude": 28.155801
    },
    {
        "adcode": 510525,
        "city": "四川省泸州市古蔺县",
        "longitude": 105.812602,
        "latitude": 28.038802
    },
    {
        "adcode": 510600,
        "city": "四川省德阳市",
        "longitude": 104.397894,
        "latitude": 31.126855
    },
    {
        "adcode": 510601,
        "city": "四川省德阳市市辖区",
        "longitude": 104.397894,
        "latitude": 31.126855
    },
    {
        "adcode": 510603,
        "city": "四川省德阳市旌阳区",
        "longitude": 104.416943,
        "latitude": 31.142498
    },
    {
        "adcode": 510604,
        "city": "四川省德阳市罗江区罗江",
        "longitude": 104.509602,
        "latitude": 31.296847
    },
    {
        "adcode": 510623,
        "city": "四川省德阳市中江县",
        "longitude": 104.678749,
        "latitude": 31.033051
    },
    {
        "adcode": 510681,
        "city": "四川省德阳市广汉市",
        "longitude": 104.282331,
        "latitude": 30.976165
    },
    {
        "adcode": 510682,
        "city": "四川省德阳市什邡市",
        "longitude": 104.167501,
        "latitude": 31.12678
    },
    {
        "adcode": 510683,
        "city": "四川省德阳市绵竹市",
        "longitude": 104.22075,
        "latitude": 31.338077
    },
    {
        "adcode": 510700,
        "city": "四川省绵阳市",
        "longitude": 104.679114,
        "latitude": 31.46745
    },
    {
        "adcode": 510701,
        "city": "四川省绵阳市市辖区",
        "longitude": 104.679114,
        "latitude": 31.46745
    },
    {
        "adcode": 510703,
        "city": "四川省绵阳市涪城区",
        "longitude": 104.750215,
        "latitude": 31.47083
    },
    {
        "adcode": 510704,
        "city": "四川省绵阳市游仙区",
        "longitude": 104.766393,
        "latitude": 31.473779
    },
    {
        "adcode": 510705,
        "city": "四川省绵阳市安州区",
        "longitude": 104.567187,
        "latitude": 31.534886
    },
    {
        "adcode": 510722,
        "city": "四川省绵阳市三台县",
        "longitude": 105.094586,
        "latitude": 31.095979
    },
    {
        "adcode": 510723,
        "city": "四川省绵阳市盐亭县",
        "longitude": 105.389453,
        "latitude": 31.208363
    },
    {
        "adcode": 510725,
        "city": "四川省绵阳市梓潼县",
        "longitude": 105.170845,
        "latitude": 31.642718
    },
    {
        "adcode": 510726,
        "city": "四川省绵阳市北川羌族自治县",
        "longitude": 104.46797,
        "latitude": 31.617203
    },
    {
        "adcode": 510727,
        "city": "四川省绵阳市平武县",
        "longitude": 104.555583,
        "latitude": 32.409675
    },
    {
        "adcode": 510781,
        "city": "四川省绵阳市江油市",
        "longitude": 104.745877,
        "latitude": 31.778025
    },
    {
        "adcode": 510800,
        "city": "四川省广元市",
        "longitude": 105.843357,
        "latitude": 32.435435
    },
    {
        "adcode": 510801,
        "city": "四川省广元市市辖区",
        "longitude": 105.843357,
        "latitude": 32.435435
    },
    {
        "adcode": 510802,
        "city": "四川省广元市利州区",
        "longitude": 105.845218,
        "latitude": 32.433898
    },
    {
        "adcode": 510811,
        "city": "四川省广元市昭化区",
        "longitude": 105.964121,
        "latitude": 32.322788
    },
    {
        "adcode": 510812,
        "city": "四川省广元市朝天区",
        "longitude": 105.890445,
        "latitude": 32.643982
    },
    {
        "adcode": 510821,
        "city": "四川省广元市旺苍县",
        "longitude": 106.289905,
        "latitude": 32.228917
    },
    {
        "adcode": 510822,
        "city": "四川省广元市青川县",
        "longitude": 105.238842,
        "latitude": 32.575485
    },
    {
        "adcode": 510823,
        "city": "四川省广元市剑阁县",
        "longitude": 105.524766,
        "latitude": 32.287723
    },
    {
        "adcode": 510824,
        "city": "四川省广元市苍溪县",
        "longitude": 105.934801,
        "latitude": 31.732432
    },
    {
        "adcode": 510900,
        "city": "四川省遂宁市",
        "longitude": 105.592898,
        "latitude": 30.532847
    },
    {
        "adcode": 510901,
        "city": "四川省遂宁市市辖区",
        "longitude": 105.592898,
        "latitude": 30.532847
    },
    {
        "adcode": 510903,
        "city": "四川省遂宁市船山区",
        "longitude": 105.568297,
        "latitude": 30.525475
    },
    {
        "adcode": 510904,
        "city": "四川省遂宁市安居区",
        "longitude": 105.456342,
        "latitude": 30.355379
    },
    {
        "adcode": 510921,
        "city": "四川省遂宁市蓬溪县",
        "longitude": 105.70757,
        "latitude": 30.757575
    },
    {
        "adcode": 510922,
        "city": "四川省遂宁市射洪县",
        "longitude": 105.388405,
        "latitude": 30.870986
    },
    {
        "adcode": 510923,
        "city": "四川省遂宁市大英县",
        "longitude": 105.236904,
        "latitude": 30.594337
    },
    {
        "adcode": 511000,
        "city": "四川省内江市",
        "longitude": 105.058433,
        "latitude": 29.580228
    },
    {
        "adcode": 511001,
        "city": "四川省内江市市辖区",
        "longitude": 105.058433,
        "latitude": 29.580228
    },
    {
        "adcode": 511002,
        "city": "四川省内江市市中区",
        "longitude": 105.067597,
        "latitude": 29.587053
    },
    {
        "adcode": 511011,
        "city": "四川省内江市东兴区",
        "longitude": 105.07549,
        "latitude": 29.592756
    },
    {
        "adcode": 511024,
        "city": "四川省内江市威远县",
        "longitude": 104.668879,
        "latitude": 29.52744
    },
    {
        "adcode": 511025,
        "city": "四川省内江市资中县",
        "longitude": 104.851944,
        "latitude": 29.764059
    },
    {
        "adcode": 511083,
        "city": "四川省内江市隆昌市",
        "longitude": 105.287612,
        "latitude": 29.339476
    },
    {
        "adcode": 511100,
        "city": "四川省乐山市",
        "longitude": 103.765568,
        "latitude": 29.552106
    },
    {
        "adcode": 511101,
        "city": "四川省乐山市市辖区",
        "longitude": 103.765568,
        "latitude": 29.552106
    },
    {
        "adcode": 511102,
        "city": "四川省乐山市市中区",
        "longitude": 103.76133,
        "latitude": 29.555375
    },
    {
        "adcode": 511111,
        "city": "四川省乐山市沙湾区",
        "longitude": 103.549991,
        "latitude": 29.413091
    },
    {
        "adcode": 511112,
        "city": "四川省乐山市五通桥区",
        "longitude": 103.818009,
        "latitude": 29.406932
    },
    {
        "adcode": 511113,
        "city": "四川省乐山市金口河区",
        "longitude": 103.078621,
        "latitude": 29.244345
    },
    {
        "adcode": 511123,
        "city": "四川省乐山市犍为县",
        "longitude": 103.949326,
        "latitude": 29.208171
    },
    {
        "adcode": 511124,
        "city": "四川省乐山市井研县",
        "longitude": 104.069726,
        "latitude": 29.651287
    },
    {
        "adcode": 511126,
        "city": "四川省乐山市夹江县",
        "longitude": 103.571657,
        "latitude": 29.73763
    },
    {
        "adcode": 511129,
        "city": "四川省乐山市沐川县",
        "longitude": 103.902335,
        "latitude": 28.956647
    },
    {
        "adcode": 511132,
        "city": "四川省乐山市峨边彝族自治县",
        "longitude": 103.262048,
        "latitude": 29.230425
    },
    {
        "adcode": 511133,
        "city": "四川省乐山市马边彝族自治县",
        "longitude": 103.546348,
        "latitude": 28.835521
    },
    {
        "adcode": 511181,
        "city": "四川省乐山市峨眉山市",
        "longitude": 103.484504,
        "latitude": 29.601199
    },
    {
        "adcode": 511300,
        "city": "四川省南充市",
        "longitude": 106.110698,
        "latitude": 30.837793
    },
    {
        "adcode": 511301,
        "city": "四川省南充市市辖区",
        "longitude": 106.110698,
        "latitude": 30.837793
    },
    {
        "adcode": 511302,
        "city": "四川省南充市顺庆区",
        "longitude": 106.092399,
        "latitude": 30.796486
    },
    {
        "adcode": 511303,
        "city": "四川省南充市高坪区",
        "longitude": 106.118808,
        "latitude": 30.781623
    },
    {
        "adcode": 511304,
        "city": "四川省南充市嘉陵区",
        "longitude": 106.071793,
        "latitude": 30.758748
    },
    {
        "adcode": 511321,
        "city": "四川省南充市南部县",
        "longitude": 106.036584,
        "latitude": 31.347467
    },
    {
        "adcode": 511322,
        "city": "四川省南充市营山县",
        "longitude": 106.56542,
        "latitude": 31.076461
    },
    {
        "adcode": 511323,
        "city": "四川省南充市蓬安县",
        "longitude": 106.412151,
        "latitude": 31.029097
    },
    {
        "adcode": 511324,
        "city": "四川省南充市仪陇县",
        "longitude": 106.303042,
        "latitude": 31.271562
    },
    {
        "adcode": 511325,
        "city": "四川省南充市西充县",
        "longitude": 105.900878,
        "latitude": 30.995669
    },
    {
        "adcode": 511381,
        "city": "四川省南充市阆中市",
        "longitude": 106.005047,
        "latitude": 31.558357
    },
    {
        "adcode": 511400,
        "city": "四川省眉山市",
        "longitude": 103.848538,
        "latitude": 30.075439
    },
    {
        "adcode": 511401,
        "city": "四川省眉山市市辖区",
        "longitude": 103.848538,
        "latitude": 30.075439
    },
    {
        "adcode": 511402,
        "city": "四川省眉山市东坡区",
        "longitude": 103.831752,
        "latitude": 30.042345
    },
    {
        "adcode": 511403,
        "city": "四川省眉山市彭山区",
        "longitude": 103.87295,
        "latitude": 30.193056
    },
    {
        "adcode": 511421,
        "city": "四川省眉山市仁寿县",
        "longitude": 104.134082,
        "latitude": 29.99563
    },
    {
        "adcode": 511423,
        "city": "四川省眉山市洪雅县",
        "longitude": 103.372863,
        "latitude": 29.90489
    },
    {
        "adcode": 511424,
        "city": "四川省眉山市丹棱县",
        "longitude": 103.512733,
        "latitude": 30.014448
    },
    {
        "adcode": 511425,
        "city": "四川省眉山市青神县",
        "longitude": 103.846688,
        "latitude": 29.831358
    },
    {
        "adcode": 511500,
        "city": "四川省宜宾市",
        "longitude": 104.643215,
        "latitude": 28.751768
    },
    {
        "adcode": 511501,
        "city": "四川省宜宾市市辖区",
        "longitude": 104.643215,
        "latitude": 28.751768
    },
    {
        "adcode": 511502,
        "city": "四川省宜宾市翠屏区翠屏区",
        "longitude": 104.644534,
        "latitude": 28.758563
    },
    {
        "adcode": 511503,
        "city": "四川省宜宾市南溪区",
        "longitude": 104.969882,
        "latitude": 28.845626
    },
    {
        "adcode": 511504,
        "city": "四川省宜宾市叙州区",
        "longitude": 108.63628,
        "latitude": 24.485263
    },
    {
        "adcode": 511523,
        "city": "四川省宜宾市江安县",
        "longitude": 105.066943,
        "latitude": 28.723999
    },
    {
        "adcode": 511524,
        "city": "四川省宜宾市长宁县长宁县",
        "longitude": 104.914158,
        "latitude": 28.577349
    },
    {
        "adcode": 511525,
        "city": "四川省宜宾市高县高县",
        "longitude": 104.518187,
        "latitude": 28.435036
    },
    {
        "adcode": 511526,
        "city": "四川省宜宾市珙县珙县",
        "longitude": 104.713083,
        "latitude": 28.443674
    },
    {
        "adcode": 511527,
        "city": "四川省宜宾市筠连县",
        "longitude": 104.510988,
        "latitude": 28.16386
    },
    {
        "adcode": 511528,
        "city": "四川省宜宾市兴文县",
        "longitude": 105.236325,
        "latitude": 28.303614
    },
    {
        "adcode": 511529,
        "city": "四川省宜宾市屏山县屏山县",
        "longitude": 104.156008,
        "latitude": 28.708446
    },
    {
        "adcode": 511600,
        "city": "四川省广安市",
        "longitude": 106.633212,
        "latitude": 30.455961
    },
    {
        "adcode": 511601,
        "city": "四川省广安市市辖区",
        "longitude": 106.633212,
        "latitude": 30.455961
    },
    {
        "adcode": 511602,
        "city": "四川省广安市广安区",
        "longitude": 106.641608,
        "latitude": 30.474003
    },
    {
        "adcode": 511603,
        "city": "四川省广安市前锋区",
        "longitude": 106.893277,
        "latitude": 30.4963
    },
    {
        "adcode": 511621,
        "city": "四川省广安市岳池县",
        "longitude": 106.440114,
        "latitude": 30.537863
    },
    {
        "adcode": 511622,
        "city": "四川省广安市武胜县",
        "longitude": 106.295764,
        "latitude": 30.348772
    },
    {
        "adcode": 511623,
        "city": "四川省广安市邻水县",
        "longitude": 106.93038,
        "latitude": 30.334769
    },
    {
        "adcode": 511681,
        "city": "四川省广安市华蓥市",
        "longitude": 106.783088,
        "latitude": 30.390435
    },
    {
        "adcode": 511700,
        "city": "四川省达州市",
        "longitude": 107.468023,
        "latitude": 31.209571
    },
    {
        "adcode": 511701,
        "city": "四川省达州市市辖区",
        "longitude": 107.468023,
        "latitude": 31.209571
    },
    {
        "adcode": 511702,
        "city": "四川省达州市通川区",
        "longitude": 107.504517,
        "latitude": 31.214724
    },
    {
        "adcode": 511703,
        "city": "四川省达州市达川区",
        "longitude": 107.511845,
        "latitude": 31.196118
    },
    {
        "adcode": 511722,
        "city": "四川省达州市宣汉县",
        "longitude": 107.727191,
        "latitude": 31.353835
    },
    {
        "adcode": 511723,
        "city": "四川省达州市开江县",
        "longitude": 107.868736,
        "latitude": 31.082987
    },
    {
        "adcode": 511724,
        "city": "四川省达州市大竹县",
        "longitude": 107.204744,
        "latitude": 30.736266
    },
    {
        "adcode": 511725,
        "city": "四川省达州市渠县",
        "longitude": 106.972996,
        "latitude": 30.836659
    },
    {
        "adcode": 511781,
        "city": "四川省达州市万源市",
        "longitude": 108.034657,
        "latitude": 32.081631
    },
    {
        "adcode": 511800,
        "city": "四川省雅安市",
        "longitude": 103.013261,
        "latitude": 29.980537
    },
    {
        "adcode": 511801,
        "city": "四川省雅安市市辖区",
        "longitude": 103.013261,
        "latitude": 29.980537
    },
    {
        "adcode": 511802,
        "city": "四川省雅安市雨城区",
        "longitude": 103.033083,
        "latitude": 30.005447
    },
    {
        "adcode": 511803,
        "city": "四川省雅安市名山区",
        "longitude": 103.109185,
        "latitude": 30.069954
    },
    {
        "adcode": 511822,
        "city": "四川省雅安市荥经县",
        "longitude": 102.846738,
        "latitude": 29.792931
    },
    {
        "adcode": 511823,
        "city": "四川省雅安市汉源县",
        "longitude": 102.645453,
        "latitude": 29.347187
    },
    {
        "adcode": 511824,
        "city": "四川省雅安市石棉县",
        "longitude": 102.359462,
        "latitude": 29.227874
    },
    {
        "adcode": 511825,
        "city": "四川省雅安市天全县",
        "longitude": 102.758317,
        "latitude": 30.066713
    },
    {
        "adcode": 511826,
        "city": "四川省雅安市芦山县",
        "longitude": 102.92826,
        "latitude": 30.144084
    },
    {
        "adcode": 511827,
        "city": "四川省雅安市宝兴县",
        "longitude": 102.814531,
        "latitude": 30.368126
    },
    {
        "adcode": 511900,
        "city": "四川省巴中市",
        "longitude": 106.747477,
        "latitude": 31.867903
    },
    {
        "adcode": 511901,
        "city": "四川省巴中市市辖区",
        "longitude": 106.747477,
        "latitude": 31.867903
    },
    {
        "adcode": 511902,
        "city": "四川省巴中市巴州区",
        "longitude": 106.768878,
        "latitude": 31.851478
    },
    {
        "adcode": 511903,
        "city": "四川省巴中市恩阳区",
        "longitude": 106.655347,
        "latitude": 31.786691
    },
    {
        "adcode": 511921,
        "city": "四川省巴中市通江县",
        "longitude": 107.245033,
        "latitude": 31.911705
    },
    {
        "adcode": 511922,
        "city": "四川省巴中市南江县",
        "longitude": 106.828697,
        "latitude": 32.346589
    },
    {
        "adcode": 511923,
        "city": "四川省巴中市平昌县",
        "longitude": 107.104008,
        "latitude": 31.560874
    },
    {
        "adcode": 512000,
        "city": "四川省资阳市",
        "longitude": 104.627636,
        "latitude": 30.128901
    },
    {
        "adcode": 512001,
        "city": "四川省资阳市市辖区",
        "longitude": 104.627636,
        "latitude": 30.128901
    },
    {
        "adcode": 512002,
        "city": "四川省资阳市雁江区",
        "longitude": 104.677096,
        "latitude": 30.10821
    },
    {
        "adcode": 512021,
        "city": "四川省资阳市安岳县",
        "longitude": 105.335613,
        "latitude": 30.097246
    },
    {
        "adcode": 512022,
        "city": "四川省资阳市乐至县",
        "longitude": 105.019916,
        "latitude": 30.275487
    },
    {
        "adcode": 513200,
        "city": "四川省阿坝藏族羌族自治州",
        "longitude": 102.224653,
        "latitude": 31.899413
    },
    {
        "adcode": 513201,
        "city": "四川省阿坝藏族羌族自治州马尔康市",
        "longitude": 102.206504,
        "latitude": 31.905813
    },
    {
        "adcode": 513221,
        "city": "四川省阿坝藏族羌族自治州汶川县",
        "longitude": 103.590387,
        "latitude": 31.476822
    },
    {
        "adcode": 513222,
        "city": "四川省阿坝藏族羌族自治州理县",
        "longitude": 103.166853,
        "latitude": 31.436473
    },
    {
        "adcode": 513223,
        "city": "四川省阿坝藏族羌族自治州茂县",
        "longitude": 103.853522,
        "latitude": 31.681154
    },
    {
        "adcode": 513224,
        "city": "四川省阿坝藏族羌族自治州松潘县",
        "longitude": 103.604698,
        "latitude": 32.655325
    },
    {
        "adcode": 513225,
        "city": "四川省阿坝藏族羌族自治州九寨沟县",
        "longitude": 104.243841,
        "latitude": 33.252056
    },
    {
        "adcode": 513226,
        "city": "四川省阿坝藏族羌族自治州金川县",
        "longitude": 102.063829,
        "latitude": 31.476277
    },
    {
        "adcode": 513227,
        "city": "四川省阿坝藏族羌族自治州小金县",
        "longitude": 102.364373,
        "latitude": 30.999031
    },
    {
        "adcode": 513228,
        "city": "四川省阿坝藏族羌族自治州黑水县",
        "longitude": 102.990108,
        "latitude": 32.061895
    },
    {
        "adcode": 513230,
        "city": "四川省阿坝藏族羌族自治州壤塘县",
        "longitude": 100.978526,
        "latitude": 32.265796
    },
    {
        "adcode": 513231,
        "city": "四川省阿坝藏族羌族自治州阿坝县",
        "longitude": 101.706655,
        "latitude": 32.902459
    },
    {
        "adcode": 513232,
        "city": "四川省阿坝藏族羌族自治州若尔盖县",
        "longitude": 102.961798,
        "latitude": 33.575892
    },
    {
        "adcode": 513233,
        "city": "四川省阿坝藏族羌族自治州红原县",
        "longitude": 102.544405,
        "latitude": 32.790891
    },
    {
        "adcode": 513300,
        "city": "四川省甘孜藏族自治州",
        "longitude": 101.96231,
        "latitude": 30.04952
    },
    {
        "adcode": 513301,
        "city": "四川省甘孜藏族自治州康定市",
        "longitude": 101.957146,
        "latitude": 29.998436
    },
    {
        "adcode": 513322,
        "city": "四川省甘孜藏族自治州泸定县",
        "longitude": 102.234618,
        "latitude": 29.91416
    },
    {
        "adcode": 513323,
        "city": "四川省甘孜藏族自治州丹巴县",
        "longitude": 101.890358,
        "latitude": 30.878577
    },
    {
        "adcode": 513324,
        "city": "四川省甘孜藏族自治州九龙县",
        "longitude": 101.507294,
        "latitude": 29.000348
    },
    {
        "adcode": 513325,
        "city": "四川省甘孜藏族自治州雅江县",
        "longitude": 101.014425,
        "latitude": 30.031533
    },
    {
        "adcode": 513326,
        "city": "四川省甘孜藏族自治州道孚县",
        "longitude": 101.125237,
        "latitude": 30.979545
    },
    {
        "adcode": 513327,
        "city": "四川省甘孜藏族自治州炉霍县",
        "longitude": 100.676372,
        "latitude": 31.39179
    },
    {
        "adcode": 513328,
        "city": "四川省甘孜藏族自治州甘孜县",
        "longitude": 99.992671,
        "latitude": 31.622934
    },
    {
        "adcode": 513329,
        "city": "四川省甘孜藏族自治州新龙县",
        "longitude": 100.311369,
        "latitude": 30.939169
    },
    {
        "adcode": 513330,
        "city": "四川省甘孜藏族自治州德格县",
        "longitude": 98.580915,
        "latitude": 31.806118
    },
    {
        "adcode": 513331,
        "city": "四川省甘孜藏族自治州白玉县",
        "longitude": 98.824182,
        "latitude": 31.209913
    },
    {
        "adcode": 513332,
        "city": "四川省甘孜藏族自治州石渠县",
        "longitude": 98.1029,
        "latitude": 32.97896
    },
    {
        "adcode": 513333,
        "city": "四川省甘孜藏族自治州色达县",
        "longitude": 100.332743,
        "latitude": 32.268129
    },
    {
        "adcode": 513334,
        "city": "四川省甘孜藏族自治州理塘县",
        "longitude": 100.269818,
        "latitude": 29.996049
    },
    {
        "adcode": 513335,
        "city": "四川省甘孜藏族自治州巴塘县",
        "longitude": 99.110712,
        "latitude": 30.004677
    },
    {
        "adcode": 513336,
        "city": "四川省甘孜藏族自治州乡城县",
        "longitude": 99.798435,
        "latitude": 28.931172
    },
    {
        "adcode": 513337,
        "city": "四川省甘孜藏族自治州稻城县",
        "longitude": 100.298403,
        "latitude": 29.037007
    },
    {
        "adcode": 513338,
        "city": "四川省甘孜藏族自治州得荣县",
        "longitude": 99.286335,
        "latitude": 28.713037
    },
    {
        "adcode": 513400,
        "city": "四川省凉山彝族自治州",
        "longitude": 102.267335,
        "latitude": 27.88161
    },
    {
        "adcode": 513401,
        "city": "四川省凉山彝族自治州西昌市",
        "longitude": 102.264449,
        "latitude": 27.894504
    },
    {
        "adcode": 513422,
        "city": "四川省凉山彝族自治州木里藏族自治县",
        "longitude": 101.280206,
        "latitude": 27.928835
    },
    {
        "adcode": 513423,
        "city": "四川省凉山彝族自治州盐源县",
        "longitude": 101.509188,
        "latitude": 27.422645
    },
    {
        "adcode": 513424,
        "city": "四川省凉山彝族自治州德昌县",
        "longitude": 102.17567,
        "latitude": 27.402839
    },
    {
        "adcode": 513425,
        "city": "四川省凉山彝族自治州会理县",
        "longitude": 102.244683,
        "latitude": 26.655026
    },
    {
        "adcode": 513426,
        "city": "四川省凉山彝族自治州会东县",
        "longitude": 102.577961,
        "latitude": 26.634669
    },
    {
        "adcode": 513427,
        "city": "四川省凉山彝族自治州宁南县",
        "longitude": 102.759634,
        "latitude": 27.066384
    },
    {
        "adcode": 513428,
        "city": "四川省凉山彝族自治州普格县",
        "longitude": 102.540901,
        "latitude": 27.376413
    },
    {
        "adcode": 513429,
        "city": "四川省凉山彝族自治州布拖县",
        "longitude": 102.811631,
        "latitude": 27.706192
    },
    {
        "adcode": 513430,
        "city": "四川省凉山彝族自治州金阳县",
        "longitude": 103.248772,
        "latitude": 27.696861
    },
    {
        "adcode": 513431,
        "city": "四川省凉山彝族自治州昭觉县",
        "longitude": 102.842611,
        "latitude": 28.014088
    },
    {
        "adcode": 513432,
        "city": "四川省凉山彝族自治州喜德县",
        "longitude": 102.412518,
        "latitude": 28.306726
    },
    {
        "adcode": 513433,
        "city": "四川省凉山彝族自治州冕宁县",
        "longitude": 102.17701,
        "latitude": 28.549657
    },
    {
        "adcode": 513434,
        "city": "四川省凉山彝族自治州越西县",
        "longitude": 102.50768,
        "latitude": 28.639801
    },
    {
        "adcode": 513435,
        "city": "四川省凉山彝族自治州甘洛县",
        "longitude": 102.771749,
        "latitude": 28.966069
    },
    {
        "adcode": 513436,
        "city": "四川省凉山彝族自治州美姑县",
        "longitude": 103.13218,
        "latitude": 28.32864
    },
    {
        "adcode": 513437,
        "city": "四川省凉山彝族自治州雷波县",
        "longitude": 103.571696,
        "latitude": 28.262683
    },
    {
        "adcode": 520000,
        "city": "贵州省",
        "longitude": 106.70741,
        "latitude": 26.598194
    },
    {
        "adcode": 520100,
        "city": "贵州省贵阳市",
        "longitude": 106.630153,
        "latitude": 26.647661
    },
    {
        "adcode": 520101,
        "city": "贵州省贵阳市市辖区",
        "longitude": 106.630153,
        "latitude": 26.647661
    },
    {
        "adcode": 520102,
        "city": "贵州省贵阳市南明区",
        "longitude": 106.68876,
        "latitude": 26.570062
    },
    {
        "adcode": 520103,
        "city": "贵州省贵阳市云岩区",
        "longitude": 106.724426,
        "latitude": 26.604594
    },
    {
        "adcode": 520111,
        "city": "贵州省贵阳市花溪区",
        "longitude": 106.67026,
        "latitude": 26.409818
    },
    {
        "adcode": 520112,
        "city": "贵州省贵阳市乌当区",
        "longitude": 106.750625,
        "latitude": 26.630845
    },
    {
        "adcode": 520113,
        "city": "贵州省贵阳市白云区",
        "longitude": 106.623007,
        "latitude": 26.678562
    },
    {
        "adcode": 520115,
        "city": "贵州省贵阳市观山湖区",
        "longitude": 106.622453,
        "latitude": 26.60145
    },
    {
        "adcode": 520121,
        "city": "贵州省贵阳市开阳县",
        "longitude": 106.96509,
        "latitude": 27.057764
    },
    {
        "adcode": 520122,
        "city": "贵州省贵阳市息烽县",
        "longitude": 106.740408,
        "latitude": 27.090479
    },
    {
        "adcode": 520123,
        "city": "贵州省贵阳市修文县",
        "longitude": 106.592108,
        "latitude": 26.838926
    },
    {
        "adcode": 520181,
        "city": "贵州省贵阳市清镇市",
        "longitude": 106.470715,
        "latitude": 26.556079
    },
    {
        "adcode": 520200,
        "city": "贵州省六盘水市",
        "longitude": 104.830359,
        "latitude": 26.592666
    },
    {
        "adcode": 520201,
        "city": "贵州省六盘水市钟山区",
        "longitude": 104.843555,
        "latitude": 26.574979
    },
    {
        "adcode": 520203,
        "city": "贵州省六盘水市六枝特区",
        "longitude": 105.480029,
        "latitude": 26.201228
    },
    {
        "adcode": 520221,
        "city": "贵州省六盘水市水城县",
        "longitude": 104.957831,
        "latitude": 26.547904
    },
    {
        "adcode": 520281,
        "city": "贵州省六盘水市盘州市",
        "longitude": 104.533079,
        "latitude": 28.690092
    },
    {
        "adcode": 520300,
        "city": "贵州省遵义市",
        "longitude": 106.927389,
        "latitude": 27.725654
    },
    {
        "adcode": 520301,
        "city": "贵州省遵义市市辖区",
        "longitude": 106.927389,
        "latitude": 27.725654
    },
    {
        "adcode": 520302,
        "city": "贵州省遵义市红花岗区",
        "longitude": 106.893709,
        "latitude": 27.644755
    },
    {
        "adcode": 520303,
        "city": "贵州省遵义市汇川区",
        "longitude": 106.93427,
        "latitude": 27.750125
    },
    {
        "adcode": 520304,
        "city": "贵州省遵义市播州区",
        "longitude": 104.471401,
        "latitude": 25.7100505
    },
    {
        "adcode": 520322,
        "city": "贵州省遵义市桐梓县",
        "longitude": 106.825644,
        "latitude": 28.133583
    },
    {
        "adcode": 520323,
        "city": "贵州省遵义市绥阳县",
        "longitude": 107.191222,
        "latitude": 27.946222
    },
    {
        "adcode": 520324,
        "city": "贵州省遵义市正安县",
        "longitude": 107.453945,
        "latitude": 28.553285
    },
    {
        "adcode": 520325,
        "city": "贵州省遵义市道真仡佬族苗族自治县",
        "longitude": 107.613133,
        "latitude": 28.862425
    },
    {
        "adcode": 520326,
        "city": "贵州省遵义市务川仡佬族苗族自治县",
        "longitude": 107.898957,
        "latitude": 28.563086
    },
    {
        "adcode": 520327,
        "city": "贵州省遵义市凤冈县",
        "longitude": 107.716356,
        "latitude": 27.954695
    },
    {
        "adcode": 520328,
        "city": "贵州省遵义市湄潭县",
        "longitude": 107.465407,
        "latitude": 27.749055
    },
    {
        "adcode": 520329,
        "city": "贵州省遵义市余庆县",
        "longitude": 107.905278,
        "latitude": 27.21542
    },
    {
        "adcode": 520330,
        "city": "贵州省遵义市习水县",
        "longitude": 106.197138,
        "latitude": 28.33127
    },
    {
        "adcode": 520381,
        "city": "贵州省遵义市赤水市",
        "longitude": 105.697472,
        "latitude": 28.590337
    },
    {
        "adcode": 520382,
        "city": "贵州省遵义市仁怀市",
        "longitude": 106.400342,
        "latitude": 27.79165
    },
    {
        "adcode": 520400,
        "city": "贵州省安顺市",
        "longitude": 105.947593,
        "latitude": 26.253072
    },
    {
        "adcode": 520401,
        "city": "贵州省安顺市市辖区",
        "longitude": 105.947593,
        "latitude": 26.253072
    },
    {
        "adcode": 520402,
        "city": "贵州省安顺市西秀区",
        "longitude": 105.965535,
        "latitude": 26.245433
    },
    {
        "adcode": 520403,
        "city": "贵州省安顺市平坝区",
        "longitude": 106.255557,
        "latitude": 26.405502
    },
    {
        "adcode": 520422,
        "city": "贵州省安顺市普定县",
        "longitude": 105.743196,
        "latitude": 26.301446
    },
    {
        "adcode": 520423,
        "city": "贵州省安顺市镇宁布依族苗族自治县",
        "longitude": 105.770402,
        "latitude": 26.057362
    },
    {
        "adcode": 520424,
        "city": "贵州省安顺市关岭布依族苗族自治县",
        "longitude": 105.618745,
        "latitude": 25.943856
    },
    {
        "adcode": 520425,
        "city": "贵州省安顺市紫云苗族布依族自治县",
        "longitude": 106.08434,
        "latitude": 25.751052
    },
    {
        "adcode": 520500,
        "city": "贵州省毕节市",
        "longitude": 105.283992,
        "latitude": 27.302589
    },
    {
        "adcode": 520502,
        "city": "贵州省毕节市七星关区",
        "longitude": 105.305138,
        "latitude": 27.298494
    },
    {
        "adcode": 520521,
        "city": "贵州省毕节市大方县",
        "longitude": 105.611656,
        "latitude": 27.137097
    },
    {
        "adcode": 520522,
        "city": "贵州省毕节市黔西县",
        "longitude": 106.033544,
        "latitude": 27.007713
    },
    {
        "adcode": 520523,
        "city": "贵州省毕节市金沙县",
        "longitude": 106.220228,
        "latitude": 27.459214
    },
    {
        "adcode": 520524,
        "city": "贵州省毕节市织金县",
        "longitude": 105.770542,
        "latitude": 26.66345
    },
    {
        "adcode": 520525,
        "city": "贵州省毕节市纳雍县",
        "longitude": 105.382715,
        "latitude": 26.777645
    },
    {
        "adcode": 520526,
        "city": "贵州省毕节市威宁彝族回族苗族自治县",
        "longitude": 104.278733,
        "latitude": 26.856193
    },
    {
        "adcode": 520527,
        "city": "贵州省毕节市赫章县",
        "longitude": 104.727418,
        "latitude": 27.123079
    },
    {
        "adcode": 520600,
        "city": "贵州省铜仁市",
        "longitude": 109.189598,
        "latitude": 27.731514
    },
    {
        "adcode": 520602,
        "city": "贵州省铜仁市碧江区",
        "longitude": 109.181122,
        "latitude": 27.690653
    },
    {
        "adcode": 520603,
        "city": "贵州省铜仁市万山区",
        "longitude": 109.213644,
        "latitude": 27.517896
    },
    {
        "adcode": 520621,
        "city": "贵州省铜仁市江口县",
        "longitude": 108.839557,
        "latitude": 27.69965
    },
    {
        "adcode": 520622,
        "city": "贵州省铜仁市玉屏侗族自治县",
        "longitude": 108.91468,
        "latitude": 27.243012
    },
    {
        "adcode": 520623,
        "city": "贵州省铜仁市石阡县",
        "longitude": 108.223612,
        "latitude": 27.513829
    },
    {
        "adcode": 520624,
        "city": "贵州省铜仁市思南县",
        "longitude": 108.253873,
        "latitude": 27.93756
    },
    {
        "adcode": 520625,
        "city": "贵州省铜仁市印江土家族苗族自治县",
        "longitude": 108.409752,
        "latitude": 27.994247
    },
    {
        "adcode": 520626,
        "city": "贵州省铜仁市德江县",
        "longitude": 108.119807,
        "latitude": 28.263964
    },
    {
        "adcode": 520627,
        "city": "贵州省铜仁市沿河土家族自治县",
        "longitude": 108.50387,
        "latitude": 28.563928
    },
    {
        "adcode": 520628,
        "city": "贵州省铜仁市松桃苗族自治县",
        "longitude": 109.202886,
        "latitude": 28.154071
    },
    {
        "adcode": 522300,
        "city": "贵州省黔西南布依族苗族自治州",
        "longitude": 104.906396,
        "latitude": 25.087825
    },
    {
        "adcode": 522301,
        "city": "贵州省黔西南布依族苗族自治州兴义市",
        "longitude": 104.895467,
        "latitude": 25.09204
    },
    {
        "adcode": 522302,
        "city": "贵州省黔西南布依族苗族自治州兴义市兴仁",
        "longitude": 105.043557,
        "latitude": 25.218623
    },
    {
        "adcode": 522323,
        "city": "贵州省黔西南布依族苗族自治州普安县",
        "longitude": 104.953063,
        "latitude": 25.784135
    },
    {
        "adcode": 522324,
        "city": "贵州省黔西南布依族苗族自治州晴隆县",
        "longitude": 105.218991,
        "latitude": 25.834784
    },
    {
        "adcode": 522325,
        "city": "贵州省黔西南布依族苗族自治州贞丰县",
        "longitude": 105.649864,
        "latitude": 25.38576
    },
    {
        "adcode": 522326,
        "city": "贵州省黔西南布依族苗族自治州望谟县",
        "longitude": 106.09385,
        "latitude": 25.171024
    },
    {
        "adcode": 522327,
        "city": "贵州省黔西南布依族苗族自治州册亨县",
        "longitude": 105.811593,
        "latitude": 24.983663
    },
    {
        "adcode": 522328,
        "city": "贵州省黔西南布依族苗族自治州安龙县",
        "longitude": 105.442701,
        "latitude": 25.099014
    },
    {
        "adcode": 522600,
        "city": "贵州省黔东南苗族侗族自治州",
        "longitude": 107.982859,
        "latitude": 26.583442
    },
    {
        "adcode": 522601,
        "city": "贵州省黔东南苗族侗族自治州凯里市",
        "longitude": 107.981212,
        "latitude": 26.566867
    },
    {
        "adcode": 522622,
        "city": "贵州省黔东南苗族侗族自治州黄平县",
        "longitude": 107.916412,
        "latitude": 26.905396
    },
    {
        "adcode": 522623,
        "city": "贵州省黔东南苗族侗族自治州施秉县",
        "longitude": 108.12438,
        "latitude": 27.03292
    },
    {
        "adcode": 522624,
        "city": "贵州省黔东南苗族侗族自治州三穗县",
        "longitude": 108.675267,
        "latitude": 26.952968
    },
    {
        "adcode": 522625,
        "city": "贵州省黔东南苗族侗族自治州镇远县",
        "longitude": 108.429691,
        "latitude": 27.04911
    },
    {
        "adcode": 522626,
        "city": "贵州省黔东南苗族侗族自治州岑巩县",
        "longitude": 108.81606,
        "latitude": 27.173887
    },
    {
        "adcode": 522627,
        "city": "贵州省黔东南苗族侗族自治州天柱县",
        "longitude": 109.207757,
        "latitude": 26.909678
    },
    {
        "adcode": 522628,
        "city": "贵州省黔东南苗族侗族自治州锦屏县",
        "longitude": 109.200534,
        "latitude": 26.676233
    },
    {
        "adcode": 522629,
        "city": "贵州省黔东南苗族侗族自治州剑河县",
        "longitude": 108.441501,
        "latitude": 26.728274
    },
    {
        "adcode": 522630,
        "city": "贵州省黔东南苗族侗族自治州台江县",
        "longitude": 108.321245,
        "latitude": 26.667525
    },
    {
        "adcode": 522631,
        "city": "贵州省黔东南苗族侗族自治州黎平县",
        "longitude": 109.136658,
        "latitude": 26.230424
    },
    {
        "adcode": 522632,
        "city": "贵州省黔东南苗族侗族自治州榕江县",
        "longitude": 108.521881,
        "latitude": 25.931893
    },
    {
        "adcode": 522633,
        "city": "贵州省黔东南苗族侗族自治州从江县",
        "longitude": 108.905329,
        "latitude": 25.753009
    },
    {
        "adcode": 522634,
        "city": "贵州省黔东南苗族侗族自治州雷山县",
        "longitude": 108.07754,
        "latitude": 26.378443
    },
    {
        "adcode": 522635,
        "city": "贵州省黔东南苗族侗族自治州麻江县",
        "longitude": 107.589359,
        "latitude": 26.491105
    },
    {
        "adcode": 522636,
        "city": "贵州省黔东南苗族侗族自治州丹寨县",
        "longitude": 107.788728,
        "latitude": 26.19832
    },
    {
        "adcode": 522700,
        "city": "贵州省黔南布依族苗族自治州",
        "longitude": 107.522097,
        "latitude": 26.254092
    },
    {
        "adcode": 522701,
        "city": "贵州省黔南布依族苗族自治州都匀市",
        "longitude": 107.518847,
        "latitude": 26.259427
    },
    {
        "adcode": 522702,
        "city": "贵州省黔南布依族苗族自治州福泉市",
        "longitude": 107.520386,
        "latitude": 26.686335
    },
    {
        "adcode": 522722,
        "city": "贵州省黔南布依族苗族自治州荔波县",
        "longitude": 107.88645,
        "latitude": 25.410654
    },
    {
        "adcode": 522723,
        "city": "贵州省黔南布依族苗族自治州贵定县",
        "longitude": 107.232889,
        "latitude": 26.557071
    },
    {
        "adcode": 522725,
        "city": "贵州省黔南布依族苗族自治州瓮安县",
        "longitude": 107.471555,
        "latitude": 27.078472
    },
    {
        "adcode": 522726,
        "city": "贵州省黔南布依族苗族自治州独山县",
        "longitude": 107.545048,
        "latitude": 25.822132
    },
    {
        "adcode": 522727,
        "city": "贵州省黔南布依族苗族自治州平塘县",
        "longitude": 107.323077,
        "latitude": 25.831955
    },
    {
        "adcode": 522728,
        "city": "贵州省黔南布依族苗族自治州罗甸县",
        "longitude": 106.751418,
        "latitude": 25.424845
    },
    {
        "adcode": 522729,
        "city": "贵州省黔南布依族苗族自治州长顺县",
        "longitude": 106.447376,
        "latitude": 26.022116
    },
    {
        "adcode": 522730,
        "city": "贵州省黔南布依族苗族自治州龙里县",
        "longitude": 106.979524,
        "latitude": 26.453154
    },
    {
        "adcode": 522731,
        "city": "贵州省黔南布依族苗族自治州惠水县",
        "longitude": 106.657089,
        "latitude": 26.132061
    },
    {
        "adcode": 522732,
        "city": "贵州省黔南布依族苗族自治州三都水族自治县",
        "longitude": 107.869749,
        "latitude": 25.983202
    },
    {
        "adcode": 530000,
        "city": "云南省",
        "longitude": 102.710002,
        "latitude": 25.045806
    },
    {
        "adcode": 530100,
        "city": "云南省昆明市",
        "longitude": 102.832891,
        "latitude": 24.880095
    },
    {
        "adcode": 530101,
        "city": "云南省昆明市市辖区",
        "longitude": 102.832891,
        "latitude": 24.880095
    },
    {
        "adcode": 530102,
        "city": "云南省昆明市五华区",
        "longitude": 102.706959,
        "latitude": 25.043652
    },
    {
        "adcode": 530103,
        "city": "云南省昆明市盘龙区",
        "longitude": 102.751907,
        "latitude": 25.116106
    },
    {
        "adcode": 530111,
        "city": "云南省昆明市官渡区",
        "longitude": 102.743812,
        "latitude": 25.015105
    },
    {
        "adcode": 530112,
        "city": "云南省昆明市西山区",
        "longitude": 102.664376,
        "latitude": 25.038297
    },
    {
        "adcode": 530113,
        "city": "云南省昆明市东川区",
        "longitude": 103.187825,
        "latitude": 26.082873
    },
    {
        "adcode": 530114,
        "city": "云南省昆明市呈贡区",
        "longitude": 102.821468,
        "latitude": 24.885532
    },
    {
        "adcode": 530115,
        "city": "云南省昆明市晋宁区",
        "longitude": 106.829437,
        "latitude": 27.53634
    },
    {
        "adcode": 530124,
        "city": "云南省昆明市富民县",
        "longitude": 102.4976,
        "latitude": 25.221935
    },
    {
        "adcode": 530125,
        "city": "云南省昆明市宜良县",
        "longitude": 103.141296,
        "latitude": 24.919715
    },
    {
        "adcode": 530126,
        "city": "云南省昆明市石林彝族自治县",
        "longitude": 103.290785,
        "latitude": 24.771798
    },
    {
        "adcode": 530127,
        "city": "云南省昆明市嵩明县",
        "longitude": 103.036908,
        "latitude": 25.338644
    },
    {
        "adcode": 530128,
        "city": "云南省昆明市禄劝彝族苗族自治县",
        "longitude": 102.471518,
        "latitude": 25.551332
    },
    {
        "adcode": 530129,
        "city": "云南省昆明市寻甸回族彝族自治县",
        "longitude": 103.256604,
        "latitude": 25.558175
    },
    {
        "adcode": 530181,
        "city": "云南省昆明市安宁市",
        "longitude": 102.478494,
        "latitude": 24.919493
    },
    {
        "adcode": 530300,
        "city": "云南省曲靖市",
        "longitude": 103.796167,
        "latitude": 25.489999
    },
    {
        "adcode": 530301,
        "city": "云南省曲靖市市辖区",
        "longitude": 103.796167,
        "latitude": 25.489999
    },
    {
        "adcode": 530302,
        "city": "云南省曲靖市麒麟区",
        "longitude": 103.805012,
        "latitude": 25.495241
    },
    {
        "adcode": 530303,
        "city": "云南省曲靖市沾益区",
        "longitude": 103.2039115,
        "latitude": 24.8417585
    },
    {
        "adcode": 530304,
        "city": "云南省曲靖市宣威市马龙",
        "longitude": 104.520734,
        "latitude": 26.403423
    },
    {
        "adcode": 530322,
        "city": "云南省曲靖市陆良县",
        "longitude": 103.666663,
        "latitude": 25.030051
    },
    {
        "adcode": 530323,
        "city": "云南省曲靖市师宗县",
        "longitude": 103.985478,
        "latitude": 24.822403
    },
    {
        "adcode": 530324,
        "city": "云南省曲靖市罗平县",
        "longitude": 104.308675,
        "latitude": 24.884626
    },
    {
        "adcode": 530325,
        "city": "云南省曲靖市富源县",
        "longitude": 104.255015,
        "latitude": 25.674238
    },
    {
        "adcode": 530326,
        "city": "云南省曲靖市会泽县",
        "longitude": 103.297361,
        "latitude": 26.417947
    },
    {
        "adcode": 530381,
        "city": "云南省曲靖市宣威市",
        "longitude": 104.104497,
        "latitude": 26.219759
    },
    {
        "adcode": 530400,
        "city": "云南省玉溪市",
        "longitude": 102.546543,
        "latitude": 24.352036
    },
    {
        "adcode": 530401,
        "city": "云南省玉溪市市辖区",
        "longitude": 102.546543,
        "latitude": 24.352036
    },
    {
        "adcode": 530402,
        "city": "云南省玉溪市红塔区",
        "longitude": 102.540179,
        "latitude": 24.341098
    },
    {
        "adcode": 530403,
        "city": "云南省玉溪市江川区",
        "longitude": 102.75376,
        "latitude": 24.287586
    },
    {
        "adcode": 530422,
        "city": "云南省玉溪市澄江县",
        "longitude": 102.908248,
        "latitude": 24.673734
    },
    {
        "adcode": 530423,
        "city": "云南省玉溪市通海县",
        "longitude": 102.760039,
        "latitude": 24.112205
    },
    {
        "adcode": 530424,
        "city": "云南省玉溪市华宁县",
        "longitude": 102.928835,
        "latitude": 24.192761
    },
    {
        "adcode": 530425,
        "city": "云南省玉溪市易门县",
        "longitude": 102.162531,
        "latitude": 24.671651
    },
    {
        "adcode": 530426,
        "city": "云南省玉溪市峨山彝族自治县",
        "longitude": 102.405819,
        "latitude": 24.168957
    },
    {
        "adcode": 530427,
        "city": "云南省玉溪市新平彝族傣族自治县",
        "longitude": 101.990157,
        "latitude": 24.070051
    },
    {
        "adcode": 530428,
        "city": "云南省玉溪市元江哈尼族彝族傣族自治县",
        "longitude": 101.998103,
        "latitude": 23.596503
    },
    {
        "adcode": 530500,
        "city": "云南省保山市",
        "longitude": 99.161761,
        "latitude": 25.112046
    },
    {
        "adcode": 530501,
        "city": "云南省保山市市辖区",
        "longitude": 99.161761,
        "latitude": 25.112046
    },
    {
        "adcode": 530502,
        "city": "云南省保山市隆阳区",
        "longitude": 99.165607,
        "latitude": 25.121154
    },
    {
        "adcode": 530521,
        "city": "云南省保山市施甸县",
        "longitude": 99.189221,
        "latitude": 24.723064
    },
    {
        "adcode": 530523,
        "city": "云南省保山市龙陵县",
        "longitude": 98.68923,
        "latitude": 24.586766
    },
    {
        "adcode": 530524,
        "city": "云南省保山市昌宁县",
        "longitude": 99.605142,
        "latitude": 24.827839
    },
    {
        "adcode": 530581,
        "city": "云南省保山市腾冲市",
        "longitude": 98.485333,
        "latitude": 25.033111
    },
    {
        "adcode": 530600,
        "city": "云南省昭通市",
        "longitude": 103.717465,
        "latitude": 27.338257
    },
    {
        "adcode": 530601,
        "city": "云南省昭通市市辖区",
        "longitude": 103.717465,
        "latitude": 27.338257
    },
    {
        "adcode": 530602,
        "city": "云南省昭通市昭阳区",
        "longitude": 103.706539,
        "latitude": 27.320075
    },
    {
        "adcode": 530621,
        "city": "云南省昭通市鲁甸县",
        "longitude": 103.558042,
        "latitude": 27.186659
    },
    {
        "adcode": 530622,
        "city": "云南省昭通市巧家县",
        "longitude": 102.930164,
        "latitude": 26.908461
    },
    {
        "adcode": 530623,
        "city": "云南省昭通市盐津县",
        "longitude": 104.234442,
        "latitude": 28.10871
    },
    {
        "adcode": 530624,
        "city": "云南省昭通市大关县",
        "longitude": 103.891146,
        "latitude": 27.747978
    },
    {
        "adcode": 530625,
        "city": "云南省昭通市永善县",
        "longitude": 103.638067,
        "latitude": 28.229113
    },
    {
        "adcode": 530626,
        "city": "云南省昭通市绥江县",
        "longitude": 103.968978,
        "latitude": 28.5921
    },
    {
        "adcode": 530627,
        "city": "云南省昭通市镇雄县",
        "longitude": 104.873579,
        "latitude": 27.441668
    },
    {
        "adcode": 530628,
        "city": "云南省昭通市彝良县",
        "longitude": 104.048289,
        "latitude": 27.625419
    },
    {
        "adcode": 530629,
        "city": "云南省昭通市威信县",
        "longitude": 105.049027,
        "latitude": 27.846901
    },
    {
        "adcode": 530681,
        "city": "云南省昭通市",
        "longitude": 103.82219,
        "latitude": 25.600555
    },
    {
        "adcode": 530700,
        "city": "云南省丽江市",
        "longitude": 100.22775,
        "latitude": 26.855047
    },
    {
        "adcode": 530701,
        "city": "云南省丽江市市辖区",
        "longitude": 100.22775,
        "latitude": 26.855047
    },
    {
        "adcode": 530702,
        "city": "云南省丽江市古城区",
        "longitude": 100.225766,
        "latitude": 26.87719
    },
    {
        "adcode": 530721,
        "city": "云南省丽江市玉龙纳西族自治县",
        "longitude": 100.236955,
        "latitude": 26.82146
    },
    {
        "adcode": 530722,
        "city": "云南省丽江市永胜县",
        "longitude": 100.750795,
        "latitude": 26.684225
    },
    {
        "adcode": 530723,
        "city": "云南省丽江市华坪县",
        "longitude": 101.266195,
        "latitude": 26.629211
    },
    {
        "adcode": 530724,
        "city": "云南省丽江市宁蒗彝族自治县",
        "longitude": 100.852001,
        "latitude": 27.282071
    },
    {
        "adcode": 530800,
        "city": "云南省普洱市",
        "longitude": 100.966512,
        "latitude": 22.825065
    },
    {
        "adcode": 530801,
        "city": "云南省普洱市市辖区",
        "longitude": 100.966512,
        "latitude": 22.825065
    },
    {
        "adcode": 530802,
        "city": "云南省普洱市思茅区",
        "longitude": 100.977165,
        "latitude": 22.78691
    },
    {
        "adcode": 530821,
        "city": "云南省普洱市宁洱哈尼族彝族自治县",
        "longitude": 101.045317,
        "latitude": 23.06175
    },
    {
        "adcode": 530822,
        "city": "云南省普洱市墨江哈尼族自治县",
        "longitude": 101.692461,
        "latitude": 23.431894
    },
    {
        "adcode": 530823,
        "city": "云南省普洱市景东彝族自治县",
        "longitude": 100.833877,
        "latitude": 24.446731
    },
    {
        "adcode": 530824,
        "city": "云南省普洱市景谷傣族彝族自治县",
        "longitude": 100.702871,
        "latitude": 23.497028
    },
    {
        "adcode": 530825,
        "city": "云南省普洱市镇沅彝族哈尼族拉祜族自治县",
        "longitude": 101.108595,
        "latitude": 24.004442
    },
    {
        "adcode": 530826,
        "city": "云南省普洱市江城哈尼族彝族自治县",
        "longitude": 101.86212,
        "latitude": 22.585868
    },
    {
        "adcode": 530827,
        "city": "云南省普洱市孟连傣族拉祜族佤族自治县",
        "longitude": 99.584157,
        "latitude": 22.3291
    },
    {
        "adcode": 530828,
        "city": "云南省普洱市澜沧拉祜族自治县",
        "longitude": 99.931975,
        "latitude": 22.555905
    },
    {
        "adcode": 530829,
        "city": "云南省普洱市西盟佤族自治县",
        "longitude": 99.590124,
        "latitude": 22.644508
    },
    {
        "adcode": 530900,
        "city": "云南省临沧市",
        "longitude": 100.079583,
        "latitude": 23.877573
    },
    {
        "adcode": 530901,
        "city": "云南省临沧市市辖区",
        "longitude": 100.079583,
        "latitude": 23.877573
    },
    {
        "adcode": 530902,
        "city": "云南省临沧市临翔区",
        "longitude": 100.082523,
        "latitude": 23.895137
    },
    {
        "adcode": 530921,
        "city": "云南省临沧市凤庆县",
        "longitude": 99.92846,
        "latitude": 24.580424
    },
    {
        "adcode": 530922,
        "city": "云南省临沧市云县",
        "longitude": 100.123248,
        "latitude": 24.437061
    },
    {
        "adcode": 530923,
        "city": "云南省临沧市永德县",
        "longitude": 99.25934,
        "latitude": 24.018357
    },
    {
        "adcode": 530924,
        "city": "云南省临沧市镇康县",
        "longitude": 98.825285,
        "latitude": 23.762584
    },
    {
        "adcode": 530925,
        "city": "云南省临沧市双江拉祜族佤族布朗族傣族自治县",
        "longitude": 99.827698,
        "latitude": 23.473499
    },
    {
        "adcode": 530926,
        "city": "云南省临沧市耿马傣族佤族自治县",
        "longitude": 99.397127,
        "latitude": 23.538092
    },
    {
        "adcode": 530927,
        "city": "云南省临沧市沧源佤族自治县",
        "longitude": 99.246197,
        "latitude": 23.146712
    },
    {
        "adcode": 532300,
        "city": "云南省楚雄彝族自治州",
        "longitude": 101.528068,
        "latitude": 25.045532
    },
    {
        "adcode": 532301,
        "city": "云南省楚雄彝族自治州",
        "longitude": 101.528068,
        "latitude": 25.045532
    },
    {
        "adcode": 532322,
        "city": "云南省楚雄彝族自治州双柏县",
        "longitude": 101.641937,
        "latitude": 24.688875
    },
    {
        "adcode": 532323,
        "city": "云南省楚雄彝族自治州牟定县",
        "longitude": 101.546566,
        "latitude": 25.313122
    },
    {
        "adcode": 532324,
        "city": "云南省楚雄彝族自治州南华县",
        "longitude": 101.273577,
        "latitude": 25.192293
    },
    {
        "adcode": 532325,
        "city": "云南省楚雄彝族自治州姚安县",
        "longitude": 101.241728,
        "latitude": 25.504173
    },
    {
        "adcode": 532326,
        "city": "云南省楚雄彝族自治州大姚县",
        "longitude": 101.336617,
        "latitude": 25.729513
    },
    {
        "adcode": 532327,
        "city": "云南省楚雄彝族自治州永仁县",
        "longitude": 101.666133,
        "latitude": 26.049464
    },
    {
        "adcode": 532328,
        "city": "云南省楚雄彝族自治州元谋县",
        "longitude": 101.87452,
        "latitude": 25.704338
    },
    {
        "adcode": 532329,
        "city": "云南省楚雄彝族自治州武定县",
        "longitude": 102.404338,
        "latitude": 25.530389
    },
    {
        "adcode": 532331,
        "city": "云南省楚雄彝族自治州禄丰县",
        "longitude": 102.079027,
        "latitude": 25.150111
    },
    {
        "adcode": 532500,
        "city": "云南省红河哈尼族彝族自治州",
        "longitude": 103.374799,
        "latitude": 23.36313
    },
    {
        "adcode": 532501,
        "city": "云南省红河哈尼族彝族自治州个旧市",
        "longitude": 103.160034,
        "latitude": 23.359121
    },
    {
        "adcode": 532502,
        "city": "云南省红河哈尼族彝族自治州开远市",
        "longitude": 103.267143,
        "latitude": 23.714316
    },
    {
        "adcode": 532503,
        "city": "云南省红河哈尼族彝族自治州蒙自市",
        "longitude": 103.364905,
        "latitude": 23.396201
    },
    {
        "adcode": 532504,
        "city": "云南省红河哈尼族彝族自治州弥勒市",
        "longitude": 103.414874,
        "latitude": 24.411912
    },
    {
        "adcode": 532523,
        "city": "云南省红河哈尼族彝族自治州屏边苗族自治县",
        "longitude": 103.687612,
        "latitude": 22.98356
    },
    {
        "adcode": 532524,
        "city": "云南省红河哈尼族彝族自治州建水县",
        "longitude": 102.826557,
        "latitude": 23.6347
    },
    {
        "adcode": 532525,
        "city": "云南省红河哈尼族彝族自治州石屏县",
        "longitude": 102.494984,
        "latitude": 23.705936
    },
    {
        "adcode": 532527,
        "city": "云南省红河哈尼族彝族自治州泸西县",
        "longitude": 103.766196,
        "latitude": 24.532025
    },
    {
        "adcode": 532528,
        "city": "云南省红河哈尼族彝族自治州元阳县",
        "longitude": 102.835223,
        "latitude": 23.219932
    },
    {
        "adcode": 532529,
        "city": "云南省红河哈尼族彝族自治州红河县",
        "longitude": 102.4206,
        "latitude": 23.369161
    },
    {
        "adcode": 532530,
        "city": "云南省红河哈尼族彝族自治州金平苗族瑶族傣族自治县",
        "longitude": 103.226448,
        "latitude": 22.779543
    },
    {
        "adcode": 532531,
        "city": "云南省红河哈尼族彝族自治州绿春县",
        "longitude": 102.392463,
        "latitude": 22.993718
    },
    {
        "adcode": 532532,
        "city": "云南省红河哈尼族彝族自治州河口瑶族自治县",
        "longitude": 103.93935,
        "latitude": 22.529404
    },
    {
        "adcode": 532600,
        "city": "云南省文山壮族苗族自治州",
        "longitude": 104.216248,
        "latitude": 23.400733
    },
    {
        "adcode": 532601,
        "city": "云南省文山壮族苗族自治州",
        "longitude": 104.216248,
        "latitude": 23.400733
    },
    {
        "adcode": 532622,
        "city": "云南省文山壮族苗族自治州砚山县",
        "longitude": 104.337242,
        "latitude": 23.605865
    },
    {
        "adcode": 532623,
        "city": "云南省文山壮族苗族自治州西畴县",
        "longitude": 104.672597,
        "latitude": 23.437782
    },
    {
        "adcode": 532624,
        "city": "云南省文山壮族苗族自治州麻栗坡县",
        "longitude": 104.702799,
        "latitude": 23.125714
    },
    {
        "adcode": 532625,
        "city": "云南省文山壮族苗族自治州马关县",
        "longitude": 104.394158,
        "latitude": 23.012915
    },
    {
        "adcode": 532626,
        "city": "云南省文山壮族苗族自治州丘北县",
        "longitude": 104.19582,
        "latitude": 24.041919
    },
    {
        "adcode": 532627,
        "city": "云南省文山壮族苗族自治州广南县",
        "longitude": 105.054981,
        "latitude": 24.045941
    },
    {
        "adcode": 532628,
        "city": "云南省文山壮族苗族自治州富宁县",
        "longitude": 105.630999,
        "latitude": 23.625283
    },
    {
        "adcode": 532800,
        "city": "云南省西双版纳傣族自治州",
        "longitude": 100.797777,
        "latitude": 22.007351
    },
    {
        "adcode": 532801,
        "city": "云南省西双版纳傣族自治州景洪市",
        "longitude": 100.771679,
        "latitude": 22.000143
    },
    {
        "adcode": 532822,
        "city": "云南省西双版纳傣族自治州勐海县",
        "longitude": 100.452548,
        "latitude": 21.957354
    },
    {
        "adcode": 532823,
        "city": "云南省西双版纳傣族自治州勐腊县",
        "longitude": 101.564636,
        "latitude": 21.459233
    },
    {
        "adcode": 532900,
        "city": "云南省大理白族自治州",
        "longitude": 100.267638,
        "latitude": 25.606486
    },
    {
        "adcode": 532901,
        "city": "云南省大理白族自治州",
        "longitude": 100.267638,
        "latitude": 25.606486
    },
    {
        "adcode": 532922,
        "city": "云南省大理白族自治州漾濞彝族自治县",
        "longitude": 99.958015,
        "latitude": 25.670148
    },
    {
        "adcode": 532923,
        "city": "云南省大理白族自治州祥云县",
        "longitude": 100.550946,
        "latitude": 25.48385
    },
    {
        "adcode": 532924,
        "city": "云南省大理白族自治州宾川县",
        "longitude": 100.575412,
        "latitude": 25.827182
    },
    {
        "adcode": 532925,
        "city": "云南省大理白族自治州弥渡县",
        "longitude": 100.490991,
        "latitude": 25.343804
    },
    {
        "adcode": 532926,
        "city": "云南省大理白族自治州南涧彝族自治县",
        "longitude": 100.509036,
        "latitude": 25.04351
    },
    {
        "adcode": 532927,
        "city": "云南省大理白族自治州巍山彝族回族自治县",
        "longitude": 100.307175,
        "latitude": 25.227212
    },
    {
        "adcode": 532928,
        "city": "云南省大理白族自治州永平县",
        "longitude": 99.541236,
        "latitude": 25.464681
    },
    {
        "adcode": 532929,
        "city": "云南省大理白族自治州云龙县",
        "longitude": 99.371121,
        "latitude": 25.885596
    },
    {
        "adcode": 532930,
        "city": "云南省大理白族自治州洱源县",
        "longitude": 99.951054,
        "latitude": 26.11116
    },
    {
        "adcode": 532931,
        "city": "云南省大理白族自治州剑川县",
        "longitude": 99.905559,
        "latitude": 26.537033
    },
    {
        "adcode": 532932,
        "city": "云南省大理白族自治州鹤庆县",
        "longitude": 100.176498,
        "latitude": 26.560231
    },
    {
        "adcode": 533100,
        "city": "云南省德宏傣族景颇族自治州",
        "longitude": 98.584895,
        "latitude": 24.433353
    },
    {
        "adcode": 533102,
        "city": "云南省德宏傣族景颇族自治州瑞丽市",
        "longitude": 97.855477,
        "latitude": 24.017836
    },
    {
        "adcode": 533103,
        "city": "云南省德宏傣族景颇族自治州芒市",
        "longitude": 98.588086,
        "latitude": 24.43369
    },
    {
        "adcode": 533122,
        "city": "云南省德宏傣族景颇族自治州梁河县",
        "longitude": 98.296657,
        "latitude": 24.804232
    },
    {
        "adcode": 533123,
        "city": "云南省德宏傣族景颇族自治州盈江县",
        "longitude": 97.943613,
        "latitude": 24.691283
    },
    {
        "adcode": 533124,
        "city": "云南省德宏傣族景颇族自治州陇川县",
        "longitude": 97.792105,
        "latitude": 24.182965
    },
    {
        "adcode": 533300,
        "city": "云南省怒江傈僳族自治州",
        "longitude": 98.853097,
        "latitude": 25.852547
    },
    {
        "adcode": 533301,
        "city": "云南省怒江傈僳族自治州泸水市",
        "longitude": 98.857977,
        "latitude": 25.82288
    },
    {
        "adcode": 533323,
        "city": "云南省怒江傈僳族自治州福贡县",
        "longitude": 98.869132,
        "latitude": 26.901832
    },
    {
        "adcode": 533324,
        "city": "云南省怒江傈僳族自治州贡山独龙族怒族自治县",
        "longitude": 98.665965,
        "latitude": 27.740999
    },
    {
        "adcode": 533325,
        "city": "云南省怒江傈僳族自治州兰坪白族普米族自治县",
        "longitude": 99.416677,
        "latitude": 26.453571
    },
    {
        "adcode": 533400,
        "city": "云南省迪庆藏族自治州",
        "longitude": 99.702234,
        "latitude": 27.818882
    },
    {
        "adcode": 533401,
        "city": "云南省迪庆藏族自治州香格里拉市",
        "longitude": 99.700836,
        "latitude": 27.829743
    },
    {
        "adcode": 533422,
        "city": "云南省迪庆藏族自治州德钦县",
        "longitude": 98.911561,
        "latitude": 28.486162
    },
    {
        "adcode": 533423,
        "city": "云南省迪庆藏族自治州维西傈僳族自治县",
        "longitude": 99.287173,
        "latitude": 27.177162
    },
    {
        "adcode": 540000,
        "city": "西藏自治区",
        "longitude": 91.117212,
        "latitude": 29.646922
    },
    {
        "adcode": 540100,
        "city": "西藏自治区拉萨市",
        "longitude": 91.140856,
        "latitude": 29.645554
    },
    {
        "adcode": 540101,
        "city": "西藏自治区拉萨市市辖区",
        "longitude": 91.140856,
        "latitude": 29.645554
    },
    {
        "adcode": 540102,
        "city": "西藏自治区拉萨市城关区",
        "longitude": 91.140435,
        "latitude": 29.654792
    },
    {
        "adcode": 540103,
        "city": "西藏自治区拉萨市堆龙德庆区",
        "longitude": 104.4168895,
        "latitude": 28.6299275
    },
    {
        "adcode": 540104,
        "city": "西藏自治区拉萨市达孜县达孜",
        "longitude": 91.50013,
        "latitude": 29.819293
    },
    {
        "adcode": 540121,
        "city": "西藏自治区拉萨市林周县",
        "longitude": 91.265288,
        "latitude": 29.893545
    },
    {
        "adcode": 540122,
        "city": "西藏自治区拉萨市当雄县",
        "longitude": 91.101162,
        "latitude": 30.473119
    },
    {
        "adcode": 540123,
        "city": "西藏自治区拉萨市尼木县",
        "longitude": 90.164524,
        "latitude": 29.431832
    },
    {
        "adcode": 540124,
        "city": "西藏自治区拉萨市曲水县",
        "longitude": 90.743853,
        "latitude": 29.353059
    },
    {
        "adcode": 540127,
        "city": "西藏自治区拉萨市墨竹工卡县",
        "longitude": 91.730866,
        "latitude": 29.834132
    },
    {
        "adcode": 540200,
        "city": "西藏自治区日喀则市",
        "longitude": 88.880583,
        "latitude": 29.266869
    },
    {
        "adcode": 540202,
        "city": "西藏自治区日喀则市桑珠孜区",
        "longitude": 88.88727,
        "latitude": 29.270389
    },
    {
        "adcode": 540221,
        "city": "西藏自治区日喀则市南木林县",
        "longitude": 89.099243,
        "latitude": 29.682331
    },
    {
        "adcode": 540222,
        "city": "西藏自治区日喀则市江孜县",
        "longitude": 89.605574,
        "latitude": 28.911659
    },
    {
        "adcode": 540223,
        "city": "西藏自治区日喀则市定日县",
        "longitude": 87.12612,
        "latitude": 28.658743
    },
    {
        "adcode": 540224,
        "city": "西藏自治区日喀则市萨迦县",
        "longitude": 88.021674,
        "latitude": 28.899664
    },
    {
        "adcode": 540225,
        "city": "西藏自治区日喀则市拉孜县",
        "longitude": 87.637041,
        "latitude": 29.08166
    },
    {
        "adcode": 540226,
        "city": "西藏自治区日喀则市昂仁县",
        "longitude": 87.236051,
        "latitude": 29.294802
    },
    {
        "adcode": 540227,
        "city": "西藏自治区日喀则市谢通门县",
        "longitude": 88.26162,
        "latitude": 29.432641
    },
    {
        "adcode": 540228,
        "city": "西藏自治区日喀则市白朗县",
        "longitude": 89.097806,
        "latitude": 28.814286
    },
    {
        "adcode": 540229,
        "city": "西藏自治区日喀则市仁布县",
        "longitude": 89.841984,
        "latitude": 29.230933
    },
    {
        "adcode": 540230,
        "city": "西藏自治区日喀则市康马县",
        "longitude": 89.681663,
        "latitude": 28.555627
    },
    {
        "adcode": 540231,
        "city": "西藏自治区日喀则市定结县",
        "longitude": 87.765872,
        "latitude": 28.364159
    },
    {
        "adcode": 540232,
        "city": "西藏自治区日喀则市仲巴县",
        "longitude": 84.03153,
        "latitude": 29.770279
    },
    {
        "adcode": 540233,
        "city": "西藏自治区日喀则市亚东县",
        "longitude": 88.907094,
        "latitude": 27.484806
    },
    {
        "adcode": 540234,
        "city": "西藏自治区日喀则市吉隆县",
        "longitude": 85.297535,
        "latitude": 28.852394
    },
    {
        "adcode": 540235,
        "city": "西藏自治区日喀则市聂拉木县",
        "longitude": 85.982237,
        "latitude": 28.155186
    },
    {
        "adcode": 540236,
        "city": "西藏自治区日喀则市萨嘎县",
        "longitude": 85.232941,
        "latitude": 29.328818
    },
    {
        "adcode": 540237,
        "city": "西藏自治区日喀则市岗巴县",
        "longitude": 88.520031,
        "latitude": 28.274601
    },
    {
        "adcode": 540300,
        "city": "西藏自治区昌都市",
        "longitude": 97.17202,
        "latitude": 31.140969
    },
    {
        "adcode": 540302,
        "city": "西藏自治区昌都市卡若区",
        "longitude": 97.180437,
        "latitude": 31.138507
    },
    {
        "adcode": 540321,
        "city": "西藏自治区昌都市江达县",
        "longitude": 98.21843,
        "latitude": 31.499202
    },
    {
        "adcode": 540322,
        "city": "西藏自治区昌都市贡觉县",
        "longitude": 98.27097,
        "latitude": 30.860099
    },
    {
        "adcode": 540323,
        "city": "西藏自治区昌都市类乌齐县",
        "longitude": 96.600246,
        "latitude": 31.211601
    },
    {
        "adcode": 540324,
        "city": "西藏自治区昌都市丁青县",
        "longitude": 95.595761,
        "latitude": 31.412405
    },
    {
        "adcode": 540325,
        "city": "西藏自治区昌都市察雅县",
        "longitude": 97.568752,
        "latitude": 30.653943
    },
    {
        "adcode": 540326,
        "city": "西藏自治区昌都市八宿县",
        "longitude": 96.917836,
        "latitude": 30.053209
    },
    {
        "adcode": 540327,
        "city": "西藏自治区昌都市左贡县",
        "longitude": 97.841022,
        "latitude": 29.671069
    },
    {
        "adcode": 540328,
        "city": "西藏自治区昌都市芒康县",
        "longitude": 98.593113,
        "latitude": 29.679908
    },
    {
        "adcode": 540329,
        "city": "西藏自治区昌都市洛隆县",
        "longitude": 95.824567,
        "latitude": 30.741571
    },
    {
        "adcode": 540330,
        "city": "西藏自治区昌都市边坝县",
        "longitude": 94.7078,
        "latitude": 30.933652
    },
    {
        "adcode": 540400,
        "city": "西藏自治区林芝市",
        "longitude": 94.361558,
        "latitude": 29.648943
    },
    {
        "adcode": 540402,
        "city": "西藏自治区林芝市巴宜区",
        "longitude": 94.360994,
        "latitude": 29.653727
    },
    {
        "adcode": 540421,
        "city": "西藏自治区林芝市工布江达县",
        "longitude": 93.246077,
        "latitude": 29.88528
    },
    {
        "adcode": 540422,
        "city": "西藏自治区林芝市米林县",
        "longitude": 92.607229,
        "latitude": 27.7129445
    },
    {
        "adcode": 540423,
        "city": "西藏自治区林芝市墨脱县",
        "longitude": 95.332241,
        "latitude": 29.325734
    },
    {
        "adcode": 540424,
        "city": "西藏自治区林芝市波密县",
        "longitude": 95.768158,
        "latitude": 29.858766
    },
    {
        "adcode": 540425,
        "city": "西藏自治区林芝市察隅县",
        "longitude": 97.465014,
        "latitude": 28.660234
    },
    {
        "adcode": 540426,
        "city": "西藏自治区林芝市朗县",
        "longitude": 93.074702,
        "latitude": 29.046337
    },
    {
        "adcode": 540500,
        "city": "西藏自治区山南市",
        "longitude": 91.773134,
        "latitude": 29.237137
    },
    {
        "adcode": 540502,
        "city": "西藏自治区山南市乃东区",
        "longitude": 91.761539,
        "latitude": 29.224904
    },
    {
        "adcode": 540521,
        "city": "西藏自治区山南市扎囊县",
        "longitude": 91.33725,
        "latitude": 29.245114
    },
    {
        "adcode": 540522,
        "city": "西藏自治区山南市贡嘎县",
        "longitude": 90.98414,
        "latitude": 29.289455
    },
    {
        "adcode": 540523,
        "city": "西藏自治区山南市桑日县",
        "longitude": 92.015818,
        "latitude": 29.259189
    },
    {
        "adcode": 540524,
        "city": "西藏自治区山南市琼结县",
        "longitude": 91.683881,
        "latitude": 29.024625
    },
    {
        "adcode": 540525,
        "city": "西藏自治区山南市曲松县",
        "longitude": 92.203739,
        "latitude": 29.062826
    },
    {
        "adcode": 540526,
        "city": "西藏自治区山南市措美县",
        "longitude": 91.433509,
        "latitude": 28.438202
    },
    {
        "adcode": 540527,
        "city": "西藏自治区山南市洛扎县",
        "longitude": 90.859992,
        "latitude": 28.385713
    },
    {
        "adcode": 540528,
        "city": "西藏自治区山南市加查县",
        "longitude": 92.593993,
        "latitude": 29.14029
    },
    {
        "adcode": 540529,
        "city": "西藏自治区山南市隆子县",
        "longitude": 93.075015,
        "latitude": 28.6263415
    },
    {
        "adcode": 540530,
        "city": "西藏自治区山南市错那县",
        "longitude": 92.879442,
        "latitude": 28.489975
    },
    {
        "adcode": 540531,
        "city": "西藏自治区山南市浪卡子县",
        "longitude": 90.397977,
        "latitude": 28.968031
    },
    {
        "adcode": 540600,
        "city": "西藏自治区那曲市",
        "longitude": 94.035462,
        "latitude": 29.282958
    },
    {
        "adcode": 540602,
        "city": "西藏自治区那曲市色尼区",
        "longitude": 92.1616095,
        "latitude": 31.4838155
    },
    {
        "adcode": 540621,
        "city": "西藏自治区那曲市嘉黎县",
        "longitude": 92.053367,
        "latitude": 31.4696885
    },
    {
        "adcode": 540622,
        "city": "西藏自治区那曲市比如县",
        "longitude": 93.232394,
        "latitude": 30.6408615
    },
    {
        "adcode": 540623,
        "city": "西藏自治区那曲市聂荣县",
        "longitude": 93.6804975,
        "latitude": 31.4802955
    },
    {
        "adcode": 540624,
        "city": "西藏自治区那曲市安多县",
        "longitude": 92.3042045,
        "latitude": 32.1078175
    },
    {
        "adcode": 540625,
        "city": "西藏自治区那曲市申扎县",
        "longitude": 91.6818055,
        "latitude": 32.265089
    },
    {
        "adcode": 540626,
        "city": "西藏自治区那曲市索县",
        "longitude": 88.7107115,
        "latitude": 30.930551
    },
    {
        "adcode": 540627,
        "city": "西藏自治区那曲市班戈县",
        "longitude": 93.785497,
        "latitude": 31.8869635
    },
    {
        "adcode": 540628,
        "city": "西藏自治区那曲市巴青县",
        "longitude": 90.0108155,
        "latitude": 31.392457
    },
    {
        "adcode": 540629,
        "city": "西藏自治区那曲市尼玛县",
        "longitude": 94.053304,
        "latitude": 31.9185155
    },
    {
        "adcode": 540630,
        "city": "西藏自治区那曲市双湖县",
        "longitude": 87.2376305,
        "latitude": 31.7847465
    },
    {
        "adcode": 542500,
        "city": "西藏自治区阿里地区",
        "longitude": 80.105804,
        "latitude": 32.501111
    },
    {
        "adcode": 542521,
        "city": "西藏自治区阿里地区普兰县",
        "longitude": 81.176237,
        "latitude": 30.294402
    },
    {
        "adcode": 542522,
        "city": "西藏自治区阿里地区札达县",
        "longitude": 79.802706,
        "latitude": 31.479217
    },
    {
        "adcode": 542523,
        "city": "西藏自治区阿里地区噶尔县",
        "longitude": 80.096419,
        "latitude": 32.491488
    },
    {
        "adcode": 542524,
        "city": "西藏自治区阿里地区日土县",
        "longitude": 79.732427,
        "latitude": 33.381359
    },
    {
        "adcode": 542525,
        "city": "西藏自治区阿里地区革吉县",
        "longitude": 81.145433,
        "latitude": 32.387233
    },
    {
        "adcode": 542526,
        "city": "西藏自治区阿里地区改则县",
        "longitude": 84.06259,
        "latitude": 32.302713
    },
    {
        "adcode": 542527,
        "city": "西藏自治区阿里地区措勤县",
        "longitude": 85.159494,
        "latitude": 31.016769
    },
    {
        "adcode": 610000,
        "city": "陕西省",
        "longitude": 108.954239,
        "latitude": 34.265472
    },
    {
        "adcode": 610100,
        "city": "陕西省西安市",
        "longitude": 108.940174,
        "latitude": 34.341568
    },
    {
        "adcode": 610101,
        "city": "陕西省西安市市辖区",
        "longitude": 108.940174,
        "latitude": 34.341568
    },
    {
        "adcode": 610102,
        "city": "陕西省西安市新城区",
        "longitude": 108.960747,
        "latitude": 34.266451
    },
    {
        "adcode": 610103,
        "city": "陕西省西安市碑林区",
        "longitude": 108.934235,
        "latitude": 34.230769
    },
    {
        "adcode": 610104,
        "city": "陕西省西安市莲湖区",
        "longitude": 108.944041,
        "latitude": 34.264995
    },
    {
        "adcode": 610111,
        "city": "陕西省西安市灞桥区",
        "longitude": 109.064671,
        "latitude": 34.273409
    },
    {
        "adcode": 610112,
        "city": "陕西省西安市未央区",
        "longitude": 108.94685,
        "latitude": 34.292873
    },
    {
        "adcode": 610113,
        "city": "陕西省西安市雁塔区",
        "longitude": 108.926593,
        "latitude": 34.213389
    },
    {
        "adcode": 610114,
        "city": "陕西省西安市阎良区",
        "longitude": 109.226102,
        "latitude": 34.662234
    },
    {
        "adcode": 610115,
        "city": "陕西省西安市临潼区",
        "longitude": 109.214238,
        "latitude": 34.367275
    },
    {
        "adcode": 610116,
        "city": "陕西省西安市长安区",
        "longitude": 108.906917,
        "latitude": 34.159016
    },
    {
        "adcode": 610117,
        "city": "陕西省西安市高陵区",
        "longitude": 109.088297,
        "latitude": 34.53483
    },
    {
        "adcode": 610118,
        "city": "陕西省西安市鄠邑区",
        "longitude": 108.605011,
        "latitude": 34.108626
    },
    {
        "adcode": 610122,
        "city": "陕西省西安市蓝田县",
        "longitude": 109.323479,
        "latitude": 34.151624
    },
    {
        "adcode": 610124,
        "city": "陕西省西安市周至县",
        "longitude": 108.222154,
        "latitude": 34.163621
    },
    {
        "adcode": 610200,
        "city": "陕西省铜川市",
        "longitude": 108.945233,
        "latitude": 34.896756
    },
    {
        "adcode": 610201,
        "city": "陕西省铜川市市辖区",
        "longitude": 108.945233,
        "latitude": 34.896756
    },
    {
        "adcode": 610202,
        "city": "陕西省铜川市王益区",
        "longitude": 109.075578,
        "latitude": 35.068964
    },
    {
        "adcode": 610203,
        "city": "陕西省铜川市印台区",
        "longitude": 109.099975,
        "latitude": 35.114492
    },
    {
        "adcode": 610204,
        "city": "陕西省铜川市耀州区",
        "longitude": 108.980514,
        "latitude": 34.908916
    },
    {
        "adcode": 610222,
        "city": "陕西省铜川市宜君县",
        "longitude": 109.116932,
        "latitude": 35.398577
    },
    {
        "adcode": 610300,
        "city": "陕西省宝鸡市",
        "longitude": 107.237974,
        "latitude": 34.361979
    },
    {
        "adcode": 610301,
        "city": "陕西省宝鸡市市辖区",
        "longitude": 107.237974,
        "latitude": 34.361979
    },
    {
        "adcode": 610302,
        "city": "陕西省宝鸡市渭滨区",
        "longitude": 107.149968,
        "latitude": 34.371184
    },
    {
        "adcode": 610303,
        "city": "陕西省宝鸡市金台区",
        "longitude": 107.146806,
        "latitude": 34.376069
    },
    {
        "adcode": 610304,
        "city": "陕西省宝鸡市陈仓区",
        "longitude": 107.363567,
        "latitude": 34.354701
    },
    {
        "adcode": 610322,
        "city": "陕西省宝鸡市凤翔县",
        "longitude": 107.400737,
        "latitude": 34.521218
    },
    {
        "adcode": 610323,
        "city": "陕西省宝鸡市岐山县",
        "longitude": 107.621054,
        "latitude": 34.443459
    },
    {
        "adcode": 610324,
        "city": "陕西省宝鸡市扶风县",
        "longitude": 107.900219,
        "latitude": 34.375411
    },
    {
        "adcode": 610326,
        "city": "陕西省宝鸡市眉县",
        "longitude": 107.749767,
        "latitude": 34.274247
    },
    {
        "adcode": 610327,
        "city": "陕西省宝鸡市陇县",
        "longitude": 106.864397,
        "latitude": 34.89305
    },
    {
        "adcode": 610328,
        "city": "陕西省宝鸡市千阳县",
        "longitude": 107.132442,
        "latitude": 34.642381
    },
    {
        "adcode": 610329,
        "city": "陕西省宝鸡市麟游县",
        "longitude": 107.793525,
        "latitude": 34.677902
    },
    {
        "adcode": 610330,
        "city": "陕西省宝鸡市凤县",
        "longitude": 106.515756,
        "latitude": 33.908469
    },
    {
        "adcode": 610331,
        "city": "陕西省宝鸡市太白县",
        "longitude": 107.319116,
        "latitude": 34.058401
    },
    {
        "adcode": 610400,
        "city": "咸阳市",
        "longitude": 108.708991,
        "latitude": 34.329605
    },
    {
        "adcode": 610401,
        "city": "咸阳市市辖区",
        "longitude": 108.708991,
        "latitude": 34.329605
    },
    {
        "adcode": 610402,
        "city": "陕西省咸阳市秦都区",
        "longitude": 108.706272,
        "latitude": 34.329567
    },
    {
        "adcode": 610403,
        "city": "陕西省咸阳市杨陵区",
        "longitude": 108.084732,
        "latitude": 34.272117
    },
    {
        "adcode": 610404,
        "city": "陕西省咸阳市渭城区",
        "longitude": 108.737213,
        "latitude": 34.361988
    },
    {
        "adcode": 610422,
        "city": "陕西省咸阳市三原县",
        "longitude": 108.940509,
        "latitude": 34.617382
    },
    {
        "adcode": 610423,
        "city": "陕西省咸阳市泾阳县",
        "longitude": 108.842623,
        "latitude": 34.527114
    },
    {
        "adcode": 610424,
        "city": "陕西省咸阳市乾县",
        "longitude": 108.239473,
        "latitude": 34.527551
    },
    {
        "adcode": 610425,
        "city": "陕西省咸阳市礼泉县",
        "longitude": 108.425018,
        "latitude": 34.481764
    },
    {
        "adcode": 610426,
        "city": "陕西省咸阳市永寿县",
        "longitude": 108.142311,
        "latitude": 34.691979
    },
    {
        "adcode": 610428,
        "city": "陕西省咸阳市长武县",
        "longitude": 107.798757,
        "latitude": 35.205886
    },
    {
        "adcode": 610429,
        "city": "陕西省咸阳市旬邑县",
        "longitude": 108.333986,
        "latitude": 35.111978
    },
    {
        "adcode": 610430,
        "city": "陕西省咸阳市淳化县",
        "longitude": 108.580681,
        "latitude": 34.79925
    },
    {
        "adcode": 610431,
        "city": "陕西省咸阳市武功县",
        "longitude": 108.200398,
        "latitude": 34.260204
    },
    {
        "adcode": 610481,
        "city": "陕西省咸阳市兴平市",
        "longitude": 108.490475,
        "latitude": 34.299221
    },
    {
        "adcode": 610482,
        "city": "陕西省咸阳市彬州市",
        "longitude": 88.8385005,
        "latitude": 33.18856
    },
    {
        "adcode": 610500,
        "city": "陕西省渭南市",
        "longitude": 109.509786,
        "latitude": 34.499995
    },
    {
        "adcode": 610501,
        "city": "陕西省渭南市市辖区",
        "longitude": 109.509786,
        "latitude": 34.499995
    },
    {
        "adcode": 610502,
        "city": "陕西省渭南市临渭区",
        "longitude": 109.492726,
        "latitude": 34.498192
    },
    {
        "adcode": 610503,
        "city": "陕西省渭南市华州区",
        "longitude": 109.761417,
        "latitude": 34.511949
    },
    {
        "adcode": 610522,
        "city": "陕西省渭南市潼关县",
        "longitude": 110.24635,
        "latitude": 34.544296
    },
    {
        "adcode": 610523,
        "city": "陕西省渭南市大荔县",
        "longitude": 109.941658,
        "latitude": 34.797184
    },
    {
        "adcode": 610524,
        "city": "陕西省渭南市合阳县",
        "longitude": 110.149466,
        "latitude": 35.237986
    },
    {
        "adcode": 610525,
        "city": "陕西省渭南市澄城县",
        "longitude": 109.93235,
        "latitude": 35.190245
    },
    {
        "adcode": 610526,
        "city": "陕西省渭南市蒲城县",
        "longitude": 109.586506,
        "latitude": 34.955855
    },
    {
        "adcode": 610527,
        "city": "陕西省渭南市白水县",
        "longitude": 109.590671,
        "latitude": 35.177452
    },
    {
        "adcode": 610528,
        "city": "陕西省渭南市富平县",
        "longitude": 109.180331,
        "latitude": 34.751086
    },
    {
        "adcode": 610581,
        "city": "陕西省渭南市韩城市",
        "longitude": 110.442847,
        "latitude": 35.476788
    },
    {
        "adcode": 610582,
        "city": "陕西省渭南市华阴市",
        "longitude": 110.092301,
        "latitude": 34.566096
    },
    {
        "adcode": 610600,
        "city": "陕西省延安市",
        "longitude": 109.489727,
        "latitude": 36.585455
    },
    {
        "adcode": 610601,
        "city": "陕西省延安市市辖区",
        "longitude": 109.489727,
        "latitude": 36.585455
    },
    {
        "adcode": 610602,
        "city": "陕西省延安市宝塔区",
        "longitude": 109.493106,
        "latitude": 36.591266
    },
    {
        "adcode": 610603,
        "city": "陕西省延安市安塞区",
        "longitude": 109.328842,
        "latitude": 36.863854
    },
    {
        "adcode": 610621,
        "city": "陕西省延安市延长县",
        "longitude": 110.012334,
        "latitude": 36.579313
    },
    {
        "adcode": 610622,
        "city": "陕西省延安市延川县",
        "longitude": 110.193514,
        "latitude": 36.878117
    },
    {
        "adcode": 610623,
        "city": "陕西省延安市子长县",
        "longitude": 109.675234,
        "latitude": 37.142668
    },
    {
        "adcode": 610625,
        "city": "陕西省延安市志丹县",
        "longitude": 108.768432,
        "latitude": 36.822194
    },
    {
        "adcode": 610626,
        "city": "陕西省延安市吴起县",
        "longitude": 108.175933,
        "latitude": 36.927216
    },
    {
        "adcode": 610627,
        "city": "陕西省延安市甘泉县",
        "longitude": 109.35102,
        "latitude": 36.276526
    },
    {
        "adcode": 610628,
        "city": "陕西省延安市富县",
        "longitude": 109.379711,
        "latitude": 35.98801
    },
    {
        "adcode": 610629,
        "city": "陕西省延安市洛川县",
        "longitude": 109.432369,
        "latitude": 35.761975
    },
    {
        "adcode": 610630,
        "city": "陕西省延安市宜川县",
        "longitude": 110.168963,
        "latitude": 36.050178
    },
    {
        "adcode": 610631,
        "city": "陕西省延安市黄龙县",
        "longitude": 109.840373,
        "latitude": 35.584467
    },
    {
        "adcode": 610632,
        "city": "陕西省延安市黄陵县",
        "longitude": 109.262961,
        "latitude": 35.579428
    },
    {
        "adcode": 610700,
        "city": "陕西省汉中市",
        "longitude": 107.023323,
        "latitude": 33.06748
    },
    {
        "adcode": 610701,
        "city": "陕西省汉中市市辖区",
        "longitude": 107.023323,
        "latitude": 33.06748
    },
    {
        "adcode": 610702,
        "city": "陕西省汉中市汉台区",
        "longitude": 107.031856,
        "latitude": 33.067771
    },
    {
        "adcode": 610703,
        "city": "陕西省汉中市南郑区",
        "longitude": 108.077524,
        "latitude": 35.0439545
    },
    {
        "adcode": 610722,
        "city": "陕西省汉中市城固县",
        "longitude": 107.33393,
        "latitude": 33.157131
    },
    {
        "adcode": 610723,
        "city": "陕西省汉中市洋县",
        "longitude": 107.545837,
        "latitude": 33.222739
    },
    {
        "adcode": 610724,
        "city": "陕西省汉中市西乡县",
        "longitude": 107.766614,
        "latitude": 32.983101
    },
    {
        "adcode": 610725,
        "city": "陕西省汉中市勉县",
        "longitude": 106.673221,
        "latitude": 33.153553
    },
    {
        "adcode": 610726,
        "city": "陕西省汉中市宁强县",
        "longitude": 106.257171,
        "latitude": 32.829694
    },
    {
        "adcode": 610727,
        "city": "陕西省汉中市略阳县",
        "longitude": 106.156718,
        "latitude": 33.327281
    },
    {
        "adcode": 610728,
        "city": "陕西省汉中市镇巴县",
        "longitude": 107.895035,
        "latitude": 32.536704
    },
    {
        "adcode": 610729,
        "city": "陕西省汉中市留坝县",
        "longitude": 106.920808,
        "latitude": 33.617571
    },
    {
        "adcode": 610730,
        "city": "陕西省汉中市佛坪县",
        "longitude": 107.990539,
        "latitude": 33.524359
    },
    {
        "adcode": 610800,
        "city": "陕西省榆林市",
        "longitude": 109.734589,
        "latitude": 38.28539
    },
    {
        "adcode": 610801,
        "city": "陕西省榆林市市辖区",
        "longitude": 109.734589,
        "latitude": 38.28539
    },
    {
        "adcode": 610802,
        "city": "陕西省榆林市榆阳区",
        "longitude": 109.720309,
        "latitude": 38.277029
    },
    {
        "adcode": 610803,
        "city": "陕西省榆林市横山区",
        "longitude": 109.294346,
        "latitude": 37.962209
    },
    {
        "adcode": 610822,
        "city": "陕西省榆林市府谷县",
        "longitude": 111.067366,
        "latitude": 39.028116
    },
    {
        "adcode": 610824,
        "city": "陕西省榆林市靖边县",
        "longitude": 108.793988,
        "latitude": 37.599438
    },
    {
        "adcode": 610825,
        "city": "陕西省榆林市定边县",
        "longitude": 107.601267,
        "latitude": 37.594612
    },
    {
        "adcode": 610826,
        "city": "陕西省榆林市绥德县",
        "longitude": 110.263362,
        "latitude": 37.50294
    },
    {
        "adcode": 610827,
        "city": "陕西省榆林市米脂县",
        "longitude": 110.183754,
        "latitude": 37.755417
    },
    {
        "adcode": 610828,
        "city": "陕西省榆林市佳县",
        "longitude": 110.491345,
        "latitude": 38.019511
    },
    {
        "adcode": 610829,
        "city": "陕西省榆林市吴堡县",
        "longitude": 110.739673,
        "latitude": 37.452068
    },
    {
        "adcode": 610830,
        "city": "陕西省榆林市清涧县",
        "longitude": 110.121209,
        "latitude": 37.088878
    },
    {
        "adcode": 610831,
        "city": "陕西省榆林市子洲县",
        "longitude": 110.03525,
        "latitude": 37.610683
    },
    {
        "adcode": 610881,
        "city": "陕西省榆林市神木市",
        "longitude": 110.498868,
        "latitude": 38.842498
    },
    {
        "adcode": 610900,
        "city": "陕西省安康市",
        "longitude": 109.029022,
        "latitude": 32.684714
    },
    {
        "adcode": 610901,
        "city": "陕西省安康市市辖区",
        "longitude": 109.029022,
        "latitude": 32.684714
    },
    {
        "adcode": 610902,
        "city": "陕西省安康市汉滨区",
        "longitude": 109.026836,
        "latitude": 32.695173
    },
    {
        "adcode": 610921,
        "city": "陕西省安康市汉阴县",
        "longitude": 108.508745,
        "latitude": 32.893026
    },
    {
        "adcode": 610922,
        "city": "陕西省安康市石泉县",
        "longitude": 108.247887,
        "latitude": 33.038408
    },
    {
        "adcode": 610923,
        "city": "陕西省安康市宁陕县",
        "longitude": 108.314283,
        "latitude": 33.310527
    },
    {
        "adcode": 610924,
        "city": "陕西省安康市紫阳县",
        "longitude": 108.534229,
        "latitude": 32.520246
    },
    {
        "adcode": 610925,
        "city": "陕西省安康市岚皋县",
        "longitude": 108.902049,
        "latitude": 32.307001
    },
    {
        "adcode": 610926,
        "city": "陕西省安康市平利县",
        "longitude": 109.361864,
        "latitude": 32.388854
    },
    {
        "adcode": 610927,
        "city": "陕西省安康市镇坪县",
        "longitude": 109.526873,
        "latitude": 31.883672
    },
    {
        "adcode": 610928,
        "city": "陕西省安康市旬阳县",
        "longitude": 109.365265,
        "latitude": 32.834086
    },
    {
        "adcode": 610929,
        "city": "陕西省安康市白河县",
        "longitude": 110.112629,
        "latitude": 32.809026
    },
    {
        "adcode": 611000,
        "city": "陕西省商洛市",
        "longitude": 109.940477,
        "latitude": 33.870422
    },
    {
        "adcode": 611001,
        "city": "陕西省商洛市市辖区",
        "longitude": 109.940477,
        "latitude": 33.870422
    },
    {
        "adcode": 611002,
        "city": "陕西省商洛市商州区",
        "longitude": 109.941241,
        "latitude": 33.862703
    },
    {
        "adcode": 611021,
        "city": "陕西省商洛市洛南县",
        "longitude": 110.148509,
        "latitude": 34.090838
    },
    {
        "adcode": 611022,
        "city": "陕西省商洛市丹凤县",
        "longitude": 110.331676,
        "latitude": 33.698185
    },
    {
        "adcode": 611023,
        "city": "陕西省商洛市商南县",
        "longitude": 110.881807,
        "latitude": 33.530995
    },
    {
        "adcode": 611024,
        "city": "陕西省商洛市山阳县",
        "longitude": 109.88229,
        "latitude": 33.532172
    },
    {
        "adcode": 611025,
        "city": "陕西省商洛市镇安县",
        "longitude": 109.152893,
        "latitude": 33.423357
    },
    {
        "adcode": 611026,
        "city": "陕西省商洛市柞水县",
        "longitude": 109.114207,
        "latitude": 33.68611
    },
    {
        "adcode": 620000,
        "city": "甘肃省",
        "longitude": 103.826308,
        "latitude": 36.059421
    },
    {
        "adcode": 620100,
        "city": "甘肃省兰州市",
        "longitude": 103.834303,
        "latitude": 36.061089
    },
    {
        "adcode": 620101,
        "city": "甘肃省兰州市市辖区",
        "longitude": 103.834303,
        "latitude": 36.061089
    },
    {
        "adcode": 620102,
        "city": "甘肃省兰州市城关区",
        "longitude": 103.825255,
        "latitude": 36.057054
    },
    {
        "adcode": 620103,
        "city": "甘肃省兰州市七里河区",
        "longitude": 103.785866,
        "latitude": 36.065915
    },
    {
        "adcode": 620104,
        "city": "甘肃省兰州市西固区",
        "longitude": 103.627964,
        "latitude": 36.088431
    },
    {
        "adcode": 620105,
        "city": "甘肃省兰州市安宁区",
        "longitude": 103.71909,
        "latitude": 36.103927
    },
    {
        "adcode": 620111,
        "city": "甘肃省兰州市红古区",
        "longitude": 102.859323,
        "latitude": 36.345669
    },
    {
        "adcode": 620121,
        "city": "甘肃省兰州市永登县",
        "longitude": 103.26038,
        "latitude": 36.736513
    },
    {
        "adcode": 620122,
        "city": "甘肃省兰州市皋兰县",
        "longitude": 103.947377,
        "latitude": 36.332663
    },
    {
        "adcode": 620123,
        "city": "甘肃省兰州市榆中县",
        "longitude": 104.112527,
        "latitude": 35.843056
    },
    {
        "adcode": 620200,
        "city": "甘肃省嘉峪关市",
        "longitude": 98.289152,
        "latitude": 39.77313
    },
    {
        "adcode": 620201,
        "city": "甘肃省嘉峪关市市辖区",
        "longitude": 98.289152,
        "latitude": 39.77313
    },
    {
        "adcode": 620300,
        "city": "甘肃省金昌市",
        "longitude": 102.188043,
        "latitude": 38.520089
    },
    {
        "adcode": 620301,
        "city": "甘肃省金昌市市辖区",
        "longitude": 102.188043,
        "latitude": 38.520089
    },
    {
        "adcode": 620302,
        "city": "甘肃省金昌市金川区",
        "longitude": 102.194089,
        "latitude": 38.521085
    },
    {
        "adcode": 620321,
        "city": "甘肃省金昌市永昌县",
        "longitude": 101.984649,
        "latitude": 38.24317
    },
    {
        "adcode": 620400,
        "city": "甘肃省白银市",
        "longitude": 104.138559,
        "latitude": 36.544756
    },
    {
        "adcode": 620401,
        "city": "甘肃省白银市市辖区",
        "longitude": 104.138559,
        "latitude": 36.544756
    },
    {
        "adcode": 620402,
        "city": "甘肃省白银市白银区",
        "longitude": 104.148556,
        "latitude": 36.535398
    },
    {
        "adcode": 620403,
        "city": "甘肃省白银市平川区",
        "longitude": 104.825208,
        "latitude": 36.728304
    },
    {
        "adcode": 620421,
        "city": "甘肃省白银市靖远县",
        "longitude": 104.676774,
        "latitude": 36.571366
    },
    {
        "adcode": 620422,
        "city": "甘肃省白银市会宁县",
        "longitude": 105.053358,
        "latitude": 35.692823
    },
    {
        "adcode": 620423,
        "city": "甘肃省白银市景泰县",
        "longitude": 104.063091,
        "latitude": 37.183804
    },
    {
        "adcode": 620500,
        "city": "甘肃省天水市",
        "longitude": 105.724947,
        "latitude": 34.580863
    },
    {
        "adcode": 620501,
        "city": "甘肃省天水市市辖区",
        "longitude": 105.724947,
        "latitude": 34.580863
    },
    {
        "adcode": 620502,
        "city": "甘肃省天水市秦州区",
        "longitude": 105.724199,
        "latitude": 34.580892
    },
    {
        "adcode": 620503,
        "city": "甘肃省天水市麦积区",
        "longitude": 105.889557,
        "latitude": 34.570384
    },
    {
        "adcode": 620521,
        "city": "甘肃省天水市清水县",
        "longitude": 106.137293,
        "latitude": 34.749865
    },
    {
        "adcode": 620522,
        "city": "甘肃省天水市秦安县",
        "longitude": 105.674983,
        "latitude": 34.858916
    },
    {
        "adcode": 620523,
        "city": "甘肃省天水市甘谷县",
        "longitude": 105.340864,
        "latitude": 34.745465
    },
    {
        "adcode": 620524,
        "city": "甘肃省天水市武山县",
        "longitude": 104.890782,
        "latitude": 34.72138
    },
    {
        "adcode": 620525,
        "city": "甘肃省天水市张家川回族自治县",
        "longitude": 106.204518,
        "latitude": 34.988037
    },
    {
        "adcode": 620600,
        "city": "甘肃省武威市",
        "longitude": 102.638011,
        "latitude": 37.928264
    },
    {
        "adcode": 620601,
        "city": "甘肃省武威市市辖区",
        "longitude": 102.638011,
        "latitude": 37.928264
    },
    {
        "adcode": 620602,
        "city": "甘肃省武威市凉州区",
        "longitude": 102.72989,
        "latitude": 37.820619
    },
    {
        "adcode": 620621,
        "city": "甘肃省武威市民勤县",
        "longitude": 103.093792,
        "latitude": 38.62435
    },
    {
        "adcode": 620622,
        "city": "甘肃省武威市古浪县",
        "longitude": 102.897533,
        "latitude": 37.47012
    },
    {
        "adcode": 620623,
        "city": "甘肃省武威市天祝藏族自治县",
        "longitude": 103.141757,
        "latitude": 36.97174
    },
    {
        "adcode": 620700,
        "city": "甘肃省张掖市",
        "longitude": 100.449818,
        "latitude": 38.925875
    },
    {
        "adcode": 620701,
        "city": "甘肃省张掖市市辖区",
        "longitude": 100.449818,
        "latitude": 38.925875
    },
    {
        "adcode": 620702,
        "city": "甘肃省张掖市甘州区",
        "longitude": 100.478058,
        "latitude": 38.929763
    },
    {
        "adcode": 620721,
        "city": "甘肃省张掖市肃南裕固族自治县",
        "longitude": 99.615601,
        "latitude": 38.836932
    },
    {
        "adcode": 620722,
        "city": "甘肃省张掖市民乐县",
        "longitude": 100.81286,
        "latitude": 38.430794
    },
    {
        "adcode": 620723,
        "city": "甘肃省张掖市临泽县",
        "longitude": 100.164445,
        "latitude": 39.152642
    },
    {
        "adcode": 620724,
        "city": "甘肃省张掖市高台县",
        "longitude": 99.819317,
        "latitude": 39.377733
    },
    {
        "adcode": 620725,
        "city": "甘肃省张掖市山丹县",
        "longitude": 101.088575,
        "latitude": 38.784758
    },
    {
        "adcode": 620800,
        "city": "甘肃省平凉市",
        "longitude": 106.66524,
        "latitude": 35.543051
    },
    {
        "adcode": 620801,
        "city": "甘肃省平凉市市辖区",
        "longitude": 106.66524,
        "latitude": 35.543051
    },
    {
        "adcode": 620802,
        "city": "甘肃省平凉市崆峒区",
        "longitude": 106.674767,
        "latitude": 35.542491
    },
    {
        "adcode": 620821,
        "city": "甘肃省平凉市泾川县",
        "longitude": 107.36785,
        "latitude": 35.332666
    },
    {
        "adcode": 620822,
        "city": "甘肃省平凉市灵台县",
        "longitude": 107.621124,
        "latitude": 35.065399
    },
    {
        "adcode": 620823,
        "city": "甘肃省平凉市崇信县",
        "longitude": 107.035409,
        "latitude": 35.302123
    },
    {
        "adcode": 620825,
        "city": "甘肃省平凉市庄浪县",
        "longitude": 106.036687,
        "latitude": 35.202385
    },
    {
        "adcode": 620826,
        "city": "甘肃省平凉市静宁县",
        "longitude": 105.732556,
        "latitude": 35.521977
    },
    {
        "adcode": 620881,
        "city": "甘肃省平凉市华亭县华亭",
        "longitude": 106.66246,
        "latitude": 35.219951
    },
    {
        "adcode": 620900,
        "city": "甘肃省酒泉市",
        "longitude": 98.494483,
        "latitude": 39.73241
    },
    {
        "adcode": 620901,
        "city": "甘肃省酒泉市市辖区",
        "longitude": 98.494483,
        "latitude": 39.73241
    },
    {
        "adcode": 620902,
        "city": "甘肃省酒泉市肃州区",
        "longitude": 98.50785,
        "latitude": 39.745071
    },
    {
        "adcode": 620921,
        "city": "甘肃省酒泉市金塔县",
        "longitude": 98.90327,
        "latitude": 39.983599
    },
    {
        "adcode": 620922,
        "city": "甘肃省酒泉市瓜州县",
        "longitude": 95.782306,
        "latitude": 40.520545
    },
    {
        "adcode": 620923,
        "city": "甘肃省酒泉市肃北蒙古族自治县",
        "longitude": 94.876579,
        "latitude": 39.51245
    },
    {
        "adcode": 620924,
        "city": "甘肃省酒泉市阿克塞哈萨克族自治县",
        "longitude": 94.340204,
        "latitude": 39.633943
    },
    {
        "adcode": 620981,
        "city": "甘肃省酒泉市玉门市",
        "longitude": 97.045679,
        "latitude": 40.291843
    },
    {
        "adcode": 620982,
        "city": "甘肃省酒泉市敦煌市",
        "longitude": 94.661967,
        "latitude": 40.142128
    },
    {
        "adcode": 621000,
        "city": "甘肃省庆阳市",
        "longitude": 107.643631,
        "latitude": 35.709077
    },
    {
        "adcode": 621001,
        "city": "甘肃省庆阳市市辖区",
        "longitude": 107.643631,
        "latitude": 35.709077
    },
    {
        "adcode": 621002,
        "city": "甘肃省庆阳市西峰区",
        "longitude": 107.651077,
        "latitude": 35.730652
    },
    {
        "adcode": 621021,
        "city": "甘肃省庆阳市庆城县",
        "longitude": 107.881802,
        "latitude": 36.016299
    },
    {
        "adcode": 621022,
        "city": "甘肃省庆阳市环县",
        "longitude": 107.308501,
        "latitude": 36.568435
    },
    {
        "adcode": 621023,
        "city": "甘肃省庆阳市华池县",
        "longitude": 107.990035,
        "latitude": 36.461355
    },
    {
        "adcode": 621024,
        "city": "甘肃省庆阳市合水县",
        "longitude": 108.01953,
        "latitude": 35.819243
    },
    {
        "adcode": 621025,
        "city": "甘肃省庆阳市正宁县",
        "longitude": 108.359976,
        "latitude": 35.49189
    },
    {
        "adcode": 621026,
        "city": "甘肃省庆阳市宁县",
        "longitude": 107.928369,
        "latitude": 35.502177
    },
    {
        "adcode": 621027,
        "city": "甘肃省庆阳市镇原县",
        "longitude": 107.200832,
        "latitude": 35.677462
    },
    {
        "adcode": 621100,
        "city": "甘肃省定西市",
        "longitude": 104.626282,
        "latitude": 35.580662
    },
    {
        "adcode": 621101,
        "city": "甘肃省定西市市辖区",
        "longitude": 104.626282,
        "latitude": 35.580662
    },
    {
        "adcode": 621102,
        "city": "甘肃省定西市安定区",
        "longitude": 104.610668,
        "latitude": 35.580629
    },
    {
        "adcode": 621121,
        "city": "甘肃省定西市通渭县",
        "longitude": 105.242061,
        "latitude": 35.210831
    },
    {
        "adcode": 621122,
        "city": "甘肃省定西市陇西县",
        "longitude": 104.634984,
        "latitude": 35.00394
    },
    {
        "adcode": 621123,
        "city": "甘肃省定西市渭源县",
        "longitude": 104.215467,
        "latitude": 35.136755
    },
    {
        "adcode": 621124,
        "city": "甘肃省定西市临洮县",
        "longitude": 103.859565,
        "latitude": 35.394989
    },
    {
        "adcode": 621125,
        "city": "甘肃省定西市漳县",
        "longitude": 104.471572,
        "latitude": 34.848444
    },
    {
        "adcode": 621126,
        "city": "甘肃省定西市岷县",
        "longitude": 104.03688,
        "latitude": 34.438076
    },
    {
        "adcode": 621200,
        "city": "甘肃省陇南市",
        "longitude": 104.921841,
        "latitude": 33.400684
    },
    {
        "adcode": 621201,
        "city": "甘肃省陇南市市辖区",
        "longitude": 104.921841,
        "latitude": 33.400684
    },
    {
        "adcode": 621202,
        "city": "甘肃省陇南市武都区",
        "longitude": 104.926337,
        "latitude": 33.392211
    },
    {
        "adcode": 621221,
        "city": "甘肃省陇南市成县",
        "longitude": 105.742203,
        "latitude": 33.750477
    },
    {
        "adcode": 621222,
        "city": "甘肃省陇南市文县",
        "longitude": 104.683434,
        "latitude": 32.943815
    },
    {
        "adcode": 621223,
        "city": "甘肃省陇南市宕昌县",
        "longitude": 104.393385,
        "latitude": 34.047261
    },
    {
        "adcode": 621224,
        "city": "甘肃省陇南市康县",
        "longitude": 105.609169,
        "latitude": 33.329136
    },
    {
        "adcode": 621225,
        "city": "甘肃省陇南市西和县",
        "longitude": 105.298756,
        "latitude": 34.014215
    },
    {
        "adcode": 621226,
        "city": "甘肃省陇南市礼县",
        "longitude": 105.17864,
        "latitude": 34.189345
    },
    {
        "adcode": 621227,
        "city": "甘肃省陇南市徽县",
        "longitude": 106.08778,
        "latitude": 33.768826
    },
    {
        "adcode": 621228,
        "city": "甘肃省陇南市两当县",
        "longitude": 106.304967,
        "latitude": 33.908917
    },
    {
        "adcode": 622900,
        "city": "甘肃省临夏回族自治州",
        "longitude": 103.210538,
        "latitude": 35.601182
    },
    {
        "adcode": 622901,
        "city": "甘肃省临夏回族自治州",
        "longitude": 103.210538,
        "latitude": 35.601182
    },
    {
        "adcode": 622921,
        "city": "甘肃省临夏回族自治州临夏县",
        "longitude": 102.995502,
        "latitude": 35.491637
    },
    {
        "adcode": 622922,
        "city": "甘肃省临夏回族自治州康乐县",
        "longitude": 103.708354,
        "latitude": 35.370505
    },
    {
        "adcode": 622923,
        "city": "甘肃省临夏回族自治州永靖县",
        "longitude": 103.285854,
        "latitude": 35.958306
    },
    {
        "adcode": 622924,
        "city": "甘肃省临夏回族自治州广河县",
        "longitude": 103.575834,
        "latitude": 35.488052
    },
    {
        "adcode": 622925,
        "city": "甘肃省临夏回族自治州和政县",
        "longitude": 103.350997,
        "latitude": 35.424603
    },
    {
        "adcode": 622926,
        "city": "甘肃省临夏回族自治州东乡族自治县",
        "longitude": 103.389346,
        "latitude": 35.663752
    },
    {
        "adcode": 622927,
        "city": "甘肃省临夏回族自治州积石山保安族东乡族撒拉族自治县",
        "longitude": 102.875843,
        "latitude": 35.717661
    },
    {
        "adcode": 623000,
        "city": "甘肃省甘南藏族自治州",
        "longitude": 102.911027,
        "latitude": 34.983385
    },
    {
        "adcode": 623001,
        "city": "甘肃省甘南藏族自治州合作市",
        "longitude": 102.910882,
        "latitude": 35.000399
    },
    {
        "adcode": 623021,
        "city": "甘肃省甘南藏族自治州临潭县",
        "longitude": 103.353919,
        "latitude": 34.692747
    },
    {
        "adcode": 623022,
        "city": "甘肃省甘南藏族自治州卓尼县",
        "longitude": 103.507109,
        "latitude": 34.589588
    },
    {
        "adcode": 623023,
        "city": "甘肃省甘南藏族自治州舟曲县",
        "longitude": 104.371586,
        "latitude": 33.785259
    },
    {
        "adcode": 623024,
        "city": "甘肃省甘南藏族自治州迭部县",
        "longitude": 103.22187,
        "latitude": 34.055939
    },
    {
        "adcode": 623025,
        "city": "甘肃省甘南藏族自治州玛曲县",
        "longitude": 102.072698,
        "latitude": 33.997712
    },
    {
        "adcode": 623026,
        "city": "甘肃省甘南藏族自治州碌曲县",
        "longitude": 102.487327,
        "latitude": 34.590944
    },
    {
        "adcode": 623027,
        "city": "甘肃省甘南藏族自治州夏河县",
        "longitude": 102.521807,
        "latitude": 35.202503
    },
    {
        "adcode": 630000,
        "city": "青海省",
        "longitude": 101.780199,
        "latitude": 36.620901
    },
    {
        "adcode": 630100,
        "city": "青海省西宁市",
        "longitude": 101.778228,
        "latitude": 36.617144
    },
    {
        "adcode": 630101,
        "city": "青海省西宁市市辖区",
        "longitude": 101.778228,
        "latitude": 36.617144
    },
    {
        "adcode": 630102,
        "city": "青海省西宁市城东区",
        "longitude": 101.803717,
        "latitude": 36.599745
    },
    {
        "adcode": 630103,
        "city": "青海省西宁市城中区",
        "longitude": 101.784554,
        "latitude": 36.621181
    },
    {
        "adcode": 630104,
        "city": "青海省西宁市城西区",
        "longitude": 101.765843,
        "latitude": 36.628305
    },
    {
        "adcode": 630105,
        "city": "青海省西宁市城北区",
        "longitude": 101.766228,
        "latitude": 36.650038
    },
    {
        "adcode": 630121,
        "city": "青海省西宁市大通回族土族自治县",
        "longitude": 101.685643,
        "latitude": 36.926955
    },
    {
        "adcode": 630122,
        "city": "青海省西宁市湟中县",
        "longitude": 101.571667,
        "latitude": 36.500879
    },
    {
        "adcode": 630123,
        "city": "青海省西宁市湟源县",
        "longitude": 101.256464,
        "latitude": 36.682427
    },
    {
        "adcode": 630200,
        "city": "青海省海东市",
        "longitude": 102.104287,
        "latitude": 36.502039
    },
    {
        "adcode": 630202,
        "city": "青海省海东市乐都区",
        "longitude": 102.401725,
        "latitude": 36.482058
    },
    {
        "adcode": 630203,
        "city": "青海省海东市平安区",
        "longitude": 102.108835,
        "latitude": 36.500563
    },
    {
        "adcode": 630222,
        "city": "青海省海东市民和回族土族自治县",
        "longitude": 102.830892,
        "latitude": 36.320321
    },
    {
        "adcode": 630223,
        "city": "青海省海东市互助土族自治县",
        "longitude": 101.959271,
        "latitude": 36.844249
    },
    {
        "adcode": 630224,
        "city": "青海省海东市化隆回族自治县",
        "longitude": 102.264143,
        "latitude": 36.094908
    },
    {
        "adcode": 630225,
        "city": "青海省海东市循化撒拉族自治县",
        "longitude": 102.485646,
        "latitude": 35.848586
    },
    {
        "adcode": 632200,
        "city": "青海省海北藏族自治州",
        "longitude": 100.900997,
        "latitude": 36.954413
    },
    {
        "adcode": 632221,
        "city": "青海省海北藏族自治州门源回族自治县",
        "longitude": 101.622364,
        "latitude": 37.376449
    },
    {
        "adcode": 632222,
        "city": "青海省海北藏族自治州祁连县",
        "longitude": 100.253211,
        "latitude": 38.177112
    },
    {
        "adcode": 632223,
        "city": "青海省海北藏族自治州海晏县",
        "longitude": 100.99443,
        "latitude": 36.896467
    },
    {
        "adcode": 632224,
        "city": "青海省海北藏族自治州刚察县",
        "longitude": 100.145833,
        "latitude": 37.32547
    },
    {
        "adcode": 632300,
        "city": "青海省黄南藏族自治州",
        "longitude": 102.015248,
        "latitude": 35.519548
    },
    {
        "adcode": 632321,
        "city": "青海省黄南藏族自治州同仁县",
        "longitude": 102.018323,
        "latitude": 35.516063
    },
    {
        "adcode": 632322,
        "city": "青海省黄南藏族自治州尖扎县",
        "longitude": 102.031183,
        "latitude": 35.938299
    },
    {
        "adcode": 632323,
        "city": "青海省黄南藏族自治州泽库县",
        "longitude": 101.466689,
        "latitude": 35.035313
    },
    {
        "adcode": 632324,
        "city": "青海省黄南藏族自治州河南蒙古族自治县",
        "longitude": 101.616308,
        "latitude": 34.734773
    },
    {
        "adcode": 632500,
        "city": "青海省海南藏族自治州",
        "longitude": 100.620373,
        "latitude": 36.286437
    },
    {
        "adcode": 632521,
        "city": "青海省海南藏族自治州共和县",
        "longitude": 100.620031,
        "latitude": 36.284107
    },
    {
        "adcode": 632522,
        "city": "青海省海南藏族自治州同德县",
        "longitude": 100.578052,
        "latitude": 35.254791
    },
    {
        "adcode": 632523,
        "city": "青海省海南藏族自治州贵德县",
        "longitude": 101.435256,
        "latitude": 36.04068
    },
    {
        "adcode": 632524,
        "city": "青海省海南藏族自治州兴海县",
        "longitude": 99.987966,
        "latitude": 35.588613
    },
    {
        "adcode": 632525,
        "city": "青海省海南藏族自治州贵南县",
        "longitude": 100.747503,
        "latitude": 35.586715
    },
    {
        "adcode": 632600,
        "city": "青海省果洛藏族自治州",
        "longitude": 100.244808,
        "latitude": 34.471431
    },
    {
        "adcode": 632621,
        "city": "青海省果洛藏族自治州玛沁县",
        "longitude": 100.238888,
        "latitude": 34.477433
    },
    {
        "adcode": 632622,
        "city": "青海省果洛藏族自治州班玛县",
        "longitude": 100.737138,
        "latitude": 32.932723
    },
    {
        "adcode": 632623,
        "city": "青海省果洛藏族自治州甘德县",
        "longitude": 99.900905,
        "latitude": 33.969219
    },
    {
        "adcode": 632624,
        "city": "青海省果洛藏族自治州达日县",
        "longitude": 99.651392,
        "latitude": 33.748921
    },
    {
        "adcode": 632625,
        "city": "青海省果洛藏族自治州久治县",
        "longitude": 101.482831,
        "latitude": 33.429471
    },
    {
        "adcode": 632626,
        "city": "青海省果洛藏族自治州玛多县",
        "longitude": 98.209206,
        "latitude": 34.915946
    },
    {
        "adcode": 632700,
        "city": "青海省玉树藏族自治州",
        "longitude": 97.091934,
        "latitude": 33.011674
    },
    {
        "adcode": 632701,
        "city": "青海省玉树藏族自治州玉树市",
        "longitude": 97.008785,
        "latitude": 32.993107
    },
    {
        "adcode": 632722,
        "city": "青海省玉树藏族自治州杂多县",
        "longitude": 95.300723,
        "latitude": 32.893185
    },
    {
        "adcode": 632723,
        "city": "青海省玉树藏族自治州称多县",
        "longitude": 97.110832,
        "latitude": 33.369218
    },
    {
        "adcode": 632724,
        "city": "青海省玉树藏族自治州治多县",
        "longitude": 95.61308,
        "latitude": 33.852751
    },
    {
        "adcode": 632725,
        "city": "青海省玉树藏族自治州囊谦县",
        "longitude": 96.48065,
        "latitude": 32.203246
    },
    {
        "adcode": 632726,
        "city": "青海省玉树藏族自治州曲麻莱县",
        "longitude": 95.797367,
        "latitude": 34.126429
    },
    {
        "adcode": 632800,
        "city": "青海省海西蒙古族藏族自治州",
        "longitude": 97.369751,
        "latitude": 37.377139
    },
    {
        "adcode": 632801,
        "city": "青海省海西蒙古族藏族自治州格尔木市",
        "longitude": 94.928484,
        "latitude": 36.406404
    },
    {
        "adcode": 632802,
        "city": "青海省海西蒙古族藏族自治州德令哈市",
        "longitude": 97.360985,
        "latitude": 37.369436
    },
    {
        "adcode": 632803,
        "city": "青海省海西蒙古族藏族自治州茫崖市",
        "longitude": 106.936096,
        "latitude": 32.999379
    },
    {
        "adcode": 632821,
        "city": "青海省海西蒙古族藏族自治州乌兰县",
        "longitude": 98.480195,
        "latitude": 36.929749
    },
    {
        "adcode": 632822,
        "city": "青海省海西蒙古族藏族自治州都兰县",
        "longitude": 98.095844,
        "latitude": 36.302496
    },
    {
        "adcode": 632823,
        "city": "青海省海西蒙古族藏族自治州天峻县",
        "longitude": 99.022984,
        "latitude": 37.300851
    },
    {
        "adcode": 632825,
        "city": "青海省海西蒙古族藏族自治州直辖",
        "longitude": 90.855821,
        "latitude": 38.247159
    },
    {
        "adcode": 640000,
        "city": "宁夏回族自治区",
        "longitude": 106.258754,
        "latitude": 38.471317
    },
    {
        "adcode": 640100,
        "city": "宁夏回族自治区银川市",
        "longitude": 106.230909,
        "latitude": 38.487193
    },
    {
        "adcode": 640101,
        "city": "宁夏回族自治区银川市市辖区",
        "longitude": 106.230909,
        "latitude": 38.487193
    },
    {
        "adcode": 640104,
        "city": "宁夏回族自治区银川市兴庆区",
        "longitude": 106.28865,
        "latitude": 38.47361
    },
    {
        "adcode": 640105,
        "city": "宁夏回族自治区银川市西夏区",
        "longitude": 106.156394,
        "latitude": 38.49604
    },
    {
        "adcode": 640106,
        "city": "宁夏回族自治区银川市金凤区",
        "longitude": 106.242542,
        "latitude": 38.473305
    },
    {
        "adcode": 640121,
        "city": "宁夏回族自治区银川市永宁县",
        "longitude": 106.253145,
        "latitude": 38.277373
    },
    {
        "adcode": 640122,
        "city": "宁夏回族自治区银川市贺兰县",
        "longitude": 106.349828,
        "latitude": 38.554344
    },
    {
        "adcode": 640181,
        "city": "宁夏回族自治区银川市灵武市",
        "longitude": 106.340054,
        "latitude": 38.102655
    },
    {
        "adcode": 640200,
        "city": "宁夏回族自治区石嘴山市",
        "longitude": 106.383303,
        "latitude": 38.983236
    },
    {
        "adcode": 640201,
        "city": "宁夏回族自治区石嘴山市市辖区",
        "longitude": 106.383303,
        "latitude": 38.983236
    },
    {
        "adcode": 640202,
        "city": "宁夏回族自治区石嘴山市大武口区",
        "longitude": 106.367861,
        "latitude": 39.01906
    },
    {
        "adcode": 640205,
        "city": "宁夏回族自治区石嘴山市惠农区",
        "longitude": 106.781176,
        "latitude": 39.239302
    },
    {
        "adcode": 640221,
        "city": "宁夏回族自治区石嘴山市平罗县",
        "longitude": 106.523474,
        "latitude": 38.913544
    },
    {
        "adcode": 640300,
        "city": "宁夏回族自治区吴忠市",
        "longitude": 106.198393,
        "latitude": 37.99746
    },
    {
        "adcode": 640301,
        "city": "宁夏回族自治区吴忠市市辖区",
        "longitude": 106.198393,
        "latitude": 37.99746
    },
    {
        "adcode": 640302,
        "city": "宁夏回族自治区吴忠市利通区",
        "longitude": 106.212566,
        "latitude": 37.983458
    },
    {
        "adcode": 640303,
        "city": "宁夏回族自治区吴忠市红寺堡区",
        "longitude": 106.062114,
        "latitude": 37.425702
    },
    {
        "adcode": 640323,
        "city": "宁夏回族自治区吴忠市盐池县",
        "longitude": 107.407359,
        "latitude": 37.783205
    },
    {
        "adcode": 640324,
        "city": "宁夏回族自治区吴忠市同心县",
        "longitude": 105.914458,
        "latitude": 36.980575
    },
    {
        "adcode": 640381,
        "city": "宁夏回族自治区吴忠市青铜峡市",
        "longitude": 106.078818,
        "latitude": 38.021302
    },
    {
        "adcode": 640400,
        "city": "宁夏回族自治区固原市",
        "longitude": 106.24261,
        "latitude": 36.015855
    },
    {
        "adcode": 640401,
        "city": "宁夏回族自治区固原市市辖区",
        "longitude": 106.24261,
        "latitude": 36.015855
    },
    {
        "adcode": 640402,
        "city": "宁夏回族自治区固原市原州区",
        "longitude": 106.287782,
        "latitude": 36.00374
    },
    {
        "adcode": 640422,
        "city": "宁夏回族自治区固原市西吉县",
        "longitude": 105.729085,
        "latitude": 35.963913
    },
    {
        "adcode": 640423,
        "city": "宁夏回族自治区固原市隆德县",
        "longitude": 106.111595,
        "latitude": 35.625915
    },
    {
        "adcode": 640424,
        "city": "宁夏回族自治区固原市泾源县",
        "longitude": 106.330646,
        "latitude": 35.49816
    },
    {
        "adcode": 640425,
        "city": "宁夏回族自治区固原市彭阳县",
        "longitude": 106.63834,
        "latitude": 35.849565
    },
    {
        "adcode": 640500,
        "city": "宁夏回族自治区中卫市",
        "longitude": 105.196902,
        "latitude": 37.499972
    },
    {
        "adcode": 640501,
        "city": "宁夏回族自治区中卫市市辖区",
        "longitude": 105.196902,
        "latitude": 37.499972
    },
    {
        "adcode": 640502,
        "city": "宁夏回族自治区中卫市沙坡头区",
        "longitude": 105.190536,
        "latitude": 37.514564
    },
    {
        "adcode": 640521,
        "city": "宁夏回族自治区中卫市中宁县",
        "longitude": 105.685285,
        "latitude": 37.491505
    },
    {
        "adcode": 640522,
        "city": "宁夏回族自治区中卫市海原县",
        "longitude": 105.643487,
        "latitude": 36.565033
    },
    {
        "adcode": 650000,
        "city": "新疆维吾尔自治区",
        "longitude": 87.627704,
        "latitude": 43.793026
    },
    {
        "adcode": 650100,
        "city": "新疆维吾尔自治区乌鲁木齐市",
        "longitude": 87.616848,
        "latitude": 43.825592
    },
    {
        "adcode": 650101,
        "city": "新疆维吾尔自治区乌鲁木齐市市辖区",
        "longitude": 87.616848,
        "latitude": 43.825592
    },
    {
        "adcode": 650102,
        "city": "新疆维吾尔自治区乌鲁木齐市天山区",
        "longitude": 87.631676,
        "latitude": 43.794399
    },
    {
        "adcode": 650103,
        "city": "新疆维吾尔自治区乌鲁木齐市沙依巴克区",
        "longitude": 87.598195,
        "latitude": 43.800939
    },
    {
        "adcode": 650104,
        "city": "新疆维吾尔自治区乌鲁木齐市新市区",
        "longitude": 87.573916,
        "latitude": 43.843752
    },
    {
        "adcode": 650105,
        "city": "新疆维吾尔自治区乌鲁木齐市水磨沟区",
        "longitude": 87.642482,
        "latitude": 43.832459
    },
    {
        "adcode": 650106,
        "city": "新疆维吾尔自治区乌鲁木齐市头屯河区",
        "longitude": 87.425823,
        "latitude": 43.876053
    },
    {
        "adcode": 650107,
        "city": "新疆维吾尔自治区乌鲁木齐市达坂城区",
        "longitude": 88.311099,
        "latitude": 43.363668
    },
    {
        "adcode": 650109,
        "city": "新疆维吾尔自治区乌鲁木齐市米东区",
        "longitude": 87.655755,
        "latitude": 43.973579
    },
    {
        "adcode": 650121,
        "city": "新疆维吾尔自治区乌鲁木齐市乌鲁木齐县",
        "longitude": 87.409417,
        "latitude": 43.47136
    },
    {
        "adcode": 650200,
        "city": "新疆维吾尔自治区克拉玛依市",
        "longitude": 84.889207,
        "latitude": 45.579888
    },
    {
        "adcode": 650201,
        "city": "新疆维吾尔自治区克拉玛依市市辖区",
        "longitude": 84.889207,
        "latitude": 45.579888
    },
    {
        "adcode": 650202,
        "city": "新疆维吾尔自治区克拉玛依市独山子区",
        "longitude": 84.886974,
        "latitude": 44.328096
    },
    {
        "adcode": 650203,
        "city": "新疆维吾尔自治区克拉玛依市克拉玛依区",
        "longitude": 84.867844,
        "latitude": 45.602526
    },
    {
        "adcode": 650204,
        "city": "新疆维吾尔自治区克拉玛依市白碱滩区",
        "longitude": 85.119186,
        "latitude": 45.685473
    },
    {
        "adcode": 650205,
        "city": "新疆维吾尔自治区克拉玛依市乌尔禾区",
        "longitude": 85.693742,
        "latitude": 46.089148
    },
    {
        "adcode": 650400,
        "city": "新疆维吾尔自治区吐鲁番市",
        "longitude": 89.189651,
        "latitude": 42.951382
    },
    {
        "adcode": 650402,
        "city": "新疆维吾尔自治区吐鲁番市高昌区",
        "longitude": 89.182342,
        "latitude": 42.947635
    },
    {
        "adcode": 650421,
        "city": "新疆维吾尔自治区吐鲁番市鄯善县",
        "longitude": 90.21333,
        "latitude": 42.868744
    },
    {
        "adcode": 650422,
        "city": "新疆维吾尔自治区吐鲁番市托克逊县",
        "longitude": 88.638816,
        "latitude": 42.792454
    },
    {
        "adcode": 650500,
        "city": "新疆维吾尔自治区哈密市",
        "longitude": 93.514916,
        "latitude": 42.818501
    },
    {
        "adcode": 650502,
        "city": "新疆维吾尔自治区哈密市伊州区",
        "longitude": 93.514797,
        "latitude": 42.827255
    },
    {
        "adcode": 650521,
        "city": "新疆维吾尔自治区哈密市巴里坤哈萨克自治县",
        "longitude": 93.016624,
        "latitude": 43.598762
    },
    {
        "adcode": 650522,
        "city": "新疆维吾尔自治区哈密市伊吾县",
        "longitude": 94.697074,
        "latitude": 43.254978
    },
    {
        "adcode": 652300,
        "city": "新疆维吾尔自治区昌吉回族自治州",
        "longitude": 87.308224,
        "latitude": 44.011182
    },
    {
        "adcode": 652301,
        "city": "新疆维吾尔自治区昌吉回族自治州昌吉市",
        "longitude": 87.304112,
        "latitude": 44.013183
    },
    {
        "adcode": 652302,
        "city": "新疆维吾尔自治区昌吉回族自治州阜康市",
        "longitude": 87.946894,
        "latitude": 44.168576
    },
    {
        "adcode": 652323,
        "city": "新疆维吾尔自治区昌吉回族自治州呼图壁县",
        "longitude": 86.898902,
        "latitude": 44.191428
    },
    {
        "adcode": 652324,
        "city": "新疆维吾尔自治区昌吉回族自治州玛纳斯县",
        "longitude": 86.213997,
        "latitude": 44.303893
    },
    {
        "adcode": 652325,
        "city": "新疆维吾尔自治区昌吉回族自治州奇台县",
        "longitude": 89.593967,
        "latitude": 44.022066
    },
    {
        "adcode": 652327,
        "city": "新疆维吾尔自治区昌吉回族自治州吉木萨尔县",
        "longitude": 89.180437,
        "latitude": 44.000497
    },
    {
        "adcode": 652328,
        "city": "新疆维吾尔自治区昌吉回族自治州木垒哈萨克自治县",
        "longitude": 90.286028,
        "latitude": 43.834689
    },
    {
        "adcode": 652700,
        "city": "新疆维吾尔自治区博尔塔拉蒙古自治州",
        "longitude": 82.066159,
        "latitude": 44.905588
    },
    {
        "adcode": 652701,
        "city": "新疆维吾尔自治区博尔塔拉蒙古自治州博乐市",
        "longitude": 82.051005,
        "latitude": 44.85387
    },
    {
        "adcode": 652702,
        "city": "新疆维吾尔自治区博尔塔拉蒙古自治州阿拉山口市",
        "longitude": 82.559396,
        "latitude": 45.172228
    },
    {
        "adcode": 652722,
        "city": "新疆维吾尔自治区博尔塔拉蒙古自治州精河县",
        "longitude": 82.894195,
        "latitude": 44.600408
    },
    {
        "adcode": 652723,
        "city": "新疆维吾尔自治区博尔塔拉蒙古自治州温泉县",
        "longitude": 81.024816,
        "latitude": 44.968857
    },
    {
        "adcode": 652800,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州",
        "longitude": 86.145298,
        "latitude": 41.764115
    },
    {
        "adcode": 652801,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州库尔勒市",
        "longitude": 86.174633,
        "latitude": 41.725892
    },
    {
        "adcode": 652822,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州轮台县",
        "longitude": 84.252156,
        "latitude": 41.777702
    },
    {
        "adcode": 652823,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州尉犁县",
        "longitude": 86.261321,
        "latitude": 41.343933
    },
    {
        "adcode": 652824,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州若羌县",
        "longitude": 88.167152,
        "latitude": 39.023242
    },
    {
        "adcode": 652825,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州且末县",
        "longitude": 85.529702,
        "latitude": 38.145486
    },
    {
        "adcode": 652826,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州焉耆回族自治县",
        "longitude": 86.574067,
        "latitude": 42.059759
    },
    {
        "adcode": 652827,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州和静县",
        "longitude": 86.384065,
        "latitude": 42.323625
    },
    {
        "adcode": 652828,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州和硕县",
        "longitude": 86.863963,
        "latitude": 42.268371
    },
    {
        "adcode": 652829,
        "city": "新疆维吾尔自治区巴音郭楞蒙古自治州博湖县",
        "longitude": 86.631998,
        "latitude": 41.980152
    },
    {
        "adcode": 652900,
        "city": "新疆维吾尔自治区阿克苏地区",
        "longitude": 80.260605,
        "latitude": 41.168779
    },
    {
        "adcode": 652901,
        "city": "新疆维吾尔自治区阿克苏地区",
        "longitude": 80.260605,
        "latitude": 41.168779
    },
    {
        "adcode": 652922,
        "city": "新疆维吾尔自治区阿克苏地区温宿县",
        "longitude": 80.238959,
        "latitude": 41.276688
    },
    {
        "adcode": 652923,
        "city": "新疆维吾尔自治区阿克苏地区库车县",
        "longitude": 82.962016,
        "latitude": 41.717906
    },
    {
        "adcode": 652924,
        "city": "新疆维吾尔自治区阿克苏地区沙雅县",
        "longitude": 82.781819,
        "latitude": 41.221667
    },
    {
        "adcode": 652925,
        "city": "新疆维吾尔自治区阿克苏地区新和县",
        "longitude": 82.60922,
        "latitude": 41.548118
    },
    {
        "adcode": 652926,
        "city": "新疆维吾尔自治区阿克苏地区拜城县",
        "longitude": 81.874156,
        "latitude": 41.79691
    },
    {
        "adcode": 652927,
        "city": "新疆维吾尔自治区阿克苏地区乌什县",
        "longitude": 79.224445,
        "latitude": 41.214652
    },
    {
        "adcode": 652928,
        "city": "新疆维吾尔自治区阿克苏地区阿瓦提县",
        "longitude": 80.373137,
        "latitude": 40.644529
    },
    {
        "adcode": 652929,
        "city": "新疆维吾尔自治区阿克苏地区柯坪县",
        "longitude": 79.047291,
        "latitude": 40.50834
    },
    {
        "adcode": 653000,
        "city": "新疆维吾尔自治区克孜勒苏柯尔克孜自治州",
        "longitude": 76.167819,
        "latitude": 39.714526
    },
    {
        "adcode": 653001,
        "city": "新疆维吾尔自治区克孜勒苏柯尔克孜自治州阿图什市",
        "longitude": 76.1684,
        "latitude": 39.71616
    },
    {
        "adcode": 653022,
        "city": "新疆维吾尔自治区克孜勒苏柯尔克孜自治州阿克陶县",
        "longitude": 75.947396,
        "latitude": 39.147785
    },
    {
        "adcode": 653023,
        "city": "新疆维吾尔自治区克孜勒苏柯尔克孜自治州阿合奇县",
        "longitude": 78.446253,
        "latitude": 40.936936
    },
    {
        "adcode": 653024,
        "city": "新疆维吾尔自治区克孜勒苏柯尔克孜自治州乌恰县",
        "longitude": 75.259228,
        "latitude": 39.71931
    },
    {
        "adcode": 653100,
        "city": "新疆维吾尔自治区喀什地区",
        "longitude": 75.989755,
        "latitude": 39.4704
    },
    {
        "adcode": 653101,
        "city": "新疆维吾尔自治区喀什地区",
        "longitude": 75.989755,
        "latitude": 39.4704
    },
    {
        "adcode": 653121,
        "city": "新疆维吾尔自治区喀什地区疏附县",
        "longitude": 75.862814,
        "latitude": 39.375044
    },
    {
        "adcode": 653122,
        "city": "新疆维吾尔自治区喀什地区疏勒县",
        "longitude": 76.048139,
        "latitude": 39.401385
    },
    {
        "adcode": 653123,
        "city": "新疆维吾尔自治区喀什地区英吉沙县",
        "longitude": 76.175729,
        "latitude": 38.930382
    },
    {
        "adcode": 653124,
        "city": "新疆维吾尔自治区喀什地区泽普县",
        "longitude": 77.260103,
        "latitude": 38.184955
    },
    {
        "adcode": 653125,
        "city": "新疆维吾尔自治区喀什地区莎车县",
        "longitude": 77.245761,
        "latitude": 38.414217
    },
    {
        "adcode": 653126,
        "city": "新疆维吾尔自治区喀什地区叶城县",
        "longitude": 77.413836,
        "latitude": 37.882989
    },
    {
        "adcode": 653127,
        "city": "新疆维吾尔自治区喀什地区麦盖提县",
        "longitude": 77.648006,
        "latitude": 38.902232
    },
    {
        "adcode": 653128,
        "city": "新疆维吾尔自治区喀什地区岳普湖县",
        "longitude": 76.773163,
        "latitude": 39.2242
    },
    {
        "adcode": 653129,
        "city": "新疆维吾尔自治区喀什地区伽师县",
        "longitude": 76.72372,
        "latitude": 39.488182
    },
    {
        "adcode": 653130,
        "city": "新疆维吾尔自治区喀什地区巴楚县",
        "longitude": 78.549297,
        "latitude": 39.785155
    },
    {
        "adcode": 653131,
        "city": "新疆维吾尔自治区喀什地区塔什库尔干塔吉克自治县",
        "longitude": 75.229889,
        "latitude": 37.772094
    },
    {
        "adcode": 653200,
        "city": "新疆维吾尔自治区和田地区",
        "longitude": 79.922211,
        "latitude": 37.114157
    },
    {
        "adcode": 653201,
        "city": "新疆维吾尔自治区和田地区和田市",
        "longitude": 79.913534,
        "latitude": 37.112149
    },
    {
        "adcode": 653221,
        "city": "新疆维吾尔自治区和田地区和田县",
        "longitude": 79.81907,
        "latitude": 37.120031
    },
    {
        "adcode": 653222,
        "city": "新疆维吾尔自治区和田地区墨玉县",
        "longitude": 79.728841,
        "latitude": 37.27734
    },
    {
        "adcode": 653223,
        "city": "新疆维吾尔自治区和田地区皮山县",
        "longitude": 78.283669,
        "latitude": 37.62145
    },
    {
        "adcode": 653224,
        "city": "新疆维吾尔自治区和田地区洛浦县",
        "longitude": 80.188986,
        "latitude": 37.073667
    },
    {
        "adcode": 653225,
        "city": "新疆维吾尔自治区和田地区策勒县",
        "longitude": 80.806159,
        "latitude": 36.998335
    },
    {
        "adcode": 653226,
        "city": "新疆维吾尔自治区和田地区于田县",
        "longitude": 81.677418,
        "latitude": 36.857081
    },
    {
        "adcode": 653227,
        "city": "新疆维吾尔自治区和田地区民丰县",
        "longitude": 82.695862,
        "latitude": 37.06408
    },
    {
        "adcode": 654000,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州",
        "longitude": 81.324136,
        "latitude": 43.916823
    },
    {
        "adcode": 654002,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州伊宁市",
        "longitude": 81.27795,
        "latitude": 43.908558
    },
    {
        "adcode": 654003,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州奎屯市",
        "longitude": 84.903267,
        "latitude": 44.426529
    },
    {
        "adcode": 654004,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州霍尔果斯市",
        "longitude": 80.420759,
        "latitude": 44.201669
    },
    {
        "adcode": 654021,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州伊宁县",
        "longitude": 81.527453,
        "latitude": 43.977138
    },
    {
        "adcode": 654022,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州察布查尔锡伯自治县",
        "longitude": 81.151337,
        "latitude": 43.840726
    },
    {
        "adcode": 654023,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州霍城县",
        "longitude": 80.874181,
        "latitude": 44.053592
    },
    {
        "adcode": 654024,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州巩留县",
        "longitude": 82.231718,
        "latitude": 43.482628
    },
    {
        "adcode": 654025,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州新源县",
        "longitude": 83.26077,
        "latitude": 43.42993
    },
    {
        "adcode": 654026,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州昭苏县",
        "longitude": 81.130975,
        "latitude": 43.157293
    },
    {
        "adcode": 654027,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州特克斯县",
        "longitude": 81.836206,
        "latitude": 43.217184
    },
    {
        "adcode": 654028,
        "city": "新疆维吾尔自治区伊犁哈萨克自治州尼勒克县",
        "longitude": 82.51181,
        "latitude": 43.800247
    },
    {
        "adcode": 654200,
        "city": "新疆维吾尔自治区塔城地区",
        "longitude": 82.980316,
        "latitude": 46.745364
    },
    {
        "adcode": 654201,
        "city": "新疆维吾尔自治区塔城地区塔城市",
        "longitude": 82.978928,
        "latitude": 46.748523
    },
    {
        "adcode": 654202,
        "city": "新疆维吾尔自治区塔城地区乌苏市",
        "longitude": 84.713736,
        "latitude": 44.418887
    },
    {
        "adcode": 654221,
        "city": "新疆维吾尔自治区塔城地区额敏县",
        "longitude": 83.628303,
        "latitude": 46.524673
    },
    {
        "adcode": 654223,
        "city": "新疆维吾尔自治区塔城地区沙湾县",
        "longitude": 85.619416,
        "latitude": 44.326388
    },
    {
        "adcode": 654224,
        "city": "新疆维吾尔自治区塔城地区托里县",
        "longitude": 83.606951,
        "latitude": 45.947638
    },
    {
        "adcode": 654225,
        "city": "新疆维吾尔自治区塔城地区裕民县",
        "longitude": 82.982668,
        "latitude": 46.201104
    },
    {
        "adcode": 654226,
        "city": "新疆维吾尔自治区塔城地区和布克赛尔蒙古自治县",
        "longitude": 85.728328,
        "latitude": 46.793235
    },
    {
        "adcode": 654300,
        "city": "新疆维吾尔自治区阿勒泰地区",
        "longitude": 88.141253,
        "latitude": 47.844924
    },
    {
        "adcode": 654301,
        "city": "新疆维吾尔自治区阿勒泰地区阿勒泰市",
        "longitude": 88.131842,
        "latitude": 47.827309
    },
    {
        "adcode": 654321,
        "city": "新疆维吾尔自治区阿勒泰地区布尔津县",
        "longitude": 86.874897,
        "latitude": 47.70185
    },
    {
        "adcode": 654322,
        "city": "新疆维吾尔自治区阿勒泰地区富蕴县",
        "longitude": 89.530734,
        "latitude": 46.995158
    },
    {
        "adcode": 654323,
        "city": "新疆维吾尔自治区阿勒泰地区福海县",
        "longitude": 87.486703,
        "latitude": 47.111919
    },
    {
        "adcode": 654324,
        "city": "新疆维吾尔自治区阿勒泰地区哈巴河县",
        "longitude": 86.418621,
        "latitude": 48.060846
    },
    {
        "adcode": 654325,
        "city": "新疆维吾尔自治区阿勒泰地区青河县",
        "longitude": 90.382961,
        "latitude": 46.674205
    },
    {
        "adcode": 654326,
        "city": "新疆维吾尔自治区阿勒泰地区吉木乃县",
        "longitude": 85.874096,
        "latitude": 47.443101
    },
    {
        "adcode": 659001,
        "city": "新疆维吾尔自治区石河子市",
        "longitude": 86.08046,
        "latitude": 44.305428
    },
    {
        "adcode": 659002,
        "city": "新疆维吾尔自治区阿拉尔市",
        "longitude": 81.280527,
        "latitude": 40.547653
    },
    {
        "adcode": 659003,
        "city": "新疆维吾尔自治区图木舒克市",
        "longitude": 79.074089,
        "latitude": 39.868968
    },
    {
        "adcode": 659004,
        "city": "新疆维吾尔自治区五家渠市",
        "longitude": 87.54324,
        "latitude": 44.166756
    },
    {
        "adcode": 659005,
        "city": "新疆维吾尔自治区北屯市",
        "longitude": 87.832595,
        "latitude": 47.326883
    },
    {
        "adcode": 659006,
        "city": "新疆维吾尔自治区铁门关市",
        "longitude": 85.669533,
        "latitude": 41.8633
    },
    {
        "adcode": 659007,
        "city": "新疆维吾尔自治区双河市",
        "longitude": 82.353656,
        "latitude": 44.840524
    },
    {
        "adcode": 659008,
        "city": "新疆维吾尔自治区可克达拉市",
        "longitude": 81.044542,
        "latitude": 43.944798
    },
    {
        "adcode": 659009,
        "city": "新疆维吾尔自治区昆玉市",
        "longitude": 79.291083,
        "latitude": 37.209642
    },
    {
        "adcode": 710000,
        "city": "台湾省",
        "longitude": 121.508903,
        "latitude": 25.044319
    },
    {
        "adcode": 710001,
        "city": "台湾省台北市",
        "longitude": 121.5089,
        "latitude": 25.0443
    },
    {
        "adcode": 710002,
        "city": "台湾省",
        "longitude": 121.3661,
        "latitude": 25.0064
    },
    {
        "adcode": 710003,
        "city": "台湾省桃园市",
        "longitude": 121.1615,
        "latitude": 24.9317
    },
    {
        "adcode": 710004,
        "city": "台湾省台中市",
        "longitude": 120.6739,
        "latitude": 24.1497
    },
    {
        "adcode": 710005,
        "city": "台湾省台南市",
        "longitude": 120.1974,
        "latitude": 22.9841
    },
    {
        "adcode": 710006,
        "city": "台湾省高雄市",
        "longitude": 120.2867,
        "latitude": 22.6347
    },
    {
        "adcode": 710007,
        "city": "台湾省基隆市",
        "longitude": 121.7377,
        "latitude": 25.1295
    },
    {
        "adcode": 710008,
        "city": "台湾省新竹市",
        "longitude": 120.9409,
        "latitude": 24.7385
    },
    {
        "adcode": 710009,
        "city": "台湾省嘉义市",
        "longitude": 120.4551,
        "latitude": 23.4762
    },
    {
        "adcode": 710010,
        "city": "台湾省新竹县",
        "longitude": 121.1599,
        "latitude": 24.5987
    },
    {
        "adcode": 710011,
        "city": "台湾省苗栗县",
        "longitude": 120.7503,
        "latitude": 24.4988
    },
    {
        "adcode": 710012,
        "city": "台湾省彰化县",
        "longitude": 120.4163,
        "latitude": 23.9986
    },
    {
        "adcode": 710013,
        "city": "台湾省南投县",
        "longitude": 120.8293,
        "latitude": 23.8285
    },
    {
        "adcode": 710014,
        "city": "台湾省云林县",
        "longitude": 120.2494,
        "latitude": 23.7487
    },
    {
        "adcode": 710015,
        "city": "台湾省嘉义县",
        "longitude": 120.2999,
        "latitude": 23.4983
    },
    {
        "adcode": 710016,
        "city": "台湾省台东县",
        "longitude": 120.9155,
        "latitude": 22.9974
    },
    {
        "adcode": 710017,
        "city": "台湾省花莲县",
        "longitude": 121.301,
        "latitude": 23.8297
    },
    {
        "adcode": 710018,
        "city": "台湾省澎湖县",
        "longitude": 119.5657,
        "latitude": 23.5691
    },
    {
        "adcode": 710019,
        "city": "台湾省宜兰县",
        "longitude": 121.5007,
        "latitude": 24.5975
    },
    {
        "adcode": 710020,
        "city": "台湾省屏东县",
        "longitude": 120.488,
        "latitude": 22.6826
    },
    {
        "adcode": 810000,
        "city": "香港特别行政区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810001,
        "city": "香港特别行政区中西区",
        "longitude": 114.15476,
        "latitude": 22.286567
    },
    {
        "adcode": 810002,
        "city": "香港特别行政区湾仔区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810003,
        "city": "香港特别行政区东区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810004,
        "city": "香港特别行政区南区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810005,
        "city": "香港特别行政区油尖旺区",
        "longitude": 114.173331,
        "latitude": 22.311704
    },
    {
        "adcode": 810006,
        "city": "香港特别行政区深水埗区",
        "longitude": 114.163242,
        "latitude": 22.333855
    },
    {
        "adcode": 810007,
        "city": "香港特别行政区九龙城区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810008,
        "city": "香港特别行政区黄大仙区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810009,
        "city": "香港特别行政区观塘区",
        "longitude": 114.230604,
        "latitude": 22.308631
    },
    {
        "adcode": 810010,
        "city": "香港特别行政区荃湾区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810011,
        "city": "香港特别行政区屯门区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810012,
        "city": "香港特别行政区元朗区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810013,
        "city": "香港特别行政区北区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810014,
        "city": "香港特别行政区大埔区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810015,
        "city": "香港特别行政区西贡区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810016,
        "city": "香港特别行政区沙田区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810017,
        "city": "香港特别行政区葵青区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 810018,
        "city": "香港特别行政区离岛区",
        "longitude": 114.163825,
        "latitude": 22.276284
    },
    {
        "adcode": 820000,
        "city": "澳门特别行政区",
        "longitude": 113.543028,
        "latitude": 22.186835
    },
    {
        "adcode": 820001,
        "city": "澳门特别行政区花地玛堂区",
        "longitude": 113.548423,
        "latitude": 22.204722
    },
    {
        "adcode": 820002,
        "city": "澳门特别行政区花王堂区",
        "longitude": 113.543028,
        "latitude": 22.186835
    },
    {
        "adcode": 820003,
        "city": "澳门特别行政区望德堂区",
        "longitude": 113.550183,
        "latitude": 22.193721
    },
    {
        "adcode": 820004,
        "city": "澳门特别行政区大堂区",
        "longitude": 113.543028,
        "latitude": 22.186835
    },
    {
        "adcode": 820005,
        "city": "澳门特别行政区风顺堂区",
        "longitude": 113.540729,
        "latitude": 22.184853
    },
    {
        "adcode": 820006,
        "city": "澳门特别行政区嘉模堂区",
        "longitude": 113.558705,
        "latitude": 22.15376
    },
    {
        "adcode": 820007,
        "city": "澳门特别行政区路凼填海区",
        "longitude": 113.569599,
        "latitude": 22.13663
    },
    {
        "adcode": 820008,
        "city": "澳门特别行政区圣方济各堂区",
        "longitude": 113.568978,
        "latitude": 22.123141
    },
    {
        "adcode": 900000,
        "city": "湖南省长沙市天心区外国",
        "longitude": 112.970215,
        "latitude": 28.16415
    }
]