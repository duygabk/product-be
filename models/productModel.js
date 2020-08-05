const { queryMySQL } = require("./connectDB");

const PRODUCT_TABLE = "product";
const CATEGORY_TABLE = "category";

exports.addNewProduct = function(newProduct) {
  const sql = `INSERT INTO ${PRODUCT_TABLE} (  ) VALUES ()`;
  return queryMySQL(sql);
};

exports.updateProduct = function(updateProduct) {
  const sql = `UPDATE TABLE ${PRODUCT_TABLE} SET... WHERE ...`;
  return queryMySQL(sql);
};

exports.removeProductById = function(id) {
  const sql = `REMOVE TABLE ${PRODUCT_TABLE} WHERE (id = ${id})`;
  return queryMySQL(sql);
};

exports.getAllProduct = function() {
  const sql = `SELECT * FROM ${PRODUCT_TABLE}`;
  return queryMySQL(sql);
};

exports.getProductByCategory = function(categoryId) {
  const sql = `SELECT * FROM ${PRODUCT_TABLE} WHERE (category = '${categoryId}')`;
  return queryMySQL(sql);
};

exports.getProductByQuantity = function(startRow, quantity) {
  const sql = `SELECT * FROM ${PRODUCT_TABLE} LIMIT ${startRow -
    1}, ${quantity}`;
  return queryMySQL(sql);
};
