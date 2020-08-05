const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const { adminAutho } = require("../controllers/authController");
const { upload } = require("../utils/upload");

const imageField = "productimage";

productRouter.post(
  "/add-product",
  upload.array(imageField, 5),
  productController.addNewProduct
);

// From here is test function

productRouter.post("/testupload", upload.any(), function(req, res, next) {
  console.log("upload request comming...", req.headers.origin);
  const fileName = req.fileName;
  const url = `http://localhost:8888/api/image/${fileName}`;
  res.status(200).json({
    uploaded: 1,
    fileName: fileName,
    url: url
  });
});

productRouter.get("/", (req, res) => {
  res.json({ message: "Hi! Product Router" });
});

productRouter.get("/testupload", (req, res) => {
  res.json({ message: "Hi! Test Upload" });
});

module.exports = {
  productRouter
};
