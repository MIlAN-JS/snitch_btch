import {Router} from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { LoginController, registerController } from "../controllers/auth.controller.js";


const authRouter = Router();


authRouter.post("/register",validateRegisterUser, registerController )
authRouter.post("/login",validateLoginUser ,LoginController)




export default authRouter