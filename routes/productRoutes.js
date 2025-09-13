const express = require("express");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const { getProducts } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

module.exports = router;
