const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const webDesignSchema = new mongoose.Schema({
  title: String,
  page_amouth: Number,
  price: Number,
  description: String,
  promotion: String,
});

const WebDesign = mongoose.model('WebDesign', webDesignSchema);

module.exports = WebDesign;
