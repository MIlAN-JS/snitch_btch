import { asyncHandler } from "../utils/asyncHandler";



const registerController = asyncHandler(async(req , res , next) => {
    
    try {

    const { fullName , email , contact , password, role } = req.body
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname
        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }


    



})



export {registerController}