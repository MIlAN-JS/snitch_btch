import {Router} from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { getUserController, LoginController, registerController } from "../controllers/auth.controller.js";
import { checkUser } from "../middlewares/auth.middleware.js";


const authRouter = Router();


authRouter.post("/register",validateRegisterUser, registerController )
authRouter.post("/login",validateLoginUser ,LoginController)
authRouter.get("/get-user", checkUser, getUserController)



export default authRouter