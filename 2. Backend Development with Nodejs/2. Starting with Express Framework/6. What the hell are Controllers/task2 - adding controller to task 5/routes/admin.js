const express = require("express");
const router = express.Router();
const path = require("path");

const { getAddProduct, postAddProduct } = require("../controllers/products");
const { postSuccess, getContactUs } = require("../controllers/details");

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/contact-us", getContactUs);

router.post("/success", postSuccess);

module.exports = router;
