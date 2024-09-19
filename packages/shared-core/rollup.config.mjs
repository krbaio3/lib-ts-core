import dts from 'rollup-plugin-dts';
import path from 'node:path';
import del from 'rollup-plugin-delete';

export default {
	input: path.resolve('temp/index.d.ts'), // Usa el archivo temporal local en el paquete shared-core
	output: {
		file: path.resolve('dist/types/core.d.ts'), // Salida en la carpeta dist del paquete local
		format: 'es',
	},
	plugins: [
		dts(),
		del({ targets: 'temp', hook: 'buildEnd' }), // Elimina la carpeta temp después de la compilación
	],
};
