/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (role === "admin") {
    return children;
  }
  return <Navigate to={"/dashboard"} replace="true"></Navigate>;
};

export default AdminRoute;
