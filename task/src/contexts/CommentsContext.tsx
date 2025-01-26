import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetComments } from "../service/useGetComments";
import { Comments } from "../service/useGetComments";

export const CommentContext = createContext<any>(null);

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, error, isLoading } = useGetComments();
  const [comments, setComments] = useState<Comments[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (error instanceof Error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else if (data) {
      setComments(data);
      setLoading(false);
    }
  }, [data, error, isLoading]);
  return (
    <CommentContext.Provider value={{ comments, error: errorMessage, loading }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  return useContext(CommentContext);
};
