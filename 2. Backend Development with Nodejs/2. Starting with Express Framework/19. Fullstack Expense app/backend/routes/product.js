const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/product");

router.post("/add-product", productControllers.postAddProduct);

router.get("/get-products", productControllers.getProducts);

router.post("/edit-product", productControllers.postEditProduct);

router.delete("/delete/:productId", productControllers.deleteProduct);

router.get("/get-product/:productId", productControllers.getProduct);

module.exports = router;
