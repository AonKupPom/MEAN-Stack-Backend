const User = require('../models/User.model');
const model = User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {

  getAll: async (req, res) => {
    try {
      model.find().exec().then(docs => {
        res.json(docs)
      })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  count: async (req, res) => {
    try {
      const count = await model.count();
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  insert: async (req, res) => {
    try {
      console.log(req.body);

      const obj = await new model(req.body).save();
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  get: async (req, res) => {
    try {
      model.findOne({ _id: req.params.id }).exec().then(docs => {
        res.json(docs)
      })
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const respond = await model.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json(respond);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      console.log(req.params, "PARAMS");

      await model.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required")
      }

      const user = await model.findOne({ email })

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
            role: user.role,
            title: user.title,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            gender: user.gender,
            tel: user.tel
          },
          'qightysdrvp'
        )

        res.status(200).json({
          token: token,
          loggedIn: true
        });
      }
      else {
        res.status(400).json({ error: "login fail", loggedIn: false });
      }

    } catch (err) {
      return res.status(400).json({ error: err.message, loggedIn: false });
    }
  },

  register: async (req, res) => {
    try {
      console.log(req.body)
      const { title, firstname, lastname, email, password, address, birthDate, gender, tel } = req.body
      // ใส่ข้อมูลครบหรือไม่
      if (!(email && password && title && firstname && lastname && address && birthDate && gender && tel)) {
        res.status(400).json('All input is require.');
      }

      // มีผู้ใช้นี้อยู่แล้วหรือไม่
      const oldUser = await model.findOne({ email });
      if (oldUser) {
        res.status(409).json('User already exist.')
      }
      else {
        // เข้ารหัส
        let encryptedPassword = await bcrypt.hash(password, 10);

        // สร้าง User
        const user = await new model({
          title,
          firstname,
          lastname,
          email: email.toLowerCase(),
          password: encryptedPassword,
          address,
          birthDate,
          gender,
          role: "user",
          tel
        }).save();

        res.status(201).json({ success: true });
      }

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  sendToken: (req, res) => {
    res.status(200).json({ loggedIn: true })
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await model.findById(req.user.user_id)
      const token = jwt.sign(
        {
          user_id: user._id,
          email: user.email,
          role: user.role,
          title: user.title,
          firstname: user.firstname,
          lastname: user.lastname,
          address: user.address,
          gender: user.gender,
          tel: user.tel
        },
        'qightysdrvp'
      )
      res.status(200).json({
        _id: user._id,
        title: user.title,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        birthDate: user.birthDate,
        gender: user.gender,
        role: user.role,
        tel: user.tel,
        profile_picture: user.profile_picture,
        token: token
      });
    }
    catch (err) {
      res.status(200).json({ success: false });
    }
  },

  updateProfile_picture: async (req, res) => {
    try {
      const uploadsPath = req.file.path.substring(req.file.path.indexOf('uploads'))
      const respond = await model.findOneAndUpdate({ _id: req.params.id }, {
        profile_picture: uploadsPath
      });
      if (respond.profile_picture)
        // deleteFiles(respond.profile_picture);
        res.status(200).json(uploadsPath);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

};

// function deleteFiles(filepath) {
//   fs.unlink(`../${filepath}`, (err) => {
//     if (err) throw err;
//     console.log('File deleted!');
//   });
// }