import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Root from "./components/Root";
import ProtectedRoute from "./components/utils/ProtectedRoutes";
import Login from "./components/Login";
// import Products from "./pages/Products"
// import Profile from "./pages/Profile"
// import EditProfile from "./pages/EditProfile";
// import Admin from "./pages/Admin";

const router = createBrowserRouter(
    [
        {
            path: "/",
            children: [
                {
                    path: "/login",
                    element: <Login/>,
                    index: true
                },
                {
                    element: <ProtectedRoute />,
                    children:[
                        {
                            path: "/",
                            element: <Home/>
                        },
                    ]
                },
                {
                    path:"*",
                    element:<h1 className="text-danger fs-5">404 Error - Nothing here...</h1>
                }
            ]
        }
    ]
);

export default router