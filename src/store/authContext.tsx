import React, { createContext, ReactNode } from "react";
import { useState } from "react";

interface AuthContextType {
  authorised: boolean;
  login: () => void;
  logout: () => void;
  signup: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authorised, setAuthorised] = useState(false);

  function login() {}
  function logout() {}
  function signup() {}
  return (
    <AuthContext.Provider value={{ authorised, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
