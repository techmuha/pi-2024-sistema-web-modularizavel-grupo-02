import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { httpClient } from "./http-client";
import { queryClient } from "@/App";

export interface FetchBookCategory {
  id: number;
  title: string;
}

export interface FetchBook {
  id: number;
  title: string;
  location: string;
  phone_number: string;
  image: string;
  loaned: boolean;
  category: FetchBookCategory;
  created_at: string;
}

export function useFetchCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await httpClient.get<Array<FetchBookCategory>>(
        "/categories"
      );
      return data;
    },
    initialData: [],
  });
}

export function useFetchBooks(params?: Partial<{ category_id: number }>) {
  return useQuery({
    queryKey: ["books", params],
    queryFn: async () => {
      const { data } = await httpClient.get<Array<FetchBook>>("/books", {
        params,
      });
      return data;
    },
    initialData: [],
  });
}

export function useFetchBook(id?: number) {
  return useQuery({
    queryKey: ["books", { id }],
    queryFn: async () => {
      const { data } = await httpClient.get<FetchBook>("/books/" + id);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateBook() {
  return useMutation({
    mutationFn: async (book: FormData) => {
      const { data } = await httpClient.post<FetchBook>("/books", book);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro criado com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar o livro.");
    },
  });
}

export function useDeleteBook() {
  return useMutation({
    mutationFn: async (id?: number) => {
      await httpClient.delete("/books/" + id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro excluído com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao excluir o livro.");
    },
  });
}

export function useUpdateBook(id?: number) {
  return useMutation({
    mutationFn: async (
      body?: Partial<Omit<FetchBook, "id" | "created_at" | "image">>
    ) => {
      const { data } = await httpClient.patch<FetchBook>("/books/" + id, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", { id }] });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao atualizar o livro.");
    },
  });
}
