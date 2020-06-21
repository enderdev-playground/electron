// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

let overlay;
let main;

const createOverlay = () => {
  overlay = new BrowserWindow({
    width: 1200 - 16, // Because the title bar is included in the size of the window, we need to make our window a bit smaller
    height: 900 - 40, //
    show: false,
    parent: main,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'overlay-preload.js')
    }
  })

  overlay.loadFile('overlay.html')
}

function createWindow () {
  // Create the browser window.
  main = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  main.loadFile('index.html')

  main.setBackgroundColor("#fff")

  createOverlay()
  main.on('move', () => {
    let position = main.getPosition()
    overlay.setPosition(position[0] + 8, position[1] + 32)
  })

  ipcMain.on('open-overlay', async () => {
    overlay.show()
    overlay.setIgnoreMouseEvents(true, { forward: true })
    console.log(await main.webContents.executeJavaScript("let dMC = document.createElement('style'); dMC.id = 'dotBrowserDMC'; dMC.innerText='*{cursor:default}'; document.body.appendChild(dMC); true"))
  })

  ipcMain.on('close-overlay', async () => {
    overlay.hide()
    overlay.setIgnoreMouseEvents(false, { forward: true })
    console.log(await main.webContents.executeJavaScript("document.getElementById('dotBrowserDMC').remove(); true"))
  })

  ipcMain.on('ignore-mouse', () => {
    overlay.setIgnoreMouseEvents(true, { forward: true })
  })

  ipcMain.on('allow-mouse', () => {
    overlay.setIgnoreMouseEvents(false, { forward: true })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
