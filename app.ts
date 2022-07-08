const express = require('express')
const mongoose = require('mongoose');
const expressSession = require('express-session');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const setRoutes = require('./routes');

const auth = require('./middleware/auth');
const upload = require('./middleware/upload');
const bookCtrl = require('./controller/Book.controller');
const userCtrl = require('./controller/User.controller')
const computerCtrl = require('./controller/Computer.controller')
const domainCtrl = require('./controller/Domain.controller')
const serverCtrl = require('./controller/ServerService.controller')
const cloudCtrl = require('./controller/Cloud.controller')
const webDesignCtrl = require('./controller/WebDesign.controller')

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

setRoutes(app);
