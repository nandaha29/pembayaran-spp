"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    static associate(models) {
      // define association here

      // relation level -> petugas
      this.hasOne(models.petugas, {
        foreignKey: "id_petugas",
        as: "petugas",
      });
    }
  }
  level.init(
    {
      id_level: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nama_level: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "level",
      tableName: "level",
      timestamps: false,
    }
  );
  return level;
};
