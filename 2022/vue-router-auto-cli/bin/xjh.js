#!/usr/bin/env node
// import { program } from "commander";
// const { program } = require("commander");
const program = require("commander");
const init = require("../lib/init.js");
// import init from "../lib/init.js";
const packageJson = require("../package.json");
// console.log(packageJson);
// console.log("init", init);

// const { promisify } = require("util");
// const clear = require("clear");
// const chalk = require("chalk");
// const figlet = require("figlet");
// figlet = promisify(figlet);
// console.log(clear, chalk)

// console.log(promisify, clear, chalk);

// const log = (content) => console.log(chalk.green(content));
// 指定版本
program.version(packageJson.version);

program
  .command("init <name>")
  .description("init project")
  .action(init);

program.parse(process.argv);
