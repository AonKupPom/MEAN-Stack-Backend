const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  type: String,
  image: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
