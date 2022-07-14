module.exports = function setRoutes(app) {
  const express = require('express');
  const router = express.Router();
  const auth = require('./middleware/auth');
  const upload = require('./middleware/upload');
  const bookCtrl = require('./controller/Book.controller');
  const userCtrl = require('./controller/User.controller');
  const computerCtrl = require('./controller/Computer.controller');
  const domainCtrl = require('./controller/Domain.controller');
  const serverCtrl = require('./controller/ServerService.controller');
  const cloudCtrl = require('./controller/Cloud.controller');
  const webDesignCtrl = require('./controller/WebDesign.controller');

  // Book (Example)
  router.route('/addBook').post(bookCtrl.insert);
  router.route('/getBooks').get(bookCtrl.getAll);
  router.route('/getBookById/:id').get(bookCtrl.get);
  router.route('/updateBook/:id').put(bookCtrl.update);
  router.route('/deleteBook/:id').delete(bookCtrl.delete);

  // Computer
  router.route('/addComputer').post(upload.single('image'), computerCtrl.insert);
  router.route('/getComputers').get(computerCtrl.getAll);
  router.route('/getComputerById/:id').get(computerCtrl.get);
  router.route('/updateComputer/:id').put(upload.single('image'), computerCtrl.update);
  router.route('/deleteComputer/:id').delete(computerCtrl.delete);

  // User
  router.route('/register').post(userCtrl.register);
  router.route('/addUser').post(userCtrl.insert);
  router.route('/getUsers').get(userCtrl.getAll);
  router.route('/getUserById/:id').get(userCtrl.get);
  router.route('/updateUser/:id').put(userCtrl.update);
  router.route('/deleteUser/:id').delete(userCtrl.delete);
  router.route('/getCurrentUser').post(auth, userCtrl.getCurrentUser);
  router.route('/updateProfile_picture/:id').put(upload.single('profile_picture'), userCtrl.updateProfile_picture);

  // Authenticate
  router.route('/login').post(userCtrl.login);
  router.route('/sendToken').post(auth, userCtrl.sendToken);

  // Domain
  router.route('/addDomain').post(domainCtrl.insert);
  router.route('/getDomains').get(domainCtrl.getAll);
  router.route('/getDomainById/:id').get(domainCtrl.get);
  router.route('/updateDomain/:id').put(domainCtrl.update);
  router.route('/deleteDomain/:id').delete(domainCtrl.delete);

  // Server
  router.route('/addServer').post(serverCtrl.insert);
  router.route('/getServers').get(serverCtrl.getAll);
  router.route('/getServerById/:id').get(serverCtrl.get);
  router.route('/updateServer/:id').put(serverCtrl.update);
  router.route('/deleteServer/:id').delete(serverCtrl.delete);

  // Cloud
  router.route('/addCloud').post(cloudCtrl.insert);
  router.route('/getClouds').get(cloudCtrl.getAll);
  router.route('/getCloudById/:id').get(cloudCtrl.get);
  router.route('/updateCloud/:id').put(cloudCtrl.update);
  router.route('/deleteCloud/:id').delete(cloudCtrl.delete);

  // WebDesign
  router.route('/addWebDesign').post(webDesignCtrl.insert);
  router.route('/getWebDesigns').get(webDesignCtrl.getAll);
  router.route('/getWebDesignById/:id').get(webDesignCtrl.get);
  router.route('/updateWebDesign/:id').put(webDesignCtrl.update);
  router.route('/deleteWebDesign/:id').delete(webDesignCtrl.delete);

  app.use('/api', router);
}
