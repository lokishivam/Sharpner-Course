const express = require("express");
const router = express.Router(); //instance of express
const fs = require("fs");

router.get("/", (req, res, next) => {
  const chat = fs.readFileSync("data.txt", "utf8");
  res.send(`${chat}
  <form action="/save-data" method="post" onsubmit = "submitHandler(event)">
      <input type = "text" name = "message">
      <input type="hidden" name="username"  id ="hiddenInput">
      <input type = 'submit' value = 'submit'>
  </form>
  <script>
  console.log("something")
function submitHandler(event) { 
    const input = document.getElementById("hiddenInput");
    input.value = localStorage.getItem("username");
    console.log("boo")
  }
  </script>
  `);
});

module.exports = router;
