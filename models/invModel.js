const mongoose = require("mongoose")

const invSchema = mongoose.Schema({
    name:{type:String, required:true},
    company:{type:String, required:true},
    voh: {type:String, required:true},
    dim: {type:String, required:true},
    tag: {type:String, required:true},
    cost: {type:String, required:true},
},{
    versionKey:false
});

const InvModel = mongoose.model("inv", invSchema);

module.exports = {
    InvModel,
};