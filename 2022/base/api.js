let { readFileSync, readFile } = require("fs");
const { promisify } = require("util");
readFile = promisify(readFile);
// const data = readFileSync("./conf.js");
// console.log(data, data.toString());

// readFile("./test.js", (err, data) => {
//   if (err) return err;
//   console.log(data.toString(), "123");
// });

process.nextTick(async () => {
  const data = await readFile("./conf.js");
  console.log(data.toString());
});
