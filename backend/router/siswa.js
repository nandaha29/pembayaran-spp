//inisiasi library
const express = require("express");
const app = express();

//calls models
const siswa = require("../models/index").siswa;

// //call auth
// const auth = require("./auth/auth");
// app.use(auth);

//inisiasi library upload
const multer = require("multer"); //multer digunakan untuk membaca data request dari form-data
const path = require("path"); //path untuk menage alamat direktori file
const fs = require("fs"); // fs atau fole stream digunakan untuk manage file

//konsep middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting storage image
const storage = multer.diskStorage({
  destination: (req, file, cal) => {
    cal(null, "./image/siswa_img");
  },
  filename: (req, file, cal) => {
    cal(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

// endpoint akses data => GET
app.get("/", async (req, res) => {
  let result = await siswa.findAll({ include: [{ all: true, nested: true }] });
  // let result = await siswa.findAll();
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
      nis: req.body.nis,
      nama: req.body.nama,
      id_kelas: req.body.id_kelas,
      alamat: req.body.alamat,
      no_telp: req.body.no_telp,
      id_spp: req.body.id_spp,
      image: req.file.filename,
    };
  }

  siswa
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
  let param = await { nisn: req.body.nisn };
  let data = await {
    nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    id_spp: req.body.id_spp,
    image: req.file.filename,
  };
  if (req.file) {
    siswa
      .findOne({ where: param })
      .then((result) => {
        let oldImageName = result.image;

        let dir = path.join(__dirname, "./image/siswa_img", oldImageName);
        fs.unlink(dir, (err) => console.log(err));
      })
      .catch((error) => {
        console.log(error.message);
      });
    data.image = req.file.filename;
  }

  siswa
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
app.delete("/:nisn", async (req, res) => {
  let param = { nisn: req.params.nisn };
  let result = await siswa.findOne({ where: param });
  let oldImageName = result.image;

  let dir = path.join(__dirname, "./image/siswa_img", oldImageName);
  fs.unlink(dir, (err) => console.log(err));

  siswa
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

/* 
- FindAll() -> object promise
- fungsi create() -> menambahkan data
- .then() -> jika berhasil, .catch() -> jika gagal
-  fungsi update() -> mengubah data
-  'params' pd endpoint delete -> sudah pakem gabisa diganti
- fungsi destroy() -> menghancurkan / menghapus
- konsep object -> spy yg di destroy sudah dalam bentuk data object
*/
