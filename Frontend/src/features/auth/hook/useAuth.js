
import useDispatch from "@reduxjs/toolkit"


const useAuth = ()=>{

    const dispatch = useDispatch()

    registerHandler = async({}) => {
        try {

        dispatch(authStart())

        const response = await registerUserService({})

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