// import { promisify } from "util";
// import clear from "clear";
// import chalk from "chalk";
// import figlet from "figlet";
const { promisify } = require("util");
const clear = require("clear");
const chalk = require("chalk");
figlet = promisify(require("figlet"));

// const figlet = promisify(figlet1);
const log = (content) => console.log(chalk.green(content));

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("XJH Welcome" + name); // figlet("XJH");
  log(data);
};
