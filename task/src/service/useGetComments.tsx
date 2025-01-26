import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext"; // AuthContext'ten kullanıcının giriş durumu alınacak
import { useLocation } from "react-router-dom";

export type Comments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export function useGetComments() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return useQuery<Comments[]>({
    queryKey: ["comments"], // Sorgu anahtarı
    queryFn: async (): Promise<Comments[]> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      return await response.json();
    },
    enabled: isAuthenticated === "true" && location.pathname === "/page2",
      staleTime: 10000,
  });
}
