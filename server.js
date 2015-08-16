var rq = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

var baseUrl = 'http://db.d.163.com/';
var $;

function request (url, callback) {
  var options = {
    url: url,
    encoding: null,
    //代理服务器
    //proxy: 'http://xxx.xxx.xxx.xxx:8888',
    headers: headers
  }
  rq(options, function (error, response, body) {
      var html = iconv.decode(body, 'gb2312');
      $ = cheerio.load(html, {decodeEntities: false});
      callback($);
  });
}

function convertBaseLinks ($links) {
    var links = [];
    $links.each(function (i, item) {
        var $item = $(item);
        links.push({
            name: $item.text(),
            link: baseUrl + $item.attr('href')
        });
    });
}

function convertSkillLinks($links) {
    var links = [];
    $links.each(function (i, item) {
        var $item = $(item);
        var link = {
            name: $item.text(),
            children: []
        };
        $item.next().children().each(function (i, item) {
            var $item = $(item);
            link.children[i] = {
                name: $item.text(),
                link: $item.attr('href')
            }
        });
        links.push();
    });
}

function convertArmorLinks($links) {
    // body...
}

function convertWeaponLinks($links) {
    // body...
}

function convertOtherLinks($links) {
    // body...
}

request(baseUrl, function ($) {
    var $navigation = $('#db-navigation-c');
    var $nav = {};
    $navigation.children('.m-nav-t').each(function (i, item) {
        //基础 技能 护甲 武器 其他
        var $item = $(item);
        var text = $item.text();
        var links = $nav[text];
        var links = [];
        $item.next().children().each(function (i, item) {
            // body...
        })
    });
});
