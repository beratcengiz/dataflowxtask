import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDelete<T>(url: string, key: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Silme işlemi başarısız oldu");
      }

      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData([key], (oldData: any[]) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
    onError: (error) => {
      console.error("Silme işlemi başarısız:", error);
    },
  });

  return mutation;
}
