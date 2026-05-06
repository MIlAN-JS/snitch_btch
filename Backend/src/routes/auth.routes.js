import {Router} from "express";
import { validateRegisterUser } from "../validators/auth.validator";
import { registerController } from "../controllers/auth.controller";


const authRouter = Router();


authRouter.post("/register",validateRegisterUser, registerController )





export default authRouter