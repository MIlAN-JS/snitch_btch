import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    SellerProducts : [],
    allProducts : [], 
    product : null,
    loading : true, 
    error : null, 
}


const productSlice = createSlice({
    name : "product", 
    initialState, 
    reducers : {
        productStart : (state , action)=>{
            state.loading = true
            state.error = null
        }, 
        productSuccessSeller : (state , action)=>{
            state.loading = false
            state.SellerProducts.push(action.payload)
        }, 
        productSuccessAll : (state , action)=>{
            state.loading = false
            state.allProducts = action.payload
        }, 
        productSuccess : (state , action)=>{
            state.product = action.payload
            state.loading = false
        },
        productFailure : (state , action)=>{
            state.loading = false
            state.error = action.payload
        }, 
        clearError : (state , action)=>{
            state.error = null
        }

    }

})


export const {productStart , productSuccessSeller , productSuccessAll , productFailure , clearError, productSuccess}  = productSlice.actions
export default productSlice.reducer