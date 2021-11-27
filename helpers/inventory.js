/***************************************
 * Inventory Helper
 * @file: helpers/product.js
 * @author: James N. Abiagam
 ****************************************/
 "use  strict";
 const Constants = require("../constants/constants");
 const { Inventory } = require("../models");
 const { isObject } = require('../utils/util');


 const makeSingleStockEntry = async (stock) =>{
    let result = {};
    const { itemId, itemName, quantity} = stock;
    let check = await Inventory.getByItemId(itemId);
    if(check){ // we update Item name and quantity
        //const { quantity } = check;
        let total = Number(check.quantity) + Number(quantity);
        const update = {itemName,quantity: total};
        await Inventory.updateByItemId(itemId, update);
        result = await Inventory.getByItemId(itemId);
    }
    if(!check){ // make fresh entry
        result = await Inventory.insert(stock);
   }
   return  result;
 };

 const makeStockEntry = async (stock) =>{
     let resp = {};
     try{
        if(isObject(stock)){
               resp = await makeSingleStockEntry(stock);
         }
        if(Array.isArray(stock)){
            let promises = stock.map(item =>  makeSingleStockEntry(item));
            resp = await Promise.all(promises);
        }
        if(typeof resp === null || typeof resp === undefined){
            return { success: false, error: "Unable to save stock entry. Please try again."};
        }
        return { success: true, data: resp, message: "New stock entry saved successfully "};
     } catch (error) {
     console.info(error);
    return { success: false, error: error.message };
  }
 };

 const emptyDatabase = async () =>{
     await Inventory.remove();
 };
 module.exports = { makeStockEntry, emptyDatabase  };