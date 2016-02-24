const Throttle = require('../');
const assert = require('assert');

function delay(fn, times) {
  var count = 1;
  return function() {
    if (count < times) return count++;
    fn();
  }
}

describe('Throttle', () => {
  var fn;
  const ms = 50;

  beforeEach(()=>{
    function func(cb) { cb(Date.now()); }
    fn = Throttle(func, ms);
  });
  
  it('respect the time between call the functions', (done) => {
    var times = [];

    fn(verify);
    fn(verify);
    fn(verify);

    function verify(value) {
      times.push(value);
      if (times.length === 3) {
        assert((times[1] - times[0]) >= ms);
        assert((times[2] - times[1]) >= ms);
        done()
      }
    }
  });

  it('calls the first time immediately', (done) => {
    const now = Date.now();
    fn(() => {
      assert((Date.now() - now) < 5);
      done();
    });;
  });

  it(`call the function immediately after wait more then ${ms}ms`, (done) => {
    verify = delay(verify, 2);
    fn(verify);
    fn(verify);

    function verify(value) {
      setTimeout(callImmediately, ms + 5)
      
      function callImmediately() {
        const now = Date.now();
        fn(() => {
          assert((Date.now() - now) < 5);
          done();
        });
      }
    }
  });

});
