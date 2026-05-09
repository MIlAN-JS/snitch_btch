import ImageKit from "@imagekit/nodejs"
import client from "../config/imagekit.js"




const uploadFile = async({buffer , fileName ,  folder = "snitch"})=>{
    try {

       const result = await client.files.upload({
        file : await ImageKit.toFile(buffer), 
        fileName , 
        folder
        })

        return result

    } catch (error) {
        
        throw error
        
    }
}



export {
    uploadFile
}