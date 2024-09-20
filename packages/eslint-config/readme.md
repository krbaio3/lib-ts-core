```markdown
# `@codespartan/eslint-config`

Este paquete proporciona una configuración compartida de ESLint para tus proyectos. Al usar esta configuración, aseguras que el código siga un estilo y calidad consistentes.

## Instalación

Para instalar el paquete, usa `npm` o `yarn`:

```sh
npm install @codespartan/eslint-config --save-dev
# o
yarn add @codespartan/eslint-config --dev
```

## Uso

Para usar la configuración compartida de ESLint, crea o actualiza tu archivo `.eslintrc.js` en la raíz de tu proyecto con el siguiente contenido:

```js
export default {
	extends: ['@codespartan/eslint-config']
};
```

Esto extenderá la configuración de ESLint del paquete `@codespartan/eslint-config`.

## Personalización

Si necesitas personalizar la configuración de ESLint para un proyecto específico, puedes hacerlo extendiendo la configuración compartida. Por ejemplo:

```js
const baseConfig = require('@codespartan/eslint-config');

export default {
	...baseConfig,
	// Añade tus reglas personalizadas aquí
	rules: {
		'no-console': 'off'
	}
};
```

## Descripción de los Partials

### `basicEslintConfigTs(dirname)`

Esta función genera la configuración básica de ESLint para TypeScript.

```ts
/**
 * Genera la configuración básica de ESLint para TypeScript.
 * @param {string} dirname - El directorio raíz del proyecto.
 * @returns Eslint.Config - Eslint.Config => La configuración de ESLint para TypeScript.
 */
export const basicEslintConfigTs = (dirname): Eslint.Config => {}
```

### `bEslintConfigTs`

Este es el resultado de la función `basicEslintConfigTs(dirname)` que contiene la configuración básica de ESLint para TypeScript.

### `basicEslintConfigJs`

Esta constante contiene la configuración básica de ESLint para JavaScript.

```js
/**
 * Configuración básica de ESLint para JavaScript.
 * @type Eslint.Config
 */
export const basicEslintConfigJs = Eslint.Config;
```

## Contribuir

Si deseas contribuir a este paquete, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y haz commit con un mensaje descriptivo.
4. Push tus cambios a tu fork.
5. Crea un pull request al repositorio principal.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
```
