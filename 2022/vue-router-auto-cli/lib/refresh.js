const fs = require("fs");
const chalk = require("chalk");
const handlebars = require("handlebars");

module.exports = async function() {
  // 注意了, 命令行执行的命令的位置就是 我路径查找的路径
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v,
    }));

  // 生成路由配置
  compiler({ list }, "./src/router.js", "./template/router.js.hbs");
  // 生成菜单展示
  compiler({ list }, "./src/App.vue", "./template/App.vue.hbs");

  /**
   *
   * @param {*} meta // 数据定义
   * @param {*} filePath // 文件路径
   * @param {*} templatePath // 模板文件路径
   */
  function compiler(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const result = handlebars(content)(meta);
      fs.writeFileSync(filePath, result);
      console.log(chalk.green(`🚀${filePath}创建成功`));
    }
  }
};
