const path = require("path");

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
}

module.exports = Test;
