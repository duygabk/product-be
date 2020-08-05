const jwtHelper = require("../utils/jwt");
const accessTokenSecret = jwtHelper.SECRET_KEY;

let isAuth = async (req, res, next) => {
  const tokenFromClient =
    req.headers["authorization"] || req.headers["Authorization"];
  // const tokenFromClient = req.headers;
  console.log({ tokenFromClient });
  console.log(req.path);
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper
        .verifyToken(tokenFromClient)
        .then(res => res)
        .catch(err => err);
      // console.log(decoded);
      // OK
      req.jwtDecoded = decoded;
      next();
      // if (!decoded.error) {
      //   req.jwtDecoded = decoded;
      //   console.log("next ---------->>>>");
      //   //
      //   next();
      // } else {
      //   // console.log(decoded.message.message);
      //   const { message, name } = decoded.message || { message: "unknow", name: "unknow" };
      //   console.log({message});
      //   // return res.status(200).json({error: true, message});
      //   next();
      // }
    } catch (error) {
      console.log("decoded err: ", error);
      return res.status(401).json({
        error: true,
        message: "Unauthorized."
      });
    }
  } else {
    return res.status(403).json({
      error: true,
      message: "No token provided."
    });
  }
};

const adminAutho = async (req, res, next) => {
  // console.log("headers: ", req.headers);
  const tokenFromClient =
    req.headers["authorization"] ||
    req.headers["Authorization"] ||
    req.headers["x-token"];
  console.log({ tokenFromClient });
  if (tokenFromClient) {
    const decoded = await jwtHelper.verifyToken(tokenFromClient);
    // console.log("decoded user info: ", decoded.data.data);
    if (!decoded.error) {
      // Check is admin ?
      const decodedUser = decoded.data.data;
      const { username } = decodedUser;
      if (username === "admin") {
        next();
      } else {
        res.status(403).json({
          error: true,
          message: "acount not is admin"
        });
      }
    } else {
      // decode failed
      res.status(403).json({
        error: true,
        message: "decode failed"
      });
    }
  } else {
    // No token
    return res.status(403).json({
      error: true,
      message: "No token provided, not is admin"
    });
  }
};

module.exports = {
  isAuth,
  adminAutho
};
