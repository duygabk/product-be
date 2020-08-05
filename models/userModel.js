const { ConnectToDB } = require("./connectDB");

const USER_TABLE = "user";
const TOKEN_TABLE = "token";
const CONN_ERR_MESS = "Connect to Database failed";
const QUERY_ERR_MESS = "Query data failed";
const connErr = { error: true, message: CONN_ERR_MESS };
const queryErr = { error: true, message: QUERY_ERR_MESS };

function queryMySQL(sql) {
  const connect = new ConnectToDB();
  return new Promise((resolve, reject) => {
    try {
      connect.init();
      connect.acquire((err, conn) => {
        if (err) reject({ error: true, message: err });
        conn.query(sql, (err, result) => {
          if (err) reject({ error: true, message: err });
          conn.release();
          resolve({ error: false, data: result });
        });
      });
    } catch (err) {
      reject({ error: true, message: err.message });
    }
  });
}

exports.getLoginUser = function(user) {
  const { username = null, password = null } = user;
  const sql = `SELECT * FROM ${USER_TABLE} WHERE username = '${username}' AND password = '${password}'`;
  return queryMySQL(sql);
};

exports.getAllUser = function() {
  const sql = `SELECT * FROM ${USER_TABLE}`;
  return queryMySQL(sql);
};

exports.addNewUser = function(user) {
  const ConnectDB = new ConnectToDB();
  return new Promise(resolve => {
    try {
      ConnectDB.init();
      ConnectDB.acquire((err, conn) => {
        if (err) resolve({ error: true, message: CONN_ERR_MESS });
        const sql = `INSERT INTO ${USER_TABLE} (username, password, auth) values ('${
          user.username
        }', '${user.password}', '${user.auth}') `;
        conn.query(sql, (err, result) => {
          conn.release();
          if (err) resolve({ error: true, message: err });
          resolve({ error: false, data: result });
        });
      });
    } catch (err) {
      resolve({ error: true, message: CONN_ERR_MESS });
    }
  });
};
//
// exports.getLoginUser = function(user) {
//   const connect = new ConnectToDB();
//   return new Promise((resolve, reject) => {
//     try {
//       const { username, password } = user;
//       connect.init();
//       connect.acquire((err, conn) => {
//         if (err) reject(connErr);
//         const sql = `SELECT * FROM ${USER_TABLE} WHERE username = '${username}' AND password = '${password}'`;
//         conn.query(sql, (err, result) => {
//           if (err) reject(queryErr);
//           conn.release();
//           // console.log(result);
//           const response = result.length ? {error: false, data: result} : {error: true, message: "user not exist!"};
//           resolve(response);
//         })
//       })
//     } catch (err) {
//       reject({ error: true, message: err.message });
//     }
//   })
// }

exports.storeToken = async function(tokenObject) {
  // const sql = `CREATE TABLE IF NOT EXISTS token (id INT AUTO_INCREMENT PRIMARY KEY, token VARCHAR(500), refresh_token VARCHAR(500), user INT)`;
  try {
    const { token, refreshToken, userID } = tokenObject;
    // Check database, already has token of user ID -> update, if not exist -> insert
    let sql = `SELECT token FROM token WHERE user = '${userID}'`;
    const isExist = await queryMySQL(sql);
    // console.log(isExist);
    if (!isExist.error) {
      sql = isExist.data.length
        ? `UPDATE token SET token = '${token}', refresh_token = '${refreshToken}' WHERE user = '${userID}'`
        : `INSERT INTO token (token, refresh_token, user) VALUES ('${token}', '${refreshToken}', '${userID}')`;
      return queryMySQL(sql);
    } else {
      // error handle
      return Promise.reject(isExist);
    }
  } catch (error) {
    return Promise.reject({ error: true, message: error.message });
  }
};

// get user info (user table) from refresh token (token table: foreign key: user -> user(id))
exports.getUserFromRefreshToken = async function(refreshToken) {
  // add foreign key into token table
  // try {
  //   const sql = `ALTER TABLE ${TOKEN_TABLE} ADD FOREIGN KEY (user) REFERENCES ${USER_TABLE}(id)`;
  //   const res = await queryMySQL(sql);
  //   console.log(res);
  // } catch (err) {
  //   console.log(err);
  // }
  // get user info from user table
  try {
    const sql = `SELECT * FROM ${USER_TABLE} WHERE id = (SELECT user FROM ${TOKEN_TABLE} WHERE refresh_token = '${refreshToken}')`;
    const result = await queryMySQL(sql);
    return Promise.resolve(result);
  } catch (error) {
    // console.log(error);
    return Promise.reject(error);
  }
};
