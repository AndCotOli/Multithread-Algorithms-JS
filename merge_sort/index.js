const {
  Worker,
  isMainThread,
  workerData,
  parentPort
} = require('worker_threads');
const fs = require('fs');
const os = require('os');

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);

  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  mergedArray = result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));

  return mergedArray;
}

if (isMainThread) {
  const createArr = require('../utils/createArr');
  const NUM_CPUS =
    process.argv[2] <= os.cpus().length ? process.argv[2] : os.cpus().length;
  const ARRAY_LENGTH = 10000;

  let arr = createArr(ARRAY_LENGTH, 1, 200);
  let result = [];
  console.log(`Running with ${NUM_CPUS} threads...`);

  const range = Math.ceil(ARRAY_LENGTH / NUM_CPUS);
  const Workers = new Set();
  let start = 0;
  for (let i = 0; i < NUM_CPUS - 1; i++) {
    let workerStart = start;
    let workerArr = arr.slice(workerStart, workerStart + range);
    Workers.add(
      new Worker(__filename, {
        workerData: { array: workerArr, index: i }
      })
    );
    start += range;
  }
  let remainingArray = arr.slice(start, start + range);
  Workers.add(
    new Worker(__filename, {
      workerData: { array: remainingArray, index: NUM_CPUS }
    })
  );

  for (let worker of Workers) {
    worker.on('error', err => {
      throw err;
    });

    worker.on('exit', () => {
      Workers.delete(worker);
      console.log(`Thread exiting, running with ${Workers.size} threads`);
      if (Workers.size === 0) {
        fs.writeFile('./sorted_array.txt', result, (err, data) => {
          if (err) throw err;
          console.log('Finished');
        });
      }
    });

    worker.on('message', msg => {
      result = merge(result, msg);
    });
  }
} else {
  let result = mergeSort(workerData.array);
  parentPort.postMessage(result);
}
