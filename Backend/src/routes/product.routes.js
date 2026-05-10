import express from "express"
import multer from "multer"
import { createProductController, createProductVariantController, getAllProductsController, getProductController, getSellerProductController } from "../controllers/product.controller.js"
import { checkSeller, checkUser } from "../middlewares/auth.middleware.js"

const productRouter = express.Router()

const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024 // 5mb
    }
})


    productRouter.post("/create", checkSeller ,  upload.array("images" , 7), createProductController )
    
    productRouter.get("/get-seller-products", checkSeller, getSellerProductController  )
    productRouter.get("/get-all-products", getAllProductsController  )
    productRouter.get("/get-product/:id", checkUser, getProductController  )

    productRouter.post("/add-product-variant/:productId",checkSeller, upload.array("images" , 7), createProductVariantController )


export default productRouter