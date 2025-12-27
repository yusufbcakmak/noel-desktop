const { app, BrowserWindow, Tray, Menu, ipcMain, screen } = require('electron');
const path = require('path');

let treeWindow;
let snowWindow;
let tray;

// Settings state
let settings = {
    density: 'Med',
    speed: 'Slow',
    musicPlaying: true,
    volume: 0.2,
    treeAlwaysOnTop: false
};

function createTreeWindow() {
    treeWindow = new BrowserWindow({
        width: 350,
        height: 450,
        frame: false,
        transparent: true,
        alwaysOnTop: settings.treeAlwaysOnTop,
        skipTaskbar: true,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Ensure preload is here too
            nodeIntegration: false,
            contextIsolation: true,
            autoplayPolicy: 'no-user-gesture-required' // Allow autoplay
        }
    });

    treeWindow.loadFile(path.join(__dirname, 'src/tree/index.html'));

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    treeWindow.setPosition(width - 400, height - 500);

    // Initialize music state once loaded
    treeWindow.webContents.on('did-finish-load', () => {
        // Auto-start music if supposed to
        if (settings.musicPlaying) {
            treeWindow.webContents.send('music-control', 'play');
        }
        treeWindow.webContents.send('music-control', 'volume', settings.volume);
    });

    treeWindow.on('closed', () => {
        treeWindow = null;
    });
}

function createSnowWindow() {
    const { width, height } = screen.getPrimaryDisplay().bounds;

    snowWindow = new BrowserWindow({
        width: width,
        height: height,
        x: 0,
        y: 0,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        hasShadow: false,
        focusable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    snowWindow.loadFile(path.join(__dirname, 'src/snow/index.html'));

    snowWindow.setIgnoreMouseEvents(true, { forward: true });

    snowWindow.on('closed', () => {
        snowWindow = null;
    });
}

function createTray() {
    const iconPath = path.join(__dirname, 'assets/icon.png');
    tray = new Tray(iconPath);

    updateTrayMenu();
}

function updateTrayMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Toggle Tree',
            type: 'checkbox',
            checked: treeWindow && treeWindow.isVisible(),
            click: (item) => {
                if (item.checked) {
                    if (!treeWindow) createTreeWindow();
                    else treeWindow.show();
                } else {
                    if (treeWindow) treeWindow.hide();
                }
            }
        },
        {
            label: 'Toggle Snow',
            type: 'checkbox',
            checked: snowWindow && snowWindow.isVisible(),
            click: (item) => {
                if (item.checked) {
                    if (!snowWindow) createSnowWindow();
                    else snowWindow.show();
                } else {
                    if (snowWindow) snowWindow.hide();
                }
            }
        },
        {
            label: 'Tree Always On Top',
            type: 'checkbox',
            checked: settings.treeAlwaysOnTop,
            click: () => toggleTreeAlwaysOnTop()
        },
        { type: 'separator' },
        {
            label: 'Music',
            submenu: [
                {
                    label: settings.musicPlaying ? 'Pause Music' : 'Play Music',
                    click: () => toggleMusic()
                },
                { type: 'separator' },
                { label: 'Volume: Low', type: 'radio', checked: settings.volume === 0.2, click: () => setVolume(0.2) },
                { label: 'Volume: Medium', type: 'radio', checked: settings.volume === 0.5, click: () => setVolume(0.5) },
                { label: 'Volume: High', type: 'radio', checked: settings.volume === 1.0, click: () => setVolume(1.0) }
            ]
        },
        { type: 'separator' },
        {
            label: 'Snow Density',
            submenu: [
                { label: 'Low', type: 'radio', checked: settings.density === 'Low', click: () => updateSnowSettings('density', 'Low') },
                { label: 'Med', type: 'radio', checked: settings.density === 'Med', click: () => updateSnowSettings('density', 'Med') },
                { label: 'High', type: 'radio', checked: settings.density === 'High', click: () => updateSnowSettings('density', 'High') }
            ]
        },
        {
            label: 'Snow Speed',
            submenu: [
                { label: 'Slow', type: 'radio', checked: settings.speed === 'Slow', click: () => updateSnowSettings('speed', 'Slow') },
                { label: 'Fast', type: 'radio', checked: settings.speed === 'Fast', click: () => updateSnowSettings('speed', 'Fast') }
            ]
        },
        { type: 'separator' },
        { label: 'Quit', role: 'quit' }
    ]);

    tray.setToolTip('Christmas Desktop');
    tray.setContextMenu(contextMenu);
}

function toggleTreeAlwaysOnTop() {
    settings.treeAlwaysOnTop = !settings.treeAlwaysOnTop;
    if (treeWindow) {
        treeWindow.setAlwaysOnTop(settings.treeAlwaysOnTop);
    }
    updateTrayMenu();
}

function toggleMusic() {
    settings.musicPlaying = !settings.musicPlaying;
    if (treeWindow) {
        treeWindow.webContents.send('music-control', settings.musicPlaying ? 'play' : 'pause');
    }
    updateTrayMenu();
}

function setVolume(vol) {
    settings.volume = vol;
    if (treeWindow) {
        treeWindow.webContents.send('music-control', 'volume', vol);
    }
    updateTrayMenu();
}

function updateSnowSettings(key, value) {
    settings[key] = value;
    if (snowWindow) {
        snowWindow.webContents.send('update-settings', settings);
    }
    updateTrayMenu();
}

app.whenReady().then(() => {
    createTreeWindow();
    createSnowWindow();
    createTray();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createTreeWindow();
            createSnowWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
