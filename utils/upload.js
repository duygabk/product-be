const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "upload/img");
  },
  filename: function(req, file, cb) {
    console.log(file);
    const fileName = Date.now() + "-" + file.originalname;
    req.fileName = fileName;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage
});

module.exports = {
  upload
};
