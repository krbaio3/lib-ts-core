import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigXO from 'eslint-config-xo';
import eslintConfigXOTypescript from 'eslint-config-xo-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import typescriptEslintParser from '@typescript-eslint/parser';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
	pluginJs.configs.recommended,
	...tsEslint.configs.recommended,
	{
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		languageOptions: {
			parser: typescriptEslintParser,
			ecmaVersion: 'latest',
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
				sourceType: 'module',
			},
			globals: globals.browser,
		},
		plugins: {
			unicorn: eslintPluginUnicorn,
			prettier: eslintPluginPrettierRecommended,
		},
		rules: {
			...eslintConfigXO.rules,
			...eslintConfigXOTypescript.rules,
			...eslintPluginUnicorn.configs['flat/all'].rules,
			...eslintConfigPrettier.rules,
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
	{
		files: ['**/*.js'],
		// ignores: ['*.config.{cjs | mjs}'],
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
	{ ignores: ['**/build/**', '**/dist/**', 'node_modules/**', '*.mjs', '*.cjs'] },
];
