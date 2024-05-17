import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { useFetchBook } from "@/http/hooks";
import { Heading } from "@/components/heading";

import PlaceholderImage from "/images/placeholder-image.jpg";
import { Button } from "@/components/button";

export function Book() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const book = useFetchBook(params?.id ? Number(params.id) : undefined);

  const handleLend = useCallback(() => {
    localStorage.setItem("last-read", JSON.stringify(book.data));
    navigate("/");
    toast.success("Livro emprestado com sucesso.");
  }, [book.data, navigate]);

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

        <Button className="mt-12" type="submit" onClick={handleLend}>
          Emprestar
        </Button>
      </div>
    </main>
  );
}
