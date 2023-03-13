const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//we need to add a body-parser to parse the body of the incoming data.
//we will use a middleware to do so.
app.use(bodyParser.urlencoded({ extended: false }));
//now the req.body is parsed into from form into object
// in plain nodejs we had to use buffer to gather data uing a eventlistner.

app.use("/product", (req, res, next) => {
  console.log("welcome to middleware product");
  res.send(`<form action="/product-detail" method="post" >
  <label for="start-date" style = "display:block">product</label>
  <input type="text" name="product">
  <label for="size" style = "display:block">size</label>
  <input type="text" name="size">
  <input type="submit" value ="submit" style = "display:block">
</form>`);
});

app.use("/product-detail", (req, res, next) => {
  console.log("welcome to product-details middleware ");
  console.log(req.body);
  //redirect to '/'
  res.redirect("/"); // in plain nodejs we had to chance the headers of the response object.
});

app.use("/", (req, res, next) => {
  console.log("welcome to middleware ");
  res.send("<h1> hello to node js </h1>");
});

app.listen(3000);
