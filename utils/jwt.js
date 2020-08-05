const jwt = require("jsonwebtoken");

const SECRET_KEY = "tuyenbn@web";
const TOKEN_LIFE = "1m"; // 1 hour
const REFRESH_TOKEN_LIFE = "1000d"; // 1000 days

exports.signToken = function(user, lifeTime) {
  return new Promise((resolve, reject) => {
    const config = {
      algorithm: "HS256"
      // expiresIn: lifeTime,
    };
    jwt.sign({ data: user }, SECRET_KEY, config, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

exports.verifyToken = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject({ error: true, message: err });
      resolve({ error: false, data: decoded });
    });
  });
};

exports.SECRET_KEY = SECRET_KEY;
exports.TOKEN_LIFE = TOKEN_LIFE;
exports.REFRESH_TOKEN_LIFE = REFRESH_TOKEN_LIFE;
