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
