const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let url = req.url;
  let method = req.method;

  if (url === "/") {
    fs.readFile("message.txt", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      }
      let readData = data;
      console.log(" read done " + readData);
      res.setHeader("content-type", "text/html");
      res.write("<html>");
      res.write("<body>");
      res.write(readData);
      res.write(
        "<form action = '/message' method='POST'><input type = 'text' name = 'msg'><input type = 'submit' value = 'send'> </form>"
      );
      res.write("</body>");
      res.write("</html>");
      return res.end();
    });
  }

  if (url === "/message" && method === "POST") {
    const arr = [];
    req.on("data", (chunk) => {
      arr.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(arr).toString();
      const writeData = parsedBody.split("=")[1];
      console.log("recieved data from the form = " + writeData);
      fs.writeFile("message.txt", writeData, (err) => {
        console.log("written " + writeData + "in the file");
        res.statusCode = 302; //we redirect our response on '/'
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

server.listen(4000);
