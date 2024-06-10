import React, { createContext, ReactNode } from "react";
import { useState, useEffect } from "react";
import { logoutUser, signupApi } from "../utils/http";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify"; // Optional: for user feedback

interface TokenPayload {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  authorised: boolean;
  user: string | null;
  login: (formData: Record<string, any>, method: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  authorised: false,
  user: null,
  login: (formData: Record<string, any>, method: string) => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authorised, setAuthorised] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded: TokenPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        setAuthorised(true);
        setUser(decoded.role);
        setLogoutTimer(decoded.exp - currentTime); // Set the logout timer
      } else {
        logout(); // Token has expired, log out immediately
      }
    }
  }, []);

  const setLogoutTimer = (timeInSeconds: number) => {
    setTimeout(() => {
      toast.info("Session expired. Logging out..."); // Optional: notify the user
      logout();
    }, timeInSeconds * 1000);
  };

  async function login(formData: Record<string, any>, method: string) {
    await signupApi(formData, method);
    setAuthorised(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded: TokenPayload = jwtDecode(token);
      setUser(decoded.role);
      localStorage.setItem("role", decoded.role);
      const currentTime = Date.now() / 1000;
      setLogoutTimer(decoded.exp - currentTime); // Set the logout timer
    }
  }

  async function logout() {
    //await logoutUser();
    localStorage.removeItem("access_token");
    //localStorage.removeItem("refresh_token");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("role");

    setAuthorised(false);
    setUser(null);
  }

  let ctxValue = {
    authorised,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};
