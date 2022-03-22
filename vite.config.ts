import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// alias配置
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: './', //  生产环境资源路径
	server: {
		host: true,
		port: 3000,
		hmr: {
			overlay: false
		}
	}
})
