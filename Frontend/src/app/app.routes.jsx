import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../features/auth/ui/pages/Register";
import App from "./App";
import LoginPage from "../features/auth/ui/pages/Login.jsx";

import Random from "../features/auth/ui/pages/Random.jsx";
import Public from "./Public.jsx";

import CreateProductPage from "../features/products/ui/pages/CreateProduct.jsx";

import Protected from "../features/auth/ui/components/Protected.jsx";
import SellerDashboard from "../features/products/ui/pages/Dashboard.jsx";

const router = createBrowserRouter([

    {
        path: "/",
        element:<App/>,
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
    }, 
    {
        path: "/create-product", 
        element:<Protected role="seller"> <CreateProductPage/> </Protected>
    }, 
    {
    path: "*", 
    element: <div>404 not found</div>
    }, 
    {
        path: "/dashboard",
        element:<Protected role="seller"> <SellerDashboard/> </Protected>
    }
    

])

export default router