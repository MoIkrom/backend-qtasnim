/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");

const mainRouter = express.Router();
const productRouter = require("./productRouter");
const prefix = "/api/qtasnim";

mainRouter.use(`${prefix}/product`, productRouter);

mainRouter.get(`${prefix}/`, (req, res) => {
  res.json({
    message: "Welcome QTASNIM",
  });
});

module.exports = mainRouter;
