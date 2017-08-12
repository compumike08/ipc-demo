const electron = require('electron');

const {ipcRenderer} = electron;

document.getElementById('start').addEventListener('click', _ => {
    ipcRenderer.send('countdown-start');
});

ipcRenderer.on('countdown', (evt, count) => {
    document.getElementById('count').innerHTML = count;
});
