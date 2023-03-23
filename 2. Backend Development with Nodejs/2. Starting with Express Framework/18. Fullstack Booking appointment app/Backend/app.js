const path = require("path");
const cors = require("cors"); //middleware

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const userRoutes = require("./routes/user");

app.use("/user", userRoutes); //we will pass router middleware to app.use

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
