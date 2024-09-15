const { app, BrowserWindow } = require("electron");
const querystring = require("node:querystring");
const path = require("path");
const PouchDB = require("pouchdb");

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:8080"); // Webpack Dev Server
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const username = "admin";
const password = "password";
const localDB = new PouchDB("local-db");

const remoteDB = new PouchDB("http://localhost:5984/osom_project", {
  auth: {
    username: "admin",
    password: "password",
  },
});

// const remoteDB = new PouchDB(
//   `http://${username}:${password}@localhost:5984/osom_project`,
// );

localDB
  .sync(remoteDB, {
    live: true,
    retry: true,
  })
  .on("change", (info) => {
    // Handle change
    console.log("Sync change:", info);
  })
  .on("paused", (err) => {
    // Replication paused
    console.log("Sync paused:", err);
  })
  .on("active", () => {
    // Replication resumed
    console.log("Sync active");
  })
  .on("error", (err) => {
    // Handle error
    console.error("Sync error:", err);
  });
