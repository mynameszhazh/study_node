const fs = require("fs");

let rs = fs.createReadStream("./test1.webp");
let ws = fs.createWriteStream("./test11.webp");

rs.pipe(ws);
