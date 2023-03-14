const express = require("express");
const path = require("path");

const router = express.Router(); //instance of express
const fs = require("fs");

router.get("/login", (req, res, next) => {
  res.send(`
<form action = '/' onsubmit = "submitHandler(event)">
    <input type = "text" name = "username">
    <input type = 'submit' value = 'submit'>
</form>
<script>
function submitHandler(event) { 
    localStorage.setItem("username", event.target.username.value);
  }
  </script>
`);
  //1. onsubmit will run first before form is submitted
  //2. Do not write event.preventDefault(); this not allow the form to redirect.
});

router.post("/save-data", (req, res, next) => {
  console.log(req.body);
  const filePath = path.join(__dirname, "../data.txt");
  fs.appendFile(
    filePath,
    ` ${req.body.username}: ${req.body.message} <br>`,
    (err) => {
      if (err) {
        console.log("data not added");
      }
      res.redirect("/");
    }
  );
});

module.exports = router;
