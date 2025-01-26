import React, { createContext, useContext } from "react";
import { useGetData } from "../service/useGetQuery";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Post } from "../models/PostModel";

export const PostContext = createContext<any>(null);


export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const params = isAuthenticated === "true" && location.pathname === "/page1";


  const { data, error, isLoading } = useGetData<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    "posts", 
    params
  );

  return (
    <PostContext.Provider value={{ posts: data, error, loading: isLoading }}>
      {children}
    </PostContext.Provider>
  );
};


export const usePosts = () => {
  return useContext(PostContext);
};
