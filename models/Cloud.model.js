const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cloudSchema = new mongoose.Schema({
  title: String,
  space: Number,
  price: Number,
  description: String,
  promotion: String,
});

const Cloud = mongoose.model('Cloud', cloudSchema);

module.exports = Cloud;
