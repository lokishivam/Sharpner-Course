//simple way of writting.
console.log("hello world");

//using fileSystem to create the text file
const fs = require("fs");
fs.writeFileSync("hello.txt", "hello from the Node.js");
