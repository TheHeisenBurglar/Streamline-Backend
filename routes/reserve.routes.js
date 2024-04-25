const express = require("express");
const { ReserveModel } = require("../models/reserveModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");

const reserveRouter = express.Router();
reserveRouter.use(authenticator);

reserveRouter.get("/", async (req, res) => {
    let token = req.headers.authorization
  jwt.verify(token, "secretkey", async (err, decode) => {
    try {
      let data = await ReserveModel.find({ user: decode.userId });
      res.send({
        data:data,
        message:"Success",
        status:1
      })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
          })
    }
  });

});

reserveRouter.post("/create", async (req, res) => {
  try {
    let reserve = new ReserveModel(req.body);
    await reserve.save();
    res.send({
      message: "Reserve Created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

reserveRouter.patch("/", async(req, res) =>{
    let {id} = req.headers
    try {
        await ReserveModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({
            message:"Reserve Updated",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})

invRouter.delete("/", async(req, res) =>{
    let {id} = req.headers
    try {
        await InvModel.findByIdAndDelete({_id:id})
        res.send({
            message:"Inventory Deleted",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})

module.exports = { invRouter };
