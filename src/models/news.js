var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: String,
    author: String,
    thumb: String,
    summary: String,
    detail: String,
    detail_url: String,
    type: String,
    read_count: Number,
    comment_count: Number,
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('News', NewsSchema);
