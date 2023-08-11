

(async () => {
    const api = await fetch('https://i.y.qq.com/v8/playsong.html?ADTAG=ryqq.songDetail&songmid=&songid=102065756&songtype=0#webchat_redirect',
        {
            headers: {
                "cookie": ""
            }
        })
    const res = await api.text()

    var pattern = /window\.__ssrFirstPageData__\s=(.*?)<\/script>/;



    // 使用正则表达式匹配数据部分
    var match = res.match(pattern);

    if (match) {
        // 获取匹配的数据部分（第一个捕获组）
        var dataSection = match[1];

        // 解析 JSON 数据
        var parsedData = JSON.parse(dataSection);

        console.log(parsedData.songList[0].url);
    } else {
        console.log("未找到匹配的数据部分");
    }
})();