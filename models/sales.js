/***************************************
 * Sales Model
 * @file: models/sales.js
 * @author: James N. Abiagam
 ****************************************/
 "use  strict";

 const { Model } = require("sequelize");
 module.exports = (sequelize, Sequelize) => {
   const sale = sequelize.define(
     "Sale",
     {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
       },
       showId: {
         type: Sequelize.STRING,
       },
       itemName: {
        type: Sequelize.STRING,
      },
       itemId: {
        type: Sequelize.INTEGER,
      },
       soldItems: {
         type: Sequelize.INTEGER,
       },
     },
     {
       sequelize, // We pass the connection instance
       timestamps: true,
       createdAt: "date_sold",
       updatedAt: "date_modified",
       tableName: "sales",
     }
   );
 
   class Sale extends Model {

    static async insert(entry) {
        const {
            showId,
            itemId,
            itemName,
            soldItems,
          } = entry;
        return await sale.create({
            showId,
            itemId,
            itemName,
            soldItems,
        });
      }

        static async getByShow(id, showId) {
            return await sale.findOne({ where: { showId: showId , itemId : id} });
        }

        static async updateByshowId( Id, update ) {
            await sale.update(update, { where: { id: Id } });
        }

        static async getItemsByShowId(showId){
          return await sale.findAll({ where: { showId: showId } });
        }

        static async getAllSoldItems(showId, Id){
          return await sale.findAll({ where: { showId: showId , itemId : Id} });
        }

    }

    return Sale;
};
