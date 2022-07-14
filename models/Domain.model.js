const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  promotion: String,
  space: Number,
  bandwidth: Number,
  domain_amouth: Number,
  email_amouth: Number,
  database_amouth: Number
});

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
