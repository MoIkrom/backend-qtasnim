/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  createProduct,
  //   getAllProduct,
  editProduct,
  deleteProduct,
  getProductById,
  searchProduct,
} = require("../models/productModel");

const getAll = async (req, res) => {
  try {
    const response = await searchProduct(req.query);

    if (response.rows.length === 0) {
      return res.status(404).json({
        message: `Product Not Found`,
      });
    }
    res.status(200).json({
      message: "Success Get Data",
      data: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};
const create = async (req, res) => {
  try {
    const response = await createProduct(req.body);

    res.status(200).json({
      message: "Success Create Data",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const edit = async (req, res) => {
  try {
    const response = await editProduct(req.body, req.params);
    res.status(200).json({
      message: "Product has been change",
      data: response.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const drop = async (req, res) => {
  try {
    await deleteProduct(req.params);
    res.status(200).json({
      message: `Product with id : ${req.params.id} has been deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const getbyId = async (req, res) => {
  try {
    const response = await getProductById(req.params);
    if (response.rows.length === 0) {
      return res.status(404).json({
        message: `Product with ID : ${req.params.id} Not Found`,
      });
    }
    res.status(200).json({
      message: `Product with ID : ${req.params.id}`,
      data: response.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const search = async (req, res) => {
  try {
    const response = await searchProduct(req.query);
    // console.log(response);
    res.status(200).json({
      msg: "Success Get Data",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server Error",
    });
  }
};

const productControler = {
  create,
  getAll,
  edit,
  drop,
  getbyId,
  search,
};

module.exports = productControler;
