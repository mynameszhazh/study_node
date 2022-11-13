# vue 路由自动构建工具

## 构建工程

- 下载依赖

```js
npm i commander download-git-repo ora handlebars figlet clear chalk open -s
```

## package.json

```js
"bin": {
  // 我通过终端进行输入 xjh  需要执行的文件
  "xjh": "./bin/xjh.js"
},
```

- 增加一项这样的配置

## bin

> 通过 bin 指定脚本解析器

- 文件(bin/xjh.js) 下

```js
// 指定脚本解析器为node
#!/usr/bin/env node
```

- `npm link` 进行一个 脚本的绑定
- 通过 `xjh` 进行开始
  - 也可以通过 `node ./bin/xjh.js` 进行操作 是一样的道理?

## 库的使用

### commander

- 一些 ts 代码提示的代码, 可能需要你引入不同的包 就可以进行操作了

## publish.sh

> 这是一种 bash 文件执行使用的一种文件格式

- 它可以把, 我一系列的执行命令统一进行一个执行这样
- mac
  - chmod +x publish.sh
    - 开通权限的一种操作, 这样我就可以直接执行文件了
  - ./publish.sh
    - 直接执行
