const electron = require('electron');

const countdown = require('./countdown');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const ipc = electron.ipcMain;

let windows = [];

app.on('ready', _ => {
  [1, 2, 3].forEach(num => {
    let win = new BrowserWindow({
      height: 400,
      width: 400
    });

    win.loadURL(`file://${__dirname}/countdown.html`);

    win.on('closed', _ => {
      let idx = windows.indexOf(win);
      windows.splice(idx, 1);
      console.log('closed a window!');
    });

    windows.push(win);
  });

  const appName = electron.app.getName();
  const template = [
    {
      label: appName,
      submenu: [{
        label: `About ${appName}`
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        click: _ => {
          app.quit();
        }
      }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

ipc.on('countdown-start', _ => {
  countdown(count => {
    console.log('count', count);
    windows.forEach(win => {
      win.webContents.send('countdown', count);
    });
  })
});
