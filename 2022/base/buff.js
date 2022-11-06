const buf1 = Buffer.alloc(5);

const buf2 = Buffer.from("a");
console.log(buf2.toString(), "buf2");

const buf3 = Buffer.from("中文哦");
console.log(buf3.toString(), "buf3");

const buf4 = Buffer.concat([buf2, buf3]);
console.log(buf4.toString(), "buf4");
