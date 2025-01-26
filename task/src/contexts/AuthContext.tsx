import React, { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthModel } from "../models/AuthModel";

const AuthContext = createContext<AuthModel | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", "false");
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const navigate = useNavigate();


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === "admin" && loginPassword === "password") {
      setIsAuthenticated("true");
      setErrorMessage("");
      navigate("/page1");
    } else {
      setErrorMessage("Hatalı kullanıcı adı veya şifre.");
    }
  };


  const handleLogout = () => {
    setIsAuthenticated("false");
    setLoginUsername("");
    setLoginPassword("");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        handleLogout,
        setLoginPassword,
        setLoginUsername,
        loginUsername,
        loginPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
