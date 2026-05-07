
import { useDispatch } from "react-redux";
import { authFailure, authStart, authSuccess, clearError } from "../state/auth.slice.js";
import { registerUserService, loginUserService, getUserService } from "../services/auth.services.js";


const useAuth = ()=>{

    const dispatch = useDispatch()

  const registerHandler = async({fullName , email , contact , password,isSeller}) => {
        try {

        dispatch(authStart())

        const response = await registerUserService({fullName , email , contact , password,isSeller})

        dispatch(authSuccess(response.user))
            
        } catch (error) {
            dispatch(authFailure(error.message))
            throw error

        }
    }
  const loginHandler = async({email, password}) => {
        try {

        dispatch(authStart())

        const response = await loginUserService({email , password})

        dispatch(authSuccess(response.user))
        dispatch(clearError())
            
        } catch (error) {
            dispatch(authFailure(error.message))
            throw error

        }
    
    }
  const getUserHandler = async() => {
        try {

        dispatch(authStart())

        const response = await getUserService()

        dispatch(authSuccess(response.user))
        dispatch(clearError())
            
        } catch (error) {
            dispatch(authFailure(error.message))
            throw error

        }
    }

    


    return {
        registerHandler,
        loginHandler,
        getUserHandler
    }


}


export default useAuth;