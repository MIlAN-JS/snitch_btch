import { uploadFile } from "../services/fileUpload.services.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import productModel from "../models/product.model.js"





const createProductController = asyncHandler(async (req, res) => {
        const {title , description  , amount ,  currency} = req.body
        const userId = req.user
        console.log(userId)
        

       const images = await  Promise.all(req.files.map(async(file)=>{
            return await uploadFile({
                buffer : file.buffer,
                fileName : file.originalname
            })
       }))

       const newProduct = await productModel.create({
        title , 
        description , 
        price : {
          amount : amount,
          currency : currency || "krw"
        }, 
        images , 
        seller : userId
       })

       res.status(201).json({
        newProduct , 
        message : "success creating product"


       })

    })




export {
    createProductController
}