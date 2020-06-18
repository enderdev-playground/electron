const electron = require("electron")

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

window.openOverlay = () => {
  console.log("hi")
  electron.ipcRenderer.send('open-overlay');
}

window.closeOverlay = () => {
  console.log("hi")
  electron.ipcRenderer.send('close-overlay');
}

window.addEventListener('click', () => {
  document.body.style.backgroundColor = "#2196f68c"

  setTimeout(() => {
    document.body.style.backgroundColor = ""
  }, 100)
});