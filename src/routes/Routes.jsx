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
import Comments from "../components/Comments/Comments";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ReportedComments from "../pages/Dashboard/Admin/ReportedComments/ReportedComments";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import AdminRoute from "./AdminRoute";
import Membership from "../pages/Membership/Membership";
import EditPost from "../pages/Dashboard/User/EditPost/EditPost";
import DefaultPage from "../pages/Dashboard/DefaultPage/DefaultPage";

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
      {
        path: "/membership",
        element: (
          <PrivateRouter>
            <Membership></Membership>
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
        path: "",
        element: (
          <PrivateRouter>
            <DefaultPage></DefaultPage>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/addPost",
        element: (
          <PrivateRouter>
            <AddPost></AddPost>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/editPost/:id",
        element: (
          <PrivateRouter>
            <EditPost></EditPost>
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
      {
        path: "/dashboard/comments/:id",
        element: (
          <PrivateRouter>
            <Comments></Comments>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/profile",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <AdminProfile></AdminProfile>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/manageUsers",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/reportedComments",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <ReportedComments></ReportedComments>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/makeAnnouncement",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <MakeAnnouncement></MakeAnnouncement>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
