import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {}, 
    loading: true, 
    error: null, 
    isAuthenticated: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        // auth Start

        authStart : (state , action)=>{
            state.loading = true
            state.error = null
        },

        //auth success 

        authSuccess : (state , action)=>{
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
        },

        // auth failure

        authFailure : (state , action)=>{
            state.loading = false
            state.error = action.payload
        },

        //clear error

        clearError : (state , action)=>{
            state.error = null
        }

    }
})


export const {authStart , authSuccess , authFailure , clearError} = authSlice.actions
export default authSlice.reducer