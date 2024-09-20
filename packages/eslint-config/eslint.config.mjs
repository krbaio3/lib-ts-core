import path from 'node:path';
import globals from 'globals';
// eslint configs
import eslintConfigXO from 'eslint-config-xo';
import eslintConfigXOTypescript from 'eslint-config-xo-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
// eslint plugins
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
// eslint parsers
import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';

/**
 * Genera la configuración básica de ESLint para TypeScript.
 * @param {string} dirname - El directorio raíz del proyecto.
 * @returns Eslint.Config La configuración de ESLint para TypeScript.
 */
export const basicEslintConfigTs = (dirname) => [
	{
		files: ['src/**/*.ts'], // Apunta a los archivos TypeScript
		languageOptions: {
			parser: typescriptEslint.parser,
			ecmaVersion: 'latest',
			parserOptions: {
				project: path.resolve(dirname, './tsconfig.json'),
				tsconfigRootDir: path.resolve(dirname),
				sourceType: 'module',
			},
			globals: globals.browser,
		},
		plugins: {
			unicorn: eslintPluginUnicorn,
			prettier: eslintPluginPrettierRecommended,
		},
		rules: {
			// Reglas específicas de XO y otros plugins
			...eslintConfigXO.rules,
			...eslintPluginUnicorn.configs['flat/all'].rules,
			...eslintConfigPrettier.rules,

			// Ajustes específicos de TypeScript
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'new-cap': 'off',
			'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
			'@typescript-eslint/parameter-properties': [
				'error',
				{
					allow: ['readonly'],
				},
			],
		},
	},
];

/**
 * Configuración básica de ESLint para JavaScript.
 * @type Eslint.Config
 */
export const basicEslintConfigJs = [
	{
		files: ['**/*.js'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			unicorn: eslintPluginUnicorn,
			prettier: eslintPluginPrettierRecommended,
		},
		rules: {
			...eslintConfigXO.rules,
			...eslintPluginUnicorn.configs['flat/all'].rules,
			...eslintConfigPrettier.rules,
		},
	},
];

/**
 * Configuración básica de ESLint.
 * @type Eslint.Config
 */
export const basicEslintConfig = [
	// Configuración de ESLint predeterminada
	eslint.configs.recommended,
	// Configuración de TypeScript ESLint
	...typescriptEslint.configs.recommended,
	// Configuración XO para TypeScript
	...eslintConfigXOTypescript,
];
