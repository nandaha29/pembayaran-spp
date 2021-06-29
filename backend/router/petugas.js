//inisiasi library
const express = require("express");
const app = express();
const md5 = require("md5");

//calls models level
const petugas = require("../models/index").petugas;

// //call auth
// const auth = require("./auth/auth");
// app.use(auth);

//call validate
const loginPetugas = require("./auth/validatePetugas");
app.use(loginPetugas);

//inisiasi library upload
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//konsep middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting storage image
const storage = multer.diskStorage({
  destination: (req, file, cal) => {
    cal(null, "./image/petugas_img");
  },
  filename: (req, file, cal) => {
    cal(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

// endpoint akses data => GET
app.get("/", async (req, res) => {
  // let result = await petugas.findAll({ all: true, nested: true });
  let result = await petugas.findAll({
    include: ["level"],
  });
  res.json(result);
});

// endpoint simpan data => POST
app.post("/", upload.single("image"), async (req, res) => {
  let data;
  if (!req.file) {
    res.json({
      message: "No upload file",
    });
  } else {
    data = {
      username: req.body.username,
      password: md5(req.body.password),
      nama_petugas: req.body.nama_petugas,
      id_level: req.body.id_level,
      image: req.file.filename,
    };
  }

  petugas
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
        result: data,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

// end-point update data => PUT
app.put("/", upload.single("image"), async (req, res) => {
  let param = await { id_petugas: req.body.id_petugas };
  let data = await {
    username: req.body.username,
    password: md5(req.body.password),
    nama_petugas: req.body.nama_petugas,
    id_level: req.body.id_level,
    image: req.file.filename,
  };
  if (req.file) {
    petugas
      .findOne({ where: param })
      .then((result) => {
        let oldImageName = result.image;

        let dir = path.join(__dirname, "./image/petugas_img", oldImageName);
        fs.unlink(dir, (err) => console.log(err));
      })
      .catch((error) => {
        console.log(error.message);
      });
    data.image = req.file.filename;
  }

  petugas
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
app.delete("/:id_petugas", async (req, res) => {
  let param = { id_petugas: req.params.id_petugas };
  let result = await petugas.findOne({ where: param });
  let oldImageName = result.image;

  let dir = path.join(__dirname, "./image/petugas_img", oldImageName);
  fs.unlink(dir, (err) => console.log(err));

  petugas
    .destroy({ where: param })
    .then((result) => {
      res.json({
        message: "data has been destroyed",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

module.exports = app;
