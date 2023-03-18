const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));

//below is the middleware to serve static files.
app.use(express.static(path.join(__dirname, "public"))); //request for static file will be searched in public folder

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
