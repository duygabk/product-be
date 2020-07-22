const express       = require('express');
const server        = express();
const bodyParser    = require('body-parser');
const PORT          = 8888;
const expressSession = require('express-session');
const cors = require('cors');

server.set('view engine', 'ejs');
/**
 * setup express-session
 */
// server.use(expressSession({
//     secret: 'MERN_STACK_1508',
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 10000
//     }
// }));
server.use(cors());
server.use(express.static('./public/'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({}));

const { connectDB } = require('./models/connectDB')
connectDB.init();
connectDB.acquire(function(err, conn) {
  if (err) throw err;
  console.log("ConnectDB OK");
})

// test menu model
// const { getAllMenu, addNewMenu } = require('./models/menuModel');
// getAllMenu().then((res) => {
//   console.log(res);
// }).catch(err => {
//   console.log(err.message);
// })
// addNewMenu({menuTitle: 'Hang 1', parent: 1})
//   .then(res => console.log(res))
//   .catch(err => console.log(err.message));

// const { addNewExam } = require('./models/examModel');
// addNewExam();
// user route
const { userRouter } = require('./routers/userRouter');
server.use('/api/user/', userRouter);

// product router
const { productRouter } = require('./routers/productRouter');
server.use('/api/product/', productRouter);

// menu router
const { menuRouter } = require('./routers/menuRouter');
server.use('/api/menu/', menuRouter);

// common Router, supporter, header, footer...
const { commonRouter } = require('./routers/commonRouter');
server.use('/api/common', commonRouter);

// serve img
server.use('/api/images/', express.static(__dirname + '/upload/img/'));

server.get('*', (req, res) => {
  res.json({
    error: true,
    message: 'path not match',
  })
});
// Test jwt
// const jwt = require('./utils/jwt');
// const fakeUser = {
//   username: "lamsky",
//   password: "123"
// }

// const testJWT = async () => {
//   const tokenLam = await jwt.signToken(fakeUser);
//   console.log(tokenLam);
//   const encoded = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoibGFtc2t5IiwicGFzc3dvcmQiOiIxMjMifSwiaWF0IjoxNTg4MjI0Mzk5LCJleHAiOjE1ODgyMjc5OTl9.swua0kLYmMdqwhStuxZetHUl2vx7sbGc6UpYYgSZjno";
//   const decoded = await jwt.verifyToken(encoded);
//   console.log(decoded.data);
// }
// testJWT()

server.listen(PORT, () => console.log(`server started at port ${PORT}`));
