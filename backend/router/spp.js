//inisiasi library
const express = require("express");
const app = express();

//calls models
const spp = require("../models/index").spp;

// //call auth
// const auth = require("./auth/auth");
// app.use(auth);

//konsep middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// endpoint akses data => GET
app.get("/", async (req, res) => {
  // let result = await spp.findAll({ include: [{ all: true, nested: true }] });
  let result = await spp.findAll();
  res.json(result);
});

// endpoint simpan data => POST
app.post("/", async (req, res) => {
  let data = {
    tahun: req.body.tahun,
    nominal: req.body.nominal,
  };
  spp
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
  let param = await { id_spp: req.body.id_spp };
  let data = await {
    tahun: req.body.tahun,
    nominal: req.body.nominal,
  };

  spp
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
app.delete("/:id_spp", async (req, res) => {
  let param = { id_spp: req.params.id_spp };
  spp
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
