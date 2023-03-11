//https://github.com/lokishivam/Sharpner-Course/commit/35a6fcafd6742f46d050129d80e769d415c18e42
//reffer the above link for part 1

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //callback is a implicitly added as eventlistner when the server is requested.
  //req object contains the information about the incoming request.
  let url = req.url; //this will only provide the path and not the complete domain.
  let method = req.method;

  if (url === "/form") {
    //res is the response object that the client's browser will recieve, it will have all the details about the response that we are sending.
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write(
      "<body><form action = '/message' method='POST'><input type = 'text' name = 'msg'><input type = 'submit' value = 'send'> </form></body>"
      //input text will be added into the post request object in terms of key-value pair
      //we need too add name attribute, as name will be the key. name = 'msg', here 'msg' will be key
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    //the data we recieve from the post request comes in packets for quick travel.
    //res.on is an event listner that we explicitly add in node.js
    //'data' event is emitted whenever a packet is arrived so it will be called multiple times depending on size and packets.
    //we will collect all the chucks in array.

    const arr = [];
    req.on("data", (chunk) => {
      arr.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(arr).toString();
      const resdata = parsedBody.split("=")[1];
      console.log(resdata);
      fs.writeFileSync("message.txt", resdata);
    });
    res.statusCode = 302; //we redirect our response on '/'
    res.setHeader("Location", "/");

    return res.end();
    //as js is async the below code will run before the resdata is updated.
  }

  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<body><h1>welcome</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(4000);
