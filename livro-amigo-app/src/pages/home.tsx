import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Heading } from "@/components/heading";
import { useFetchCategories, useFetchBooks, FetchBook } from "@/http/hooks";

import PlaceholderUserImage from "/images/placeholder-user.jpg";
import PlaceholderImage from "/images/placeholder-image.jpg";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [lastRead, setLastRead] = useState<FetchBook | undefined>(undefined);

  const navigate = useNavigate();
  const categories = useFetchCategories();
  const books = useFetchBooks({
    category_id: selectedCategory,
  });

  const handleBookClick = useCallback(
    (book: FetchBook) => {
      navigate(`/livro/${book.id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const lastRead = localStorage.getItem("last-read");
    if (lastRead) {
      setLastRead(JSON.parse(lastRead));
    }
  }, []);

  return (
    <main>
      <Heading
        texts={{
          top: "Encontre",
          bottom: "o seu livro",
        }}
        right={
          <img
            alt="Avatar"
            className="h-12 w-12 rounded-xl"
            src={PlaceholderUserImage}
          />
        }
      />

      <div className="grid gap-10">
        <section className="flex gap-2 overflow-x-auto whitespace-nowrap px-8">
          {categories.data
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(({ id, title }, index) => {
              const selected = id === selectedCategory;

              return (
                <div
                  key={`category-item-${id}-${index}`}
                  className="grid place-items-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-800 data-[selected=true]:bg-blue-800 data-[selected=true]:text-white"
                  onClick={() => {
                    setSelectedCategory((state) =>
                      state === id ? undefined : id
                    );
                  }}
                  {...(selected && {
                    "data-selected": true,
                  })}
                >
                  {title}
                </div>
              );
            })}
        </section>

        <section className="grid gap-6">
          <p className="px-8 font-bold text-blue-800">Próximos de você</p>

          <div className="flex gap-4 overflow-x-auto whitespace-nowrap px-8">
            {!books.data.length && (
              <div className="w-full rounded-xl bg-orange-100 p-4">
                {selectedCategory
                  ? "Nenhum livro desta categoria encontrado."
                  : "Nenhum livro cadastrado."}
              </div>
            )}

            {books.data
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((book, index) => {
                const { id, title, image } = book;

                return (
                  <div
                    role="button"
                    key={`near-books-item-${id}-${index}`}
                    className="flex h-[30vh] min-w-[45vw] overflow-hidden rounded-xl"
                    onClick={handleBookClick.bind(null, book)}
                  >
                    <img
                      src={
                        image
                          ? `data:image/png;base64,${image}`
                          : PlaceholderImage
                      }
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
          </div>
        </section>

        {!!lastRead && (
          <section className="grid gap-6 px-8">
            <p className="font-bold text-blue-800">Última leitura</p>

            <div className="flex overflow-hidden rounded-xl bg-white">
              <div className="w-1/2">
                <img
                  src={
                    lastRead.image
                      ? `data:image/png;base64,${lastRead.image}`
                      : PlaceholderImage
                  }
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-4 text-blue-800">
                <p className="pb-4 text-xsm uppercase">
                  {lastRead.category.title}
                </p>
                <p className="pb-6 text-sm font-bold">{lastRead.title}</p>
                <p className="text-xsm">em {lastRead.location}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
