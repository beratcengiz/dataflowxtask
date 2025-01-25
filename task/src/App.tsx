import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./pages/Login";
import { ProjectRouter } from "./routes/ProjectRouter";
const App: React.FC = () => {
  return (
    <Router>
      <Login></Login>
      <ProjectRouter></ProjectRouter>
    </Router>
  );
};

export default App;
