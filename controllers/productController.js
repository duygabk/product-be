const productModel = require("../models/productModel");

exports.addNewProduct = async function(req, res) {
  req.body && console.log("req body", req.body);
  req.files && console.log("req file ", req.files);

  const { productpara } = req.body;
  console.log(typeof productpara);
  res.status(200).json({ message: "I'm add new product server" });
  return;

  let { product } = req.body;
  product = JSON.parse(product);
  // product images

  const addStatus = await productModel.addNewProduct(product);
  if (addStatus.error) {
    res.status(500).json(addStatus);
  } else {
    res.status(200).json(addStatus);
  }
};
