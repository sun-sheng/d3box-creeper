var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var _ = require('lodash');
var Q = require('q');
var config = require('../config');
var Weapon = require('../models/weapon');
var baseUrl = 'http://db.d.163.com';

function parseWeapon ($tr, $)
{
    var weapon = {};
    var $tds = $tr.find('td');
    var $first = $($tds[0]);
    var thumb = $first.find('.icon-item-inner').css('background-image') || '';
    weapon.thumb = thumb.substring(4, thumb.length - 1);
    var $tip = $first.find('p .diablo3tip');
    weapon.name = $tip.text();
    weapon.code = $tip.attr('name');
    weapon.quality = $($tds[1]).text();
    weapon.type = $($tds[2]).text();
    weapon.drop_from = $($tds[3]).text();
    weapon.level = $($tds[4]).text();
    weapon.require_level = $($tds[5]).text();
    return weapon;
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
            var result = parseWeapon($(tr), $);
            results.push(result);
        });
        console.log(results.length);
        Weapon.create(results);
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