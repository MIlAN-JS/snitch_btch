import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/auth",
    withCredentials: true
})


 const registerUserService = async(data) => {
    
    try {

        const response = await api.post("/register", data )
        return response.data
    } catch (error) {

        throw error
        
    }
}

const loginUserService = async(data)=>{

    try {

        const response = await api.post("/login",data)
        return response.data
        
    } catch (error) {
        throw error
        
    }

}




export {registerUserService , loginUserService}