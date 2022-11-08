// import { promisify } from "util";
// import clear from "clear";
// import chalk from "chalk";
// import figlet from "figlet";
const { promisify } = require("util");
const clear = require("clear");
const chalk = require("chalk");
// const figlet = require("figlet");
figlet = promisify(figlet);

// const figlet = promisify(figlet1);
const log = (content) => console.log(chalk.green(content));

module.exports = (name) => {
  // 打印欢迎界面
  clear();
  figlet("XJH Welcome" + name).then((data) => {
    log(data);
  });
  // figlet("XJH");
  log("123");
};
