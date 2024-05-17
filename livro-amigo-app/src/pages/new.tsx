import { FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Button } from "@/components/button";
import { InputFile } from "@/components/input-file";
import { useFetchCategories, useCreateBook } from "@/http/hooks";

export function New() {
  const navigate = useNavigate();
  const categories = useFetchCategories();
  const create = useCreateBook();

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const payload = new FormData(event.currentTarget);

      create.mutateAsync(payload).then(() => {
        navigate("/");
      });
    },
    [create, navigate]
  );

  return (
    <main>
      <Heading
        texts={{
          top: "Compartilhe",
          bottom: "o seu livro",
        }}
      />

      <form
        className="grid gap-6 px-8"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Input placeholder="Título" name="title" required />
        <Select
          name="category_id"
          required
          options={
            categories.data
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(({ id, title }) => ({
                value: id.toString(),
                label: title,
              })) || []
          }
        />
        <Input required name="location" placeholder="Localização" />
        <Input
          required
          name="phone_number"
          placeholder="Whatsapp"
          type="tel"
          inputMode="tel"
        />

        <InputFile name="image" required accept="image/*" />

        <Button className="mt-6" type="submit" disabled={create.isPending}>
          {create.isPending ? "Salvando..." : "Cadastrar"}
        </Button>
      </form>
    </main>
  );
}
