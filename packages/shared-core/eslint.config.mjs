import eslintConfig from '@codespartan/eslint-config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default eslintConfig(__dirname);
