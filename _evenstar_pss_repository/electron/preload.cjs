const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pss", {
  loadRegister: () => ipcRenderer.invoke("register:load"),
  saveRegister: (data) => ipcRenderer.invoke("register:save", data),
  resetRegister: () => ipcRenderer.invoke("register:reset"),
});
