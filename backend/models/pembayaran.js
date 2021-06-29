"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation payment -> petugas
      this.hasMany(models.petugas, {
        foreignKey: "id_petugas",
        as: "petugas",
      });
      // relation payment -> tagihan
      this.hasMany(models.tagihan, {
        foreignKey: "id_tagihan",
        as: "tagihan",
      });
    }
  }
  pembayaran.init(
    {
      id_pembayaran: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_petugas: DataTypes.INTEGER,
      tgl_bayar: DataTypes.DATE,
      bulan_bayar: DataTypes.STRING,
      id_tagihan: DataTypes.INTEGER,
      jumlah_bayar: DataTypes.DOUBLE,
      image: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "pembayaran",
      tableName: "pembayaran",
    }
  );
  return pembayaran;
};
