const cors = require("cors"); //middleware

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const taskRoutes = require("./routes/task");

app.use("/tasks", taskRoutes); //we will pass router middleware to app.use

sequelize
  .sync({ force: true }) //sequelize.sync() method will create the table if doesnot exist, it will scan our models made by sequelize.define
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
