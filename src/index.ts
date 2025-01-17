import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron";
import path from "path";
import { runIpcMainHandlers } from "./ipc";
import * as esbuild from "esbuild";

const ctx = esbuild.buildSync({
  stdin: {
    contents: `let val: any = 43;`,
    resolveDir: "./src",
    sourcefile: "demo.ts",
    loader: "ts"
  },
  write: false,
  format: "esm"
});
console.log("=== ctx ===", ctx);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if(require("electron-squirrel-startup")) {
  app.quit();
}

let quiting: boolean = false;
let mainWindow: BrowserWindow;
let appTray: Tray;
const icon = nativeImage.createFromPath(path.resolve(__dirname, "./assets/favicon.png"))

const createWindow = (): void => {
  // Menu.setApplicationMenu(null);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 900,
    icon: icon,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    useContentSize: true,
    autoHideMenuBar: true,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("close", (ev) => {
    if(quiting) {
      mainWindow.destroy();
      mainWindow = null;
    } else {
      ev.preventDefault();
      mainWindow.hide();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
  .then(() => {
    const trayMenuTemplate = [
      {
        label: "词典界面",
        click: () => {
          if(mainWindow) mainWindow.show();
          else createWindow();
        }
      },
      {
        label: "退出",
        click: () => {
          app.quit();
        }
      }
    ];

    appTray = new Tray(nativeImage.createFromPath(path.resolve(__dirname, "./assets/faviconTemplate.png")));

    appTray.setToolTip("friday");
    
    const ctxMenu = Menu.buildFromTemplate(trayMenuTemplate);
    appTray.setContextMenu(ctxMenu);

    runIpcMainHandlers();
  })
  .then(() => {
    createWindow();
  });

app.setName("friday");
app.dock.setIcon(icon);

app.on("window-all-closed", () => {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else if(mainWindow) {
    mainWindow.show();
  }
});

app.on("before-quit", () => {
  quiting = true;
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
