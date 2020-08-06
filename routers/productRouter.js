const express = require("express");
const productRouter = express.Router();

const imageField = "productimage";

const { upload } = require("../utils/upload");
const { removeFileByPath } = require("../utils/file");

productRouter.get("/all", (req, res) => {
  res.json({
    error: true,
    message: "Test.....",
  });
});

productRouter.post("/add-product", (req, res) => {
  const { productInfo } = req.body;
  console.log(productInfo);
  res.status(200).json({
    error: false,
    message: "add new product success",
  });
});

productRouter.post("/upload-image", upload.array(imageField, 5), function ( req, res ) {
  // upload image to server and return image link
  const uploadedFiles = req.files;
  const url = uploadedFiles.map(file => `http://localhost:8888/api/images/${file.filename}`)
  res.status(200).json({
    error: false,
    message: "upload image success",
    url: url,
  });
});

productRouter.post("/testupload", upload.any(), function (req, res) {
  // upload any single image, return image url
  const { filename } = req.files[0];
  const url = `http://localhost:8888/api/images/${filename}`;
  res.status(200).json({
    error: false,
    message: "upload single image success",
    url: url,
    uploaded: 1,
  });
});

productRouter.delete("/delete-image", async function (req, res) { 
  // remove image by filename and return removed status
  const { filename } = req.body;
  // console.log(filename);
  if (!filename || !filename.length) {
    res.status(400).json({
      error: true,
      message: "input filename error",
    })
  }

  const path = `${process.cwd()}/upload/img/${filename}`;

  removeFileByPath(path)
    .then(resp => {
      res.status(200).json({
        error: false,
        message: "Delete image OK",
        deleted: resp,
      })
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        message: "Delete file error",
        deleted: err.message,
      })
    })
});

module.exports = {
  productRouter,
};
