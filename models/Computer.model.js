const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const computerSchema = new mongoose.Schema({
  name: String,
  description: String,
  model: String,
  price: Number,
  type: String,
  image: String,
  specification: String
})

const Computer = mongoose.model('Computer', computerSchema);

module.exports = Computer;
