const Computer = require('../models/Computer.model');
const model = Computer;

module.exports = {

    insert: async (req, res) => {
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
            res.status(201).json({ computer: computer });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const uploadsPath = req.file.path.substring(req.file.path.indexOf('uploads'))
            const respond = await model.findOneAndUpdate({ _id: req.params.id }, {
                name: req.body.name,
                description: req.body.description,
                model: req.body.model,
                price: req.body.price,
                type: req.body.type,
                image: uploadsPath,
                specification: req.body.specification
            });
            // if (respond.image)
                // deleteFiles(respond.image);
            res.status(200).json(respond);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const respond = await model.findOneAndRemove({ _id: req.params.id });
            // if (respond.image)
                // deleteFiles(respond.image)
            res.status(200).json({ success: true });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

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

    get: async (req, res) => {
        try {
            model.findOne({ _id: req.params.id }).exec().then(docs => {
                res.json(docs)
            })
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

};

// function deleteFiles(filepath) {
//     fs.unlink(`../${filepath}`, (err) => {
//         if (err) throw err;
//         console.log('File deleted!');
//     });
// }