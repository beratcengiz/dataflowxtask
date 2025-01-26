import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectRouter } from "./routes/ProjectRouter";
import AppFrame from "./components/AppFrame/AppFrame";
import { AuthProvider } from "./contexts/AuthContext";
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppFrame>
          <ProjectRouter></ProjectRouter>
        </AppFrame>
      </AuthProvider>
    </Router>
  );
};

export default App;
