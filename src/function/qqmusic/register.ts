import { Tool } from 'openai-function-calling-tools';
import { z } from 'zod';
import { config } from '../../config.js';
import { FunctionResponse, MessageType } from '../../interface.js';

export function createQQMusic() {
    const paramsSchema = z.object({
        songname: z.string(),
        singer: z.string(),
    });

    const name = 'qqmusic';
    const description = "播放音乐 [点歌,听歌,放歌,music] 只有以上关键词才触发";
    let response: FunctionResponse = {
        msgType: MessageType.ForwardMessage
    }
    const execute = async ({ songname, singer }: z.infer<typeof paramsSchema>) => {
        try {
            let url = `https://u.y.qq.com/cgi-bin/musicu.fcg`
            let body = {
                "comm": {
                    "mina": 1,
                    "appid": "wxada7aab80ba27074",
                    "ct": 25
                }, "req": {
                    "method": "DoSearchForQQMusicMobile",
                    "module": "music.search.SearchBrokerCgiServer",
                    "param": {
                        "remoteplace": "miniapp.wxada7aab80ba27074",
                        "searchid": new Date().getTime(),
                        "search_type": 0,
                        "query": `${songname} ${singer}`.trim(),
                        "page_num": 1,
                        "num_per_page": 20,
                        "grp": 0
                    }
                }
            }

            const searchResult = await request(url, body)
            const songmid = searchResult.req.data.body.item_song[0].mid

            const qqmusicHtml = await request(`https://i.y.qq.com/v8/playsong.html?songmid=${songmid}`, null, false)

            var pattern = /window\.__ssrFirstPageData__\s=(.*?)<\/script>/;
            // 使用正则表达式匹配数据部分
            var match = qqmusicHtml.match(pattern);

            if (match) {
                // 获取匹配的数据部分（第一个捕获组）
                var dataSection = match[1];
                // 解析 JSON 数据
                var parsedData = JSON.parse(dataSection);

                const songurl = parsedData.songList[0].url
                const { description, image } = parsedData.metaData

                const { songname, singer } = paresSongInfo(description)

                response.data = musicXmlMessage(songname, singer, songurl, songmid, image)
            }
            return response
        } catch (error: any) {
            console.log(error)
            response.data = error.message
            response.msgType = MessageType.RuntimeError
            return response
        }

    };

    return new Tool(paramsSchema, name, description, execute).tool;
}

async function request(url: string, params: any, resJson: boolean = true) {
    const api = await fetch(url, {
        body: JSON.stringify(params),
        method: 'post',
        headers: {
            "cookie": config.qqmusicCookie
        }
    });

    const res = resJson ? await api.json() : await api.text()
    return res
}

async function download(url: string): Promise<Buffer> {
    const api = await fetch(url, {
        method: 'get',
        headers: {
            "cookie": config.qqmusicCookie
        }
    });

    const arrayBuffer = await api.arrayBuffer()
    return Buffer.from(arrayBuffer);
}

function paresSongInfo(description: string) {
    var pattern = /歌曲：(.*?)，歌手：(.*?)。/;
    // 使用正则表达式匹配歌曲名和歌手名
    var match = description.match(pattern);
    const result = { songname: "", singer: "" }
    if (match) {
        result.songname = match[1];
        result.singer = match[2];

    }
    return result
}



function musicXmlMessage(songname: string, singer: string, songurl: string, songmid: string, image: string) {
    return `<?xml version="1.0"?>
    <msg>
            <appmsg appid="wx5aa333606550dfd5" sdkver="0">
                    <title>${songname}</title>
                    <des>${singer}</des>
                    <action>view</action>
                    <type>3</type>
                    <showtype>0</showtype>
                    <url>https://i.y.qq.com/v8/playsong.html?hosteuin=oK6kowEAoK4z7eSqoi6F7iCPon**&amp;sharefrom=&amp;from_id=0&amp;from_idtype=0&amp;from_name=&amp;&amp;songmid=${songmid}&amp;type=0&amp;platform=(10rpl)&amp;appsongtype=(11rpl)&amp;_wv=1&amp;source=qq&amp;appshare=iphone&amp;media_mid=000CsplS4eA2jd&amp;ADTAG=wxfshare</url>
                    <dataurl>${songurl.replaceAll("&", "&amp;")}</dataurl>
                    <thumburl>${image}</thumburl>
                    <websearch />
            </appmsg>
     
            <scene>0</scene>
            <appinfo>
                    <version>53</version>
                    <appname>QQ音乐</appname>
            </appinfo>
    </msg>`
}
