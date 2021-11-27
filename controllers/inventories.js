/*************************************
 * Inventories Controller
 * @file: controllers/inventories.js
 * @author: James Abiagam
 ************************************/
 "use  strict";

 const inventoryHelper = require("../helpers/inventory");
 const { stockValidation } = require('../validation/schema');
 const Constants = require("../constants/constants");
 const { ERROR_OCCURED } = Constants;
 
 exports.addItem = async (req, res) => {
   const schema = {};
   if( typeof req.body === 'string' || typeof req.body === undefined){
    return res.status(404).json({
        success: false,
        error: 'Oops!. Stock inventory input is invalid. Please use the appropriate input',
      });
   }
   
   const stockValidated = stockValidation(req.body);
   if (!stockValidated.success) {
     return res.status(400).json({
       success: false,
       error: stockValidated.error,
     });
   }
   try {
    const result = await inventoryHelper.makeStockEntry(req.body);
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