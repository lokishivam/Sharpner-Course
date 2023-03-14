const express = require("express");
const app = express(); //instance of express
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));

const routerAdmin = require("./routes/admin");
const routerhome = require("./routes/home");

app.use(routerAdmin);
app.use(routerhome);
app.listen(3000);
