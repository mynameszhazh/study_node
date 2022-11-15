const Xkoa = require("./Xkoa/index.js");
const Router = require("./router/index.js");

const app = new Xkoa();
const router = new Router();

router.get("/index", async (ctx) => {
  console.log("index", ctx.url);
  ctx.body = "index body";
});

router.get("/home", async (ctx) => {
  ctx.body = "home body";
});

router.get("/about", async (ctx) => {
  ctx.body = "about body";
});

router.post("/index", async (ctx) => {
  ctx.body = "post index body";
});

app.use(router.routes());

// app.use(async (ctx, next) => {
//   let startTime = new Date().getTime();
//   await next();
//   let endTime = new Date().getTime();
//   console.log(`${endTime - startTime}时间耗时~`);
// });

// app.use(async (ctx, next) => {
//   ctx.body = [
//     {
//       name: "xjh",
//       age: 29,
//     },
//   ];
//   // await next();
// });

app.listen(3000, () => {
  console.log("running...", 3000);
});
