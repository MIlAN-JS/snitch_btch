import express from "express"
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}))
app.use(cookieParser())



app.use("/auth", authRouter)



export default app;