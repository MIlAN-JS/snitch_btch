import productModel from "../models/product.model.js";



const getSellerProductsService = async(seller)=>{

    if(!seller){
        throw new Error("seller id is missing")
        return  
    }

    const products = await productModel.find({seller : seller});

    return products;

}

export {getSellerProductsService}