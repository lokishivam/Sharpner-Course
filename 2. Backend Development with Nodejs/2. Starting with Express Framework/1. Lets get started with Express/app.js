//

const express = require("express");
const app = express();
app.use((req, res, next) => {
  console.log("welcome to 1st middleware");
  //res.send("<h1> hello from first middle ware </h1>"); //this will return from here wont go to the next middleware.
  next();
});

app.use("/home", (req, res, next) => {
  console.log("welcome to 2nd middleware");
  res.send("<h1> hello to node js </h1>");
  //  res.send({ age: 23 });
});

app.listen(3000);
// const server = http.createServer(app);
// server.listen(3000);
