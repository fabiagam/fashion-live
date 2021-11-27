/***************************************
 * Sales Helper
 * @file: helpers/sale.js
 * @author: James N. Abiagam
 ****************************************/
 "use  strict";
 const Constants = require("../constants/constants");
 const { Inventory, Sale } = require("../models");


 const makeSalesEntry = async (showId, itemId, itemName, itemPurchasedQty) => {
     let result = {};
       const opt = await Sale.getByShow(itemId,showId);
       if(opt){
           const { id } = opt;
           let updated = { soldItems: opt.soldItems + itemPurchasedQty};
           await Sale.updateByshowId(id,updated);
           result = await Sale.getByShow(itemId,showId);
       }
       if(!opt){
           let obj = {showId, itemId, itemName, soldItems: itemPurchasedQty};
           result = await Sale.insert(obj);
       }
       return result;
 };

 const sellItem = async (showId, itemId, itemPurchasedQty) =>{
     try{
     let result = {};
       const itemLookup = await Inventory.getByItemId(itemId);
       if(!itemLookup){
        result = {
            success: false,
            error: `Oops!. Item with Item ID - ${itemId} does not exist in the inventory`,
          };
       }
       if(itemLookup.quantity > itemPurchasedQty){ // If Stock inventry exceeds purchase quantity we can make a sale
           await Inventory.deductItem(itemId,itemPurchasedQty);
           const { itemName } = itemLookup;
           let odata = await makeSalesEntry(showId, itemId, itemName, itemPurchasedQty);
           result = {success: true, data: odata, message: `Item with Item  ID - ${itemId} successfully sold at show ID - ${showId}`};
       }
       if((itemLookup.quantity < itemPurchasedQty) || (itemId.quantity == 0)){
          result = { success: false, error: `Sorry!. We are out of stock on Item ID - ${itemId} for show ID - ${showId}`};
       }
      return result;
    }catch(err){
        console.info(err);
        return  { success: false, error: "There was a problem with processing sales of an item. Please try again"};
    }
 };

 const soldItems = async (showId, itemId) =>{
     try{
       let result = {};
       if(!itemId){ // retreive all sold records based on showID
          result = await Sale.getItemsByShowId(showId);
       }
        result = await  Sale.getAllSoldItems(showId, itemId);
        if(!result){
            return { success: false, error: `Oops!. No records found for Item ID - ${itemId} and show ID - ${showId}`};
        }
        return {success: true, data: result, message: `Successfully retreived sold items for  Item  ID - ${itemId} and show ID - ${showId}`};
    } catch(err){
        console.info(err);
        return  { success: false, error: "There was a problem retreiving the recoords for sold items. Please try again"};
    }
 };


 module.exports = { sellItem, soldItems };