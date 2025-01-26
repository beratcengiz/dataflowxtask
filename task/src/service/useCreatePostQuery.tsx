import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreatePost(apiUrl: string, queryKey: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: { title: string; body: string }) => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Post ekleme işlemi başarısız');
      }

      return await response.json();
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData([queryKey], (oldData: any[]) => {
        return [newPost, ...oldData];
      });
    },
    onError: (error) => {
      console.error('Post eklenemedi:', error);
    },
  });
}
