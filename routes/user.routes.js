const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("allt he user");
});

userRouter.post("/register", async (req, res) => {
  const { company, name, email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err)
      return res.send({
        message: "somethign went wrong (password hash)",
        status: 0,
      });
    try {
      let user = new UserModel({ company ,name, email, password: hash });
      await user.save();
      res.send({
        message: "user created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn:"15m"
  }

  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id }, "secretkey", option);
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({
            message: "Somethign went wrong: " + err,
            status: 0,
          });
        if (result) {
          res.send({
            message: "User logged in successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = { userRouter };
