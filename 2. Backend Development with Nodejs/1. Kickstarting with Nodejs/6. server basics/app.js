const http = require("http");

const server = http.createServer((req, res) => {
  console.log("hello world");
});

server.listen(4000);
