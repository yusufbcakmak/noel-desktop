const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onUpdateSettings: (callback) => ipcRenderer.on('update-settings', (event, value) => callback(value)),
    onMusicControl: (callback) => ipcRenderer.on('music-control', (event, command, value) => callback(command, value))
});
