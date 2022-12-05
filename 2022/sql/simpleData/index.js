const fs = require("fs");
function get(key) {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      throw new Error(err);
    }
    let ret = JSON.parse(data);
    console.log(ret[key]);
  });
}

function set(key, val) {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      throw new Error(err);
    }
    // 获取文件
    let json = JSON.parse(data);
    json[key] = val;
    // 写入文件
    fs.writeFile("./data.json", JSON.stringify(json), (err) => {
      if (err) throw err;
      console.log("导入成功");
    });
  });
}

const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (input) {
  let [op, key, value] = input.split(" ");
  if (op === "get") {
    get(key);
  } else if (op === "set") {
    set(key, value);
  } else if (op === "quit") {
    rl.close();
  }
});

rl.on("close", function () {
  process.exit(0);
});
