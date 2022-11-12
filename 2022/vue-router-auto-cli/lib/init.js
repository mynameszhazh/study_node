const { promisify } = require("util");
const clear = require("clear");
const chalk = require("chalk");
const open = require("open");
figlet = promisify(require("figlet"));

const { clone } = require("./download.js");

const log = (content) => console.log(chalk.green(content));

function spawn(...args) {
  const { spawn } = require("spawn");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", function() {
      resolve();
    });
  });
}

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("Welcome " + name); // figlet("XJH");
  log(data);
  // clone 项目
  await clone("direct:https://github.com/su37josephxia/vue-template", name, {
    clone: true,
  });

  log("下载依赖....");
  // await spawn("npm", ["install"], { cwd: `./${name}` });
  await spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["install"], {
    cwd: `./${name}`,
  });
  log("依赖下载完成...");

  open("http://localhost:8080");
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
