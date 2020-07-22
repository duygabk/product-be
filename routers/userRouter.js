const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../controllers/authController');

userRouter.get('/signup', (req, res) => {
  res.json({"a": "signup"})
})

// userRouter.post('/signup', async(req, res) => {
//   console.log(req.body);
//   res.json(req.body)
// })
// singup user
userRouter.post('/signup', userController.userSignup)

// login user
userRouter.post('/login', userController.userLogin);

userRouter.get('/logout/:id', userController.userLogout);

userRouter.post('/me', userController.getUserByToken);

// test authoriztion route
userRouter.get('/listuser', authMiddleware.isAuth, userController.getAllUser);

// refresh Token
userRouter.post('/refreshtoken', userController.refreshToken);

exports.userRouter = userRouter;
