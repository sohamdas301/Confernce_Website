const multer = require('multer');
var fs = require("fs");
const maxSize = 1 * 1024 * 1024; // for 1MB




var storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
});



module.exports = store = multer({storage: storage,
fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize }});