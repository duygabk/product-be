const { queryMySQL } = require("./connectDB");

const SUPPORTER_TABLE = "online_support";

exports.getAllSupporter = function() {
  const sql = `SELECT * FROM ${SUPPORTER_TABLE}`;
  return queryMySQL(sql);
};

exports.addNewSuppoter = function(supporter) {
  const { name, skype, zalo, facebook, phone, email } = supporter;

  const sql = `INSERT INTO ${SUPPORTER_TABLE} (name, skype, zalo, facebook, phone, email) VALUES ('${name}', '${skype}', '${zalo}', '${facebook}', '${phone}', '${email}')`;

  return queryMySQL(sql);
};

exports.updateSuppoterById = function(supporter) {
  const { id, name, skype, zalo, facebook, phone, email } = supporter;

  const sql = `UPDATE ${SUPPORTER_TABLE} SET name = '${name}', skype = '${skype}', zalo = '${zalo}', facebook = '${facebook}', phone = '${phone}', email = '${email}' WHERE (id = '${id}')`;

  return queryMySQL(sql);
};

exports.removeSupporterById = function(id) {
  const sql = `DELETE ${SUPPORTER_TABLE} WHERE (id = '${id}')`;

  return queryMySQL(sql);
};
