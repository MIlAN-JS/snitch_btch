import { asyncHandler } from "../utils/asyncHandler.js";
import userModel from "../models/user.model.js";
import { createToken } from "../utils/generateJwtToken.js";


const registerController = asyncHandler(async(req , res , next) => {
    
    try {

    const { fullName , email , contact , password, isSeller } = req.body
    
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })



        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }
        let role = "buyer";
        isSeller ? role = "seller" : role = "buyer"
        
        const user = await userModel.create({
            email,
            contact,
            password,
            fullName,
            role
        })

        //create token and send response

        const token = createToken(user._id)

        res.cookie("token" , token)

        res.status(201).json({
            message: "User registered successfully",
            user,

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }


    



})



export {registerController}