import mongoose from "mongoose"
import bcrypt from "bcryptjs"

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


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
   
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model("user", userSchema);


export default userModel