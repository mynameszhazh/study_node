#!/usr/bin/env node
const program = require("commander");
const init = require("../lib/init.js");

program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action(init);

program.parse(process.argv);
