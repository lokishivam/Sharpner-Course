const http = require("http");
const handler = require("./routes");
console.log(handler);
const server = http.createServer(handler.reqHandler);

server.listen(4000);
