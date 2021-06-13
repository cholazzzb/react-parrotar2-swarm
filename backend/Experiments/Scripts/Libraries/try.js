import async from "async";
import autonomy from "ardrone-autonomy";
import Map from "./Map.js"

var test = new Map()
console.log(test)

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

// let steps = [
//   function (callback) {
//     console.log("first");
//     callback(console.log("nANI"), "gfg", "one");
//   },
//   function (arg1, arg2, callback) {
//     console.log("second");
//     // The arg1 now equals 'gfg'
//     // and arg2 now equals 'one'
//     callback(null, "two");
//   },
//   function (arg1, callback) {
//     console.log("three");
//     // The arg1 now equals 'two'
//     callback(null, "complete");
//   },
// ];
// console.log(`before ${steps}`);
// async.waterfall(steps, function (err, result) {
//   // Result now equals 'complete'
//   console.log(`after ${steps}`);
// });
// var [client, control, mission] = autonomy.createMission({
//     ip: "192.168.1.2"
// })

// console.log('before', mission._steps)
// mission.takeoff().zero()
// console.log(`after ${mission._steps}`)
// mission.run()
// console.log(`end ${mission._steps}`)
