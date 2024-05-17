const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (_, res) => {
  res.json("Hello Senac World! PI Grupo 2");
});

// BOOKS //
app.get("/books", async (req, res) => {
  const { category_id } = req.query;

  let queryParams = [];

  let queryText =
    "SELECT books.*, categories.id AS category_id, categories.title AS category_title FROM books INNER JOIN categories ON books.category_id = categories.id";

  if (category_id) {
    queryText += " WHERE category_id = $1";
    queryParams.push(category_id);
  }

  try {
    const result = await pool.query(queryText, queryParams);
    res.json(
      result.rows.map(({ category_id, category_title, ...row }) => ({
        ...row,
        category: {
          id: category_id,
          title: category_title,
        },
      }))
    );
  } catch (err) {
    console.error("Erro ao buscar os livros:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT books.*, categories.id AS category_id, categories.title AS category_title FROM books INNER JOIN categories ON books.category_id = categories.id WHERE books.id = $1",
      [bookId]
    );
    if (result.rows.length === 1) {
      const { category_id, category_title, ...book } = result.rows[0];
      res.json({
        ...book,
        category: {
          id: category_id,
          title: category_title,
        },
      });
    } else {
      res.status(404).json({ error: "Livro não encontrada." });
    }
  } catch (err) {
    console.error("Erro ao buscar livro:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/books", upload.single("image"), async (req, res) => {
  const image = req.file;
  const { title, category_id, location, phone_number } = req.body;

  if (!image) {
    return res.status(400).send("Imagem é obrigatória");
  }

  try {
    const imagemBase64 = image.buffer.toString("base64");

    const result = await pool.query(
      "INSERT INTO books (title, category_id, location, phone_number, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, parseInt(category_id), location, phone_number, imagemBase64]
    );

    const newBook = result.rows[0];
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Erro ao adicionar livro:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.patch("/books/:id", async (req, res) => {
  const id = req.params.id;
  const campos = req.body ? Object.keys(req.body) : [];

  if (campos.length === 0) {
    return res.status(400).json({
      error: "Pelo menos um campo deve ser fornecido para atualização",
    });
  }

  const valores = [];
  const sets = campos.map((campo, index) => {
    valores.push(req.body[campo]);
    return `${campo} = $${index + 1}`;
  });

  const query = {
    text: `UPDATE books SET ${sets.join(", ")} WHERE id = $${
      campos.length + 1
    } RETURNING *`,
    values: [...valores, id],
  };

  try {
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar livro:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await pool.query("DELETE FROM books WHERE id = $1", [
      bookId,
    ]);
    if (result.rowCount === 1) {
      res.status(200).json({ message: "Livro excluído com sucesso." });
    } else {
      res.status(404).json({ error: "Livro não encontrada." });
    }
  } catch (err) {
    console.error("Erro ao excluir livro:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
// BOOKS //

// CATEGORIES //
app.get("/categories", async (req, res) => {
  let queryText = "SELECT * FROM categories";

  try {
    const result = await pool.query(queryText);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar as categorias:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
// CATEGORIES //

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
