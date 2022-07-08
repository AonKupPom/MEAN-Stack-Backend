const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  promotion: String,
  space: Number,
  bandwidth: Number,
  server_amouth: Number,
  server_type: String, // Tower server, Rack server, Blade server
  operating_system: String
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;
