import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPost from "../pages/Dashboard/User/AddPost/AddPost";
import PrivateRouter from "./PrivateRouter";
import PostDetails from "../components/Home/PostDetails";
import MyProfile from "../pages/Dashboard/User/MyProfile/MyProfile";
import MyPosts from "../pages/Dashboard/User/MyPosts/MyPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRouter>
            <PostDetails></PostDetails>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard/addPost",
        element: (
          <PrivateRouter>
            <AddPost></AddPost>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myProfile",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myPosts",
        element: (
          <PrivateRouter>
            <MyPosts></MyPosts>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
