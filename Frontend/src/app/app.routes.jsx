import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../features/auth/ui/pages/Register";
import App from "./App";



const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    }

])

export default router