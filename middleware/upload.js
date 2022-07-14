const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    var date = Date.now()

    var dir = `uploads/${date}/`;
    var updir = path.join(__dirname, '../uploads');

    if (!fs.existsSync(updir)) {
      fs.mkdirSync(updir);
    }

    cb(null, updir);
  },

  filename: function (req, file, cb) {
    let mime = file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? 'docx' : 'pdf'
    cb(null, file.originalname.split('.').pop() == "blob" ? `${makeid(11) + file.originalname}.${mime}` : `${makeid(11)}.${file.originalname.split('.').pop()}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50
  },
  fileFilter: fileFilter,

});

const makeid = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result + '';
}

module.exports = upload
