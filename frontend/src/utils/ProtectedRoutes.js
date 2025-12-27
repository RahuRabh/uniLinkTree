import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

import Loader from "../components/Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
