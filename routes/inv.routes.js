const express = require("express");
const { InvModel } = require("../models/invModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");

const invRouter = express.Router();
invRouter.use(authenticator);

invRouter.get("/", async (req, res) => {
    let token = req.headers.authorization
  jwt.verify(token, "secretkey", async (err, decode) => {
    try {
      let data = await InvModel.find({ user: decode.userId });
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

invRouter.post("/create", async (req, res) => {
  try {
    let inv = new InvModel(req.body);
    await inv.save();
    res.send({
      message: "Inventory Created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

invRouter.patch("/", async(req, res) =>{
    let {id} = req.headers
    try {
        await InvModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({
            message:"Inventory Updated",
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
