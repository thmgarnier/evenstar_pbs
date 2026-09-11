import { app, BrowserWindow, ipcMain } from "electron";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;

function fixturePath() {
  return path.join(__dirname, "../src/fixtures/register.json");
}

function registerPath() {
  return path.join(app.getPath("userData"), "pss-register.json");
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function loadRegisterFromDisk() {
  const dest = registerPath();
  if (!fs.existsSync(dest)) {
    writeJson(dest, readJson(fixturePath()));
  }
  return readJson(dest);
}

function resetRegisterOnDisk() {
  const dest = registerPath();
  const fixture = readJson(fixturePath());
  writeJson(dest, fixture);
  return fixture;
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 720,
    backgroundColor: "#0c151c",
    autoHideMenuBar: true,
    title: "Evenstar — Plant Simulation System",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (isDev) {
    const url = "http://127.0.0.1:5173";
    const tryLoad = async (attempt = 0) => {
      try {
        await window.loadURL(url);
      } catch {
        if (attempt > 40) throw new Error(`Could not load ${url}`);
        await new Promise((resolve) => setTimeout(resolve, 250));
        return tryLoad(attempt + 1);
      }
    };
    window.webContents.on("console-message", (_event, _level, message) => {
      console.log("[renderer]", message);
    });
    void tryLoad();
  } else {
    window.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  ipcMain.handle("register:load", () => loadRegisterFromDisk());
  ipcMain.handle("register:save", (_event, data) => {
    writeJson(registerPath(), data);
    return true;
  });
  ipcMain.handle("register:reset", () => resetRegisterOnDisk());

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
