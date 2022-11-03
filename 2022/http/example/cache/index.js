const http = require("http");

function updateTime() {
  this.timmer =
    this.timmer ||
    setInterval(() => {
      this.time = new Date().toUTCString();
    }, 5000);
  return this.time;
}

const app = http.createServer((req, res) => {
  const { url } = req;
  console.log(url);
  if (url === "/") {
    res.end(`
    <html>
      html update Time ${updateTime()}
      <script src="main.js"></script>
    </html>
    `);
  } else if (url === "/main.js") {
    // 这个玩意
    const content = `document.writeln('<br/> update time ${updateTime()}')`; // 强缓存
    // 强缓存
    // res.setHeader("Expires", new Date(Date.now() + 5 * 1000).toUTCString());
    // res.setHeader("Cache-Control", "max-age=2");

    // 协商缓存 last-modified
    // res.setHeader("Cache-Control", "no-cache");
    // res.setHeader("last-modified", new Date().toUTCString());
    // if (
    //   new Date(req.headers["if-modified-since"]).getTime() + 5 * 1000 >
    //   Date.now()
    // ) {
    //   console.log("缓存命中304");
    //   res.statusCode = 304;
    //   res.end("");
    //   return
    // }

    // 协商缓存 Etag
    const crypto = require("crypto");
    const hash = crypto.createHash("sha1").update(content).digest("hex");
    res.setHeader("Etag", hash);
    if (req.headers["if-none-match"] === hash) {
      console.log("Etag 缓存命中....");
      res.statusCode = 304;
      res.end("");
      return;
    }
    res.statusCode = 200;
    res.end(content);
  } else {
    res.statusCode = 200;
    res.end("");
  }
});

app.listen(3000);
