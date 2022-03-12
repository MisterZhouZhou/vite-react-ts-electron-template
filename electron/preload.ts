// import { ipcRenderer, IpcRenderer } from 'electron'
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text as string;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

// declare global {
//   namespace NodeJS {
//     interface Global {
//       ipcRenderer: IpcRenderer
//     }
//   }
// }

// process.once('loaded', () => {
//   global.ipcRenderer = ipcRenderer
// })
