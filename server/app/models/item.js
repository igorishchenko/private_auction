const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Item', new Schema({
    id: String,
    productName: String,
    productPrice: Number,
    imgUrl: String,
    avail: Number,
    description: String,
    user_id: String,
    user_name: String,
}));