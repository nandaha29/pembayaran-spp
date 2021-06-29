//inisiasi library
const express = require("express");
const app = express();

//calls models
const pembayaran = require("../models/index").pembayaran;
const tagihan = require("../models/index").tagihan;
const petugas = require("../models/index").petugas;

//inisiasi library upload
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// //call auth
// const auth = require("./auth/auth");
// app.use(auth);

// isi tanggal secara otomatis
let tanggal = new Date();
// const moment = require("moment");

//konsep middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting storage image
const storage = multer.diskStorage({
  destination: (req, file, cal) => {
    cal(null, "./image/pembayaran_img");
  },
  filename: (req, file, cal) => {
    cal(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

// endpoint akses data => GET
app.get("/", async (req, res) => {
  let result = await pembayaran.findAll({
    include: [{ all: true, nested: true }],
    // include: [
    //   "petugas",
    //   "tagihan",
    // {
    //   model: models.tagihan,
    //   as: "tagihan",
    //   include: ["spp"],
    // },
    // ],
  });
  // let result = await pembayaran.findAll();
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
    //call id table
    let param = { id_tagihan: req.body.id_tagihan };
    let dataTagihan = await tagihan.findOne({ where: param });

    //proses hitung
    let total_bulan = Number(req.body.bulan_bayar) - Number(dataTagihan.bulan);
    let total_bayar = total_bulan * Number(dataTagihan.jumlah_spp);

    data = {
      id_petugas: req.body.id_petugas,
      tgl_bayar: tanggal,
      bulan_bayar: req.body.bulan_bayar,
      id_tagihan: req.body.id_tagihan,
      jumlah_bayar: total_bayar,
      image: req.file.filename,
      status: req.body.status,
    };
  }

  //proses perubahan status tagihan
  let idTagihan = { id_tagihan: data.id_tagihan };
  let status = { status: 1 };
  tagihan.update(status, { where: idTagihan });

  pembayaran
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
app.put("/", upload.single("image"), async (req, res) => {
  let param = await { id_pembayaran: req.body.id_pembayaran };
  let data = await {
    id_petugas: req.body.id_petugas,
    tgl_bayar: tanggal,
    bulan_bayar: req.body.bulan_bayar,
    id_tagihan: req.body.id_tagihan,
    jumlah_bayar: req.body.jumlah_bayar,
    image: req.file.filename,
    status: req.body.status,
  };
  if (req.file) {
    pembayaran
      .findOne({ where: param })
      .then((result) => {
        let oldImageName = result.image;

        let dir = path.join(__dirname, "./image/pembayaran_img", oldImageName);
        fs.unlink(dir, (err) => console.log(err));
      })
      .catch((error) => {
        console.log(error.message);
      });
    data.image = req.file.filename;
  }

  pembayaran
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
app.delete("/:id_pembayaran", async (req, res) => {
  let param = { id_pembayaran: req.params.id_pembayaran };
  let result = await pembayaran.findOne({ where: param });
  let oldImageName = result.image;

  let dir = path.join(__dirname, "./image/pembayaran_img", oldImageName);
  fs.unlink(dir, (err) => console.log(err));

  pembayaran
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

/** ujicoba perhitungan
  *app.post("/venus", async (req, res) => {
  //manggil id tabel
  let param = { id_tagihan: req.body.id_tagihan };
  let dataTagihan = await tagihan.findOne({ where: param });
  let total_bulan = Number(req.body.bulan_bayar) - Number(dataTagihan.bulan);
  let total_bayar = total_bulan * Number(dataTagihan.jumlah_spp);

  //respon yg dikeluarkan
  let response = {
    id_tagihan: dataTagihan,
    bulan_bayar: req.body.bulan_bayar,
    jumlah_bayar: total_bayar,
  };
  res.json(response);
});
  */

module.exports = app;
