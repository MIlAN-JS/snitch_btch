import express from "express"
import authRouter from "./routes/auth.routes.js";

import cookieParser from "cookie-parser"
import passport from "./config/passport.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(passport.initialize())


app.use("/auth", authRouter)



export default app;