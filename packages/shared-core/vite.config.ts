import { defineConfig } from 'vite';
import path from 'path';
import packageJson from './package.json';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: packageJson.name,
			formats: ['es', 'cjs'],
			fileName: (format) => `core.${format}.js`,
		},
		rollupOptions: {
			external: [],
		},
		minify: false,
	},
});
