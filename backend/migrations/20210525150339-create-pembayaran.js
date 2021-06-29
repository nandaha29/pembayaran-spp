"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pembayaran", {
      id_pembayaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        references: {
          model: "petugas",
          key: "id_petugas",
        },
      },
      tgl_bayar: {
        type: Sequelize.DATE,
      },
      bulan_bayar: {
        type: Sequelize.STRING,
      },
      id_tagihan: {
        type: Sequelize.INTEGER,
        references: {
          model: "tagihan",
          key: "id_tagihan",
        },
      },
      jumlah_bayar: {
        type: Sequelize.DOUBLE,
      },
      image: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pembayaran");
  },
};
