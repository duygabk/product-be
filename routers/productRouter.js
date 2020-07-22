const express = require('express');
const productRouter = express.Router();

productRouter.get('/all', (req, res) => {
  res.json({
    error: true,
    message: "Test.....",
  })
})

module.exports = {
  productRouter,
}