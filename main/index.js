"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const height = 800;
const width = 1200;
// 是否为开发环境
const isDev = process.env.IS_DEV == "true" ? true : false;
const pathResolve = (dir) => (0, path_1.resolve)(__dirname, dir);
let win;
const createWindow = () => {
    // 创建win
    win = new electron_1.BrowserWindow({
        width: width,
        height: height,
        frame: true,
        show: true,
        resizable: true,
        fullscreenable: true,
        webPreferences: {
            preload: pathResolve("preload.js"),
        },
    });
    // const port = process.env.PORT || 3000;
    if (isDev) {
        // 加载本地服务
        win.loadURL(`http://localhost:3000`);
        // 打开开发者工具
        win.webContents.openDevTools();
        return;
    }
    // 加载生成环境路径
    win.loadFile(pathResolve("../dist/index.html"));
};
electron_1.app.whenReady().then(() => {
    // 创建window
    createWindow();
    // 创建服务
    // createServer()
    // 监听app激活
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// 监听所有窗口关闭
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// ipcMain.on('message', (event: IpcMainEvent, message: any) => {
//   console.log(message);
//   setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
// });
