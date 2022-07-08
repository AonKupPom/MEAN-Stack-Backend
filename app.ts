const express = require('express')
const mongoose = require('mongoose');
const expressSession = require('express-session');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// const setRoutes = require('./routes');

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

// Book (Example)
app.post('/addBook',bookCtrl.insert);
app.get('/getBooks',bookCtrl.getAll);
app.get('/getBookById/:id',bookCtrl.get);
app.put('/updateBook/:id',bookCtrl.update);
app.delete('/deleteBook/:id',bookCtrl.delete);

// Computer
app.post('/addComputer',upload.single('image'), computerCtrl.insert);
app.get('/getComputers',computerCtrl.getAll);
app.get('/getComputerById/:id',computerCtrl.get);
app.put('/updateComputer/:id',upload.single('image'), computerCtrl.update);
app.delete('/deleteComputer/:id',computerCtrl.delete);

// User
app.post('/register',userCtrl.register);
app.post('/addUser',userCtrl.insert);
app.get('/getUsers',userCtrl.getAll);
app.get('/getUserById/:id',userCtrl.get);
app.put('/updateUser/:id',userCtrl.update);
app.delete('/deleteUser/:id',userCtrl.delete);
app.post('/getCurrentUser',auth, userCtrl.getCurrentUser);
app.put('/updateProfile_picture/:id', userCtrl.updateProfile_picture, upload.single('profile_picture'));

// Authenticate
app.post('/login',userCtrl.login);
app.post('/sendToken',auth, userCtrl.sendToken);

// Domain
app.post('/addDomain',domainCtrl.insert);
app.get('/getDomains',domainCtrl.getAll);
app.get('/getDomainById/:id',domainCtrl.get);
app.put('/updateDomain/:id',domainCtrl.update);
app.delete('/deleteDomain/:id',domainCtrl.delete);

// Server
app.post('/addServer',serverCtrl.insert);
app.get('/getServers',serverCtrl.getAll);
app.get('/getServerById/:id',serverCtrl.get);
app.put('/updateServer/:id',serverCtrl.update);
app.delete('/deleteServer/:id',serverCtrl.delete);

// Cloud
app.post('/addCloud',cloudCtrl.insert);
app.get('/getClouds',cloudCtrl.getAll);
app.get('/getCloudById/:id',cloudCtrl.get);
app.put('/updateCloud/:id',cloudCtrl.update);
app.delete('/deleteCloud/:id',cloudCtrl.delete);

// WebDesign
app.post('/addWebDesign',webDesignCtrl.insert);
app.get('/getWebDesigns',webDesignCtrl.getAll);
app.get('/getWebDesignById/:id',webDesignCtrl.get);
app.put('/updateWebDesign/:id',webDesignCtrl.update);
app.delete('/deleteWebDesign/:id',webDesignCtrl.delete);

// setRoutes(app);
