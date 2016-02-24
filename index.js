module.exports = throttle;

function throttle(fn, ms) {
  var queue = [];
  var lastTimeCalled = 0;
  var timer = null;

  return throttled;

  function throttled() {
    queue.push(arguments);
    scheduler();

    function scheduler() {
      if (timer) return;

      const diff = Date.now() - lastTimeCalled;
      if (diff > ms) 
        return apply(fn, queue.shift());

      const delay = ms - diff;
      timer = setTimeout(() => {
        apply(fn, queue.shift());
        timer = null;
        if (queue.length > 0)
          return scheduler();

      }, delay);
    }

    function apply(fn, args) {
      fn.apply(fn, args);
      lastTimeCalled = Date.now();
    }
  }
}
