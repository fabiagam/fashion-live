/*************************************
 * Utils
 * @file: utils/utils.js
 * @author: James Abiagam
 ************************************/
 "use  strict";


const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

module.exports = { isObject };