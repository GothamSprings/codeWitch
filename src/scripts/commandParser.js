// Functions
// 1. Function that turns raw text from text editor into array of individual commands split by new line character.

// 2. Function that checks if all commands are valid, returns index of improper command. If no improper commands, returns -1.

// 3.

const acorn = require("acorn")

// let x = "witch.moveRight();"
// console.log(acorn.parse(x).body[0].expression)


// witch.moveRight();
// if (witch.bag === "empty") {
//   witch.pickUp();
// }
// if (witch.bag === "empty") {
//   witch.pickUp();
// }


let code = `witch.moveRight();
if (witch.bag === "empty") {
  witch.pickUp();
}

`
console.log(acorn.parse(code))
