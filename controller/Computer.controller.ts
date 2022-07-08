import Computer from "../model/Computer.model";
import BaseCtrl from "./base.controller";
import * as fs from "fs";

class ComputerCtrl extends BaseCtrl {
  model = Computer;

  override insert = async (req, res) => {
    try {
      const uploadsPath = req.file.path.substring(req.file.path.indexOf('uploads'))
      let computer = new Computer({
        name: req.body.name,
        description: req.body.description,
        model: req.body.model,
        price: req.body.price,
        type: req.body.type,
        image: uploadsPath,
        specification: req.body.specification
      }).save();
      res.status(201).json({computer: computer});
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  override update = async (req, res) => {
    try {
      const uploadsPath = req.file.path.substring(req.file.path.indexOf('uploads'))
      const respond = await this.model.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        model: req.body.model,
        price: req.body.price,
        type: req.body.type,
        image: uploadsPath,
        specification: req.body.specification
      });
      if(respond.image)
      this.deleteFiles(respond.image);
      res.status(200).json(respond);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  override delete = async (req, res) => {
    try {
      const respond = await this.model.findOneAndRemove({ _id: req.params.id });
      if(respond.image)
      this.deleteFiles(respond.image)
      res.status(200).json({ success: true });
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

export default ComputerCtrl
