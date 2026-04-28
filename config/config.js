import dotenv from "dotenv"

dotenv.config()


if(!process.env.MONGO_URI){
 throw new Error("mongo uri is missing")
}



const config = {

    MONGO_URI : String(process.env.MONGO_URI)

}

export default config
