import axios from "axios"


const api = axios.create({
    baseURL : "http://localhost:3000/api/product",
    withCredentials : true
})


const createProductService = async(productData)=>{
    try {
        const response = await api.post("/create" , productData)
        return response.data
        
    } catch (error) {

        throw error
        
    }
}


const getSellerProduct = async()=>{

    try {


    const response = await api.get("/get-seller-products")
    return response.data

        
    } catch (error) {

        throw error
        
    }

}


export {
    createProductService , 
    getSellerProduct
}