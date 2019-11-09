const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads');
const os = require('os');
const fs = require('fs');

const merge = require('../utils/merge');

function quickSort(arr, low, high) {
  if (low < high) {
    pivot = partition(arr, low, high);

    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];

  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

if (isMainThread) {
  const createArr = require('../utils/createArr');
  const NUM_CPUS =
    process.argv[2] <= os.cpus().length ? process.argv[2] : os.cpus().length;
  const ARRAY_LENGTH = 10000;
  console.log(`Running with ${NUM_CPUS} threads...`);

  let arr = createArr(ARRAY_LENGTH, 1, 200);
  let result = [];

  const Workers = new Set();
  let range = Math.ceil(ARRAY_LENGTH / NUM_CPUS);
  let start = 0;

  for (let i = 0; i < NUM_CPUS - 1; i++) {
    let workerStart = start;
    let workerArr = arr.slice(workerStart, workerStart + range);
    Workers.add(
      new Worker(__filename, {
        workerData: { array: workerArr }
      })
    );
    start += range;
  }

  let remainingArray = arr.slice(start, start + range);
  Workers.add(
    new Worker(__filename, {
      workerData: { array: remainingArray }
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
  let result = quickSort(workerData.array, 0, workerData.array.length - 1);
  parentPort.postMessage(result);
}
