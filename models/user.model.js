import mongoose from "mongoose"


// Schema 

const userSchema = new mongoose.Schema({

    fullName : {
        type : String, 
        required : true,
    }, 
    email : {
        type : String, 
        required : true,
        unique : true
    }, 
    contact : {
        type : Number,
        required : true,
        unique : true
    }, 
    password : {
        type : String,
        required : true, 
        select : false
    }, 
    role : {
        type : String , 
        enum : ["buyer", "seller"], 
        default : "buyer"
    }

}, {timestamps: true})


const userModel = mongoose.model("user", userSchema);

export default userModel