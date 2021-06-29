"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tagihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relation tagihan -> spp
      this.belongsTo(models.spp, {
        foreignKey: "id_spp",
        as: "spp",
      });

      // relation tagihan -> pembayaran
      this.hasOne(models.pembayaran, {
        foreignKey: "id_pembayaran",
        as: "pembayaran",
      });
    }
  }
  tagihan.init(
    {
      id_tagihan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_spp: DataTypes.INTEGER,
      bulan: DataTypes.STRING,
      jumlah_spp: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tagihan",
      tableName: "tagihan",
      // timestamps: false,
    }
  );
  return tagihan;
};
