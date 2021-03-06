var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var dialog = require('dialog');

var fs = require('fs');

var LogFile = require('./logfile');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/../static/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: "Log Viewer",
      submenu: [
        {
          label: 'Services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Log Viewer',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ],
    },
    {
      label: "File",
      submenu: [
        {
          label: "Open...",
          accelerator: "Command+O",
          click: function() { openFile() }
        }
      ]
    }
  ]))

  function openFile() {
    var options = {
      properties: ["openFile", "multiSelections"],
      filters: [
        { name: "Log Files", extensions: ['log'] }
      ]
    }
    function callback(paths) {
      paths.forEach(function(path) {
        var stream = fs.createReadStream(path);
        var logfile = new LogFile(stream);
        logfile.on("error", function() { console.log("boom!"); console.log(arguments); });
        mainWindow.webContents.send("open-file", path, logfile);
      });
    }
    dialog.showOpenDialog(options, callback)
  }

});
