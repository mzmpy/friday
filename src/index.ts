import { app, BrowserWindow, Tray, Menu } from "electron";
import path from "path";
import { runIpcMainHandlers } from "./ipc";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if(require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow;
let appTray: Tray;

const createWindow = (): void => {
  // Menu.setApplicationMenu(null);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 900,
    icon: path.resolve(__dirname, "./assets/favicon.png"),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    useContentSize: true,
    autoHideMenuBar: true,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  const trayMenuTemplate = [
    {
      label: "词典界面",
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: "退出",
      click: () => {
        mainWindow.destroy();
      }
    }
  ];

  appTray = new Tray(path.resolve(__dirname, "./assets/favicon.png"));

  appTray.setToolTip("friday");
  
  const ctxMenu = Menu.buildFromTemplate(trayMenuTemplate);
  appTray.setContextMenu(ctxMenu);

  appTray.on('double-click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true);
  });

  mainWindow.on("close", (ev) => {
    ev.preventDefault();
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  })

  runIpcMainHandlers();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if(BrowserWindow.getAllWindows().length === 0 || mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
