const MENU_TABLE = "category";

const { queryMySQL } = require("./connectDB");

function twoDigits(d) {
  if (0 <= d && d < 10) return "0" + d.toString();
  if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
  return d.toString();
}

Date.prototype.toMysqlFormat = function() {
  return (
    this.getUTCFullYear() +
    "-" +
    twoDigits(1 + this.getUTCMonth()) +
    "-" +
    twoDigits(this.getUTCDate()) +
    " " +
    twoDigits(this.getHours()) +
    ":" +
    twoDigits(this.getUTCMinutes()) +
    ":" +
    twoDigits(this.getUTCSeconds())
  );
};

function getCurrentTime() {
  let MyDate = new Date();
  return MyDate.toMysqlFormat(); //return MySQL Datetime format
}

exports.getAllMenu = function() {
  const sql = `SELECT * FROM ${MENU_TABLE}`;
  return queryMySQL(sql);
};

exports.addNewMenu = async function(menu) {
  const { menu_title, parent } = menu;
  const created = getCurrentTime();
  let sql = `SELECT * FROM ${MENU_TABLE} WHERE (menu_title = '${menu_title}')`;

  const buff = await queryMySQL(sql);
  if (buff.data && buff.data.length) {
    return Promise.reject({ error: true, message: "Menu is already exist" });
  }

  sql = `INSERT INTO ${MENU_TABLE} (menu_title, parent, created) VALUES ('${menu_title}', '${parent}', '${created}')`;
  return queryMySQL(sql);
};

exports.updateMenuById = function(menu) {
  const { id, menu_title, parent } = menu;
  const created = getCurrentTime();
  const sql = `UPDATE ${MENU_TABLE} SET menu_title = '${menu_title}', parent = '${parent}', created = '${created}' WHERE (id = '${id}')`;

  return queryMySQL(sql);
};

exports.removeMenuById = function(id) {
  const sql = `DELETE FROM ${MENU_TABLE} WHERE (id = '${id}')`;
  return queryMySQL(sql);
};
