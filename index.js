const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Configuração do Handlebars
const handlebars = exphbs.create({});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Servir arquivos estáticos
app.use(express.static("public"));

// Rota principal
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const page = req.body.page;

  const sql = `INSERT INTO books (title,page) VALUES ('${title}','${page}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;
    console.log(books);

    res.render("books", { books });
  });
});

// Configuração da conexão MySQL
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql2",
});

// Conexão ao banco de dados
conn.connect(function (err) {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1); // Encerrar o servidor em caso de erro
  }
  console.log("Conectado ao banco de dados MySQL");

  // Iniciar o servidor apenas após a conexão com o banco de dados ser estabelecida
  app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
  });
});
