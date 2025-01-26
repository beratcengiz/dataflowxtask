import React from "react";
import DataFlowHeader from "./components/Navbar";
import { useAuth } from "../../contexts/AuthContext";

const AppFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated === "true" ? <DataFlowHeader></DataFlowHeader> : <></>}

      <>{children}</>
    </>
  );
};
export default AppFrame;
