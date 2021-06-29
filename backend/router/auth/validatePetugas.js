//server  ( authentication token <verifikasi token>)

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const SECRET_KEY = "Node123";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//calls models level
const petugas = require("../../models/index").petugas;

app.post("/login", async (req, res) => {
  let params = {
    username: req.body.username,
    password: md5(req.body.password),
  };

  let result = await petugas.findOne({ where: params });
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
      message: "Invalid username or password",
    });
  }
});

module.exports = app;
