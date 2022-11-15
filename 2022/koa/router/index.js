class Router {
  constructor() {
    this.stack = [];
  }
  register(url, method, middleware) {
    let route = { url, method, middleware };
    this.stack.push(route);
  }
  get(url, middleware) {
    this.register(url, "get", middleware);
  }
  post(url, middleware) {
    this.register(url, "post", middleware);
  }
  routes() {
    return async (ctx, next) => {
      let currentPath = ctx.url;
      let route;
      for (let i = 0; i < this.stack.length; i++) {
        let item = this.stack[i];
        if (item.url === currentPath && item.method === ctx.method) {
          route = item.middleware;
          break;
        }
      }
      if (typeof route === "function") {
        route(ctx, next);
      }
      await next();
    };
  }
}

module.exports = Router;
