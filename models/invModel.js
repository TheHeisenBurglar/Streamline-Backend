const mongoose = require("mongoose")

const invSchema = mongoose.Schema({
    name:{type:String, required:true},
    company:{type:String, required:true},
    voh: {type:String, required:false},
    dim: {type:String, required:true},
    quantity: {type:String, required:true},
    tag: {type:String, required:true},
    cost: {type:String, required:false},
},{
    versionKey:false
});

const InvModel = mongoose.model("inv", invSchema);

module.exports = {
    InvModel,
};
