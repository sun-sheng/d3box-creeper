var rq = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
// var baseUrl = 'http://db.d.163.com/cn/js/tooltip/item/';
var baseUrl = 'http://localhost:5005/';
var rqOptions = {
    encoding: null,
    //代理服务器
    //proxy: 'http://xxx.xxx.xxx.xxx:8888',
    headers: headers
}



function getItemDetailHtml (name) {
    rqOptions.url = baseUrl + name + '.js';
    rq(rqOptions, function (error, response, body) {
        if (error) return false;
        var res = iconv.decode(body, 'gbk');
        eval(res);
        var $ = cheerio.load(d3_data, {decodeEntities: false});
        var $head = $('.tooltip-head');
        $head.remove();
        console.log($.html());

    });
}

getItemDetailHtml('sunwukos-crown-80');
