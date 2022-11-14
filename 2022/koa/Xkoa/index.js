const http = require("http");
const request = require("./request.js");
const response = require("./response.js");
const context = require("./context.js");

class Xkoa {
  constructor() {
    this.middlewares = [];
    this.callback = null;
  }

  listen(...arg) {
    const server = http.createServer((req, res) => {
      // this.callback(req, res);
      this.ctx = this.createContext(req, res);
      this.compose()();
      // 最后执行我的一些代码
      res.end(JSON.stringify(this.ctx.body));
    });
    server.listen(...arg);
  }

  compose() {
    return () => {
      return this.dispatch(0);
    };
  }

  dispatch(i) {
    let fn = this.middlewares[i];
    let tant = this;
    if (!fn) {
      return Promise.resolve();
    }
    return Promise.resolve(
      fn(tant.ctx, () => {
        return tant.dispatch(i + 1);
      })
    );
  }

  use(...callback) {
    this.middlewares.push(...callback);
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    // console.log(ctx.body, "123");
    return ctx;
  }
}

module.exports = Xkoa;
