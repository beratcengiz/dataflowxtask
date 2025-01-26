import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom'
export type Post = {
    id: number
    title: string
    body: string
  }

export function useGetPosts() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return useQuery<any>({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return await response.json()
    },
    enabled: isAuthenticated === "true" && location.pathname === "/page1", 
    staleTime: 10000, 
  })
}