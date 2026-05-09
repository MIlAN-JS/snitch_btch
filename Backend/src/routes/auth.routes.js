import {Router} from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { getUserController, googleCallbackController, LoginController, registerController } from "../controllers/auth.controller.js";
import { checkUser } from "../middlewares/auth.middleware.js";
import passport from "passport";

const authRouter = Router();


authRouter.post("/register",validateRegisterUser, registerController )
authRouter.post("/login",validateLoginUser ,LoginController)
authRouter.get("/get-user", checkUser, getUserController)

  authRouter.get("/google",passport.authenticate("google", {
      scope: ["profile", "email"],
      session : false
    }))

authRouter.get("/google/callback" , passport.authenticate("google",
     {
    failureRedirect: "/login",
    session : false
  }),googleCallbackController)


export default authRouter