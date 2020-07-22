const mysql = require('mysql');

function ConnectToDB() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectLimit: 10,
      host: "localhost",
      user: "root",
      password: "123456",
      database: "tuyenbn",
    })
  }

  this.acquire = function(callback) {
    this.pool.getConnection((err, conn) => {
      callback(err, conn);
    })
  }
}

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
        })
      })
    } catch  (err) {
      reject({ error: true, message: err.message });
    }
  })
}

module.exports = {
  connectDB: new ConnectToDB(),
  ConnectToDB,
  queryMySQL,
}

// exports.connectDB = new ConnectToDB();
