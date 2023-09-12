const multer = require("multer");

const storage = multer.memoryStorage();

const imageUpload = multer({ storage }).single("file");

module.exports = imageUpload;
