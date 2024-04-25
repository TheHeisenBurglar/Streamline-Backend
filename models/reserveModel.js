const mongoose = require("mongoose")

const reserveSchema = mongoose.Schema({
    username:{type:String, required:true},
    invitem:{type:String, required:true},
    company:{type:String, required:true},
    amount: {type:String, required:true},
    ordernum: {type:String, required:true},
    status: {type:String, required:true},
},{
    versionKey:false
});

const ReserveModel = mongoose.model("reserve", reserveSchema);

module.exports = {
    ReserveModel,
};