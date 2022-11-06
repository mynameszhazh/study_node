# Nodejs 基础

## EventLoop 是什么?

- [process](https://processon.com/view/link/5e70b1c2e4b011fcce9b89b5#map)
  - 开课吧 夏老师的流程图

## Buffer

> 官网中 Buffer 的 api 不多,所以解决这样的问题,还是非常容易的

- buffer 处理二进制的数据

## stream

> 通过流来进行相关的文件操作

- 请求图片流
  - `createReadStream("./" + url).pipe(res)`
    - 通过 res 直接就可以进行一个 数据返回
    - 在后台直接把 整个图片全部返回这样
