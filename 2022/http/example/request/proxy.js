const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
app.use(express.static(__dirname + "/"));
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
  })
);

app.listen(3000, () => {
  console.log("listen at", 3000);
});
