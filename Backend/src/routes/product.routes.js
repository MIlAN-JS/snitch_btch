import express from "express"
import multer from "multer"
import { createProductController } from "../controllers/product.controller.js"
import { checkSeller } from "../middlewares/auth.middleware.js"

const productRouter = express.Router()

const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024 // 5mb
    }
})


    productRouter.post("/create", checkSeller ,  upload.array("images" , 7), createProductController )





export default productRouter