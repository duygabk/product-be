const userModel = require('../models/userModel');
// const { encryptPassword, decryptPassword } = require('../utils/bcrypt');
const { signToken, verifyToken, TOKEN_LIFE, REFRESH_TOKEN_LIFE } = require('../utils/jwt');

exports.userSignup = async function(req, res, next) {
  const allUser = await userModel.getAllUser();
  // console.log({allUser});
  // check user already exist
  const { username, password } = req.body;
  console.log({username, password});
  const isExist = (allUser && allUser.data.length) ? allUser.data.some(user => user.username === username) : false;
  // console.log(isExist);

  if (isExist) {  // Already Exist => send error to Client
    res.json({ error: true, message: `${username} is already exist!!!` });
  } else { // add new user and send message to Client
    // hash password
    // password = await encryptPassword(password);
    // console.log({password});
    const added = await userModel.addNewUser({username, password, auth: "member"});
    console.log(added);
    res.json(added)
  }
}

exports.userLogin = async function(req, res, next) {
  const { username, password } = req.body;
  let isExistUser = await userModel.getLoginUser({ username, password });
  if (!isExistUser.error) {
    // add token to client
    const userInfo = { username, password }
    const token = await signToken(userInfo, TOKEN_LIFE);
    const refreshToken = await signToken(userInfo, REFRESH_TOKEN_LIFE);
    // save token to database
    // {key: value} key = refreshToken, value = {token, refreshToken}
    const userID = isExistUser.data[0].id;
    const saveToDB = await userModel.storeToken({token, refreshToken, userID}).then(res => res).catch(err => err);
    // console.log(saveToDB);
    isExistUser = {...isExistUser, token, refreshToken, data: isExistUser.data[0]};
  }
  // response to client
  res.json(isExistUser)
}

// refresh token request coming.....
exports.refreshToken = async function (req, res) {
  // parse refresh token
  let { refresh_token } = req.body;
  refresh_token = JSON.parse(refresh_token);

  // get user ID from token table and get user info from user table
  const userInfo = await userModel.getUserFromRefreshToken(refresh_token).then(res => res).catch(err => err);
  console.log({userInfo});
  const { error } = userInfo;
  if (error) {
    res.json({ error: true, message: userInfo.message.message })
  } else {
    const { data } = userInfo;
    const response = (data && data.length) ? {error: false, data: data[0]} : {error: true, message: "Refresh Token not macth"};
    // if error, or no data -> response to Client
    if (response.error) return res.json(response);
    // generate new token
    const { username, password, id } = data[0];
    const newToken = await signToken({username, password}, TOKEN_LIFE);
    // update token to database
    await userModel.storeToken({ token: newToken, refreshToken: refresh_token, userID: id });
    //
    res.json({...response, token: newToken});
  }
}

exports.userLogout = async function(req, res, next) {
  const { id } = req.params;
  // console.log({id});
  // do something when user logout
  res.json({error: false, data: []})
}

exports.getUserByToken = async function(req, res, next) {
  let { token } = req.body;
  token = JSON.parse(token);

  const decoded = await verifyToken(token).then(res => res).catch(err => err);
  console.log(decoded);
  // // console.log("header -> ", req.headers.authorization);
  if(decoded && !decoded.error) {
    // get user info from decoded token
    const user = decoded.data.data;
    // console.log(user);
    const isExistUser = await userModel.getLoginUser(user).then(res =>  res).catch(err => err);
    // console.log(isExistUser);
    if (isExistUser.error) {  // error -> login false
      res.json({error: true, message: isExistUser.message});
    } else { // OK, user is exits in database

      res.json({...isExistUser, data: isExistUser.data[0]})
    }
  } else {  // token verify error ->
      res.json({error: true, message: decoded.message.message});
  }
}

exports.getAllUser = async function(req, res) {
  console.log(req.jwtDecoded);
  const users = await userModel.getAllUser();
  res.json(users)
}
