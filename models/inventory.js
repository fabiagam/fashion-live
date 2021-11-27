/***************************************
 * Inventory Model
 * @file: models/Inventory.js
 * @author: James N. Abiagam
 ****************************************/
 "use  strict";

 const { Model } = require("sequelize");
 module.exports = (sequelize, Sequelize) => {
   const inventory = sequelize.define(
     "Inventory",
     {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
       },
       itemId: {
         type: Sequelize.INTEGER,
       },
       itemName: {
         type: Sequelize.STRING,
       },
       quantity: {
         type: Sequelize.INTEGER,
       },
     },
     {
       sequelize, // We pass the connection instance
       timestamps: true,
       createdAt: "date_created",
       updatedAt: "date_modified",
       tableName: "inventory",
     }
   );
 
   class Inventory extends Model {

    static async insert(entry) {
        const {
            itemId,
            itemName,
            quantity,
          } = entry;
        return await inventory.create({
          itemId,
          itemName,
          quantity,
        });
      }

      static async bulkInsert(entry) {
        return await inventory.bulkCreate(entry);
      }

        static async getByItemId(id) {
            return await inventory.findOne({ where: { itemId: id } });
        }

        static async updateByItemId( Id, update ) {
            await inventory.update(update, { where: { ItemId: Id } });
        }

        static async deductItem(Id, num ) {
            const row = await Inventory.getByItemId(Id);
            const update = {quantity: row.quantity - num};
            await inventory.update(update, { where: { ItemId: Id } });
        }

        static async remove(){
           await inventory.destroy({
             where: {},
             truncate: true
           });
        }

    }

    return Inventory;
};
