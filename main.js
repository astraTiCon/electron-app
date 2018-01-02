const electron = require("electron")
const {app, BrowserWindow, ipcMain} = electron
const path = require("path")
const url = require("url")

let mainWindow

app.on("ready", () => {
  let mainWindow = new BrowserWindow({width:800, height:600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on("closed", () => {
    mainWindow = null;
  })

})

ipcMain.on("someAction", (event, dat) => {
  console.log(dat);
})
