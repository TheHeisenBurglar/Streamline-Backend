const mongoose = require("mongoose")

const invSchema = mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    user:{type:String, required:true}
},{
    versionKey:false
});

const InvModel = mongoose.model("inv", invSchema);

module.exports = {
    InvModel,
};