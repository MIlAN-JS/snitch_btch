import mongoose, { mongo }  from "mongoose";


    const priceSchema = new mongoose.Schema({

                    amount : {
                        type : Number, 
                        default : 0,
                        required : true
                    },
                    currency : {
                        type : String, 
                        enum: ["INR", "USD", "EUR", "KRW"],
                        default : "KRW"
                    } 

                
            

    },{
        _id : false,
        _v : false
    } )


    export default priceSchema