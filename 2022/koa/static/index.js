const fs = require("fs");
const path = require("path");

module.exports = function (dirPath = "./public") {
  return async (ctx, next) => {
    if (ctx.url.indexOf("/public") === 0) {
      const url = path.resolve(__dirname, dirPath);
      const fileBaseName = path.basename(url);
      // 去掉多余的 /publick 路径判断, 注意这里很有可能会发生一些bug, 想要解决起来,一定不简单的
      const filePath = url + ctx.url.replace("/public", "");
      // console.log(filePath, "filePath", ctx.url);
      try {
        stats = fs.statSync(filePath);
        // 是否为文件夹
        if (stats.isDirectory()) {
          const dir = fs.readdirSync(filePath);
          const ret = ['<div style="padding-left: 20px">'];
          dir.forEach((filename) => {
            if (filename.indexOf(".") > -1) {
              // 文件
              ret.push(`
              <p><a style="color:red" href="${ctx.url}/${filename}">${filename}</a></p>
              `);
            } else {
              // 文件夹
              ret.push(
                `<p><a style="" href="${ctx.url}/${filename}">${filename}</a></p>`
              );
            }
          });
          ret.push("</div>");
          ctx.body = ret.join("");
        } else {
          // 是文件
          const content = fs.readFileSync(filePath);
          ctx.body = content;
        }
      } catch (error) {
        ctx.body = "404, 文件出现了错误";
      }
    } else {
      await next();
    }
  };
};
