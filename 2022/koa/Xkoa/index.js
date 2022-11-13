const http = require("http");

class Xkoa {
  constructor() {
    this.callback = null;
  }

  listen(...arg) {
    const server = http.createServer((req, res) => {
      this.callback(req, res);
    });
    server.listen(...arg);
  }

  use(callback) {
    this.callback = callback;
  }
}

module.exports = Xkoa;
