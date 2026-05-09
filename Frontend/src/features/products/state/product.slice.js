import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    SellerProducts : [], 
    loading : false, 
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
        productSuccess : (state , action)=>{
            state.loading = false
            state.SellerProducts.push(action.payload)
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


export const {productStart , productSuccess , productFailure , clearError} = productSlice.actions
export default productSlice.reducer