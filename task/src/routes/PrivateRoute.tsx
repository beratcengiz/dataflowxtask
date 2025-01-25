import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const [isAuthenticated] = useLocalStorage("isAuthenticated", "false");

  if (isAuthenticated !== "true") {
    return <Navigate to="/" />;
  }

  return element;
};