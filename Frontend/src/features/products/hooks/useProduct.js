
import { createProductService, getAllProductService, getSellerProductsService , getProductService, createVariantService } from "../services/product.service.js"
import {useDispatch} from "react-redux"
import { productFailure, productStart, productSuccessSeller,clearError, productSuccessAll , productSuccess} from "../state/product.slice.js"

const useProduct = () => {
    const dispatch = useDispatch()

    const createProductHandler = async(productData)=>{

        
        
      
        try {
            
            dispatch(productStart())
            const response = await createProductService(productData)
            dispatch(productSuccessSeller(response.newProduct))
            dispatch(clearError())

            
        } catch (error) {
            dispatch(productFailure(error.message))
            throw error   
        }
    }


    const getProductHandlerSeller = async()=>{
        try {
            dispatch(productStart())
            const response = await getSellerProductsService()
            dispatch(productSuccessSeller(response.products))
            dispatch(clearError())
         
        } catch (error) {
            dispatch(productFailure(error.message))
            throw error
        }
    }

    const   getAllProductHandler = async()=>{
        try {
            dispatch(productStart())
            const response = await getAllProductService()
            dispatch(productSuccessAll(response.products))
            console.log(response.products)
            return 
            dispatch(clearError())
         
        } catch (error) {
            dispatch(productFailure(error.message))
            throw error
        }
    }


    const getProductHandler = async(id)=>{
        try {
            dispatch(productStart())
            const response = await getProductService(id)
            dispatch(productSuccess(response.product))
            dispatch(clearError())
            return response.product
         
        } catch (error) {
            dispatch(productFailure(error.message))
            throw error
        }
    }

    const createVariantHandler = async({amount , currency , attributes , images , id})=>{

        try {
            dispatch(productStart())
            const response = await createVariantService({amount , currency , attributes , images , id})
            dispatch(productSuccessSeller(response.variant))
            dispatch(clearError())
            return response.product
         
        } catch (error) {
            dispatch(productFailure(error.message))
            throw error
        }
    }
    



    return {
        createProductHandler,
        getProductHandlerSeller , 
        getAllProductHandler,
        getProductHandler
    }
    

}



export default useProduct