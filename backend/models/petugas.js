"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    static associate(models) {
      // define association here

      // relation petugas -> pembayaran
      this.hasOne(models.pembayaran, {
        foreignKey: "id_pembayaran",
        as: "pembayaran",
      });

      // relation petugas -> level
      this.hasOne(models.level, {
        foreignKey: "id_level",
        as: "level",
      });
    }
  }
  petugas.init(
    {
      id_petugas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      nama_petugas: DataTypes.STRING,
      id_level: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "petugas",
      tableName: "petugas",
      timestamps: false,
    }
  );
  return petugas;
};
