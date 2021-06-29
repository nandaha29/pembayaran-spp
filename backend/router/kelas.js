//inisiasi library
const express = require("express");
const app = express();

//calls models
const kelas = require("../models/index").kelas;

// //call auth
// const auth = require("./auth/auth");
// app.use(auth);

//konsep middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// endpoint akses data => GET
app.get("/", async (req, res) => {
  // let result = await kelas.findAll({include:[{ all: true, nested: true }]});
  let result = await kelas.findAll();
  res.json(result);
});

// endpoint simpan data => POST
app.post("/", async (req, res) => {
  let data = {
    nama_kelas: req.body.nama_kelas,
    kompetensi_keahlian: req.body.kompetensi_keahlian,
  };
  kelas
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
  let param = await { id_kelas: req.body.id_kelas };
  let data = await {
    nama_kelas: req.body.nama_kelas,
    kompetensi_keahlian: req.body.kompetensi_keahlian,
  };

  kelas
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
app.delete("/:id_kelas", async (req, res) => {
  let param = { id_kelas: req.params.id_kelas };
  kelas
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

module.exports = app;
