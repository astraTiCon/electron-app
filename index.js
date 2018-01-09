const electron = require("electron")
const {ipcRenderer} = electron


let input = null
function inputEventHandler(element) { // Handles all input except equals sign
  input = document.getElementById("inputBox").value + element.value
  document.getElementById("inputBox").value = input
}


function equalsEventHandler(element){
  input = document.getElementById("inputBox").value
  if (input) {
    const pattern = /^(?:[0-9]+[*/+-])*[0-9]+/
    input = input.match(pattern)

    if (input){
      input = input[0]
      let inputArray = mathStrToArray(input)
      let rpn = toRPN(inputArray)
      document.getElementById("output").innerHTML = calculateRPN(rpn)
    }
  }
}


function logMessage(input) { //log in Main process, renderer doesn't log to cmd


function mathStrToArray(inputString){
  // Manipulate math expression string so that each operand and operator is a
  // seperate element in an Array

  let operands = inputString.split(/[*+-/]/).map(x => Number(x)) //NOTE: does it need filtering like below?
  let operators = inputString.split(/[0-9]+/).filter(e => e) //filter out any empty strings
  let inputArrayParsed = [];
  for (let i = 0; i < operators.length; i++) {
    inputArrayParsed.push(operands[i]) // push = append
    inputArrayParsed.push(operators[i])
  };
  let finalOperand =  operands.slice(-1, operands.length)[0] //get last element
  inputArrayParsed.push(finalOperand);

  return inputArrayParsed
}


function toRPN(inputArray){ // Reverse Polish Notation
  let rpnArray = []

  return rpnArray
}


function calculateRPN(rpnArray){
  let computation;
  // while (rpnArray > 2){
  //
  // }
  return computation
}
