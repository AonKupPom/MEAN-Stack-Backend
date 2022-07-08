const User = require('../models/User.js');
const BlogPost = require('../models/BlogPost.js');

module.exports = {

    aonGet: async (req, res) => {
        const user = await User.find().exec()
        .then(docs => {
          res.json(docs)
        })
    },

    aon2: async (req, res) => {
        const blogpost = await BlogPost.find().exec()
        .then(docs => {
          res.json(docs)
        })
    }

};