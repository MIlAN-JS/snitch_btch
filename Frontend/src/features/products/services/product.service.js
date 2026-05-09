import axios from "axios"


const api = axios.create({
    baseURL : "/api/product",
    withCredentials : true
})



const createProductService = async(productData)=>{
    try {

const formData = new FormData()
        formData.append("title" , productData.title)
        formData.append("description" , productData.description)
        formData.append("amount" , productData.amount)
        formData.append("currency" , productData.currency)
        productData.images.forEach((img)=>{
            formData.append("images", img)
          })
        const response = await api.post("/create" , formData)
        console.log(response)
        return response.data
        
    } catch (error) {

        throw error
        
    }
}


const getSellerProductsService = async()=>{

    try {


    const response = await api.get("/get-seller-products")
    return response.data

        
    } catch (error) {

        throw error
        
    }

}


export {
    createProductService , 
    getSellerProductsService
}