const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('UserBid', new Schema({
    currentBid: Number,
    user_id: String,
    product_id: String, 
    date: Date
}));