import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectRouter } from "./routes/ProjectRouter";
import AppFrame from "./components/AppFrame/AppFrame";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { PostProvider } from "./contexts/PostsContext";
import { CommentProvider } from "./contexts/CommentsContext";
const App: React.FC = () => {
  const queryClient = new QueryClient(); // QueryClient'ı başlatıyoruz
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <PostProvider>
            <CommentProvider>
              <AppFrame>
                <ProjectRouter></ProjectRouter>
              </AppFrame>
            </CommentProvider>
          </PostProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
