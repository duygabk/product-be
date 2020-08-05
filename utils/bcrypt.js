const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.encryptPassword = function(password) {
  let encrypted;

  return encrypted;
};

exports.decryptPassword = function(encryptedPass) {
  let password;

  return password;
};

// test bcrypt
const password = "123456";
const otherPass = "9876544";
exports.testBcrypt = bcrypt.genSalt(saltRounds, function(err, salt) {
  if (err) throw err;
  bcrypt.hash(password, salt, (err, hashPwd) => {
    if (err) throw err;
    console.log(hashPwd);
    // compare password
  });
});
