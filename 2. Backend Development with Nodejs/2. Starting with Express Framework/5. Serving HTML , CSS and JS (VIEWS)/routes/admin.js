const express = require("express");
const router = express.Router();

//router is like a mini express app that can be plugged into other express apps.
//e.g. we will plug this router into app.js express app.

//.get and.post does the exact match
router.get("/add-product", (req, res, next) => {
  console.log("welcome to middleware product");
  res.send(`<form action="/admin/add-product" method="post" >
    <label for="start-date" style = "display:block">product</label>
    <input type="text" name="product">
    <label for="size" style = "display:block">size</label>
    <input type="text" name="size">
    <input type="submit" value ="submit" style = "display:block">
  </form>`);
});

router.post("/add-product", (req, res, next) => {
  console.log("welcome to products middleware ");
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
