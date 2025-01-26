import React, { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextType {
    isAuthenticated: any;
    loginUsername: string;
    loginPassword: string;
    setLoginUsername: (username: string) => void;
    setLoginPassword: (password: string) => void;
    handleLogin: (e: React.FormEvent) => void;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", "false");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    // Basit giriş kontrolü
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
        loginPassword
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
