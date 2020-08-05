const express = require("express");
const commonRouter = express.Router();
const { adminAutho } = require("../controllers/authController");
const commonController = require("../controllers/commonController");

commonRouter.get("/supporter", commonController.getAllSupporter);

commonRouter.get("/common-info", commonController.getAllCommonInfo);

commonRouter.post(
  "/add-supporter",
  adminAutho,
  commonController.addNewSuppoter
);

commonRouter.post(
  "/update-supporter",
  adminAutho,
  commonController.updateSuppoterById
);

commonRouter.delete(
  "/remove-supporter",
  adminAutho,
  commonController.removeSupporterById
);

module.exports = {
  commonRouter
};
