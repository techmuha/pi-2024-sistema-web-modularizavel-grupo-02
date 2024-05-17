const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "livro_amigo",
  password: "",
  port: 5432,
});

module.exports = pool;
