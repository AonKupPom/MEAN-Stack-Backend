const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  title: String,
  firstname: String,
  lastname: String,
  address: String,
  birthDate: Date,
  gender: String,
  role: String,
  tel: String,
  profile_picture: String,
  token: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
