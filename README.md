# Lib Ts M50 Core

A simple library built with TypeScript.

## Installation

```bash
npm install my-ts-library
```

## Usage

```typescript
import { greet } from 'my-ts-library';

console.log(greet('World')); // Outputs: Hello, World!
```

## Ejecutar scripts

- **Construir la librería**:
  ```bash
  npm run build
  ```
- **Ejecutar las pruebas**:

```bash

npm test
```

- **Linter**:

```bash

npm run lint
```

### Publicar la librería

```bash
npm publish
```

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

## Utils

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
