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
  } else if (method === "GET" && url === "/api/user") {
    // 处理cookie
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Set-Cookie", "cookie=val222");
    res.end(JSON.stringify([{ name: "xjh" }]));
  } else if (method === "POST" && url === "/api/save") {
    let reqData = [];
    let size = 0;
    req.on("data", (buff) => {
      reqData.push(buff);
      size += buff.length;
    });
    req.on("end", (buff) => {
      const data = Buffer.concat(reqData, size);
      // console.log("data:", size, data.toString());
      res.end(`formdta: ${data.toString()}`);
    });
  } else if (method === "OPTIONS" && url === "/api/user") {
    // 处理cookie
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // 处理复杂请求
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "X-Token,Content-Type",
      "Access-Control-Allow-Methods": "PUT",
    });
    res.end(JSON.stringify([{ name: "xjh" }]));
  }
});

app.listen(4000, () => {
  console.log("server running.... at port", 4000);
});
