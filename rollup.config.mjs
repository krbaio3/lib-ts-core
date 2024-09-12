import dts from 'rollup-plugin-dts';
import path from 'node:path';
import del from 'rollup-plugin-delete';

export default {
	input: path.resolve(import.meta.dirname, 'dist/types/index.d.ts'), // Archivo de entrada
	output: {
		file: path.resolve(import.meta.dirname, 'dist/types/core.d.ts'), // Archivo de salida
		format: 'es',
	},
	plugins: [
		dts(),
		del({ targets: 'dist/types', hook: 'buildEnd' }), // Borra la carpeta dist/types después del build
	],
};
