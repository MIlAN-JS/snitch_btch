
import { createProductService, getSellerProductsService } from "../services/product.service.js"
import {useDispatch} from "react-redux"
import { productFailure, productStart, productSuccess,clearError } from "../state/product.slice.js"

const useProduct = () => {
    const dispatch = useDispatch()

    const createProductHandler = async(productData)=>{

        
        
      
        try {
            
            dispatch(productStart())
            const response = await createProductService(productData)
            dispatch(productSuccess(response.newProduct))
            dispatch(clearError())

            
        } catch (error) {
            dispatch(productFailure(error.message))
            throw error   
        }
    }


    const getProductHandler = async()=>{
        try {
            dispatch(productStart())
            const response = await getSellerProductsService()
            dispatch(productSuccess(response.products))
            dispatch(clearError())
         
        } catch (error) {
            dispatch(productFailure(error.message))
            throw error
        }
    }



    return {
        createProductHandler,
        getProductHandler
    }
    

}



export default useProduct