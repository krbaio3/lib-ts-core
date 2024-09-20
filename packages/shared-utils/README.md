# `@codespartan/lib-ts-utils`

## Installation

```bash
npm install @codespartan/lib-ts-core
```

## Ejecutar scripts

### Scripts del `package.json`

El archivo `package.json` contiene una serie de scripts que automatizan tareas comunes en el desarrollo del proyecto. A continuación, se explica cada uno de estos scripts:

#### Build

```json
"build": "vite build && tsc && rollup -c rollup.config.mjs"
```

```bash
npm run build
```

Este script compila el proyecto utilizando Vite, TypeScript y Rollup. Primero, `vite build` se encarga de la construcción inicial, `tsc` compila los archivos TypeScript, y finalmente `rollup -c rollup.config.mjs` empaqueta los módulos según la configuración de Rollup.

#### Build and Changelog

```json
"buildAndChangelog": "npm run build && npm run changelog"
```

```bash
npm run buildAndChangelog
```

Este script ejecuta el script de construcción (`build`) y luego genera un changelog utilizando `conventional-changelog`.

#### Changelog

```json
"changelog": "npx conventional-changelog -p angular -i ./CHANGELOG.md -s -r 0"
```

```bash
npm run changelog
```

Genera un changelog basado en los commits del proyecto siguiendo el formato Angular. El changelog se guarda en el archivo `CHANGELOG.md`.

#### Check

```json
"check": "prettier . --check"
```

```bash
npm run check
```

Verifica que el código esté formateado correctamente según las reglas de Prettier.

#### Check Fix

```json
"check:fix": "prettier . --write"
```

```bash
npm run check:fix
```

Formatea automáticamente el código según las reglas de Prettier.

#### Clean

```json
"clean": "rimraf ./dist"
```

```bash
npm run clean
```

Elimina el directorio `dist` para limpiar los archivos generados en la construcción anterior.

#### Commit

```json
"commit": "cz"
```

```bash
npm run commit
```

Inicia el asistente de Commitizen para ayudar a crear mensajes de commit estandarizados.

#### Dev

```json
"dev": "vite"
```

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite.

#### Lint

```json
"lint": "eslint ."
```

```bash
npm run lint
```

Ejecuta ESLint para verificar que el código cumpla con las reglas de estilo y calidad definidas.

#### Lint Fix

```json
"lint:fix": "eslint . --fix"
```

```bash
npm run lint:fix
```

Corrige automáticamente los problemas de estilo y calidad detectados por ESLint.

#### Preview

```json
"preview": "vite preview"
```

```bash
npm run preview
```

Inicia un servidor para previsualizar la aplicación construida.

#### Release

```json
"release": "standard-version"
```

```bash
npm run release
```

Genera una nueva versión del proyecto siguiendo el estándar de `standard-version`.

#### Release Major, Minor, Patch

```json
"release:major": "standard-version --release-as major",
"release:minor": "standard-version --release-as minor",
"release:patch": "standard-version --release-as patch"
```

```bash
npm run release:major
npm run release:minor
npm run release:patch
```

Genera una nueva versión mayor, menor o de parche del proyecto, respectivamente.

#### Test

```json
"test": "echo \"Error: no test specified\" && exit 1"
```

```bash
npm run test
```

Placeholder para los tests del proyecto. Actualmente, este script muestra un mensaje de error y termina con un código de salida 1.

#### Version

```json
"version": "npx conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
```

```bash
npm run version
```

Genera un changelog y lo añade al control de versiones.

#### Prepublish

```json
"prepublish": "npm pack"
```

```bash
npm run prepublish
```

Empaqueta el proyecto en un archivo tarball listo para ser publicado.

## Usage

### Transform Array To Object

Se define una función llamada `transformToObject` que convierte un array de objetos en un único objeto. Esta función es útil cuando se necesita transformar una colección de elementos en un formato de clave-valor, donde cada clave es un identificador único y el valor es una propiedad específica de los elementos del array.

La función `transformToObject` toma un parámetro `data`, que es un array de objetos. Utiliza el método `reduce` para iterar sobre cada elemento del array y construir un nuevo objeto.

```typescript
export const transformToObject = (data: any[]) => {
```

Dentro del `reduce`, se inicializa un acumulador `acc` como un objeto vacío `{}`. Para cada `item` en el array, se asigna el valor de `item.tag` a una clave en `acc` que corresponde a `item.id_tipo`.

```typescript
acc[item.id_tipo] = item.tag;
```

Finalmente, la función retorna el objeto acumulado `acc`, que contiene todas las claves y valores transformados del array original.

```typescript
return acc;
```

En resumen, esta función convierte un array de objetos en un objeto donde las claves son los valores de `id_tipo` y los valores son los correspondientes `tag` de cada objeto en el array.

### Find Key In Object

Se define una función llamada `findKeyInObject` que busca recursivamente una clave específica dentro de un objeto. Esta función es útil cuando se necesita localizar una clave en estructuras de datos anidadas, permitiendo especificar un nivel máximo de profundidad para la búsqueda.

La función `findKeyInObject` toma cuatro parámetros: `obj`, que es el objeto en el que se realizará la búsqueda; `keyToFind`, que es la clave que se desea encontrar; `currentDepth`, que es el nivel de profundidad actual de la búsqueda (por defecto es 1); y `maxDepth`, que es la profundidad máxima permitida para la búsqueda (por defecto es 3).

```typescript
export function findKeyInObject(
 obj: Record<string, any>,
 keyToFind: string,
 currentDepth = 1,
 maxDepth = 3,
): Record<string, any> | null {
```

La función primero verifica si la profundidad actual excede la profundidad máxima permitida. Si es así, retorna `null`.

```typescript
if (currentDepth > maxDepth) return null;
```

Luego, comprueba si el objeto contiene la clave buscada utilizando `hasOwnProperty`. Si la clave existe, devuelve su valor.

```typescript
if (obj.hasOwnProperty(keyToFind)) return obj[keyToFind];
```

Si la clave no se encuentra en el nivel actual, la función itera sobre las propiedades del objeto. Si una propiedad es un objeto y no es `null`, la función llama a sí misma recursivamente incrementando la profundidad actual.

```typescript
for (const key in obj) {
	if (obj[key] !== null && typeof obj[key] === 'object') {
		const result = findKeyInObject(obj[key], keyToFind, currentDepth + 1, maxDepth);
		if (result !== null) {
			return result;
		}
	}
}
```

Finalmente, si la clave no se encuentra en ningún nivel dentro de la profundidad permitida, la función retorna `null`.

```typescript
return null;
```

En resumen, `findKeyInObject` es una función recursiva que busca una clave específica dentro de un objeto y sus subobjetos hasta una profundidad máxima especificada, devolviendo el valor de la clave si se encuentra o `null` si no se encuentra.

### Kebab Case to Snake Case

Se define una función llamada `kebabToSnake` que convierte una cadena de texto en formato kebab-case a snake_case. Esta función es útil cuando se necesita transformar identificadores o nombres de variables de un formato a otro, especialmente en contextos donde se prefieren diferentes convenciones de nomenclatura.

La función `kebabToSnake` toma un parámetro `kebab`, que es una cadena de texto en formato kebab-case. Utiliza el método `replace` de JavaScript para reemplazar todos los guiones (`-`) en la cadena con guiones bajos (`_`).

```typescript
return kebab.replace(/-/g, '_');
```

En resumen, esta función convierte una cadena de texto de kebab-case a snake_case reemplazando todos los guiones por guiones bajos.

### Replace Spaces

Se define una función llamada `replaceSpaces` que reemplaza todos los espacios en una cadena de texto por guiones (`-`). Esta función es útil cuando se necesita transformar una cadena de texto para que no contenga espacios, lo cual es común en la generación de URLs o identificadores que no deben tener espacios.

La función `replaceSpaces` toma un parámetro `str`, que es una cadena de texto. Utiliza el método `replace` de JavaScript con una expresión regular para buscar todos los espacios (`\s`) en la cadena y reemplazarlos por guiones (`-`).

```typescript
return str.replace(/\s/g, '-');
```

En resumen, esta función convierte una cadena de texto reemplazando todos los espacios por guiones, lo cual es útil para normalizar cadenas de texto en contextos donde los espacios no son permitidos o deseados.

## Contribuir

Si deseas contribuir a esta biblioteca, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y haz commit con un mensaje descriptivo.
4. Push tus cambios a tu fork.
5. Crea un pull request al repositorio principal.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
