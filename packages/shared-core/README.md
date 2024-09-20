# `@codespartan/lib-ts-core`

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

### AuthCore

#### Inicializar AuthCore desde el proyecto que consume la librería

En el proyecto que consuma la librería, deberá de llamar a `AuthCore.initialize()` antes de utilizar el interceptor. Esto garantizará que la instancia esté configurada con los parámetros correctos.

Por ejemplo, en el archivo principal del proyecto:

```typescript
import { AuthCore } from 'tu-libreria/auth.core';

// Inicializar AuthCore con los parámetros adecuados
AuthCore.initialize('https://api.example.com', 'auth/token');

// Luego puedes usar fetch como normalmente lo harías
fetch('https://api.example.com/some-endpoint')
	.then((response) => response.json())
	.then((data) => console.log(data));
```

#### Explicación

- `AuthCore.initialize()`: En el proyecto que consume tu librería, llamas a initialize() con los parámetros específicos del entorno (como `API_URL` y `AUTH_TOKEN_URL`).
- **Instancia Singleton**: El patrón Singleton garantiza que siempre se reutilice la misma instancia de AuthCore en todas partes del código, incluyendo en el interceptor.
- **Interceptor dinámico**: El interceptor funciona dinámicamente usando la instancia inicializada de AuthCore para obtener el token, que luego se añade al encabezado Authorization de todas las solicitudes.

## Logger

El código proporcionado define una clase `Logger` en TypeScript que se utiliza para gestionar y formatear mensajes de registro (logs) en una aplicación. A continuación, se explica cada parte del código:

### Enumeración `LogLevel`

Primero, se define una enumeración `LogLevel` que especifica los diferentes niveles de registro disponibles:

```typescript
enum LogLevel {
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
}
```

### Clase `Logger`

La clase `Logger` contiene métodos para registrar mensajes en diferentes niveles (`debug`, `info`, `warn`, `error`). Estos métodos están vinculados a la instancia de la clase en el constructor.

#### Propiedades y Constructor

La clase tiene varias propiedades, incluyendo el nivel de registro actual (`level`) y un indicador de si la aplicación está en modo producción (`isProduction`). El constructor es privado para implementar el patrón Singleton:

```typescript
private constructor(level: LogLevel) {
 this.level = level;
 this.isProduction = process.env.NODE_ENV === 'production';

 // Vincula los métodos a la instancia
 this.debug = this.log.bind(this, LogLevel.DEBUG);
 this.info = this.log.bind(this, LogLevel.INFO);
 this.warn = this.log.bind(this, LogLevel.WARN);
 this.error = this.log.bind(this, LogLevel.ERROR);
}
```

#### Método `getInstance`

El método `getInstance` asegura que solo haya una instancia de `Logger` (Singleton):

```typescript
public static getInstance(level: LogLevel = LogLevel.INFO): Logger {
 if (!Logger.instance) {
  Logger.instance = new Logger(level);
 }
 return Logger.instance;
}
```

#### Método `shouldLog`

El método `shouldLog` determina si un mensaje debe ser registrado en función del nivel de registro actual:

```typescript
private shouldLog(level: LogLevel): boolean {
 const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
 const currentLevelIndex = levels.indexOf(this.level);
 const messageLevelIndex = levels.indexOf(level);
 return messageLevelIndex >= currentLevelIndex;
}
```

#### Método `log`

El método `log` es el núcleo del sistema de registro. Formatea y muestra el mensaje en la consola si no está en modo producción y el nivel de registro es adecuado:

```typescript
private log(level: LogLevel, message: string, ...optionalParams: any[]) {
 if (!this.isProduction && this.shouldLog(level)) {
  const { color, backgroundColor } = this.getStyles(level);
  const logFunction = level === LogLevel.ERROR ? console.error : console.log;

  const stackTrace = new Error().stack?.split('\n').slice(2).join('\n');
  const enhancedMessage = `\nStack Trace:\n${stackTrace}`;

  logFunction(
   `%c[${level.toUpperCase()}]`,
   `color: ${color}; background: ${backgroundColor}; font-weight: bold;`,
   message,
   ...optionalParams,
   enhancedMessage,
  );
 }
}
```

#### Método `getStyles`

El método `getStyles` devuelve los estilos de color y fondo para cada nivel de registro:

```typescript

private getStyles(level: LogLevel): { color: string; backgroundColor: string } {
 switch (level) {
  case LogLevel.DEBUG:
   return { color: 'white', backgroundColor: 'blue' };
  case LogLevel.INFO:
   return { color: 'black', backgroundColor: 'green' };
  case LogLevel.WARN:
   return { color: 'black', backgroundColor: 'orange' };
  case LogLevel.ERROR:
   return { color: 'white', backgroundColor: 'red' };
  default:
   return { color: 'black', backgroundColor: 'white' };
 }
}
```

### Exportaciones

Finalmente, se exporta una instancia del `Logger` y los métodos de registro para su uso en otros módulos:

```typescript
const logger = Logger.getInstance(LogLevel.DEBUG);
const { debug, info, warn, error } = logger;

export default logger;
export { LogLevel, debug, info, warn, error };
```

Este diseño permite un sistema de registro flexible y configurable, adecuado para diferentes entornos y niveles de detalle en los mensajes de registro.

## Storage Manager

La clase `LocalStorageManager` en `src/configs/store.core.ts` es una clase singleton diseñada para gestionar las interacciones con el almacenamiento local del navegador. Esta clase proporciona métodos para almacenar y recuperar datos, asegurando que solo exista una instancia de la clase en toda la aplicación.

La clase tiene una propiedad estática privada `instance` que contiene la instancia singleton de `LocalStorageManager`. El método `getInstance` verifica si ya existe una instancia; si no, crea una nueva. Este método asegura que solo se use una instancia de la clase:

```typescript
public static getInstance(): LocalStorageManager {
 LocalStorageManager.instance ||= new LocalStorageManager();
 return LocalStorageManager.instance;
}
```

El constructor de la clase es privado, lo que impide la instanciación directa desde fuera de la clase. Este es un patrón común en el diseño singleton para controlar la creación de la instancia:

```typescript
private constructor() {
 // Constructor privado asegura que no se pueda instanciar directamente
}
```

El método `setStore` permite almacenar un valor en el almacenamiento local. Toma una clave y un valor como parámetros, serializa el valor usando `JSON.stringify`, y lo almacena bajo la clave especificada. Si ocurre un error durante este proceso, lo registra usando la función `error` importada de `logger.core`:

```typescript
public setStore(key: string, value: any): void {
 try {
  const serializedValue = JSON.stringify(value);
 } catch (error_) {
  error('Error saving to localStorage', error_);
 }
}
```

El método `getStore` recupera un valor del almacenamiento local. Toma una clave como parámetro, recupera el valor asociado con esa clave, y lo deserializa usando `JSON.parse`. Si la clave no existe o ocurre un error, registra el error y devuelve `undefined`:

```typescript
public getStore(key: string): any {
 try {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
 } catch (error_) {
  error('Error retrieving from localStorage', error_);
  return undefined;
 }
}
```

En general, la clase `LocalStorageManager` proporciona un mecanismo robusto y con manejo de errores para interactuar con el almacenamiento local del navegador, asegurando que los datos se almacenen y recuperen de manera eficiente y segura.

## Contribuir

Si deseas contribuir a esta biblioteca, sigue estos pasos:  

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y haz commit con un mensaje descriptivo.
4. Push tus cambios a tu fork.
5. Crea un pull request al repositorio principal.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
