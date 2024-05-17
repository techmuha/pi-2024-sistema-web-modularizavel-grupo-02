import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useDeleteBook, useFetchBook, useUpdateBook } from "@/http/hooks";
import { Heading } from "@/components/heading";

import PlaceholderImage from "/images/placeholder-image.jpg";
import { Button } from "@/components/button";

export function Book() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string }>();

  const book = useFetchBook(params?.id ? Number(params.id) : undefined);
  const deleteBook = useDeleteBook();
  const update = useUpdateBook(book.data?.id);

  const handleLend = useCallback(() => {
    update
      .mutateAsync({
        loaned: true,
      })
      .then(() => {
        localStorage.setItem("last-read", JSON.stringify(book.data));
        navigate("/");
        toast.success("Livro emprestado com sucesso.");
      });
  }, [book.data, navigate, update]);

  const handleReset = useCallback(() => {
    update
      .mutateAsync({
        loaned: false,
      })
      .then(() => {
        navigate("/conta");
        toast.success("Livro atualizado com sucesso.");
      });
  }, [navigate, update]);

  const handleDelete = useCallback(() => {
    deleteBook.mutate(book.data?.id);
    navigate("/conta");
  }, [book.data?.id, deleteBook, navigate]);

  if (!book.data) return <p>Livro não encontrado.</p>;

  return (
    <main>
      <Heading
        texts={{
          top: "Livro",
          bottom: book.data.title,
        }}
      />

      <img
        className="w-full"
        src={
          book.data.image
            ? `data:image/png;base64,${book.data.image}`
            : PlaceholderImage
        }
      />

      <div className="p-8 text-blue-800">
        <p className="pb-4 text-sm uppercase">{book.data.category.title}</p>
        <p className="pb-6 text-sm font-bold">
          Contato: {book.data.phone_number}
        </p>
        <p className="text-sm">
          Publicado{" "}
          {Intl.DateTimeFormat("pt-BR", {
            dateStyle: "full",
          }).format(new Date(book.data.created_at))}{" "}
          em {book.data.location}
        </p>

        <div className="grid gap-6">
          {!location.state?.is_owner && (
            <Button
              className="mt-12"
              type="submit"
              onClick={handleLend}
              disabled={book.data.loaned}
            >
              {book.data.loaned ? "Emprestado" : "Emprestar"}
            </Button>
          )}

          {location.state?.is_owner && (
            <>
              <Button
                className="mt-12"
                type="submit"
                onClick={handleReset}
                disabled={!book.data.loaned}
              >
                {book.data.loaned ? "Repor livro" : "Disponível"}
              </Button>

              <button onClick={handleDelete}>Excluir</button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
