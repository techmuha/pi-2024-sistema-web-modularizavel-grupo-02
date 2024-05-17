import { useNavigate } from "react-router-dom";

import { Heading } from "@/components/heading";
import { useFetchBooks } from "@/http/hooks";

import PlaceholderImage from "/images/placeholder-image.jpg";

export function Account() {
  const navigate = useNavigate();
  const books = useFetchBooks();

  return (
    <main>
      <Heading
        texts={{
          top: "Estes são os",
          bottom: "meus livros :)",
        }}
      />

      <div className="grid grid-cols-2 gap-4 px-8">
        {books.data.map(({ id, image, title }, index) => (
          <div
            role="button"
            key={`my-books-item-${id}-${index}`}
            className="flex min-h-[25vh] overflow-hidden rounded-xl"
            onClick={() => {
              navigate(`/livro/${id}`);
            }}
          >
            <img
              src={image ? `data:image/png;base64,${image}` : PlaceholderImage}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
