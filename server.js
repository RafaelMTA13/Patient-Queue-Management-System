const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("."));

// Conexão com banco SQLite
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Conectado ao banco SQLite!");

    // Cria a tabela se ela não existir. Isso deve ser feito dentro do callback da conexão.
    db.run(
      `
      CREATE TABLE IF NOT EXISTS pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL,
        cpf TEXT NOT NULL,
        telefone TEXT NOT NULL,
        dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => {
        if (err) {
          console.error("Erro ao criar a tabela:", err.message);
        } else {
          console.log("Tabela 'pacientes' criada ou já existente.");
        }
      }
    );
  }
});

// Rota para cadastrar paciente
app.post("/api/pacientes", (req, res) => {
  const { nome, idade, cpf, telefone } = req.body;

  if (!nome || !idade || !cpf || !telefone) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  db.run(
    `INSERT INTO pacientes (nome, idade, cpf, telefone) VALUES (?, ?, ?, ?)`,
    [nome, idade, cpf, telefone],
    function (err) {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }
      res.json({ id: this.lastID, nome, idade, cpf, telefone });
    }
  );
});

// Rota para listar pacientes
app.get("/api/pacientes", (req, res) => {
  db.all(`SELECT * FROM pacientes ORDER BY dataCadastro ASC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});