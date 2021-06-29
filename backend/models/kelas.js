"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kelas extends Model {
    static associate(models) {
      // define association here

      // relation kelas -> siswa
      this.hasMany(models.siswa, {
        foreignKey: "nisn",
        as: "siswa",
      });
    }
  }
  kelas.init(
    {
      id_kelas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nama_kelas: DataTypes.STRING,
      kompetensi_keahlian: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "kelas",
      tableName: "kelas",
    }
  );
  return kelas;
};
