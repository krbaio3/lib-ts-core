import { defineConfig } from 'vite';
import path from 'path';
import packageJson from './package.json';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: packageJson.name,
			formats: ['es', 'cjs'],
			fileName: (format) => `utils.${format}.js`,
		},
		rollupOptions: {
			// external: Object.keys(packageJson.dependencies), // Excluir dependencias del bundle
		},
		sourcemap: true,
		minify: false, // Mantener el código sin minificar para facilidad de lectura
	},
});
