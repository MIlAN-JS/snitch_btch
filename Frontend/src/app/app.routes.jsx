import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../features/auth/ui/pages/Register";
import App from "./App";
import LoginPage from "../features/auth/ui/pages/Login.jsx";
import AuthChecker from "./AuthChecker.jsx";



const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>
    },
    {
        path: "/register",
        element: <AuthChecker authentication = {false} ><RegisterPage/></AuthChecker>
    },
    {
        path: "/login",
        element: <AuthChecker authentication = {false} ><LoginPage/></AuthChecker>
    }
    

])

export default router