const electron = require("electron");
const {ipcRenderer} = electron;


let input = null;
function inputEventHandler(element) { // Handles all input except equals sign
  input = document.getElementById("inputBox").value + element.value;
  document.getElementById("inputBox").value = input
}


function equalsEventHandler(element){
  input = document.getElementById("inputBox").value;
  if (input) {
    const pattern = /^(?:[0-9]+[*/+-])*[0-9]+/;
    input = input.match(pattern);

    if (input){
      input = input[0];
      let inputArray = mathStrToArray(input);
      let rpn = toRPN(inputArray);
      document.getElementById("output").innerHTML = calculateOnRPN(rpn)
    }
  }
}


function logMessage(input) {} //log in Main process, renderer doesn't log to cmd


function mathStrToArray(inputString){
  // Manipulate math expression string so that each operand and operator is a
  // separate element in an Array

  let operands = inputString.split(/[*+-/]/).map(x => Number(x)) //NOTE: does it need filtering like below?
  let operators = inputString.split(/[0-9]+/).filter(e => e) //filter out any empty strings
  let inputArrayParsed = [];
  for (let i = 0; i < operators.length; i++) {
    inputArrayParsed.push(operands[i]);
    inputArrayParsed.push(operators[i])
  }
  let finalOperand =  operands.slice(-1, operands.length)[0]; //get last element
  inputArrayParsed.push(finalOperand);

  return inputArrayParsed
}


// @return RPN array
// convert input array to Reverse Polish Notation array
function toRPN(inputArray) {
    function hasOperatorPrecedence(operator1, operator2) {
        // @return boolean -> true if operator1 has precedence over operator2
        // NOTE: if the two operators are of equal precedence, it will return true given the nature of conversion to RPN

        let tierOneOperators = ["*", "/"]; //operators with the highest precedence
        let tierTwoOperators = ["+", "-"];

        return !(tierTwoOperators.includes(operator1) && tierOneOperators.includes(operator2));

    }

    // @format inputArray = [69, "*", 41, "+", 12, "-", 1]
    let rpnArray = [];
    let tempOperatorStack = [];

    // push onto RPN stack
    for (var i = 0; i < inputArray.length; i++) {
        if (typeof inputArray[i] === "number") { // Numbers go straight onto the output stack
            rpnArray.push(inputArray[i])
        } else {
            while ( tempOperatorStack.length > 0 && hasOperatorPrecedence(tempOperatorStack[tempOperatorStack.length - 1], inputArray[i])) { //does NOT have precedence
                rpnArray.push(tempOperatorStack.pop())
            }
            tempOperatorStack.push(inputArray[i])
        }
    }
    // Push the rest of tempOperatorStack onto rpnArray
    while (tempOperatorStack.length > 0) {
        rpnArray.push(tempOperatorStack.pop())
    }


    return rpnArray
}

// Perform math operations on RPN array and return the resulting "sum"
function calculateOnRPN(rpnArray) {
  let computation;

  // while (rpnArray > 2){
  //
  // }
  return computation
}



