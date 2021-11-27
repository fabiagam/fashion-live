/***********************************************
 * @name:  Database Configuration
 * @author: James Ndidi Abiagam
 * @file: db/index.js
 ***********************************************/
 "use strict";
 const path = require("path");
 require("dotenv").config({ path: path.join(__dirname, "../.env") });
 const Sequelize = require("sequelize");
 const config = require('../db/config');
 
 const databaseFile = process.env.NODE_ENV == 'development' ? config.dev : config.test;
 const sequelize = new Sequelize('admin', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: `../db/${databaseFile}`
});

console.info(`Running on Database file - ${databaseFile}`);
 
 const db = {};
 
 db.Sequelize = Sequelize;
 db.sequelize = sequelize;
 
 db.Inventory = require("./inventory")(sequelize, Sequelize);
 db.Sale = require("./sales")(sequelize, Sequelize);

 module.exports = db;
 