import { defineConfig, } from 'vite';
import { fileURLToPath, } from 'url';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			app: path.resolve(__dirname, './src/app'),
			assets: path.resolve(__dirname, './src/assets'),
			components: path.resolve(__dirname, './src/components'),
			pages: path.resolve(__dirname, './src/pages'),
			services: path.resolve(__dirname, './src/services'),
			styles: path.resolve(__dirname, './src/styles'),
			types: path.resolve(__dirname, './src/types'),
			utils: path.resolve(__dirname, './src/utils'),
			state: path.resolve(__dirname, './src/state'),
			actions: path.resolve(__dirname, './src/state/actions'),
			context: path.resolve(__dirname, './src/state/context'),
			hooks: path.resolve(__dirname, './src/state/hooks'),
			reducers: path.resolve(__dirname, './src/state/reducers'),
		},
	},
});
