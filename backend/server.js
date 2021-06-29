//inisiasi library
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

//call file router
let spp = require("./router/spp");
let level = require("./router/level");
let kelas = require("./router/kelas");
let siswa = require("./router/siswa");
let petugas = require("./router/petugas");
let tagihan = require("./router/tagihan");
let pembayaran = require("./router/pembayaran");
let loginPetugas = require("./router/auth/validatePetugas");

app.use("/spp_ukk/data/spp", spp);
app.use("/spp_ukk/data/level", level);
app.use("/spp_ukk/data/kelas", kelas);
app.use("/spp_ukk/data/siswa", siswa);
app.use("/spp_ukk/data/petugas", petugas);
app.use("/spp_ukk/data/tagihan", tagihan);
app.use("/spp_ukk/data/pembayaran", pembayaran);
app.use("/spp_ukk/data/loginPetugas", loginPetugas);

app.use(express.static(__dirname));

// call image all
app.get("/image/siswa/:image_name", (req, res) => {
  res.sendFile(__dirname + "/image/siswa_img/" + req.params.image_name);
});
app.get("/image/petugas/:image_name", (req, res) => {
  res.sendFile(__dirname + "/image/petugas_img/" + req.params.image_name);
});
app.get("/image/pembayaran/:image_name", (req, res) => {
  res.sendFile(__dirname + "/image/pembayaran_img/" + req.params.image_name);
});

app.listen(8000, () => {
  console.log("server run on port 8000");
});
