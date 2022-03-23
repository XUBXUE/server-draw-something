const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const UserSchema = new Schema({
  userName: { type: String, require: true },
  userState: { type: String, default: 'online'},
  createTime: { type: String, require: true}
});

const User = model('User', UserSchema);

module.exports = User;
