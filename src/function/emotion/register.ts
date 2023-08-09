

import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { FunctionResponse, MessageType } from '../../interface.js';



export function createEmotion() {
    const paramsSchema = z.object({
        text: z.string({ description: `可选值为：${Object.keys(defaultEmotions)}` })
    });

    const name = 'emotion';
    const description = `参数 text 必须为 ${Object.keys(defaultEmotions)} 中的一个,如果不是也要改成其中的`;
    let response: FunctionResponse = {
        msgType: MessageType.Emoticon
    }
    const execute = async ({ text }: z.infer<typeof paramsSchema>) => {
        const key: string = Object.keys(defaultEmotions).find(item => item.includes(text)) || "无语"

        response.data = defaultEmotions[key]
        return response
    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

type EmotionType = {
    type: string;
    md5: string;
    len: string;
    cdnurl: string;
};

type DefaultEmotions = {
    [key: string]: EmotionType;
};


export const defaultEmotions: DefaultEmotions = {
    "无语": {
        "type": "2",
        "md5": "fc86ccb916c467128c6d6260565cd3d7",
        "len": "875452",
        "cdnurl": "http://wxapp.tc.qq.com/262/20304/stodownload?m=fc86ccb916c467128c6d6260565cd3d7&filekey=30350201010421301f02020106040253480410fc86ccb916c467128c6d6260565cd3d702030d5bbc040d00000004627466730000000132&hy=SH&storeid=26324586d00022e94000000000000010600004f5053480fe67b40b7de2a4b1&bizid=1023",
    },
    "赞叹": {
        "type": "2",
        "md5": "b041a1206db4b9262f966b61e407e7f3",
        "len": "9663175",
        "cdnurl": "http://vweixinf.tc.qq.com/110/20401/stodownload?m=b041a1206db4b9262f966b61e407e7f3&filekey=30450201010431302f02016e04025348042062303431613132303664623462393236326639363662363165343037653766330204009372c7040d00000004627466730000000131&hy=SH&storeid=323032303035323330303533303730303063616537303139376233623330393563333466303930303030303036653031303034666231&ef=1&bizid=1022",
    },
    "高兴": {
        "type": "2",
        "md5": "e76a50d148f9e75da7ed483345a369be",
        "len": "8124293",
        "cdnurl": "http://wxapp.tc.qq.com/262/20304/stodownload?m=e76a50d148f9e75da7ed483345a369be&filekey=30350201010421301f02020106040253480410e76a50d148f9e75da7ed483345a369be02037bf785040d00000004627466730000000132&hy=SH&storeid=2645b28b3000ad92c5c7522d40000010600004f5053482482c8e0b65f748ec&bizid=1023",
    },
    "吐口水": {
        "type": "2",
        "md5": "af84440f75e417c0bd7bc9a503ab61ab",
        "len": "1023081",
        "cdnurl": "http://wxapp.tc.qq.com/262/20304/stodownload?m=af84440f75e417c0bd7bc9a503ab61ab&filekey=30350201010421301f02020106040253480410af84440f75e417c0bd7bc9a503ab61ab02030f9c69040d00000004627466730000000132&hy=SH&storeid=2631c57a2000209da000000000000010600004f50534825fc596096f4bd7e3&bizid=1023",
    },
    "怎样": {
        "type": "2",
        "md5": "5faa1cbe8ebd0bda597c782999f731bd",
        "len": "540270",
        "cdnurl": "http://vweixinf.tc.qq.com/110/20401/stodownload?m=5faa1cbe8ebd0bda597c782999f731bd&filekey=30440201010430302e02016e04025348042035666161316362653865626430626461353937633738323939396637333162640203083e6e040d00000004627466730000000131&hy=SH&storeid=323031393131313632333134303430303063633639656262613334383236353036363332306130303030303036653031303034666231&ef=1&bizid=1022",
    }
}