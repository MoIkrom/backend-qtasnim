/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const productRouter = express.Router();

const { body } = require("../middlewares/validate");

const {
  create,
  edit,
  drop,
  getAll,
  getbyId,
} = require("../controllers/productController");

productRouter.post("/create", create);
productRouter.get("/", getAll);
productRouter.get("/detail/:id", getbyId);
productRouter.patch(
  "/:id",
  body(
    "nama_barang",
    "stock",
    "jumlah_terjual",
    "tanggal_transaksi",
    "jenis_barang",
  ),
  edit,
);
productRouter.delete("/:id", drop);
// productRouter.get("/", search);
module.exports = productRouter;
