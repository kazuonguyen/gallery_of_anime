const { app, BrowserWindow } = require('electron')
var server = require("./server")
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      show:false,
   
    })
  win.setMenuBarVisibility(false);
    win.loadURL('http://localhost:3000')
    win.once('ready-to-show', () => {
        win.show()
      })
      
  }
  app.whenReady().then(() => {
    createWindow()
  })