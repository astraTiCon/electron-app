const electron = require("electron")
const {ipcRenderer} = electron

// TODO: handle event for dot button press

function numbersEventHandler(element) {
  let integerPressed = parseInt(element.value)
  // ipcRenderer.send('someAction', integerPressed);
}

function equalsEventHandler(element){
  // response action
}
