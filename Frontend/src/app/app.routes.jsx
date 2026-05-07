import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../features/auth/ui/pages/Register";
import App from "./App";
import LoginPage from "../features/auth/ui/pages/Login.jsx";



const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
    

])

export default router