/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const db = require("./src/config/postgre");
const mainRouter = require("./src/routes/main");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

const PORT = 8080;

db.connect()
  .then(() => {
    console.log("DB Connected");

    server.use(cors());

    server.use(
      morgan(":method :url :status :res[content-length] - :response-time ms"),
    );

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    server.use(mainRouter);

    server.use("/*", (req, res) => {
      res.status(404).send("404 - Path Not Found");
    });

    server.listen(PORT, () => {
      console.log(`port berjalan ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
