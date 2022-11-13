const Xkoa = require("./Xkoa/index.js");

const app = new Xkoa();

// app.use(async (ctx, next) => {
//   console.log(ctx.url);
//   let startTime = new Date().getTime();
//   // await next();
//   let endTime = new Date().getTime();
//   console.log(`${endTime - startTime}时间耗时~`);
// });

app.use(async (ctx, next) => {
  ctx.body = [
    {
      name: "xjh",
      age: 29,
    },
  ];
  // await next();
});

app.listen(3000, () => {
  console.log("running...", 3000);
});
