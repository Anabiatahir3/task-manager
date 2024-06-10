import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../store/authContext";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  let authorised = Boolean(localStorage.getItem("access_token"));
  // const { authorised } = useContext(AuthContext); //since state is lost when we refresh so have to useLocalStorage.
  return authorised ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
