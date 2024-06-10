import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../store/authContext";

type Props = { children: React.ReactNode };

const RoleProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  let user = localStorage.getItem("role");
  //const { user } = useContext(AuthContext); //since state is lost when we refresh so have to useLocalStorage.
  return user == "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/active" state={{ from: location }} replace />
  );
};

export default RoleProtectedRoute;
