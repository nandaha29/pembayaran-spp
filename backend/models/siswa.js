"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    static associate(models) {
      // define association here

      // relation siswa -> spp
      this.belongsTo(models.spp, {
        foreignKey: "id_spp",
        as: "spp",
      });

      // relation siswa -> kelas
      this.belongsTo(models.kelas, {
        foreignKey: "id_kelas",
        as: "kelas",
      });
    }
  }
  siswa.init(
    {
      nisn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nis: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      id_kelas: DataTypes.INTEGER,
      alamat: DataTypes.STRING,
      no_telp: DataTypes.INTEGER,
      id_spp: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "siswa",
      tableName: "siswa",
      timestamps: false,
    }
  );
  return siswa;
};
