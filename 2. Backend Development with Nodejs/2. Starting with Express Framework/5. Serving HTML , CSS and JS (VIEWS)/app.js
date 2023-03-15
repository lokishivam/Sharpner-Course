const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));

//to improve searching paths efficiency(while req), we can add filters.
//down here, if an path doesnt have "/admin" at start we wont search the entire route.
app.use("/admin", adminRouter);

app.use(shopRouter);

//'/' by default, means this path will match if it dosent match any middleware.
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000);
