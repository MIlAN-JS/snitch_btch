import app from "./app.js";
import connectToDB from "./config/database.js";








connectToDB()
let port = 3000
app.listen(port, ()=>{
    console.log("server is running on port", + port)
})