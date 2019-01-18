const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('userSettings', new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  address: String,
  description: String
}));
