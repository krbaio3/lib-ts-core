import { basicEslintConfig, basicEslintConfigJs, basicEslintConfigTs } from '@codespartan/eslint-config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

const configTs = basicEslintConfigTs(dir);

// Al ser monorepo, no existe una carpeta src, por lo que se debe cambiar a packages
configTs[0].files = ['packages/**/*.ts'];

export default [
	...basicEslintConfig,
	...basicEslintConfigJs,
	...configTs,
	{
		ignores: [
			'**/*.config.js',
			'**/*.config.mjs',
			'settings/**/*.mjs',
			'packages/shared-utils/**/*.ts',
			'packages/shared-core/**/*.ts',
			'packages/standard-version-config/**/*.js',
			'**/build/**',
			'**/dist/**',
			'**/node_modules/**',
			'*.mjs',
			'*.cjs',
			'.prettierrc.js',
		],
	},
];
