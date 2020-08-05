const express = require("express");
const menuRouter = express.Router();

const { adminAutho } = require("../controllers/authController");

const menuController = require("../controllers/menuController");

// menuRouter.route('/*', adminAutho);

menuRouter.get("/all", menuController.getAllMenu);

menuRouter.post("/add", adminAutho, menuController.addNewMenu);

menuRouter.post("/update", adminAutho, menuController.updateMenu);

menuRouter.delete("/remove/:id", adminAutho, menuController.removeMenu);

module.exports = {
  menuRouter
};
