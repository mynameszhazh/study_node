const { test } = require("@jest/globals");
const { default: expect } = require("expect");
const fs = require("fs");

test("测试, 获取文件名", () => {
  const src = new (require("../index"))();
  let ret = src.getTestFileName("/abc/class.js");
  // console.log("filename", ret);
  expect(ret).toBe("/abc/__test__/class_spec.js");
});

test("测试, 自动生成测试文件", () => {
  const src = new (require("../index"))();
  let ret = src.getTestSource("fun", "class");
  // console.log(ret);
  expect(ret).toBe(`
test('TEST fun', () => {
  const fun = require('../class')
  const ret = fun()
  // exprect(ret)
  //   .toBe('test retrurn')
})`);
});

test("集成测试 测试生成测试代码文件", () => {
  // 准备环境
  // 删除测试文件夹
  fs.rmdirSync(__dirname + "/data/__test__", {
    recursive: true,
  });
});
