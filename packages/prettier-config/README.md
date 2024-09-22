# `@codespatan/prettier-config`

Este paquete proporciona una configuración compartida de Prettier para tus proyectos. Al usar esta configuración, aseguras un formato de código consistente en todos tus repositorios.

## Instalación

Para instalar el paquete, usa `npm` o `yarn`:

```sh
npm install @codespatan/prettier-config --save-dev
# o
yarn add @codespatan/prettier-config --dev
```

## Uso

Para usar la configuración compartida de Prettier, crea o actualiza tu archivo `prettier.config.js` o `.prettierrc.js` en la raíz de tu proyecto con el siguiente contenido:

```js
module.exports = require('@codespatan/prettier-config/.prettierrc');
```

o

```js
const baseConfig = require('@codespatan/prettier-config/.prettierrc');
export default baseConfig;
```

Esto extenderá la configuración de Prettier del paquete `@codespatan/prettier-config`.

## Integración `.prettierignore`

Para usar el archivo `.prettierignore` del paquete compartido en el proyecto raíz y los subproyectos, puedes hacer un simple enlace simbólico o importar el contenido del archivo en el `.prettierignore` del proyecto:

### Opción 1: Crear un Enlace Simbólico (Symlink)

Crea un enlace simbólico desde el archivo .prettierignore en el paquete prettier-config al proyecto raíz:

1. Desde la raíz del monorepo, ejecuta:

```bash
ln -s ./packages/prettier-config/.prettierignore .prettierignore
```

Esto crea un enlace simbólico llamado `.prettierignore` en el proyecto raíz que apunta al archivo dentro del paquete prettier-config.

2. Si necesitas hacer lo mismo en los subproyectos, ejecuta el mismo comando desde el directorio de cada subproyecto:

```bash
ln -s ../packages/prettier-config/.prettierignore .prettierignore
```

### Opción 2: Importar el Contenido del Archivo (Copiar el Archivo)

Otra opción es copiar el contenido del `.prettierignore` del paquete compartido dentro de cada proyecto. Puedes agregar un script en el package.json del proyecto raíz para copiar el archivo automáticamente.

Agrega el siguiente script en el package.json del proyecto raíz:

```json
{
	"scripts": {
		"copy:prettierignore": "cp ./packages/prettier-config/.prettierignore .prettierignore"
	}
}
```

Ejecuta el script para copiar el archivo:

```bash
pnpm run copy:prettierignore
```

Puedes repetir este paso para los subproyectos si es necesario.

## Personalización

Si necesitas personalizar la configuración de Prettier para un proyecto específico, puedes hacerlo extendiendo la configuración compartida. Por ejemplo:

```js
const baseConfig = require('@codespatan/prettier-config/.prettierrc');

export default {
	...baseConfig,
	// Añade tus reglas personalizadas aquí
	semi: false,
};
```

## Contribuir

Si deseas contribuir a este paquete, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y haz commit con un mensaje descriptivo.
4. Empuja tus cambios a tu fork.
5. Crea un pull request al repositorio principal.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

```

```
