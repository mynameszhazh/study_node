const http = require("http");
const request = require("./request.js");
const response = require("./response.js");
const context = require("./context.js");
const context = require("./context.js");

class Xkoa {
  constructor() {
    this.callback = null;
  }

  listen(...arg) {
    const server = http.createServer((req, res) => {
      // this.callback(req, res);
      const ctx = this.createContext(req, res);

      this.callback(ctx);

      res.end(ctx.body);
    });
    server.listen(...arg);
  }

  use(callback) {
    this.callback = callback;
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.request.res = res;
    return ctx;
  }
}

module.exports = Xkoa;
