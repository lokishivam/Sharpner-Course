const fs = require("fs");
const currentPath = require("./util/path");
const cors = require("cors"); //middleware
const helmet = require("helmet");
const morgan = require("morgan");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order");
const Forgotpassword = require("./models/forgotPassword");
const DownloadExpense = require("./models/downloadExpense");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use(helmet());

// //doubt..
// const accessLogStream = fs.createWriteStream(`${currentPath}/access.log`, {
//   flags: "a",
// });
// app.use(morgan("combined", { stream: accessLogStream }));

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumFeatureRoutes = require("./routes/premiumFeature");
const passwordRoutes = require("./routes/password");

app.use("/users", userRoutes); //we will pass router middleware to app.use
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premiumFeatures", premiumFeatureRoutes);
app.use("/password", passwordRoutes);

//one to many association
User.hasMany(Expense);
Expense.belongsTo(User); //creates foreignKey of user inside the table of Expense.

//as orders can fail, one user can have multiple order attempts
//also if the payments are recurring, there will be multiple orders.. (exploring possiblities)
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(DownloadExpense);
DownloadExpense.belongsTo(User);

sequelize
  .sync() //sequelize.sync() method will create the table if doesnot exist, it will scan our models made by sequelize.define
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
