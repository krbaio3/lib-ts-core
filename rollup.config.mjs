import dts from 'rollup-plugin-dts';
import path from 'node:path';
import del from 'rollup-plugin-delete';

export default {
	input: path.resolve('temp/index.d.ts'), // Usa el archivo de entrada en el directorio temporal
	output: {
		file: path.resolve('dist/types/actions.d.ts'), // Archivo de salida combinado en `dist`
		format: 'es',
	},
	plugins: [
		dts(),
		del({ targets: 'temp', hook: 'buildEnd' }), // Elimina la carpeta temporal después del build
	],
};
