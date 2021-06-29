//server  ( authentication token <verifikasi token>)

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Node123";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//calls models level
const siswa = require("../../models/index").siswa;

app.post("/auth", async (req, res) => {
  let params = {
    nis: req.body.nis,
    nama: req.body.nama,
  };

  let result = await siswa.findOne({ where: params });
  if (result) {
    let payload = JSON.stringify(result);
    // generate token
    let token = jwt.sign(payload, SECRET_KEY);
    res.json({
      logged: true,
      data: result,
      token: token,
    });
  } else {
    res.json({
      logged: false,
      message: "Invalid nis or nama",
    });
  }
});

module.exports = app;
