abstract class BaseCtrl {

  abstract model: any;

  // Get alls
  getAll = async (req, res) => {
    try {

      this.model.find()
        // .populate(populate)
        // .populate('monitor')
        .exec()
        .then(docs => {
          res.json(docs)
        })

      // res.status(200).json(docs);
      // return docs
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Count all
  count = async (req, res) => {
    try {
      const count = await this.model.count();
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Insert
  insert = async (req, res) => {
    try {
      console.log(req.body);

      const obj = await new this.model(req.body).save();
      // const get = () =>
      //   new Promise((resove, reject) => {

      //     resove()
      //   })
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get by id
  get = async (req, res) => {
    try {

      // this.model.find()
      this.model.findOne({ _id: req.params.id })
        // .populate(populate)
        // .populate('monitor')
        .exec()
        .then(docs => {

          res.json(docs)
        })
      // const obj = await this.model.findOne({ _id: req.params.id });
      // res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Update by id
  update = async (req, res) => {
    try {
      const respond = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json(respond);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete by id
  delete = async (req, res) => {
    try {
      console.log(req.params,"PARAMS");

      await this.model.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default BaseCtrl;
