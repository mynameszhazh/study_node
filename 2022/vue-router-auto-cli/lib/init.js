const { promisify } = require("util");
const clear = require("clear");
const chalk = require("chalk");
figlet = promisify(require("figlet"));
const { clone } = require("./download.js");
const log = (content) => console.log(chalk.green(content));

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("Welcome " + name); // figlet("XJH");
  log(data);
  // clone 项目
  clone("direct:https://github.com/su37josephxia/vue-template", name);
};
