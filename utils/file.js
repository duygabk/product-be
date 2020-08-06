const fs = require("fs");

exports.removeFileByPath = function (path) {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync(path);
      resolve("remove file success");
    } catch (error) {
      reject(error.message);
    }
  });
};
