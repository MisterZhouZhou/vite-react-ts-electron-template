import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'

const height = 800
const width = 1200

// 是否为开发环境
const isDev = process.env.IS_DEV == 'true' ? true : false
const pathResolve = (dir: string) => resolve(__dirname, dir)

let win: BrowserWindow
const createWindow = () => {
	// 创建win
	win = new BrowserWindow({
		width: width,
		height: height,
		frame: true,
		show: true,
		resizable: true,
		fullscreenable: true,
		webPreferences: {
			preload: pathResolve('preload.js')
		}
	})

	// const port = process.env.PORT || 3000;
	if (isDev) {
		// 加载本地服务
		win.loadURL(`http://localhost:3000`)
		// 打开开发者工具
		win.webContents.openDevTools()
		return
	}
	// 加载生成环境路径
	win.loadFile(pathResolve('../index.html'))
}

app.whenReady().then(() => {
	// 创建window
	createWindow()
	// 创建服务
	// createServer()
	// 监听app激活
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

// 监听所有窗口关闭
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// ipcMain.on('message', (event: IpcMainEvent, message: any) => {
//   console.log(message);
//   setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
// });
