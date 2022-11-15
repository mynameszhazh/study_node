# koa

## 手写 koa

### koa 基本总计

- 初始化
  - 将 http 的一些操作 变成了 koa 的操作
    - 说白了 不就是包装吗?
- request
  - 拿出 http -> req 的 api 进行一个封装
- response
  - 同上
- context
  - koa 自己定义的一些更加合理的 api 进行放出来

### koa-router 基本总结

- 注意的是 每一次请求,需要遍历的是所有的 后台代码这样
  - 可能会存在优化, 但是肯定不是现在进行一个总结的时候
