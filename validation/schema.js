/*************************************
 * Schema Validation
 * @file: validation/schema.js
 * @author: James Abiagam
 ************************************/
 "use  strict";

 const Joi = require("joi");
 const { isObject } = require('../utils/util');

const stockValidation = (reqBody) =>{
    
 if(isObject(reqBody)){
    let schema = Joi.object({
       itemId: Joi.number().integer().required(),
       itemName: Joi.string().required(),
       quantity: Joi.number().integer().required(),
    });
    const validation = schema.validate(reqBody); 
  if (validation.error) {
      return { success: false, error: validation.error.details[0].message};
  }
  }
  if(Array.isArray(reqBody)){
   
   schema = Joi.array().items({
              itemId: Joi.number().integer().required(),
               itemName: Joi.string().required(),
               quantity: Joi.number().integer().required(),
             });
  
   const validation = schema.validate(reqBody); 
  if (validation.error) {
      return { success: false, error: validation.error.details[0].message};
  }
  }
  return { success: true};

  };


  module.exports = {stockValidation};