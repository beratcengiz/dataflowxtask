import { useQuery } from '@tanstack/react-query';

export function useGetData<T>(url: string, queryKey: string, enabled: boolean) {
  return useQuery<T>({
    queryKey: [queryKey], // Dinamik query key
    queryFn: async (): Promise<T> => {
      const response = await fetch(url);
      return response.json();
    },
    enabled: enabled, // Koşullu çalıştırma
    staleTime: 10000, // Veriyi 10 saniye boyunca taze kabul et
  });
}