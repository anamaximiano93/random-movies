const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const path = require("path");
const dotenv = require("dotenv");

//  Faz a leitura do arquivo ".env" por padrão
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Vinculando o React ao app
app.use(express.static(path.join(__dirname, "client/build")));

//Rota raiz
app.get("/api", (_, response) => {
  response.send({
    message: "Bem-vindo à API de do Random Movies",
  });
});

//Rotas principais do app
app.use("/api", routes);

//Definição de porta e inicialização do app
const APP_PORT = process.env.PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
