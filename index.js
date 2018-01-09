const electron = require("electron")
const {ipcRenderer} = electron

let currentComputation = null
// parseInt(someString) --> int
function inputEventHandler(element) { // Handles all input except equals sign
  currentComputation = document.getElementById("inputBox").value + element.value
  document.getElementById("inputBox").value = currentComputation
}

function equalsEventHandler(element){
  currentComputation = document.getElementById("inputBox").value
  if (currentComputation) {
    // logInput(currentComputation) // just to log a message that input has occurred
    document.getElementById("output").innerHTML = parseInput(currentComputation)
  }
}

function logInput(input) {
  ipcRenderer.send('someAction', input);
  return 2
}

function parseInput(input){
  // TODO: operator precedence
  
  const pattern = /^(?:[0-9]+[*/+-])*[0-9]+/
  let sum

  let out = input.match(pattern)
  if (out){
    out = out[0]
    let operands = out.split(/[*+-/]/) //NOTE: does it need filtering for empty str?
    operands = operands.map(x => Number(x))
    let operators = out.split(/[0-9]+/).filter(e => e) //filter any empty strings

    sum = operands[0]
    for (var i = 0; i < operators.length; i++){
      switch (operators[i]) {
        case "*":
          sum *= operands[i+1]
          break;
        case "/":
          sum /= operands[i+1]
          break;
        case "+":
          sum += operands[i+1]
          break;
        case "-":
          sum -= operands[i+1]
          break;
      }
    }
  }

  return sum

}
