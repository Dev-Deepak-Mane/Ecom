const DataUriParser = require("datauri/parser.js");
const path = require("path");
const getDatUri = (file) => {
  const parser = new DataUriParser();

  const extName = path.extname(file.name).toString();
  console.log(extName);
  return parser.format(extName, file.data);
};

module.exports = getDatUri;
