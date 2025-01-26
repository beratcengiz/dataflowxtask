import { useQuery } from '@tanstack/react-query';

export function useGetData<T>(url: string, queryKey: string, enabled: boolean) {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: async (): Promise<T> => {
      const response = await fetch(url);
      return response.json();
    },
    enabled: enabled,
    staleTime: 10000, 
  });
}