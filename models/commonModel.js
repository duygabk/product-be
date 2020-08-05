const { queryMySQL } = require("./connectDB");

const COMMON_TABLE = "common";

exports.getAllCommonInfo = function() {
  const sql = `SELECT * FROM ${COMMON_TABLE}`;
  return queryMySQL(sql);
};

exports.updateCommonInfo = function(commonInfo) {
  const sql = `UPDATE ${COMMON_TABLE} SET ...`;
  return queryMySQL(sql);
};

exports.addCommonInfo = function(commonInfo) {
  const sql = `INSERT INTO ${COMMON_TABLE} (  ) VALUES ()`;
  return queryMySQL(sql);
};

exports.removeCommonInfo = function() {
  const sql = `REMOVE ${COMMON_TABLE} WHERE (id = '1')`;
  return queryMySQL(sql);
};
