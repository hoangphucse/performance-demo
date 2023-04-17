import { convertArrayNumberToBuffer } from './utils.js';

export const demo_profiler = (function () {
  function TimedTest(name, test, num) {
    const times = [];
    const startTestTime = performance.now();

    for (let i = 0; i < num; ++i) {
      const startTime = performance.now();
      test();
      const totalTime = performance.now() - startTime;
      times.push(totalTime);
    }

    const totalTestTime = performance.now() - startTestTime;

    console.log('-----------------------------');
    console.log('Single threaded Test !');
    console.log('-----------------------------');

    for (let i = 0; i < num; ++i) {
      console.log(name + '[' + i + ']: ' + times[i] + 'ms');
    }
    console.log('TOTAL: ' + totalTestTime + 'ms');
  }
  function TimedTest_Threaded(name, entry, work, num) {
    const workers = [...Array(num)].map(
      (_) => new Worker(entry, { type: 'module' })
    );

    let totalTime = null;
    let done = 0;
    const times = [];

    const startTime = performance.now();
    for (let i = 0; i < work.length; ++i) {
      // const bufferData = convertArrayNumberToBuffer(work[i]);
      // workers[i % workers.length].postMessage(bufferData.buffer, [
      //   bufferData.buffer,
      // ]);
      workers[i % workers.length].postMessage(work[i]);
    }

    for (let i = 0; i < workers.length; i++) {
      workers[i].onmessage = (msg) => {
        done += 1;
        times.push(performance.now() - startTime);

        if (done == work.length) {
          totalTime = performance.now() - startTime;

          console.log('-----------------------------');
          console.log('Worker Test - ' + name + ' - ' + num + ' threads');
          console.log('-----------------------------');
          console.log('TOTAL: ' + totalTime + 'ms');
        }
      };
    }
  }

  return {
    TimedTest,
    TimedTest_Threaded,
  };
})();
