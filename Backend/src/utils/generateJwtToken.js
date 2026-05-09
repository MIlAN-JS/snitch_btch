
import jwt from "jsonwebtoken"
import config from "../config/config.js"

const createToken = ({userId , role}) =>{
    
        const token = jwt.sign({id :userId , role : role} , config.JWT_SECRET, {expiresIn : "1d"})
        return token
    
}



export {
    createToken
}