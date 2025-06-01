import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Service/auth/usercontext/UserContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/login" />;
  
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return <Outlet />
};

export default PrivateRoute;