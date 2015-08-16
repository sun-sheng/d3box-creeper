var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var ArmorSchema = new Schema({
    code: String, //
    name: String, //中文名称
    thumb: String, // 缩略图
    image: String, // 完整显示图
    place: { type: String }, //部位
    level: { type: Number, default: 0 }, //等级
    quality: String, //品质
    detail: String, //详情
    require_level: { type: Number, default: 0 }, //需求等级
    require_profession: String, //需求职业
    drop_from: String, //掉落
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Armor', ArmorSchema);