test("async callsk", (done) => {
  const { callback } = require("../index.js");
  callback();
  setTimeout(() => {
    done();
  }, 1000);
});

test("async callsk", (done) => {
  const { promise } = require("../index.js");
  promise();
  setTimeout(() => {
    done();
  }, 1000);
});

test("generator log", (done) => {
  const { generator } = require("../index.js");
  generator();
  setTimeout(() => {
    done();
  }, 1000);
});

test("async await", (done) => {
  const { asyncAwait } = require("../index.js");
  asyncAwait();
  setTimeout(() => {
    done();
  }, 1000);
});

test("event handle", (done) => {
  const { event } = require("../index.js");
  event();
  setTimeout(() => {
    done();
  }, 1000);
});
