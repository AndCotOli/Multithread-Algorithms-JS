const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads');
const os = require('os');
const fs = require('fs');

const generatePrimes = require('./generatePrimes');

const min = 2;
let primes = [];

if (isMainThread) {
  const max = 1e7;
  const threadCount =
    process.argv[2] <= os.cpus().length ? process.argv[2] : os.cpus().length;
  const threads = new Set();
  console.log(`Running with ${threadCount} threads...`);
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  for (let i = 0; i < threadCount - 1; i++) {
    const myStart = start;
    threads.add(
      new Worker(__filename, { workerData: { start: myStart, range } })
    );
    start += range;
  }
  threads.add(
    new Worker(__filename, {
      workerData: { start, range: range + ((max - min + 1) % threadCount) }
    })
  );
  for (let worker of threads) {
    worker.on('error', err => {
      throw err;
    });
    worker.on('exit', () => {
      threads.delete(worker);
      console.log(`Thread exiting, ${threads.size} running...`);
      if (threads.size === 0) {
        fs.writeFile('primes.txt', primes.join(', '), err => {
          if (err) throw err;
          console.log('Primes saved!');
        });
      }
    });
    worker.on('message', msg => {
      primes = primes.concat(msg);
    });
  }
} else {
  let primes = [];
  generatePrimes(workerData.start, workerData.range, min, primes);
  parentPort.postMessage(primes);
}
