const electron = require("electron")

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("box").addEventListener('mouseleave', () => {
        electron.ipcRenderer.send('ignore-mouse');
        console.log("ignore")
    })
    
    document.getElementById("box").addEventListener('mouseenter', () => {
        electron.ipcRenderer.send('allow-mouse');
        console.log("allow")
    })
})

window.addEventListener('click', () => {
    document.getElementById("box").style.backgroundColor = "pink"
  
    setTimeout(() => {
        document.getElementById("box").style.backgroundColor = "yellow"
    }, 100)
});