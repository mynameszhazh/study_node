const path = require("path");
const fs = require("fs");

class Test {
  constructor() {}
  /**
   * 获取到我指定的一些文件操作这样
   * @returns 测试代码
   */
  getTestFileName(fileName) {
    const dirName = path.dirname(fileName);
    let baseName = path.basename(fileName);
    const extName = path.extname(fileName);
    baseName = baseName.replace(extName, `_spec${extName}`);
    return path.format({
      root: dirName + "/__test__/",
      base: baseName,
    });
  }

  getTestSource(methodName, classFile, isClass = false) {
    // console.log("methodName", methodName);
    return `
test('TEST ${methodName}', () => {
  const ${
    isClass ? "{" + methodName + "}" : methodName
  } = require('../${classFile}')
  const ret = ${methodName}()
  // exprect(ret)
  //   .toBe('test retrurn')
})`;
  }

  /**
   * 自动生成 测试代码
   * @param {如果没有参数 默认是根路径} sourcePath
   */
  genTestSource(sourcePath = path.resolve("./")) {
    const testPath = `${sourcePath}/__test__`;
    // 是否存在这样的路径
    if (!fs.existsSync(testPath)) {
      // 不存在直接创建文件夹
      fs.mkdirSync(testPath);
    }
    // 遍历代码文件
    let list = fs.readdirSync(sourcePath);
    list = list
      // 添加完整路径
      .map((v) => `${sourcePath}/${v}`)
      // 只需要文件
      .filter((v) => fs.statSync(v).isFile())
      // 不需要测试代码
      .filter((v) => v.indexOf("_spec") === -1)
      // 生成测试文件
      .map((v) => this.genTestFile(v));
  }

  genTestFile(filename) {
    console.log("genTestFile", filename);
    const testFileName = this.getTestFileName(filename);
    if (fs.existsSync(testFileName)) {
      // 测试代码已经存在了
      return;
    }
    const module = require(filename);
    let source;
    if (typeof module === "object") {
      source = Object.keys(module)
        .map((v) => this.getTestSource(v, path.basename(filename)), true)
        .join("\n");
    } else if (typeof module === "function") {
      let baseFileName = path.basename(filename);
      source = this.getTestSource(
        baseFileName.replace(".js", ""),
        baseFileName
      );
    }
    return source;
  }
}

module.exports = Test;
