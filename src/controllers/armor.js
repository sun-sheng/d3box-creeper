var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var _ = require('lodash');
var Q = require('q');
var config = require('../config');
var Armor = require('../models/armor');
var baseUrl = 'http://db.d.163.com';

function parseArmor ($tr, $)
{
    var armor = {};
    var $tds = $tr.find('td');
    var $first = $($tds[0]);
    var thumb = $first.find('.icon-item-inner').css('background-image') || '';
    armor.thumb = thumb.substring(4, thumb.length - 1);
    var $tip = $first.find('p .diablo3tip');
    armor.name = $tip.text();
    armor.code = $tip.attr('name');
    armor.quality = $($tds[1]).text();
    armor.place = $($tds[2]).text();
    armor.drop_from = $($tds[3]).text();
    armor.level = $($tds[4]).text();
    armor.require_level = $($tds[5]).text();
    return armor;
}

function loadHtml (link)
{
    var options = _.extend(config.requestOptions, {url: baseUrl + link});
    request(options, function (error, response, body) {
        if (error) {
            reject(error);
            return false;
        }
        var html = iconv.decode(body, 'gb2312');
        var $ = cheerio.load(html, {decodeEntities: false});
        var $trs = $('#table-items').find('.page-region tr');
        var results = [];
        $trs.each(function (i, tr)
        {
            var result = parseArmor($(tr), $);
            results.push(result);
        });
        console.log(results.length);
        Armor.create(results);
    });
}

module.exports = {
    loadLinks: function (links)
    {
        loadHtml(links[0]);
        _.each(links, function (link)
        {
            loadHtml(link);
        });
    }
};