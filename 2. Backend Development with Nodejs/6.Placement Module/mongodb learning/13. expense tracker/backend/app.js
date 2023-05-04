const fs = require("fs");
const currentPath = require("./util/path");
const cors = require("cors"); //middleware
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumFeatureRoutes = require("./routes/premiumFeature");
// const passwordRoutes = require("./routes/password");

app.use("/users", userRoutes); //we will pass router middleware to app.use
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premiumFeatures", premiumFeatureRoutes);
// app.use("/password", passwordRoutes);

mongoose
  .connect(
    "mongodb+srv://lokishivam:d9bBDVURk9wzQFTG@cluster0.atzztfh.mongodb.net/expense-app-sharpner?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
