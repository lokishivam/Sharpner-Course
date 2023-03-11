const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let url = req.url;
  let method = req.method;
  let readData = "";
  if (url === "/") {
    try {
      readData = fs.readFileSync("message.txt", "utf8");
      console.log(" hi " + readData);
    } catch (err) {
      console.error(err);
    }
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
  }

  if (url === "/message" && method === "POST") {
    const arr = [];
    req.on("data", (chunk) => {
      arr.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(arr).toString();
      const resdata = parsedBody.split("=")[1];
      console.log("bye " + resdata);
      fs.writeFileSync("message.txt", resdata);
      res.statusCode = 302; //we redirect our response on '/'
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});

server.listen(4000);
