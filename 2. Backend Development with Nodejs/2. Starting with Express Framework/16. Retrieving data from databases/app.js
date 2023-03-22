const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// db.execute("SELECT * FROM products") //this function call will return a promise. like, I promise the data to diliver to you, this promise can be resolved or rejected.
//   .then((result) => {
//     //whenever the promise is resolved, then and catch will handle the promise
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
