const express = require('express')
const mongoose = require('mongoose');
const expressSession = require('express-session');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// const setRoutes = require('./routes');

const BookCtrl = require('./controller/Book.controller');

mongoose.connect('mongodb+srv://sasawat:sIz9xe4LZFs9bvct@mean-stack.cb9amll.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database successfully connected.')
}, error => {
  console.log('Database error : ',error)
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cors());
// Static directory path
app.use(express.static(path.join(__dirname, 'dist/')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));

// Port
var port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Listening on port : ',port)
})

// Error Handle
app.use((err, req, res, next) => {
  console.error(err.message);
  if(!err.statusCode){
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message)
})

app.get('/getUsers', BookCtrl.getAll)

// setRoutes(app);
