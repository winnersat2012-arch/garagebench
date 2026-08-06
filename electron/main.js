const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const { spawn } = require('child_process');

const isPackaged = app.isPackaged;
const isDev = !isPackaged;
const baseUrlBackend = 'http://127.0.0.1:3000';

let backendProc = null;
let frontendProc = null;
let mainWindow = null;
const rootPath = path.resolve(__dirname, '..');
const appPath = isPackaged ? path.join(process.resourcesPath, 'app') : rootPath;
const backendPath = path.join(appPath, 'backend');
const frontendPath = path.join(appPath, 'frontend');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function spawnService(command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  });

  child.stdout.on('data', (data) => console.log(`[${command} ${cwd}]`, data.toString()));
  child.stderr.on('data', (data) => console.error(`[${command} ${cwd}]`, data.toString()));
  return child;
}

function startBackendDev() {
  return spawnService(npmCmd, ['--prefix', backendPath, 'run', 'start:dev'], rootPath);
}

function startFrontendDev() {
  return spawnService(npmCmd, ['--prefix', frontendPath, 'start'], rootPath);
}

function startBackendProd() {
  const backendMain = path.join(backendPath, 'dist', 'main.js');
  return spawnService(process.execPath, [backendMain], backendPath);
}

function buildErrorMessage(context) {
  return `No se pudo iniciar ${context}. Revisa que esté compilado y que los binarios existan.`;
}

async function waitUntilHealthy(url, tries = 40) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 750));
  }
  return false;
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 820,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  Menu.setApplicationMenu(null);

  if (isDev) {
    await mainWindow.loadURL('http://127.0.0.1:4200');
  } else {
    const indexPath = path.join(frontendPath, 'dist', 'frontend', 'index.html');
    mainWindow.loadFile(indexPath);
  }
}

app.whenReady().then(async () => {
  if (isDev) {
    backendProc = startBackendDev();
    frontendProc = startFrontendDev();
  } else {
    backendProc = startBackendProd();
  }

  const backendReady = await waitUntilHealthy(`${baseUrlBackend}/health`, 80);
  if (!backendReady) {
    console.error(buildErrorMessage('backend'));
    app.quit();
    return;
  }

  await createWindow();

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (backendProc) backendProc.kill();
  if (frontendProc) frontendProc.kill();
});
