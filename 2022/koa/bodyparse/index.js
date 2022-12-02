// 肯定是需要优化处理的, 这样的一个版本肯定是存在很大的问题
module.exports = function () {
  return async (ctx, next) => {
    const req = ctx.request.req;
    let reqdata = [];
    let size = [];
    await new Promise((resove, reject) => {
      req.on("data", (data) => {
        reqdata.push(data);
        size += data.length;
      });
      req.on("end", () => {
        const data = Buffer.concat(reqdata, size);
        ctx.request.body = data.toString();
        resove();
      });
    });
  };
};
