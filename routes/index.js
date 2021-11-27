/***************************************
 * App Routes
 * @file: routes/index.js
 * @author: James N. Abiagam
 *****************************************/
"use strict";

const inventories = require("../controllers/inventories");
const sales = require("../controllers/sales");

module.exports = (app) => {
  app.post("/inventory", inventories.addItem); // Add/Update Inventroy
  app.post("/show/:show_id/buy_item/:item_id", sales.buyItem); // Buy Item during single show
  app.get("/show/:show_id/sold_items/:item_id", sales.getSoldItems); // Get sold items by show ID

};