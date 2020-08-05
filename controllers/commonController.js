const supporterModel = require("../models/supporterModel");
const commonModel = require("../models/commonModel");

exports.getAllSupporter = async function(req, res) {
  const allSupporter = await supporterModel.getAllSupporter();

  res.json(allSupporter);
};

exports.getAllCommonInfo = async function(req, res) {
  const allCommonInfo = await commonModel.getAllCommonInfo();

  res.json(allCommonInfo);
};

exports.updateSuppoterById = async function(req, res) {
  let { supporter } = req.boby;
  supporter = JSON.parse(supporter);
  const update = await supporterModel.updateSuppoterById(supporter);

  res.json(update);
};

exports.addNewSuppoter = async function(req, res) {
  let { supporter } = req.body;
  supporter = JSON.parse(supporter);

  const add = await supporterModel.addNewSuppoter(supporter);

  res.json(add);
};

exports.removeSupporterById = async function(req, res) {
  const { id } = req.body;

  const remove = await supporterModel.removeSupporterById(id);

  res.json(remove);
};
