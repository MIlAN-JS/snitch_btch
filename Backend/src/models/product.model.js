import mongoose from "mongoose"



const productSchema = new mongoose.Schema({

    title : {
        type : String, 
        required : true
    }, 
    description : {
        type : String, 
        required : true
    }, 
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    price : {
       amount : {
        type : String, 
        required : true
       },
       currency : {
        type : String, 
        enum: ["INR", "USD", "EUR", "krw"],
        default : "KRW"
       }
    }, 
    images : [
        {
            url : {
                type : String,
            },
            alt : {
                type : String,
                default : "product image"
            }

        }
    ]

},{timestamps : true})


const productModel = mongoose.model("product", productSchema)
export default productModel