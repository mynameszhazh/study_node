# web 缓存

> 当一个浏览器,重新请求的时候,他的外部内容必然重新加载, 如果一些文件很多,很大, 而且没有发生不变化,这样的情况, 就会有很多的资源浪费, 就可以使用 http 缓存来解决这样的问题

## 作用

- 减少服务器压力
- 减少流量浪费
- 首屏加载速度提升

## 强缓存策略

> 直接从本地副本对比读取, `不去服务器读取数据`, 返回状态码 200

- 这里一个很明显的问题就是如果服务器内容更改了, 但是还是用的本地的数据, 那么就会出现问题
  - 这里的解决方案就是 通过一个定时器,如果一个时间到了, 就会表示 缓存失效 => 进行服务器请求

### http 1.0

- expires

  - 只需要后端设置
    - `res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCSting())`
  - 只要设置的时间超过了, 就会进行一个数据请求这样
  - 缺点
    - 数据发生改变之后, 不会快速的进行一个刷新
    - 这个是 用的 服务的时间 和 客户端的时间进行一个比较, 很有可能会不准确

### http 1.0

- cache-control
  - 优先级 高于 expires
  - 会有很多的设置语法, 具体百度?
  - 也是后端进行设置
    - `res.setHeader("Cache-Control", "max-age=2")`
      - 里面还存在很多其它的字段,可以提供一些其它的操作这样

### 协商缓存(last-modified)

- 主要还是通过 一个 时间的判断来进行操作这样

- 通过 cache-control 和 last-modified 进行控制

```js
res.setHeader("Cache-Control", "no-cache");
res.setHeader("last-modified", new Date().toUTCString());
if (
  new Date(req.headers["if-modified-since"]).getTime() + 5 * 1000 >
  Date.now()
) {
  console.log("缓存命中304");
  res.statusCode = 304;
  res.end("");
  return;
}
```

### 协商缓存(last-modified)

- 通过将内容变成 hash 的一个手段,判断数据有没有发生变化, 从而来进行一些判断

```js
// hash 的内容我知道的还是太少了
const crypto = require("crypto");
const hash = crypto.createHash("sha1").update(content).digest("hex");
res.setHeader("Etag", hash);
if (req.headers["if-none-match"] === hash) {
  console.log("Etag 缓存命中....");
  res.statusCode = 304;
  res.end("");
  return;
}
```

## 案例

- [缓存案例](./example/cache/index.js)
  - 需要进行一个 `重复刷新` ?
