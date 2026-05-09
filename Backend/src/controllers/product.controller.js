import { uploadFile } from "../services/fileUpload.services.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import productModel from "../models/product.model.js"
import { getSellerProductsService } from "../services/product.services.js"





const createProductController = asyncHandler(async (req, res) => {
        const {title , description  , amount ,  currency } = req.body
        const userId = req.user
        console.log(userId)
        console.log(req.files)

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


const getProductController = asyncHandler(async(req,res)=>{
    const seller = req.user

    const products = await getSellerProductsService(seller)

    res.status(200).json({
        products,
        message : "success getting products"
    })
})

 const getAllProductsController = asyncHandler(async(req,res)=>{
    const products = await productModel.find()

    res.status(200).json({

        products,
        message : "success getting products"
        
    })
})



export {
    createProductController, 
    getProductController, 
    getAllProductsController
}