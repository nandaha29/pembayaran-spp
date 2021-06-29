//inisiasi library
const express = require("express");
const app = express();

//calls models
const level = require("../models/index").level;

// //call auth
// const auth = require("./auth/auth");
// app.use(auth);

//konsep middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// endpoint akses data => GET
app.get("/", async (req, res) => {
  // let result = await level.findAll({ include: [{ all: true, nested: true }] });
  let result = await level.findAll();
  res.json(result);
});

// endpoint simpan data => POST
app.post("/", async (req, res) => {
  let data = {
    nama_level: req.body.nama_level,
  };
  level
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
  let param = await { id_level: req.body.id_level };
  let data = await {
    nama_level: req.body.nama_level,
  };

  level
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
app.delete("/:id_level", async (req, res) => {
  let param = { id_level: req.params.id_level };
  level
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
