import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdatePost(apiUrl: string, queryKey: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedPost: { id: number; name: string; email: string ,body: string }) => {
      const response = await fetch(`${apiUrl}/${updatedPost.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPost),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Post güncelleme işlemi başarısız');
      }

      return await response.json();
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueryData([queryKey], (oldData: any[]) => {
        return oldData.map((post) =>
          post.id === updatedPost.id ? { ...post, ...updatedPost } : post
        );
      });
    },
    onError: (error) => {
      console.error('Post güncellenemedi:', error);
    },
  });
}
