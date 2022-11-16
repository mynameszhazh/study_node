const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => {
  let { url, method } = req;
  console.log(url, method, "method");
  if (method === "GET" && url === "/") {
    fs.readFile("./index.html", (err, data) => {
      if (!err) {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else if (url === "/api/user") {
    res.setHeader("Content-Type", "text/html");
    res.end(JSON.stringify([{ name: "xjh" }]));
  }
});

app.listen(4000, () => {
  console.log("server running.... at port", 4000);
});
