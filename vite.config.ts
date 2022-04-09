import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
// alias配置
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [reactRefresh(), tsconfigPaths()],
	base: './', //  生产环境资源路径
	server: {
		host: true,
		port: 3000,
		hmr: {
			overlay: false
		}
	}
})
