const Cloud = require('../models/Cloud.model');
const model = Cloud;

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
  }

};