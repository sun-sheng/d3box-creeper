var rq = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var _ = require('lodash');
var mongoose = require('mongoose');
var config = require('./src/config');
var armorCtrl = require('./src/controllers/armor');
var weaponCtrl = require('./src/controllers/weapon');

mongoose.connect(config.db);

function convertLinks (callback)
{
    var options = _.extend(config.requestOptions, {
        url: 'http://db.d.163.com/'
    });
    rq(options, function (error, response, body)
    {
        var html = iconv.decode(body, 'gb2312');
        var $ = cheerio.load(html, {decodeEntities: false});
        callback($);
    });
}

function distinctLinks ($links) {
    var l = $links.length;
    var i = 0;
    var href = '';
    var results = [];
    for (i; i < l; i ++)
    {
        if (i === l - 1) break;
        href = $links[i].attribs.href;
        if (href !== $links[i + 1].attribs.href)
        {
            results.push(href);
        }
    }
    return results;
}

convertLinks(function ($)
{
    var $navigation = $('#db-navigation-c');
    //基础 技能 护甲 武器 其他
    var $uls = $navigation.children('ul');
    var armorLinks = distinctLinks($($uls[2]).find('a[href]'));
    var weaponLinks = distinctLinks($($uls[3]).find('a[href]'));
    armorCtrl.loadLinks(armorLinks);
    weaponCtrl.loadLinks(weaponLinks);
});


