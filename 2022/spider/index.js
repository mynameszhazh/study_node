const originRequest = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

function request(url, callback) {
  const options = {
    url: url,
    encoding: null,
  };
  originRequest(url, options, callback);
}

for (let i = 103790; i < 103795; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`;
  request(url, function (err, res, body) {
    // 我的代理网络不允许 我做这样的事情?
    console.log(body, err, res, "body");
    // const html = iconv.decode(body, "gb2312");
    // const $ = cheerio.load(html);
    // console.log($(".title_all h1").text());
  });
}
