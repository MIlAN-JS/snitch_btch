import mongoose from "mongoose"
import config from "./config.js"


const connectToDB = async()=>{
    try{

        const connectionInstance = await mongoose.connect(config.MONGO_URI);
        console.log("connection with db success")

    }catch(error){

        console.log("err in db connection " , error)

    }
}

export default connectToDB