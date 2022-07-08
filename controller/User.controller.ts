import User from '../model/User.model';
import BaseCtrl from './base.controller';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as auth from '../middlewares/auth';
import * as fs from 'fs';

class UserCtrl extends BaseCtrl {
  model = User;

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required")
      }

      const user = await this.model.findOne({ email })

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          'qightysdrvp',
          {
            expiresIn: "30d"
          }
        )

        await this.model.findByIdAndUpdate(user._id, { token: token })
        let respond = await this.model.findById(user._id);
        res.status(200).json({
          title: respond.title,
          firstname: respond.firstname,
          lastname: respond.lastname,
          address: respond.birthDate,
          gender: respond.gender,
          role: respond.role,
          tel: respond.tel,
          token: respond.token
        });
      }
      else{
        res.status(400).send("Invalid credentails.");
      }

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  register = async (req, res) => {
    try {
      console.log(req.body)
      const { title, firstname, lastname, email, password, address, birthDate, gender, tel } = req.body
      // ใส่ข้อมูลครบหรือไม่
      if (!(email && password && title && firstname && lastname && address && birthDate && gender && tel)) {
        res.status(400).json('All input is require.');
      }

      // มีผู้ใช้นี้อยู่แล้วหรือไม่
      const oldUser = await this.model.findOne({ email });
      if (oldUser) {
        res.status(409).json('User already exist.')
      }

      // เข้ารหัส
      let encryptedPassword = await bcrypt.hash(password, 10);

      // สร้าง User
      const user = await new this.model({
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

      // สร้าง Token
      const token = jwt.sign(
        { user_id: user._id, email },
        'qightysdrvp',
        {
          expiresIn: "30d"
        }
      )

      await this.model.findByIdAndUpdate(user._id, { token: token })
      let respond = await this.model.findById(user._id);
      res.status(201).json(respond.token);

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  sendToken = (req, res) => {
    res.status(200).json({loggedIn: true})
  }

  getCurrentUser = async (req, res) => {
    const user = await this.model.findById(req.user.user_id)
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
      profile_picture: user.profile_picture
    });
  }

  updateProfile_picture = async (req,res) => {
    try {
      const uploadsPath = req.file.path.substring(req.file.path.indexOf('uploads'))
      const respond = await this.model.findOneAndUpdate({ _id: req.params.id }, {
        profile_picture: uploadsPath
      });
      if(respond.profile_picture)
      this.deleteFiles(respond.profile_picture);
      res.status(200).json(uploadsPath);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  deleteFiles(filepath) {
    fs.unlink(`././node-backend/${filepath}`, (err) => {
      if (err) throw err;
      console.log('File deleted!');
    });
  }
}

export default UserCtrl;
