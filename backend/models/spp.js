"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class spp extends Model {
    static associate(models) {
      // define association here

      // relation spp -> siswa
      this.hasMany(models.siswa, {
        foreignKey: "id_spp",
        as: "siswa",
      });
    }
  }
  spp.init(
    {
      id_spp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tahun: DataTypes.STRING,
      nominal: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "spp",
      tableName: "spp",
      // timestamps: false,
    }
  );
  return spp;
};
