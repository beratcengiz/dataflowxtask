import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetPosts } from "../service/useGetPosts";
import { Post } from "../service/useGetPosts";

export const PostContext = createContext<any>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useGetPosts();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (error instanceof Error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else if (data) {
      setPosts(data);
      setLoading(false);
    }
  }, [data, error, isLoading]);
  return (
    <PostContext.Provider value={{ posts, error: errorMessage, loading }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};
