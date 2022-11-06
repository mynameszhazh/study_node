const http = require("http");
const { readFile, createReadStream } = require("fs");
const app = http.createServer((req, res) => {
  // let reqret = getPrototypeChain(req);
  // console.log(reqret);
  const { url, method, headers } = req;
  if (url === "/" && method === "GET") {
    readFile("./html.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("500 服务器错误");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data.toString());
    });
  } else if (url === "/user" && method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify([{ name: "tom", age: 10 }]));
  } else if (method === "GET" && headers.accept.indexOf("image/*") !== -1) {
    console.log(url)
    if (url !== "/favicon.ico") {
      createReadStream("./" + url).pipe(res);
    }
    // 进行一些流的操作
    // console.log("123");
    // res.end("123");
  }
  // res.end("defalut");
});

// function getPrototypeChain(obj) {
//   const prototypeChains = [];
//   while ((obj = Object.getPrototypeOf(obj))) {
//     prototypeChains.push(obj);
//   }
//   return prototypeChains;
// }

app.listen(3000, () => {
  console.log("server running 3000");
});
