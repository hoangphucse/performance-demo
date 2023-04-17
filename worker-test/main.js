import { demo_profiler } from './demo-profiler.js';
import { Test_SumSquares, generateValue } from './utils.js';

const valToGenerate = 12345 * 4567;

// const vals = generateValue(valToGenerate);

demo_profiler.TimedTest(
  'Sum of Squares',
  () => {
    generateValue(valToGenerate);
  },
  8
);

demo_profiler.TimedTest_Threaded(
  'Sum of Squares',
  'worker.js',
  [
    valToGenerate,
    valToGenerate,
    valToGenerate,
    valToGenerate,
    valToGenerate,
    valToGenerate,
    valToGenerate,
    valToGenerate,
  ],
  window.navigator.hardwareConcurrency / 2
);
