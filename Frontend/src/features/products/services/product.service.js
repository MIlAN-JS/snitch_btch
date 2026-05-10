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

const getAllProductService = async()=>{
    try {

        const response = await api.get("/get-all-products")
        console.log(response)
        return response.data
        
    } catch (error) {
        throw error
        
    }
}


const getProductService = async(id)=>{
    try {

        const response = await api.get(`/get-product/${id}`)
        console.log(response)
        console.log(response.data)
        return response.data
        
    } catch (error) {
        throw error
        
    }
}


const createVariantService = async({amount , currency , attributes , images , id})=>{

   try {

     const formData = new formData()

    formData.append("amount" , amount)
    formData.append("currency" , currency)
    formData.append("attributes" , JSON.stringify(attributes))
    formData.append("images" , images);


    const response =await api.post(`add-product-variant/:${id}`, formData)
    return response.data
    
   } catch (error) {

    throw error
    
   }
}
export {
    createProductService , 
    getSellerProductsService,
    getAllProductService,
    getProductService, 
    createVariantService
}