"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let mainWindow = null;
const createWindow = () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    const isDev = !electron_1.app.isPackaged;
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000'); // Dev server
    }
    else {
        // In production, use the hosted app (served by `next start`)
        mainWindow.loadURL('http://localhost:3000');
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
