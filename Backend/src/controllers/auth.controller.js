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


const LoginController = asyncHandler(async(req , res , next) => {
    
    const { email , password } = req.body
    console.log(email)

    const user = await userModel.findOne({email}).select("+password");

    console.log(user)

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password)
 console.log(isMatch)
    if(!isMatch){
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id)

    res.cookie("token" , token)

    res.status(200).json({
        message: "User logged in successfully",
        user,
    })

})

const getUserController = asyncHandler(async(req , res , next)=>{

    const userId = req.user

    // check if user exists

    const user = await userModel.findById(userId)

      // if user not found
      if (!user) {
         return res.status(401).json({
            message: "User not found"
         });
      }
    
      res.status(200).json({
         message: "User fetched successfully",
         user,
      })
      
})



export {registerController, LoginController , getUserController}