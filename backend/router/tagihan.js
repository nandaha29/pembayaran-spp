//inisiasi library
const express = require("express");
const app = express();

//calls models
const tagihan = require("../models/index").tagihan;
const spp = require("../models/index").spp;

// //call auth
// const auth = require("./auth/auth");
// app.use(auth);

//konsep middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// endpoint akses data => GET
app.get("/", async (req, res) => {
  let result = await tagihan.findAll({
    include: [{ all: true, nested: true }],
    // include: ["spp"],
  });
  // let result = await tagihan.findAll();
  res.json(result);
});

// endpoint simpan data => POST
app.post("/", async (req, res) => {
  let param = { id_spp: req.body.id_spp };
  let dataSpp = await spp.findOne({ where: param });

  //penjumlahan jumlah_spp
  let totalTagihan = Number(dataSpp.nominal);

  let data = {
    id_spp: req.body.id_spp,
    bulan: req.body.bulan,
    jumlah_spp: totalTagihan,
    status: req.body.status,
  };
  tagihan
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
        data: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

// end-point update data => PUT
app.put("/", async (req, res) => {
  let param = await { id_tagihan: req.body.id_tagihan };
  let data = await {
    id_spp: req.body.id_spp,
    bulan: req.body.bulan,
    jumlah_spp: req.body.jumlah_spp,
    status: req.body.status,
  };

  tagihan
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

// end-point hapus data => DELETE
app.delete("/:id_tagihan", async (req, res) => {
  let param = { id_tagihan: req.params.id_tagihan };
  tagihan
    .destroy({ where: param })
    .then((result) => {
      res.json({
        message: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

/** ujicoba perhitungan
 * app.post("/saturnus", async (req, res) => {
  let param = { id_spp: req.body.id_spp };
  let dataSpp = await spp.findOne({ where: param });

  let totalTagihan = Number(dataSpp.nominal);
  //respon yg dikeluarkan
  let response = {
    id_spp: dataSpp,
    bulan: req.body.bulan,
    jumlah_spp: totalTagihan,
  };
  res.json(response);
});
 */
module.exports = app;
