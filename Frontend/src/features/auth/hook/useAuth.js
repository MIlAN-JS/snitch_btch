
import { useDispatch } from "react-redux";
import { authFailure, authStart, authSuccess } from "../state/auth.slice.js";
import { registerUserService } from "../services/auth.services.js";


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


    return {
        registerHandler
    }

}


export default useAuth;