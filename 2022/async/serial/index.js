function callback() {
  setTimeout(() => {
    console.log("callback1");
    setTimeout(() => {
      console.log("callback2");
      setTimeout(() => {
        console.log("callback3");
      }, 100);
    }, 100);
  }, 100);
}

function promise(name, delay = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name);
      resolve(); // 只要有这个函数就会有会面的 t
    }, delay);
  });
}

exports.callback = callback;
exports.promise = () => {
  promise("promise1").then(promise("promise2")).then(promise("promise3"));
};
exports.generator = () => {
  const generator = function* (name) {
    yield promise(name + 1);
    yield promise(name + 2);
    yield promise(name + 3);
  };
  const co = (generator) => {
    // 这个 it 会变成一个全局变量吗?
    if ((it = generator.next().value)) {
      it.then(() => {
        co(generator);
      });
    } else {
      return;
    }
  };
  co(generator("co-generator"));
};

exports.asyncAwait = async () => {
  await promise("async await 1");
  await promise("async await 2");
  await promise("async await 3");
};

exports.event = () => {
  const asyncEvent = (name) => (event) => {
    setTimeout(() => {
      console.log(name);
      event.emit("end");
    }, 100);
    return event;
  };
  let ary = [
    asyncEvent("event 1"),
    asyncEvent("event 2"),
    asyncEvent("event 3"),
  ];
  const { EventEmitter } = require("events");
  const event = new EventEmitter();
  let i = 0;
  event.on("end", () => i < ary.length && ary[i++](event));
  event.emit("end");
};
