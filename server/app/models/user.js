const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  admin: Boolean
}));
