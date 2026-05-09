import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../features/auth/ui/pages/Register";
import App from "./App";
import LoginPage from "../features/auth/ui/pages/Login.jsx";

import Random from "../features/auth/ui/pages/Random.jsx";
import Public from "./Public.jsx";
import Private from "./Private.jsx";


const router = createBrowserRouter([

    {
        path: "/",
        element:<Private><App/></Private> , 
        children : [
            {
                path: "/random",
                element: <Random/>
            }
        ]
    },
    {
        path: "/register",
        element:<Public><RegisterPage/></Public>
    },
    {
        path: "/login",
        element: <Public><LoginPage/></Public>
    }
    

])

export default router