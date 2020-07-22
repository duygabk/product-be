const menuModel = require('../models/menuModel');

exports.getAllMenu = async function (req, res) {
  const allMenu = await menuModel.getAllMenu();
  res.json(allMenu);
}

exports.addNewMenu = async function(req, res) {
  let { menu } = req.body;
  menu = JSON.parse(menu);
  // console.log(menu);
  const added = await menuModel.addNewMenu(menu).then(res => res).catch(err => err);
  console.log(added);
  res.json(added);
}


exports.updateMenu = async function (req, res) {
  let { menu } = req.body;
  menu = JSON.parse(menu);
  console.log(menu);
  // call model to update to database
  const updateStatus = await menuModel.updateMenuById(menu);
  res.json(updateStatus);
}

exports.removeMenu =  async function(req, res) {
  let { id } = req.params;
  console.log("remove -> ", id);
  if ( id ) {
    const removeStatus = await menuModel.removeMenuById(id);
    console.log(removeStatus);
    return res.json(removeStatus);
  }
  return res.json({
    error: true,
    message: 'Parameter Not match!!!',
  })
}
