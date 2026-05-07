import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../features/auth/ui/pages/Register";
import App from "./App";
import LoginPage from "../features/auth/ui/pages/Login.jsx";
import AuthChecker from "./AuthChecker.jsx";
import Random from "../features/auth/ui/pages/Random.jsx";


const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>, 
        children : [
            {
                path: "/random",
                element: <AuthChecker authentication = {true} ><Random/></AuthChecker>
            }
        ]
    },
    {
        path: "/register",
        element:<RegisterPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
    

])

export default router