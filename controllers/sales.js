/*************************************
 * Sales Controller
 * @file: controllers/sales.js
 * @author: James Abiagam
 ************************************/
 "use  strict";

 const saleHelper = require('../helpers/sale');
 const Constants = require("../constants/constants");
 const { ERROR_OCCURED } = Constants;

 exports.buyItem = async (req, res) => {
     try{
      let itemPurchasedQty = 1; // Number of Item(s) to be purchased
      const showId = req.params.show_id;
      const itemId = req.params.item_id;
      const result =  await saleHelper.sellItem(showId,itemId,itemPurchasedQty);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          error: result.error,
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });     

      }catch(err){
        console.info(err);
        return res.status(500).json({
        success: false,
        error: ERROR_OCCURED,
        });
      }  
 };

 exports.getSoldItems = async (req, res) => {
   try{
        let showId = req.params.show_id;
        let itemId = req.params.item_id;
        const result =  await saleHelper.soldItems(showId,itemId);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            error: result.error,
          });
        }
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });     

    }catch(err){
          console.info(err);
          return res.status(500).json({success: false,error: ERROR_OCCURED,});
    }  

 };
