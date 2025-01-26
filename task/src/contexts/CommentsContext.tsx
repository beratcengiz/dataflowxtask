import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useGetData } from "../service/useGetQuery";

export type Comments = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  };

export const CommentContext = createContext<any>(null);


export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();


  const params = isAuthenticated === "true" && location.pathname === "/page2";


  const { data, error, isLoading } = useGetData<Comments[]>(
    "https://jsonplaceholder.typicode.com/comments", 
    "comments", 
    params
  );

  return (
    <CommentContext.Provider value={{ comments: data, error, loading: isLoading }}>
      {children}
    </CommentContext.Provider>
  );
};


export const useComments = () => {
  return useContext(CommentContext);
};
