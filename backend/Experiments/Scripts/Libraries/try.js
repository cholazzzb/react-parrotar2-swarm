import async from "async";

// var steps = [];

// const printHello = () => {
//   console.log("Hello");
// };
// const printDone = () => {
//   console.log("Done");
// };
// const one = () => {
//   console.log("one");
// };

// const two = (callback) => {
//   console.log("two");
//   console.log("callback", callback)
//   callback(2);
// };

// steps.push(one);
// steps.push(two);
// steps.push(printHello);

// async.waterfall(steps, printDone);

// async.waterfall(
//   [
//     function (callback) {
//       console.log("first");
//       callback(console.log("nANI"), "gfg", "one");
//     },
//     function (arg1, arg2, callback) {
//       console.log("second");
//       // The arg1 now equals 'gfg'
//       // and arg2 now equals 'one'
//       callback(null, "two");
//     },
//     function (arg1, callback) {
//       console.log("three");
//       // The arg1 now equals 'two'
//       callback(null, "complete");
//     },
//   ],
//   function (err, result) {
//     // Result now equals 'complete'
//   }
// );

console.log(`first`)
setInterval(() => {
    console.log(`when`)
}, 1000);

