const express = require("express");
const { InvModel } = require("../models/invModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { UserModel } = require("../models/userModel");

const invRouter = express.Router();
invRouter.use(authenticator);

invRouter.get("/", async (req, res) => {
    let token = req.headers.authorization
  jwt.verify(token, "secretkey", async (err, decode) => {
    try {
      let user = await UserModel.findOne({ user:decode.user});
      let companyName = user ? user.company : null;
      let data = await InvModel.find({company: companyName});
      
      
      res.send({
        data:data,
        message:"Success",
        companyName: companyName,
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
  let token = req.headers.authorization
  jwt.verify(token, "secretkey", async (err, decode) => {
  try {
    let user = await UserModel.findOne({ user:decode.user});
    let companyName = user ? user.company : null;
    let inv = new InvModel(req.body);
    inv.company = companyName;
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
  })
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
