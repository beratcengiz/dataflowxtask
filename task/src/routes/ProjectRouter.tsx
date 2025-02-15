import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Page1 } from "../pages/Page1";
import { Page2 } from "../pages/Page2";
import { Login } from "../pages/Login";

export const ProjectRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/page1" element={<PrivateRoute element={<Page1 />} />} />
        <Route path="/page2" element={<PrivateRoute element={<Page2 />} />} />
      </Routes>
    </>
  );
};
